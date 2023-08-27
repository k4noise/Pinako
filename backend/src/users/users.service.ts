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

  async create(createUserDto: CreateUserDto): Promise<number> {
    const userData: User = await this.findByLogin(createUserDto.login);
    if (userData) throw new HttpException('Login exists', HttpStatus.CONFLICT);

    const user = new User();
    user.login = createUserDto.login;
    user.displayName = createUserDto.login;
    user.password = await bcrypt.hash(createUserDto.password, 10);

    const createdUser = await this.UserRepository.save(user);
    return createdUser.id;
  }

  async findAll(): Promise<User[]> {
    return await this.UserRepository.find();
  }

  async findById(id: number): Promise<User> {
    return await this.validateUser(id);
  }

  async findByLogin(login: string): Promise<User> {
    return await this.UserRepository.findOne({
      where: {
        login,
      },
    });
  }

  async getUserPassword(id: number): Promise<string> {
    await this.validateUser(id);
    const userData = await this.UserRepository.createQueryBuilder('users')
      .select('users.password')
      .where('users.id = :id', { id })
      .getOne();
    return userData.password;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<void> {
    let user: User = await this.validateUser(id);
    let userPassword = await this.getUserPassword(id);
    const isPasswordsMatch: boolean = await bcrypt.compare(
      updateUserDto.password,
      userPassword,
    );

    if (!isPasswordsMatch)
      throw new HttpException('Wrong password', HttpStatus.UNAUTHORIZED);
    userPassword = updateUserDto['newPassword'] ?? updateUserDto.password;
    user.password = bcrypt.hashSync(userPassword, 10);
    delete updateUserDto.password;
    delete updateUserDto.newPassword;

    user = { ...user, ...updateUserDto };
    await this.UserRepository.save(user);
  }

  async remove(id: number): Promise<void> {
    const user = await this.validateUser(id);
    await this.UserRepository.remove(user);
  }

  async setRefreshToken(id: number, refreshToken: string): Promise<void> {
    await this.validateUser(id);
    if (refreshToken) refreshToken = bcrypt.hashSync(refreshToken, 10);
    await this.UserRepository.createQueryBuilder('users')
      .update(User)
      .set({ refreshToken })
      .where('id = :id', { id })
      .execute();
  }

  async getRefreshToken(id: number): Promise<string> {
    await this.validateUser(id);
    const userData = await this.UserRepository.createQueryBuilder('users')
      .select('users.refreshToken')
      .where('users.id = :id', { id })
      .getOne();
    return userData?.refreshToken ?? null;
  }

  private async validateUser(id: number) {
    const userData: User = await this.UserRepository.findOne({
      where: {
        id,
      },
    });
    if (!userData || id === undefined)
      throw new HttpException("User don't exists", HttpStatus.CONFLICT);
    return userData;
  }
}
