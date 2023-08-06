import { Test } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { sqliteDataSource } from '../sqlite-source';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PartialType } from '@nestjs/mapped-types';

class PartialUser extends PartialType(User) {}

describe('test UsersController', () => {
  let controller: UsersController;
  let service: UsersService;
  let repository: Repository<User>;
  let dataSource: DataSource;
  const testConnectionName = 'testUsersController';

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
    controller = new UsersController(service);
  });

  it('should exist controller', () => {
    expect(controller).toBeDefined();
  });

  it('should create a user', async () => {
    const userData: CreateUserDto = {
      login: 'test',
      password: 'test',
    };
    const expectedResponse: { id: number; avatarUrl: string } = {
      id: 1,
      avatarUrl: '/default.jpg',
    };

    jest.spyOn(service, 'create');
    const createdUserData = await controller.create(userData);

    expect(createdUserData).toEqual(expectedResponse);
    expect(service.create).toHaveBeenCalledWith(userData);
    await expect(controller.create(userData)).rejects.toThrow('Login exists');
  });

  it('should find all users', async () => {
    const usersData: CreateUserDto[] = [
      { login: 'test', password: 'test' },
      { login: 'test2', password: 'test' },
      { login: 'test3', password: 'test' },
    ];
    const expectedResponse: PartialUser[] = usersData.map(
      (userData, index) => ({
        id: index + 1,
        login: userData.login,
        displayName: userData.login,
        about: '',
        avatarUrl: '/default.jpg',
      }),
    );

    for (const userData of usersData) {
      try {
        await controller.create(userData);
      } catch (err) {}
    }

    jest.spyOn(service, 'findAll');
    const allUsers = await controller.findAll();

    expect(service.findAll).toHaveBeenCalled();
    expect(allUsers).toEqual(expectedResponse);
  });

  it('should find one user', async () => {
    const expectedUserData: PartialUser = {
      id: 1,
      login: 'test',
      displayName: 'test',
      about: '',
      avatarUrl: '/default.jpg',
    };

    jest.spyOn(service, 'findOne');
    const foundUserData = await controller.findOne(1);

    expect(service.findOne).toHaveBeenCalledWith(1);
    expect(foundUserData).toEqual(expectedUserData);
  });

  it('should update user', async () => {
    const id = 1;
    const dataToUpdate: UpdateUserDto = {
      password: 'test',
      about: 'test',
    };
    const userData = await controller.findOne(id);
    const expectedUserData: PartialUser = { ...userData, ...dataToUpdate };
    delete expectedUserData.password;

    jest.spyOn(service, 'update');
    await controller.update(id, dataToUpdate);
    const updatedUserData = await controller.findOne(id);

    expect(service.update).toHaveBeenCalledWith(id, dataToUpdate);
    expect(updatedUserData).toEqual(expectedUserData);
  });

  it('should remove user', async () => {
    const id = 1;
    jest.spyOn(service, 'remove');
    await controller.remove(id);

    expect(service.remove).toHaveBeenCalledWith(id);
    await expect(controller.findOne(id)).rejects.toThrow("User don't exists");
  });

  afterAll(async () => {
    await dataSource.destroy();
  });
});
