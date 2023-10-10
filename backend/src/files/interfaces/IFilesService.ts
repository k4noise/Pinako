export interface IFilesService {
  save(picture: Express.Multer.File): Promise<{ url: string }>;
  getCorrectFilePath(filename: string): string;
}
