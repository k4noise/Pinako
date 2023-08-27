import { UpdateUserDto } from '../dto/update-user.dto';
import { User } from '../entities/user.entity';
export interface IUsersController {
  findAll(): Promise<User[]>;
  findById(id: number): Promise<User>;
  update(id: number, updateUserDto: UpdateUserDto): Promise<void>;
  remove(id: number): Promise<void>;
}
