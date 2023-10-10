import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { createWriteStream } from 'fs';
import path = require('path');
import { v4 } from 'uuid';
import fs = require('fs');
import { IFilesService } from './interfaces/IFilesService';

@Injectable()
export class FilesService implements IFilesService {
  constructor(@Inject(REQUEST) private request: Request) {}

  async save(picture: Express.Multer.File): Promise<{ url: string }> {
    if (!picture.mimetype.startsWith('image'))
      throw new HttpException('Not a image', HttpStatus.UNSUPPORTED_MEDIA_TYPE);
    const filePath = `upload/${v4(picture.originalname)}`;
    const writeStream = createWriteStream(`${filePath}.png`);
    try {
      await new Promise((resolve, reject) => {
        writeStream.on('finish', () => resolve(true));
        writeStream.on('error', (error) => reject(error));
        writeStream.write(picture.buffer);
        writeStream.end();
      });
    } catch (error) {
      throw new HttpException(
        'Failed to save file',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    return { url: `${this.request?.hostname ?? 'localhost'}/${filePath}` };
  }

  getCorrectFilePath(fileName: string): string {
    const imagePath = path.join(__dirname, '../../upload/', fileName) + '.png';

    if (fs.existsSync(imagePath)) return imagePath;
    throw new HttpException('File not found', HttpStatus.NOT_FOUND);
  }
}
