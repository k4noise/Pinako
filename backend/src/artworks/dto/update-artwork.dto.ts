import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { CreateArtworkDto } from './create-artwork.dto';

export class UpdateArtworkDto extends PartialType(CreateArtworkDto) {
  @IsNumber()
  @IsNotEmpty()
  id: number;
}
