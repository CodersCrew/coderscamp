import { INestApplication } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { Test } from '@nestjs/testing';

import { User } from '../../../shared/src/models/user';
import { PrismaService } from '../prisma/prisma.service';
import { ConfigService } from '../shared/config.service';
import { SharedModule } from '../shared/shared.module';
import { UsersService } from '../users/users.service';
import { AuthController } from './auth.controller';
import { GithubUserData } from './auth.model';
import { AuthService } from './auth.service';
import { GithubClient } from './strategies/github.client';

const profile: User = {
  id: 1,
  firstName: null,
  lastName: null,
  githubId: 22222222,
  email: 'example@test.com',
  image: 'https://photo-url.com',
};

const githubUserData = {
  githubId: 22222222,
  email: 'example@test.com',
  image: 'https://photo-url.com',
};

jest.mock('../prisma/prisma.service');
describe('AuthController', () => {
  let app: INestApplication;
  let authController: AuthController;
  let jwtService: JwtService;
  let prismaService: PrismaService;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [
        SharedModule,
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.registerAsync({
          imports: [SharedModule],
          inject: [ConfigService],
          useFactory: async (config: ConfigService) => {
            return config.jwtConfig;
          },
        }),
      ],
      controllers: [AuthController],
      providers: [
        {
          provide: PrismaService,
          useValue: {
            user: {
              findUnique: jest.fn().mockImplementation(() => Promise.resolve(profile)),
              create: jest.fn().mockImplementation(() => Promise.resolve(profile)),
            },
          },
        },
        ConfigService,
        UsersService,
        AuthService,
        GithubClient,
      ],
    }).compile();

    app = module.createNestApplication();
    authController = module.get<AuthController>('AuthController');
    prismaService = module.get<PrismaService>('PrismaService');
    jwtService = module.get<JwtService>('JwtService');
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });
  describe('auth/github/callback', () => {
    it('Should create user in database and return token with user data.', async () => {
      const { id, ...userProfile } = profile;

      prismaService.user.findUnique = jest.fn().mockImplementationOnce(() => Promise.resolve(null));
      await expect(
        authController.githubOAuthCallback({
          user: githubUserData,
        } as Request & { user: GithubUserData }),
      ).resolves.toEqual({ accessToken: jwtService.sign({ profile: userProfile, sub: id }), profile });
    });

    it('Should return user token and user data if user is exists in database.', async () => {
      const { id, ...userProfile } = profile;

      await expect(
        authController.githubOAuthCallback({
          user: githubUserData,
        } as Request & { user: GithubUserData }),
      ).resolves.toEqual({ accessToken: jwtService.sign({ profile: userProfile, sub: id }), profile });
    });
  });
});
