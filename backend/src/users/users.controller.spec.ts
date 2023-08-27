import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { DataSource, Repository } from 'typeorm';
import { sqliteDataSource } from '../sqlite-source';
import { CreateUserDto } from './dto/create-user.dto';
import { PartialType } from '@nestjs/mapped-types';

class PartialUser extends PartialType(User) {}

describe('test UsersController', () => {
  const USER_ID = 1;
  const TEST_USER: CreateUserDto = { login: 'test', password: 'test' };

  let controller: UsersController;
  let service: UsersService;
  const testConnectionName = 'testUsersController';
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
    controller = new UsersController(service);
  });

  it('should exist controller', () => {
    expect(controller).toBeDefined();
  });

  it('should find all users', async () => {
    const usersData: CreateUserDto[] = [
      TEST_USER,
      { login: 'test2', password: 'test' },
      { login: 'test3', password: 'test' },
    ];
    const expectedResponse: PartialUser[] = usersData.map(
      (userData, index) => ({
        id: index + 1,
        login: userData.login,
        displayName: userData.login,
        about: null,
        avatarUrl: '/default.jpg',
      }),
    );

    for (const userData of usersData) {
      try {
        await service.create(userData);
      } catch (err) {}
    }

    jest.spyOn(service, 'findAll');
    const allUsers = await controller.findAll();

    expect(service.findAll).toHaveBeenCalled();
    expect(allUsers).toEqual(expectedResponse);
  });

  it('should find one user', async () => {
    const expectedUserData: PartialUser = {
      id: USER_ID,
      login: TEST_USER.login,
      displayName: TEST_USER.login,
      about: null,
      avatarUrl: '/default.jpg',
    };

    jest.spyOn(service, 'findById');
    const foundUserData = await controller.findById(USER_ID);

    expect(service.findById).toHaveBeenCalledWith(USER_ID);
    expect(foundUserData).toEqual(expectedUserData);
  });

  it('should update user', async () => {
    const userData = await controller.findById(USER_ID);
    const expectedUserData: PartialUser = { ...userData, ...TEST_USER };
    delete expectedUserData.password;

    jest.spyOn(service, 'update');
    await controller.update(USER_ID, TEST_USER);
    const updatedUserData = await controller.findById(USER_ID);

    expect(service.update).toHaveBeenCalledWith(USER_ID, TEST_USER);
    expect(updatedUserData).toEqual(expectedUserData);
  });

  it('should remove user', async () => {
    jest.spyOn(service, 'remove');
    await controller.remove(USER_ID);

    expect(service.remove).toHaveBeenCalledWith(USER_ID);
    await expect(controller.findById(USER_ID)).rejects.toThrow(
      "User don't exists",
    );
  });

  afterAll(async () => {
    await dataSource.destroy();
  });
});
