import { Test, TestingModule } from '@nestjs/testing';
import { FilesController } from './files.controller';
import { FilesService } from './files.service';
import * as httpMocks from 'node-mocks-http';
import * as fs from 'fs';

describe('FilesController', () => {
  const PICTURE = fs.readFileSync(__dirname + '/testPicture.jpg');
  const MULTER_FILE = {
    fieldname: 'picture',
    originalname: 'testPicture',
    encoding: 'utf-8',
    mimetype: 'image/jpeg',
    size: PICTURE.length,
    buffer: PICTURE,
  } as Express.Multer.File;
  let controller: FilesController;
  let service: FilesService;
  let existingImageUrl: string;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FilesService],
    }).compile();

    service = module.get<FilesService>(FilesService);
    controller = new FilesController(service);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should save file', async () => {
    jest.spyOn(controller, 'saveFile');
    const fileOptions = await controller.saveFile(MULTER_FILE);
    existingImageUrl = fileOptions.url;

    expect(controller.saveFile).toHaveBeenCalledWith(MULTER_FILE);
    expect(fileOptions.url.startsWith('localhost/upload/')).toBeTruthy();
  });

  it('should get picture', async () => {
    const imageName = existingImageUrl.substring(
      existingImageUrl.lastIndexOf('/') + 1,
    );
    const response = httpMocks.createResponse();
    response.sendFile = jest.fn().mockImplementation((path) => path);
    jest.spyOn(controller, 'getPicture');
    await controller.getPicture(imageName, response);

    const filePathToSend = (response.sendFile as jest.Mock).mock.calls[0][0];
    expect(controller.getPicture).toHaveBeenCalledWith(imageName, response);
    expect(service.getCorrectFilePath(imageName)).toBe(filePathToSend);
  });
});
