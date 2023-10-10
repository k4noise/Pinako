import { Module } from '@nestjs/common';
import { ArtworksController } from './artworks.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Artwork } from './entities/artwork.entity';
import { ArtworksService } from './artworks.service';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Artwork]), UsersModule],
  providers: [ArtworksService],
  controllers: [ArtworksController],
})
export class ArtworksModule {}
