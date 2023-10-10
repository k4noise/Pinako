import { ArtworksService } from './artworks.service';
import { Artwork } from './entities/artwork.entity';
import { DataSource, Repository } from 'typeorm';
import { sqliteDataSource } from '../sqlite-source';
import { UsersService } from '../users/users.service';
import { User } from '../users/entities/user.entity';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { AuthUserDto } from '../auth/dto/auth.dto';
import { CreateArtworkDto } from './dto/create-artwork.dto';
import { UpdateArtworkDto } from './dto/update-artwork.dto';

describe('ArtworksService', () => {
  const WRONG_USER_ID = 10;
  const NO_EXIST_USER_ERROR = "User don't exists";
  const TEST_USER: CreateUserDto | AuthUserDto = {
    login: 'test',
    password: 'test',
  };
  const TEST_USER_ID = 1;

  const NO_EXIST_ARTWORK_ERROR = "Artwork don't exists";
  const WRONG_ARTWORK_ID = 10;
  let existingArtworkId: number;

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
    await usersService.create(TEST_USER);

    return dataSource;
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create artwork', () => {
    const createArtworkDto: CreateArtworkDto = {
      picture: 'path/to/picture',
      title: 'title',
      description: 'description',
    };

    it('existing user', async () => {
      jest.spyOn(service, 'create');
      existingArtworkId = await service.create(TEST_USER_ID, createArtworkDto);
      const userData = await usersService.findById(TEST_USER_ID);

      expect(service.create).toHaveBeenCalledWith(
        TEST_USER_ID,
        createArtworkDto,
      );
      expect(userData.artworks).toContain(`${existingArtworkId}`);
    });

    it('non-existing user', async () => {
      await expect(
        service.create(WRONG_USER_ID, createArtworkDto),
      ).rejects.toThrowError(NO_EXIST_USER_ERROR);
    });
  });

  describe('get artwork', () => {
    it('existing artwork', async () => {
      const createArtworkDto: CreateArtworkDto = {
        picture: 'path/to/image',
        title: 'title',
        description: 'description',
      };
      const id = await service.create(TEST_USER_ID, createArtworkDto);
      const expectedArtworkData: Artwork = {
        ...createArtworkDto,
        id: existingArtworkId + 1,
        likes: 0,
        views: 0,
        author: await usersService.findById(TEST_USER_ID),
      };

      jest.spyOn(service, 'get');
      const artworkData = await service.get(id);
      expect(service.get).toHaveBeenCalledWith(id);
      expect(artworkData).toEqual(expectedArtworkData);
    });

    it('non-existing artwork', async () => {
      await expect(service.get(WRONG_ARTWORK_ID)).rejects.toThrowError(
        NO_EXIST_ARTWORK_ERROR,
      );
    });
  });

  describe('update artwork', () => {
    it('existing artwork', async () => {
      const oldArtworkData = await service.get(existingArtworkId);
      const updateArtworkDto: UpdateArtworkDto = {
        id: existingArtworkId,
        title: 'new title',
      };
      const expectedArtworkData = { ...oldArtworkData, ...updateArtworkDto };

      jest.spyOn(service, 'update');
      await service.update(updateArtworkDto);
      const newArtworkData = await service.get(existingArtworkId);

      expect(service.update).toHaveBeenCalledWith(updateArtworkDto);
      expect(oldArtworkData).not.toEqual(newArtworkData);
      expect(expectedArtworkData).toEqual(newArtworkData);
    });

    it('non-existing artwork', async () => {
      const updateArtworkDto: UpdateArtworkDto = {
        id: WRONG_ARTWORK_ID,
      };
      await expect(service.update(updateArtworkDto)).rejects.toThrow(
        NO_EXIST_ARTWORK_ERROR,
      );
    });

    describe('remove artwork', () => {
      it('existing artwork', async () => {
        jest.spyOn(service, 'remove');
        await service.remove(existingArtworkId);

        expect(service.remove).toHaveBeenCalledWith(existingArtworkId);
        await expect(service.get(existingArtworkId)).rejects.toThrowError(
          NO_EXIST_ARTWORK_ERROR,
        );
      });

      it('non-existing artwork', async () => {
        await expect(service.remove(WRONG_ARTWORK_ID)).rejects.toThrowError(
          NO_EXIST_ARTWORK_ERROR,
        );
      });
    });
  });

  afterAll(async () => {
    await dataSource.destroy();
  });
});
