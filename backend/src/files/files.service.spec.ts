import { Test, TestingModule } from '@nestjs/testing';
import { FilesService } from './files.service';
import * as fs from 'fs';
import path = require('path');

describe('FilesService', () => {
  const PICTURE = fs.readFileSync(__dirname + '/testPicture.jpg');
  const MULTER_FILE = {
    fieldname: 'picture',
    originalname: 'testPicture',
    encoding: 'utf-8',
    mimetype: 'image/jpeg',
    size: PICTURE.length,
    buffer: PICTURE,
  } as Express.Multer.File;
  let service: FilesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FilesService],
    }).compile();

    service = module.get<FilesService>(FilesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('should save picture', () => {
    it('right file type', async () => {
      jest.spyOn(service, 'save');
      const { url } = await service.save(MULTER_FILE);
      expect(service.save).toHaveBeenCalledWith(MULTER_FILE);
      expect(url.startsWith('localhost/upload/')).toBeTruthy();
    });

    it('wrong file type', async () => {
      const wrongMulterFile = { ...MULTER_FILE, mimetype: 'text/js' };
      await expect(service.save(wrongMulterFile)).rejects.toThrowError(
        'Not a image',
      );
    });
  });

  describe('should get image path', () => {
    it('correct path', async () => {
      const { url: fullImagePath } = await service.save(MULTER_FILE);
      const imageFileName = fullImagePath.substring(
        fullImagePath.lastIndexOf('/') + 1,
      );
      const expectedImagePath =
        path.join(__dirname, '../../upload/', imageFileName) + '.png';

      jest.spyOn(service, 'getCorrectFilePath');
      const imagePath = service.getCorrectFilePath(imageFileName);
      expect(service.getCorrectFilePath).toHaveBeenCalledWith(imageFileName);
      expect(imagePath).toBe(expectedImagePath);
    });

    it('uncorrect path', () => {
      const unexistedImageName = 'test';
      expect(() => service.getCorrectFilePath(unexistedImageName)).toThrowError(
        'File not found',
      );
    });
  });
});
