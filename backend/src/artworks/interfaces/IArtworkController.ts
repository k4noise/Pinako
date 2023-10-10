import { CreateArtworkDto } from '../dto/create-artwork.dto';
import { UpdateArtworkDto } from '../dto/update-artwork.dto';
import { Artwork } from '../entities/artwork.entity';

export interface IArtworkController {
  create(
    id: number,
    createArtworkDto: CreateArtworkDto,
  ): Promise<{ id: number }>;
  get(id: number): Promise<Artwork>;
  update(updateArtworkDto: UpdateArtworkDto): Promise<void>;
  remove(id: number): Promise<void>;
}
