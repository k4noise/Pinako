import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { AppService } from './app.service';
import { UsersController } from './users/users.controller';
import { UsersModule } from './users/users.module';
import { typeormSettings } from './data-source';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeormSettings as TypeOrmModuleOptions),
    UsersModule,
  ],
  controllers: [AppController, UsersController],
  providers: [AppService],
})
export class AppModule {}
