import { ArtworksController } from './artworks.controller';
import { ArtworksService } from './artworks.service';
import { UsersService } from '../users/users.service';
import { DataSource, Repository } from 'typeorm';
import { sqliteDataSource } from '../sqlite-source';
import { Artwork } from './entities/artwork.entity';
import { User } from '../users/entities/user.entity';
import { CreateArtworkDto } from './dto/create-artwork.dto';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UpdateArtworkDto } from './dto/update-artwork.dto';

describe('ArtworksController', () => {
  const TEST_USER: CreateUserDto = {
    login: 'test',
    password: 'test',
  };
  const TEST_USER_ID = 1;

  let controller: ArtworksController;
  let service: ArtworksService;
  let usersService: UsersService;
  const testConnectionName = 'testArtworkService';
  const dataSource: DataSource = new DataSource({
    ...sqliteDataSource,
    type: 'sqlite',
    entities: [Artwork, User],
    name: testConnectionName,
  });

  beforeAll(async () => {
    await dataSource.initialize();
    const artworkRepository: Repository<Artwork> =
      dataSource.getRepository(Artwork);
    const usersRepository: Repository<User> = dataSource.getRepository(User);
    usersService = new UsersService(usersRepository);
    service = new ArtworksService(artworkRepository, usersService);
    controller = new ArtworksController(service);
    await usersService.create(TEST_USER);

    return dataSource;
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('create artwork', async () => {
    const createArtworkDto: CreateArtworkDto = {
      picture: 'path/to/picture',
      title: 'title',
      description: 'description',
    };

    jest.spyOn(controller, 'create');
    const { id } = await controller.create(TEST_USER_ID, createArtworkDto);

    const expectedArtworkData: Artwork = {
      ...createArtworkDto,
      id: 1,
      likes: 0,
      views: 0,
      author: await usersService.findById(TEST_USER_ID),
    };
    const createdArtwork = await service.get(id);

    expect(controller.create).toHaveBeenCalledWith(
      TEST_USER_ID,
      createArtworkDto,
    );
    expect(createdArtwork).toEqual(expectedArtworkData);
  });

  it('get artwork', async () => {
    const createArtworkDto: CreateArtworkDto = {
      picture: 'path/to/image',
      title: 'new image',
      description: 'new description',
    };
    const userData = await usersService.findById(TEST_USER_ID);
    const artworkId = await service.create(TEST_USER_ID, createArtworkDto);

    jest.spyOn(controller, 'get');
    const artworkData: Artwork = await controller.get(artworkId);
    const expectedArtworkData: Artwork = {
      ...createArtworkDto,
      id: userData.artworks.length + 1,
      likes: 0,
      views: 0,
      author: await usersService.findById(TEST_USER_ID),
    };

    expect(controller.get).toHaveBeenCalledWith(artworkId);
    expect(artworkData).toEqual(expectedArtworkData);
  });

  it('update artwork', async () => {
    const user = await usersService.findById(TEST_USER_ID);
    const artworkId = user.artworks[0];
    const oldArtworkData = await service.get(artworkId);
    const updateArtworkDto: UpdateArtworkDto = {
      id: user.artworks.length,
      title: 'new super title',
    };
    const expectedArtworkData: Artwork = {
      ...oldArtworkData,
      ...updateArtworkDto,
    };

    jest.spyOn(controller, 'update');
    await controller.update(updateArtworkDto);
    const updatedArtworkData = await service.get(artworkId);

    expect(controller.update).toHaveBeenCalledWith(updateArtworkDto);
    expect(updatedArtworkData).toEqual(expectedArtworkData);
  });

  it('delete artwork', async () => {
    const user = await usersService.findById(TEST_USER_ID);
    const artworkId = user.artworks[0];

    jest.spyOn(controller, 'remove');
    await controller.remove(artworkId);

    expect(controller.remove).toHaveBeenCalledWith(artworkId);
    await expect(service.get(artworkId)).rejects.toThrowError(
      "Artwork don't exists",
    );
  });
});
