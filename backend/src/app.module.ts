import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { AppService } from './app.service';
import { UsersController } from './users/users.controller';
import { UsersModule } from './users/users.module';
import { typeormSettings } from './data-source';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { AccessTokenGuard } from './shared/guards/AccessToken.guard';
import { APP_GUARD } from '@nestjs/core';
import { ArtworkService } from './artwork/artwork.service';
import { ArtworkController } from './artwork/artwork.controller';
import { ArtworkModule } from './artwork/artwork.module';
import { FilesService } from './files/files.service';
import { FilesController } from './files/files.controller';
import { FilesModule } from './files/files.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeormSettings as TypeOrmModuleOptions),
    ConfigModule.forRoot(),
    UsersModule,
    AuthModule,
    ArtworkModule,
    FilesModule,
  ],
  controllers: [
    AppController,
    UsersController,
    ArtworkController,
    FilesController,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AccessTokenGuard,
    },
    AppService,
    ArtworkService,
    FilesService,
  ],
})
export class AppModule {}
