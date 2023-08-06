import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';

export interface IUsersService {
  create(createUserDto: CreateUserDto);
  findAll();
  findOne(id: number);
  update(id: number, updateUserDto: UpdateUserDto);
  remove(id: number);
}
