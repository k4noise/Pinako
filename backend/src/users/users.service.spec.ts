import { Test } from '@nestjs/testing';
import { UsersService } from './users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { DataSource, Repository } from 'typeorm';
import { UpdateUserDto } from './dto/update-user.dto';
import { sqliteDataSource } from '../sqlite-source';
import { PartialType } from '@nestjs/mapped-types';

class PartialUser extends PartialType(User) {}

describe('test UsersService', () => {
  let service: UsersService;
  let repository: Repository<User>;
  let dataSource: DataSource;
  const testConnectionName = 'testUsersService';

  beforeAll(async () => {
    await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
      ],
    }).compile();

    dataSource = new DataSource({
      ...sqliteDataSource,
      type: 'sqlite',
      entities: [User],
      name: testConnectionName,
    });

    await dataSource.initialize();
    repository = dataSource.getRepository(User);
    service = new UsersService(repository);

    return dataSource;
  });

  it('service exists', () => {
    expect(service).toBeDefined();
  });

  describe('create user', () => {
    const userData: CreateUserDto = {
      login: 'test',
      password: 'test',
    };

    it('use unique data', async () => {
      const expectedResponse: { id: number; avatarUrl: string } = {
        id: 1,
        avatarUrl: '/default.jpg',
      };

      jest.spyOn(service, 'create');
      const createdUserData: { id: number; avatarUrl: string } =
        await service.create(userData);

      expect(createdUserData).toEqual(expectedResponse);
      expect(service.create).toHaveBeenCalledWith(userData);
    });

    it('use existing login', async () => {
      await expect(service.create(userData)).rejects.toThrow('Login exists');
    });
  });

  describe('search user(s)', () => {
    const usersData: CreateUserDto[] = [
      { login: 'test', password: 'test' },
      { login: 'test2', password: 'test' },
      { login: 'test3', password: 'test' },
    ];

    beforeAll(async () => {
      for (const userData of usersData) {
        try {
          await service.create(userData);
        } catch (err) {}
      }
    });

    it('return all users', async () => {
      const expectedResponse: PartialUser[] = usersData.map(
        (userData, index) => ({
          id: index + 1,
          login: userData.login,
          displayName: userData.login,
          about: '',
          avatarUrl: '/default.jpg',
        }),
      );

      jest.spyOn(service, 'findAll');
      const users: User[] = await service.findAll();

      expect(service.findAll).toHaveBeenCalled();
      expect(users.length).toBe(usersData.length);
      expect(expectedResponse).toEqual(expectedResponse);
    });

    it('return user', async () => {
      const users: User[] = await service.findAll();
      const randomUserId: number = Math.floor((Math.random() * 10) % 3) + 1;
      const expectedUserData = users[randomUserId - 1];

      jest.spyOn(service, 'findOne');
      const user: User = await service.findOne(randomUserId);

      expect(service.findOne).toBeCalledWith(randomUserId);
      expect(user instanceof User).toBeTruthy();
      expect(expectedUserData).toEqual(user);
    });

    it('non-existing user', async () => {
      await expect(service.findOne(usersData.length + 1)).rejects.toThrow(
        "User don't exists",
      );
    });
  });

  describe('update user', () => {
    const randomUserId: number = Math.floor((Math.random() * 10) % 3) + 1;
    it('existing user', async () => {
      const userData = await service.findOne(randomUserId);
      const updateUserData: UpdateUserDto = {
        password: 'test',
        about: 'test',
      };
      const expectedUserData: PartialUser = { ...userData, ...updateUserData };
      delete expectedUserData.password;

      jest.spyOn(service, 'update');
      await service.update(randomUserId, updateUserData);
      const userWithNewData = await service.findOne(randomUserId);

      expect(service.update).toHaveBeenCalledWith(randomUserId, updateUserData);
      expect(userWithNewData).toEqual(expectedUserData);
    });

    it('exising user with new password', async () => {
      const updateUserData: UpdateUserDto = {
        password: 'test',
        newPassword: 'p@ssw0rd',
        about: `test${randomUserId}`,
      };
      const userData = await service.findOne(randomUserId);
      const expectedUserData: PartialUser = { ...userData, ...updateUserData };
      delete expectedUserData.password;
      delete expectedUserData['newPassword'];

      jest.spyOn(service, 'update');
      await service.update(randomUserId, updateUserData);
      const userWithNewData = await service.findOne(randomUserId);
      expect(service.update).toHaveBeenCalledWith(randomUserId, updateUserData);
      expect(userWithNewData).toEqual(expectedUserData);
    });

    it('existing user with wrong password', async () => {
      jest.spyOn(service, 'update');

      await expect(
        service.update(randomUserId, { password: 'idontknow' }),
      ).rejects.toThrow('Wrong password');
      expect(service.update).toHaveBeenCalledWith(randomUserId, {
        password: 'idontknow',
      });
    });

    it('non-existing user', async () => {
      jest.spyOn(service, 'update');
      const users = await service.findAll();

      await expect(
        service.update(users.length + 1, { password: 'idontknow' }),
      ).rejects.toThrow("User don't exists");
      expect(service.update).toHaveBeenCalledWith(users.length + 1, {
        password: 'idontknow',
      });
    });
  });

  describe('remove user', () => {
    const randomUserId: number = Math.floor((Math.random() * 10) % 3) + 1;

    it('existing user', async () => {
      jest.spyOn(service, 'remove');
      await service.findOne(randomUserId);
      await service.remove(randomUserId);
      expect(service.remove).toHaveBeenCalledWith(randomUserId);
    });

    it('non-existing user', async () => {
      jest.spyOn(service, 'remove');
      await expect(service.remove(randomUserId)).rejects.toThrow(
        "User don't exists",
      );
      expect(service.remove).toHaveBeenCalledWith(randomUserId);
    });
  });

  afterAll(async () => {
    await dataSource.destroy();
  });
});
