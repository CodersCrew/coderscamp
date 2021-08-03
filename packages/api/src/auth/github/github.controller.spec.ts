import { INestApplication, InternalServerErrorException } from '@nestjs/common';
import { Test } from '@nestjs/testing';

import { env } from '@/common/env';

import type { RegisteredUserDTO } from '../../../../shared/src/models/user';
import { UserRepositoryService } from '../../contracts/user.repository.service';
import { MemoryDbService } from '../../memoryDB/memoryDB.service';
import { PgMemUserRepositoryAdapter } from '../../memoryDB/user.repository.service';
import { UsersRepository } from '../../users/users.repository';
import { UsersService } from '../../users/users.service';
import { JWTModule } from '../jwtStrategy/jwt.module';
import { JwtStrategy } from '../jwtStrategy/jwt.strategy';
import { GithubClient } from './github.client';
import { GithubController } from './github.controller';
import { GithubUserData } from './github.model';

describe('Github controller', () => {
  let app: INestApplication;
  let githubController: GithubController;
  let jwtStrategy: JwtStrategy;
  let repositoryService: UserRepositoryService;
  let profile: RegisteredUserDTO;
  let githubUserData: GithubUserData;

  describe('githubOAuthCallback', () => {
    it('Should register user and return token.', async () => {
      expect(
        await githubController.githubOAuthCallback({
          user: githubUserData,
        } as Request & { user: GithubUserData }),
      ).toMatchObject({ accessToken: jwtStrategy.generateToken(profile), profile });
    });

    it('Should return user token and user data if user exists in database.', async () => {
      expect(
        await githubController.githubOAuthCallback({
          user: githubUserData,
        } as Request & { user: GithubUserData }),
      ).toMatchObject({ accessToken: jwtStrategy.generateToken(profile), profile });
    });

    it('Should throw internal server error if user do not exist and can not be created', async () => {
      repositoryService.findByGithubId = jest.fn().mockImplementationOnce(() => Promise.resolve(null));
      repositoryService.create = jest.fn().mockImplementationOnce(() => Promise.resolve(null));

      await expect(
        githubController.githubOAuthCallback({
          user: githubUserData,
        } as Request & { user: GithubUserData }),
      ).rejects.toThrow(InternalServerErrorException);
    });
  });

  async function setup() {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    env;

    const module = await Test.createTestingModule({
      imports: [JWTModule],
      controllers: [GithubController],
      providers: [
        MemoryDbService,
        {
          provide: UserRepositoryService,
          useClass: PgMemUserRepositoryAdapter,
        },
        UsersRepository,
        UsersService,
        GithubClient,
        JwtStrategy,
      ],
      exports: [JwtStrategy],
    }).compile();

    app = module.createNestApplication();
    jwtStrategy = await module.resolve(JwtStrategy);
    githubController = await module.resolve(GithubController);
    repositoryService = await module.resolve(UserRepositoryService);

    const db = app.get<MemoryDbService>(MemoryDbService);

    await Promise.all([db.migrate(), app.init()]);

    githubUserData = {
      githubId: 22222222,
      fullName: 'Name',
      email: 'example@test.com',
      image: 'https://photo-url.com',
    };

    profile = {
      id: 1,
      fullName: 'Name',
      githubId: 22222222,
      email: 'example@test.com',
      image: 'https://photo-url.com',
    };
  }

  beforeAll(async () => {
    await setup();
  });

  afterAll(async () => {
    await app.close();
  });
});
