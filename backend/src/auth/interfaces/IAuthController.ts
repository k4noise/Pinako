import { Request, Response } from 'express';
import { CreateUserDto } from '../../users/dto/create-user.dto';
import { AuthUserDto } from '../dto/auth.dto';

export interface IAuthController {
  register(createUserDto: CreateUserDto): Promise<void>;
  login(data: AuthUserDto, response: Response): Promise<void>;
  logout(id: number, response: Response): Promise<void>;
  refreshTokens(
    id: number,
    request: Request,
    response: Response,
  ): Promise<void>;
}
