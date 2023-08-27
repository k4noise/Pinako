import { IAuthService } from './interfaces/IAuthService';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { AuthUserDto } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { User } from '../users/entities/user.entity';
import * as bcrypt from 'bcrypt';
import 'dotenv/config';
import { Tokens } from './types/tokens';

@Injectable()
export class AuthService implements IAuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(createUserDto: CreateUserDto): Promise<number> {
    return await this.usersService.create(createUserDto);
  }

  async login(authData: AuthUserDto) {
    const user = await this.usersService.findByLogin(authData.login);
    user['password'] = await this.usersService.getUserPassword(user?.id);
    const passwordsMatch = await bcrypt.compare(
      authData.password,
      user.password,
    );
    if (!passwordsMatch)
      throw new HttpException('Wrong password', HttpStatus.UNAUTHORIZED);

    const tokens = await this.getTokens(user.id, user.login);
    await this.updateRefreshToken(user.id, tokens.refreshToken);
    return { userData: { id: user.id, avatarUrl: user.avatarUrl }, tokens };
  }

  async logout(userId: number): Promise<void> {
    await this.usersService.setRefreshToken(userId, null);
  }

  async refreshTokens(userId: number, refreshToken: string): Promise<Tokens> {
    const user: User = await this.usersService.findById(userId);
    const userToken: string = await this.usersService.getRefreshToken(userId);
    const isTokensMatch = bcrypt.compareSync(refreshToken, userToken);
    if (!isTokensMatch)
      throw new HttpException('Wrong refresh token', HttpStatus.FORBIDDEN);
    const tokens: Tokens = await this.getTokens(user.id, user.login);
    await this.updateRefreshToken(user.id, tokens.refreshToken);
    return tokens;
  }

  async updateRefreshToken(
    userId: number,
    refreshToken: string,
  ): Promise<void> {
    await this.usersService.setRefreshToken(userId, refreshToken);
  }

  private async getTokens(userId: number, username: string): Promise<Tokens> {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: userId,
          username,
          type: 'access',
        },
        {
          secret: process.env.JWT_SECRET,
          expiresIn: '15m',
        },
      ),
      this.jwtService.signAsync(
        {
          sub: userId,
          username,
          type: 'refresh',
        },
        {
          secret: process.env.JWT_SECRET,
          expiresIn: '7d',
        },
      ),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }
}
