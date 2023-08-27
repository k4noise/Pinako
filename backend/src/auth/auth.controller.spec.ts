import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { AuthUserDto } from './dto/auth.dto';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { DataSource, Repository } from 'typeorm';
import { sqliteDataSource } from '../sqlite-source';
import { User } from '../users/entities/user.entity';
import * as httpMocks from 'node-mocks-http';

describe('test AuthController', () => {
  const TEST_USER: AuthUserDto | CreateUserDto = {
    login: 'test',
    password: 'test',
  };

  let authService: AuthService;
  let usersService: UsersService;
  let jwtService: JwtService;
  let controller: AuthController;
  const testConnectionName = 'testAuthService';
  const dataSource: DataSource = new DataSource({
    ...sqliteDataSource,
    type: 'sqlite',
    entities: [User],
    name: testConnectionName,
  });

  beforeAll(async () => {
    await dataSource.initialize();
    const repository: Repository<User> = dataSource.getRepository(User);
    jwtService = new JwtService({ secret: process.env.JWT_SECRET });
    usersService = new UsersService(repository);
    authService = new AuthService(usersService, jwtService);
    controller = new AuthController(authService);
    return dataSource;
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should register user', async () => {
    jest.spyOn(controller, 'register');
    await controller.register(TEST_USER);
    const userData = await usersService.findByLogin(TEST_USER.login);

    expect(controller.register).toHaveBeenCalledWith(TEST_USER);
    expect(userData).not.toBe(null);
  });

  it('should login user', async () => {
    const response = httpMocks.createResponse();
    jest.spyOn(controller, 'login');
    await controller.login(TEST_USER, response);
    const tokens = response.cookies;

    expect(tokens).not.toBe(null);
    expect(Object.keys(tokens).length).toBe(2);
    expect(tokens.accessToken.value).not.toBe(null);
    expect(tokens.accessToken.options.httpOnly).toBeTruthy();
    expect(tokens.refreshToken.value).not.toBe(null);
    expect(tokens.refreshToken.options.httpOnly).toBeTruthy();
  });

  it('should logout user', async () => {
    const userData = await usersService.findByLogin(TEST_USER.login);
    const oldRefreshToken = await usersService.getRefreshToken(userData.id);
    const response = httpMocks.createResponse();
    jest.spyOn(controller, 'logout');

    await controller.logout(userData.id, response);
    const newRefreshToken = await usersService.getRefreshToken(userData.id);
    const expectedRefreshToken = null;

    expect(oldRefreshToken).not.toBe(newRefreshToken);
    expect(newRefreshToken).toBe(expectedRefreshToken);
  });

  it('should refresh user tokens', async () => {
    const loginUserResponse = httpMocks.createResponse();
    const userData = await usersService.findByLogin(TEST_USER.login);
    await controller.login(TEST_USER, loginUserResponse);
    const oldTokens = loginUserResponse.cookies;
    const request = httpMocks.createRequest({
      cookies: {
        accessToken: oldTokens.accessToken.value,
        refreshToken: oldTokens.refreshToken.value,
      },
    });
    const response = httpMocks.createResponse();

    jest.spyOn(controller, 'refreshTokens');
    await controller.refreshTokens(userData.id, request, response);
    const newTokens = response.cookies;

    expect(Object.keys(newTokens).length).toBe(2);
    expect(newTokens.accessToken.value).not.toBe(null);
    expect(newTokens.accessToken.options.httpOnly).toBeTruthy();
    expect(newTokens.refreshToken.value).not.toBe(null);
    expect(newTokens.refreshToken.options.httpOnly).toBeTruthy();
    expect(oldTokens).not.toEqual(newTokens);
  });

  afterAll(async () => {
    await dataSource.destroy();
  });
});
