import { IsString, IsNotEmpty } from 'class-validator';

export class CreateArtworkDto {
  @IsString()
  @IsNotEmpty()
  picture: string;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;
}
