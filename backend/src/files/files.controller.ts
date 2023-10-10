import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  Get,
  Param,
  Res,
  Logger,
} from '@nestjs/common';
import { Public } from '../shared/decorators/public.decorator';
import { FilesService } from './files.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { IFilesController } from './interfaces/IFilesController';

@Controller('upload')
export class FilesController implements IFilesController {
  private readonly logger = new Logger(FilesController.name);

  constructor(private readonly filesService: FilesService) {}

  @Post()
  @UseInterceptors(FileInterceptor('picture'))
  async saveFile(
    @UploadedFile() picture: Express.Multer.File,
  ): Promise<{ url: string }> {
    const { url } = await this.filesService.save(picture);
    const savedFileName = url.substring(url.lastIndexOf('/') + 1);
    this.logger.verbose(`Saved file with name ${savedFileName}.png`);
    return { url };
  }

  @Public()
  @Get(':path')
  getPicture(@Param('path') path: string, @Res() res: Response): void {
    const correctPath: string = this.filesService.getCorrectFilePath(path);
    res.sendFile(correctPath);
  }
}
