import { CreateArtworkDto } from '../dto/create-artwork.dto';
import { UpdateArtworkDto } from '../dto/update-artwork.dto';
import { Artwork } from '../entities/artwork.entity';

export interface IArtrworkService {
  create(id: number, CreateArtworkDto: CreateArtworkDto): Promise<number>;
  get(id: number): Promise<Artwork>;
  update(updateArtworkDto: UpdateArtworkDto): Promise<void>;
  remove(id: number): Promise<void>;
}
