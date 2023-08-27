import { CreateUserDto } from '../../users/dto/create-user.dto';
import { AuthUserDto } from '../dto/auth.dto';
import { Tokens } from '../types/tokens';

export interface IAuthService {
  register(createUserDto: CreateUserDto): Promise<number>;
  login(authData: AuthUserDto);
  logout(userId: number): Promise<void>;
  refreshTokens(userId: number, refreshToken: string): Promise<Tokens>;
  updateRefreshToken(userId: number, refreshToken: string): Promise<void>;
}
