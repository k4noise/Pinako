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

@Controller('upload')
export class FilesController {
  private readonly logger = new Logger(FilesController.name);

  constructor(private readonly filesService: FilesService) {}

  @Post()
  @UseInterceptors(FileInterceptor('picture'))
  async saveFile(@UploadedFile() picture: Express.Multer.File) {
    const { url } = await this.filesService.save(picture);
    const savedFileName = url.substring(url.lastIndexOf('/') + 1);
    this.logger.verbose(`Saved file with name ${savedFileName}.png`);
    return { url };
  }

  @Public()
  @Get(':path')
  async getPicture(@Param('path') path: string, @Res() res: Response) {
    const correctPath: string = await this.filesService.getCorrectFilePath(
      path,
    );
    res.sendFile(correctPath);
  }
}
