import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { User } from '../entities/user.entity';

export interface IUsersService {
  create(createUserDto: CreateUserDto): Promise<number>;
  findAll(): Promise<User[]>;
  findById(id: number): Promise<User>;
  getUserPassword(id: number): Promise<string>;
  update(id: number, updateUserDto: UpdateUserDto): Promise<void>;
  remove(id: number): Promise<void>;
  setRefreshToken(id: number, refreshToken: string): Promise<void>;
  getRefreshToken(id: number): Promise<string>;
}
