import { PartialType } from '@nestjs/mapped-types';
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';
import { User } from '../entities/user.entity';

export class UpdateUserDto extends PartialType(User) {
  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsOptional()
  newPassword?: string;
}
