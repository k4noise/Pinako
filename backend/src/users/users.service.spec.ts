import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { DataSource, Repository } from 'typeorm';
import { UpdateUserDto } from './dto/update-user.dto';
import { sqliteDataSource } from '../sqlite-source';
import { PartialType } from '@nestjs/mapped-types';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import 'dotenv/config';

class PartialUser extends PartialType(User) {}

describe('test UsersService', () => {
  const WRONG_USER_ID = 10;
  const NO_EXIST_USER_ERROR = "User don't exists";
  const TEST_USER: CreateUserDto = {
    login: 'test',
    password: 'test',
  };
  const TEST_USER_ID = 1;

  let service: UsersService;
  const testConnectionName = 'testUsersService';
  const dataSource: DataSource = new DataSource({
    ...sqliteDataSource,
    type: 'sqlite',
    entities: [User],
    name: testConnectionName,
  });

  beforeAll(async () => {
    await dataSource.initialize();
    const repository: Repository<User> = dataSource.getRepository(User);
    service = new UsersService(repository);

    return dataSource;
  });

  it('service exists', () => {
    expect(service).toBeDefined();
  });

  describe('create user', () => {
    it('use unique data', async () => {
      const expectedId = TEST_USER_ID;

      jest.spyOn(service, 'create');
      const userData: number = await service.create(TEST_USER);

      expect(userData).toEqual(expectedId);
      expect(service.create).toHaveBeenCalledWith(TEST_USER);
    });

    it('use existing login', async () => {
      await expect(service.create(TEST_USER)).rejects.toThrow('Login exists');
    });
  });

  describe('search user(s)', () => {
    const usersData: CreateUserDto[] = [
      TEST_USER,
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
      const expectedUsers: PartialUser[] = usersData.map((userData, index) => ({
        id: index + 1,
        login: userData.login,
        displayName: userData.login,
        about: '',
        avatarUrl: '/default.jpg',
      }));

      jest.spyOn(service, 'findAll');
      const foundUsers: User[] = await service.findAll();

      expect(service.findAll).toHaveBeenCalled();
      expect(foundUsers.length).toBe(usersData.length);
      expect(expectedUsers).toEqual(expectedUsers);
    });

    it('existing user by id', async () => {
      const users: User[] = await service.findAll();
      const expectedUserData = users[TEST_USER_ID - 1];

      jest.spyOn(service, 'findById');
      const user: User = await service.findById(TEST_USER_ID);

      expect(service.findById).toBeCalledWith(TEST_USER_ID);
      expect(user instanceof User).toBeTruthy();
      expect(expectedUserData).toEqual(user);
    });

    it('non-existing user by id', async () => {
      await expect(service.findById(WRONG_USER_ID)).rejects.toThrow(
        NO_EXIST_USER_ERROR,
      );
    });

    it('existing user by login', async () => {
      const users: User[] = await service.findAll();
      const expectedUserData = users[TEST_USER_ID - 1];

      jest.spyOn(service, 'findByLogin');
      const user: User = await service.findByLogin(expectedUserData.login);

      expect(service.findByLogin).toBeCalledWith(expectedUserData.login);
      expect(user instanceof User).toBeTruthy();
      expect(expectedUserData).toEqual(user);
    });

    it('non-existing user by login', async () => {
      const userLogin = 'user';
      const expectedUserData = null;

      jest.spyOn(service, 'findByLogin');
      const user = await service.findByLogin(userLogin);
      expect(service.findByLogin).toBeCalledWith(userLogin);
      expect(user).toEqual(expectedUserData);
    });
  });

  describe('get password (hashed)', () => {
    it('existing user', async () => {
      jest.spyOn(service, 'getUserPassword');
      const hashedPassword: string = await service.getUserPassword(
        TEST_USER_ID,
      );
      expect(service.getUserPassword).toHaveBeenCalledWith(TEST_USER_ID);
      expect(
        bcrypt.compareSync(TEST_USER.password, hashedPassword),
      ).toBeTruthy();
    });

    it('non-existing user', async () => {
      await expect(service.getUserPassword(WRONG_USER_ID)).rejects.toThrow(
        NO_EXIST_USER_ERROR,
      );
    });
  });

  describe('update user', () => {
    it('existing user', async () => {
      const userData = await service.findById(TEST_USER_ID);
      const updateUserData: UpdateUserDto = {
        password: TEST_USER.password,
        about: 'test',
      };
      const expectedUserData: PartialUser = { ...userData, ...updateUserData };
      delete expectedUserData.password;

      jest.spyOn(service, 'update');
      await service.update(TEST_USER_ID, updateUserData);
      const userWithNewData = await service.findById(TEST_USER_ID);

      expect(service.update).toHaveBeenCalledWith(TEST_USER_ID, updateUserData);
      expect(userWithNewData).toEqual(expectedUserData);
    });

    it('exising user with new password', async () => {
      const updateUserData: UpdateUserDto = {
        password: TEST_USER.password,
        newPassword: 'p@ssw0rd',
        about: `test${TEST_USER_ID}`,
      };
      const userData = await service.findById(TEST_USER_ID);
      const expectedUserData: PartialUser = { ...userData, ...updateUserData };
      delete expectedUserData.password;
      delete expectedUserData['newPassword'];

      jest.spyOn(service, 'update');
      await service.update(TEST_USER_ID, updateUserData);
      const userWithNewData = await service.findById(TEST_USER_ID);
      expect(service.update).toHaveBeenCalledWith(TEST_USER_ID, updateUserData);
      expect(userWithNewData).toEqual(expectedUserData);
    });

    it('existing user with wrong password', async () => {
      const wrongPassword = '****';
      jest.spyOn(service, 'update');
      await expect(
        service.update(TEST_USER_ID, { password: wrongPassword }),
      ).rejects.toThrow('Wrong password');
      expect(service.update).toHaveBeenCalledWith(TEST_USER_ID, {
        password: wrongPassword,
      });
    });

    it('non-existing user', async () => {
      const password = '****';
      jest.spyOn(service, 'update');

      await expect(service.update(WRONG_USER_ID, { password })).rejects.toThrow(
        NO_EXIST_USER_ERROR,
      );
      expect(service.update).toHaveBeenCalledWith(WRONG_USER_ID, {
        password,
      });
    });
  });

  describe('actions with refresh token', () => {
    const payload = { sub: TEST_USER_ID, type: 'refresh' };
    const secret = process.env.JWT_SECRET;
    const options = { expiresIn: '1h' };
    const token = jwt.sign(payload, secret, options);

    it('set token at existing user', async () => {
      jest.spyOn(service, 'setRefreshToken');
      await service.setRefreshToken(payload.sub, token);
      expect(service.setRefreshToken).toHaveBeenCalledWith(payload.sub, token);
    });

    it('set token at non-existing user', async () => {
      await expect(
        service.setRefreshToken(WRONG_USER_ID, 'token'),
      ).rejects.toThrow(NO_EXIST_USER_ERROR);
    });

    it('get token at existing user', async () => {
      jest.spyOn(service, 'getRefreshToken');
      const refreshToken = await service.getRefreshToken(payload.sub);
      expect(service.setRefreshToken).toHaveBeenCalledWith(payload.sub, token);
      expect(bcrypt.compareSync(token, refreshToken)).toBeTruthy();
    });

    it('get nullable token at existing user', async () => {
      const userIdWithNullableToken = payload.sub + 1;
      const expectedUserData = null;
      jest.spyOn(service, 'getRefreshToken');
      const refreshToken = await service.getRefreshToken(
        userIdWithNullableToken,
      );
      expect(service.getRefreshToken).toHaveBeenCalledWith(payload.sub);
      expect(refreshToken).toBe(expectedUserData);
    });

    it('get token at non-existing user', async () => {
      await expect(service.getRefreshToken(WRONG_USER_ID)).rejects.toThrow(
        NO_EXIST_USER_ERROR,
      );
    });

    describe('remove user', () => {
      it('existing user', async () => {
        jest.spyOn(service, 'remove');
        await service.findById(TEST_USER_ID);
        await service.remove(TEST_USER_ID);
        expect(service.remove).toHaveBeenCalledWith(TEST_USER_ID);
      });

      it('non-existing user', async () => {
        jest.spyOn(service, 'remove');
        await expect(service.remove(TEST_USER_ID)).rejects.toThrow(
          NO_EXIST_USER_ERROR,
        );
        expect(service.remove).toHaveBeenCalledWith(TEST_USER_ID);
      });
    });
  });

  afterAll(async () => {
    await dataSource.destroy();
  });
});
