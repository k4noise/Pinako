import {
  Controller,
  Get,
  Param,
  ClassSerializerInterceptor,
  UseInterceptors,
  Patch,
  Body,
  Delete,
  Logger,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { IUsersController } from './interfaces/IUsersController';
import { Public } from '../shared/decorators/public.decorator';
import { GetUserId } from '../shared/decorators/getUserId.decorator';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Controller('users')
@UseInterceptors(ClassSerializerInterceptor)
export class UsersController implements IUsersController {
  private readonly logger = new Logger(UsersController.name);

  constructor(private readonly usersService: UsersService) {}

  @Public()
  @Get()
  async findAll(): Promise<User[]> {
    return await this.usersService.findAll();
  }

  @Public()
  @Get(':id')
  async findById(@Param('id') id: number): Promise<User> {
    return await this.usersService.findById(id);
  }

  @Patch('update')
  async update(
    @GetUserId() id: number,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<void> {
    await this.usersService.update(id, updateUserDto);
    this.logger.verbose(`Updated user data with id ${id}`);
  }

  @Delete('delete')
  async remove(@GetUserId() id: number): Promise<void> {
    await this.usersService.remove(id);
    this.logger.verbose(`Deleted user with id ${id}`);
  }
}
