import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { IUsersService } from './interfaces/IUsersService';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService implements IUsersService {
  constructor(
    @InjectRepository(User) private UserRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    if (await this.findByLogin(createUserDto.login))
      throw new HttpException('Login exists', HttpStatus.CONFLICT);

    const user = new User();
    user.login = createUserDto.login;
    user.displayName = createUserDto.login;
    user.about = '';
    user.password = await bcrypt.hash(createUserDto.password, 10);
    user.avatarUrl = '/default.jpg';
    const createdUser = await this.UserRepository.save(user);
    return {
      id: createdUser.id,
      avatarUrl: createdUser.avatarUrl,
    };
  }

  async findAll() {
    return await this.UserRepository.find();
  }

  async findOne(id: number) {
    const userData = await this.UserRepository.findOne({
      where: {
        id,
      },
    });
    if (userData === null)
      throw new HttpException("User don't exists", HttpStatus.CONFLICT);

    return userData;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<void> {
    let user = await this.findOne(id);
    user.password = await this.getUserPassword(id);
    const isPasswordsMatch: boolean = await bcrypt.compare(
      updateUserDto.password,
      user.password,
    );

    if (!isPasswordsMatch)
      throw new HttpException('Wrong password', HttpStatus.UNAUTHORIZED);
    delete updateUserDto.password;

    if (updateUserDto?.newPassword) {
      user.password = await bcrypt.hash(updateUserDto.newPassword, 10);
      delete updateUserDto.newPassword;
    }

    user = { ...user, ...updateUserDto };
    await this.UserRepository.save(user);
  }

  async remove(id: number): Promise<void> {
    const user = await this.findOne(id);
    await this.UserRepository.remove(user);
  }

  private async getUserPassword(id: number) {
    const userData = await this.UserRepository.createQueryBuilder('users')
      .select('users.password')
      .where('users.id = :id', { id })
      .getOne();
    return userData.password;
  }

  private async findByLogin(login: string) {
    return await this.UserRepository.findOne({
      where: {
        login,
      },
    });
  }
}
