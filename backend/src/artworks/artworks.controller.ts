import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ArtworksService } from './artworks.service';
import { Public } from '../shared/decorators/public.decorator';
import { CreateArtworkDto } from './dto/create-artwork.dto';
import { UpdateArtworkDto } from './dto/update-artwork.dto';
import { GetUserId } from '../shared/decorators/getUserId.decorator';
import { IArtworkController } from './interfaces/IArtworkController';
import { Artwork } from './entities/artwork.entity';

@Controller('artworks')
export class ArtworksController implements IArtworkController {
  private readonly logger = new Logger(ArtworksController.name);

  constructor(private artworkService: ArtworksService) {}

  @Post('create')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async create(
    @GetUserId() id: number,
    @Body() createArtworkDto: CreateArtworkDto,
  ): Promise<{ id: number }> {
    const artId = await this.artworkService.create(id, createArtworkDto);
    this.logger.verbose(`Added new artwork with id ${artId}`);
    return { id: artId };
  }

  @Public()
  @Get(':id')
  async get(@Param('id', ParseIntPipe) id: number): Promise<Artwork> {
    return await this.artworkService.get(id);
  }

  @Patch('update')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async update(@Body() updateArtworkDto: UpdateArtworkDto): Promise<void> {
    await this.artworkService.update(updateArtworkDto);
    this.logger.verbose(`Updated artwork with id ${updateArtworkDto.id}`);
  }

  @Delete('delete/:id')
  async remove(@Param() id: number): Promise<void> {
    await this.artworkService.remove(id);
    this.logger.verbose(`Deleted artwork with id ${id}`);
  }
}
