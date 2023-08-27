import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { User } from '../users/entities/user.entity';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { AuthUserDto } from './dto/auth.dto';
import { DataSource, Repository } from 'typeorm';
import { sqliteDataSource } from '../sqlite-source';
import 'dotenv/config';
import * as bcrypt from 'bcrypt';

describe('test AuthService', () => {
  const WRONG_USER_ID = 10;
  const WRONG_TOKEN = 'token';
  const NO_EXIST_USER_ERROR = "User don't exists";
  const TEST_USER: CreateUserDto | AuthUserDto = {
    login: 'test',
    password: 'test',
  };

  let authService: AuthService;
  let usersService: UsersService;
  let jwtService: JwtService;
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

    return dataSource;
  });

  it('service exists', () => {
    expect(authService).toBeDefined();
  });

  describe('register user', () => {
    it('user with unique data', async () => {
      jest.spyOn(authService, 'register');
      await authService.register(TEST_USER);
      expect(authService.register).toHaveBeenCalledWith(TEST_USER);
    });

    it('user with existing data', async () => {
      await expect(authService.register(TEST_USER)).rejects.toThrowError(
        'Login exists',
      );
    });
  });

  describe('login user', () => {
    it('existing user with right password', async () => {
      const expectedUserData: User = await usersService.findByLogin(
        TEST_USER.login,
      );
      jest.spyOn(authService, 'login');
      const { userData, tokens } = await authService.login(TEST_USER);

      expect(authService.login).toHaveBeenCalledWith(TEST_USER);
      expect(userData.id).toBe(expectedUserData.id);
      expect(userData.avatarUrl).toBe(expectedUserData.avatarUrl);
      expect(Object.keys(tokens).length).toBe(2);
      expect(jwtService.verify(tokens.accessToken)).toBeTruthy();
      expect(jwtService.verify(tokens.refreshToken)).toBeTruthy();
    });

    it('existing user with wrong password', async () => {
      const user: AuthUserDto = { login: TEST_USER.login, password: '****' };
      await expect(authService.login(user)).rejects.toThrowError(
        'Wrong password',
      );
    });

    it('non-existing user', async () => {
      const user: AuthUserDto = { login: 'user', password: 'user' };
      await expect(authService.login(user)).rejects.toThrowError(
        NO_EXIST_USER_ERROR,
      );
    });
  });

  describe('user logout', () => {
    it('existing user', async () => {
      const userId = 1;
      const currentRefreshToken = await usersService.getRefreshToken(userId);
      const expectedRefreshToken = null;

      jest.spyOn(authService, 'logout');
      await authService.logout(userId);
      const removedRefreshToken = await usersService.getRefreshToken(userId);
      expect(authService.logout).toHaveBeenCalledWith(userId);
      expect(currentRefreshToken).not.toBe(removedRefreshToken);
      expect(removedRefreshToken).toBe(expectedRefreshToken);
    });

    it('non-existing user', async () => {
      await expect(authService.logout(WRONG_USER_ID)).rejects.toThrowError(
        NO_EXIST_USER_ERROR,
      );
    });
  });

  describe('refresh user tokens', () => {
    it('existing user with right refresh token', async () => {
      const { userData, tokens } = await authService.login(TEST_USER);
      jest.spyOn(authService, 'refreshTokens');
      const newTokens = await authService.refreshTokens(
        userData.id,
        tokens.refreshToken,
      );

      expect(authService.refreshTokens).toHaveBeenCalledWith(
        userData.id,
        tokens.refreshToken,
      );
      expect(Object.keys(newTokens).length).toBe(2);
      expect(jwtService.verify(newTokens.accessToken)).toBeTruthy();
      expect(jwtService.verify(newTokens.refreshToken)).toBeTruthy();
    });

    it('existing user with wrong refresh token', async () => {
      const { userData } = await authService.login(TEST_USER);
      await expect(
        authService.refreshTokens(userData.id, WRONG_TOKEN),
      ).rejects.toThrowError('Wrong refresh token');
    });

    it('non-existing user', async () => {
      await expect(
        authService.refreshTokens(WRONG_USER_ID, WRONG_TOKEN),
      ).rejects.toThrowError(NO_EXIST_USER_ERROR);
    });
  });

  describe('update refresh token', () => {
    it('existing user', async () => {
      const userId = 1;
      const refreshToken = 'token';
      const oldRefreshToken = await usersService.getRefreshToken(userId);

      jest.spyOn(authService, 'updateRefreshToken');
      await authService.updateRefreshToken(userId, refreshToken);
      const expectedRefreshToken = await usersService.getRefreshToken(userId);

      expect(authService.updateRefreshToken).toHaveBeenCalledWith(
        userId,
        refreshToken,
      );
      expect(
        bcrypt.compareSync(refreshToken, expectedRefreshToken),
      ).toBeTruthy();
      expect(oldRefreshToken).not.toBe(refreshToken);
    });

    it('non-existing user', async () => {
      await expect(
        authService.updateRefreshToken(WRONG_USER_ID, WRONG_TOKEN),
      ).rejects.toThrowError(NO_EXIST_USER_ERROR);
    });
  });

  afterAll(async () => {
    await dataSource.destroy();
  });
});
