import {
  Controller,
  Post,
  Body,
  Res,
  Req,
  HttpCode,
  HttpStatus,
  Logger,
  HttpException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { AuthUserDto } from './dto/auth.dto';
import { Public } from '../shared/decorators/public.decorator';
import { GetUserId } from '../shared/decorators/getUserId.decorator';
import { Request, Response } from 'express';
import { IAuthController } from './interfaces/IAuthController';

const ACCESS_TOKEN_LIFE_TIME: number = 60 * 60 * 1000; //one hour
const REFRESH_TOKEN_LIFE_TIME: number = 7 * 24 * 60 * 60 * 1000; //one week

@Controller('auth')
export class AuthController implements IAuthController {
  private readonly logger = new Logger(AuthController.name);

  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('register')
  async register(@Body() createUserDto: CreateUserDto): Promise<void> {
    const userId = await this.authService.register(createUserDto);
    this.logger.verbose(`Created user with id ${userId}`);
  }

  @Public()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(
    @Body() data: AuthUserDto,
    @Res() response: Response,
  ): Promise<void> {
    const { userData, tokens } = await this.authService.login(data);
    response.cookie('accessToken', tokens.accessToken, {
      httpOnly: true,
      maxAge: ACCESS_TOKEN_LIFE_TIME,
    });
    response.cookie('refreshToken', tokens.refreshToken, {
      httpOnly: true,
      maxAge: REFRESH_TOKEN_LIFE_TIME,
    });
    response.send(userData);
    this.logger.verbose(`Logged user with id ${userData.id}`);
  }

  @Post('logout')
  async logout(
    @GetUserId() id: number,
    @Res() response: Response,
  ): Promise<void> {
    await this.authService.logout(id);
    response.clearCookie('accessToken');
    response.clearCookie('refreshToken');
    response.send();
    this.logger.verbose(`Logout user with id ${id}`);
  }

  @Public()
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  async refreshTokens(
    @GetUserId() id: number,
    @Req() request: Request,
    @Res() response: Response,
  ): Promise<void> {
    const data = await this.authService.refreshTokens(
      id,
      request.cookies.refreshToken,
    );
    response.cookie('accessToken', data.accessToken, { httpOnly: true });
    response.cookie('refreshToken', data.refreshToken, { httpOnly: true });
    response.send();
  }
}
