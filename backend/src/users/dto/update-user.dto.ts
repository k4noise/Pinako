import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsOptional()
  displayName?: string;

  @IsString()
  @IsOptional()
  about?: string;

  @IsString()
  @IsOptional()
  avatarUrl?: string;

  @IsString()
  @IsOptional()
  newPassword?: string;
}
