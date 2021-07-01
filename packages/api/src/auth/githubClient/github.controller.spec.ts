import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';

import type { User } from '../../../../shared/src/models/user';
import { PrismaService } from '../../prisma/prisma.service';
import { UsersService } from '../../users/users.service';
import { JWTModule } from '../jwtStrategy/jwt.module';
import { JwtStrategy } from '../jwtStrategy/jwt.strategy';
import { GithubClient } from './github.client';
import { GithubController } from './github.controller';
import { GithubUserData } from './github.model';

const profile: User = {
  id: 1,
  fullName: 'Name',
  githubId: 22222222,
  email: 'example@test.com',
  image: 'https://photo-url.com',
};

const githubUserData = {
  githubId: 22222222,
  fullName: 'Name',
  email: 'example@test.com',
  image: 'https://photo-url.com',
};

const mockPrismaService = {
  user: {
    findUnique: jest.fn().mockImplementation(() => Promise.resolve(profile)),
    create: jest.fn().mockImplementation(() => Promise.resolve(profile)),
  },
};

describe('Github controller', () => {
  let app: INestApplication;
  let githubController: GithubController;
  let jwtStrategy: JwtStrategy;
  let prismaService: PrismaService & typeof mockPrismaService;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [JWTModule],
      controllers: [GithubController],
      providers: [
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
        UsersService,
        GithubClient,
        JwtStrategy,
      ],
    }).compile();

    app = module.createNestApplication();
    githubController = module.get<GithubController>('GithubController');
    prismaService = module.get<PrismaService & typeof mockPrismaService>('PrismaService');
    jwtStrategy = module.get<JwtStrategy>('JwtStrategy');
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });
  describe('auth/github/callback', () => {
    it('Should create user in database and return token with user data.', async () => {
      prismaService.user.findUnique = jest.fn().mockImplementationOnce(() => Promise.resolve(null));
      await expect(
        githubController.githubOAuthCallback({
          user: githubUserData,
        } as Request & { user: GithubUserData }),
      ).resolves.toEqual({ accessToken: jwtStrategy.generateToken(profile), profile });
      expect(prismaService.user.create.mock.calls.length).toBe(1);
    });

    it('Should return user token and user data if user is exists in database.', async () => {
      await expect(
        githubController.githubOAuthCallback({
          user: githubUserData,
        } as Request & { user: GithubUserData }),
      ).resolves.toEqual({ accessToken: jwtStrategy.generateToken(profile), profile });
    });
  });
});
