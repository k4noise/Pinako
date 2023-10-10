import { Response } from 'express';

export interface IFilesController {
  saveFile(picture: Express.Multer.File): Promise<{ url: string }>;
  getPicture(path: string, res: Response): void;
}
