import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Artwork } from './entities/artwork.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateArtworkDto } from './dto/create-artwork.dto';
import { UpdateArtworkDto } from './dto/update-artwork.dto';
import { UsersService } from '../users/users.service';
import { IArtrworkService } from './interfaces/IArtworkService';

@Injectable()
export class ArtworksService implements IArtrworkService {
  constructor(
    @InjectRepository(Artwork) private artworkRepository: Repository<Artwork>,
    private usersService: UsersService,
  ) {}

  async create(
    id: number,
    createArtworkDto: CreateArtworkDto,
  ): Promise<number> {
    const author = await this.usersService.findById(id);
    const artwork = new Artwork();
    artwork.picture = createArtworkDto.picture;
    artwork.author = author;
    artwork.title = createArtworkDto.title;
    artwork.description = createArtworkDto.description;
    const savedArtwork = await this.artworkRepository.save(artwork);
    await this.usersService.saveArtworkId(id, savedArtwork.id);
    return savedArtwork.id;
  }

  async get(id: number): Promise<Artwork> {
    return this.validateArtwork(id);
  }

  async update(updateArtworkDto: UpdateArtworkDto): Promise<void> {
    const artwork = await this.validateArtwork(updateArtworkDto.id);
    const artworkWithNewData = { ...artwork, ...updateArtworkDto };
    await this.artworkRepository.save(artworkWithNewData);
  }

  async remove(id: number): Promise<void> {
    const artwork = await this.validateArtwork(id);
    await this.artworkRepository.remove(artwork);
  }

  private async validateArtwork(id: number) {
    const artworkData = await this.artworkRepository.findOne({
      where: {
        id,
      },
      relations: ['author'],
    });
    if (!artworkData)
      throw new HttpException("Artwork don't exists", HttpStatus.NOT_FOUND);
    return artworkData;
  }
}
