import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';

import type { UserSurvey } from '../../../shared/src/models/user';
import { PrismaService } from '../prisma/prisma.service';
import { UsersController } from './users.controller';
import { UsersRepository } from './users.repository';
import { UsersEntity } from './users.service';

const userSurvey = {
  id: 1,
  githubId: 12345678,
  fullName: 'Albert Einstein',
  email: 'albert.einstein@gmail.com',
  image: 'https://avatars.githubusercontent.com/u/12345678?v=4',
  city: 'Wrocław',
  gender: 'male',
  birthYear: 1999,
  isStudent: false,
  UserSurvey: {
    description: 'description',
    alreadyTookCourse: false,
    reasonForRetakingCourse: null,
    expectations: 'expectations',
    experience: 'experience',
    uniques: 'uniques',
    plans: 'plans',
    unavailability: 'yes',
    averageTime: 20,
    associatedWords: ['coders', 'camp'],
    courseInformationSource: 'fb',
  },
};

const users: UserSurvey[] = [];

const mockPrismaService = {
  user: {
    findUnique: jest
      .fn()
      .mockImplementation((id: number) => Promise.resolve(users.find((user) => user.id === id) || null)),
    create: jest.fn().mockImplementation(() => Promise.resolve(profile)),
  },
};

describe('Users controller', () => {
  let app: INestApplication;
  let usersController: UsersController;
  let prismaService: PrismaService & typeof mockPrismaService;

  describe('saveUserSurvey', () => {
    it('Should update user and create UserSurvey', () => {
      usersController.saveUserSurvey();
    });
    it('Should throw bad request error if survey already exists', () => {});
    it('Should throw not found error if user does not exists', () => {});
  });

  async function setup() {
    const module = await Test.createTestingModule({
      imports: [],
      controllers: [UsersController],
      providers: [
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
        UsersRepository,
        UsersEntity,
      ],
    }).compile();

    app = module.createNestApplication();
    usersController = app.get<UsersController>(UsersController);
    prismaService = await module.resolve(PrismaService);
    await app.init();
  }

  beforeAll(async () => {
    await setup();
  });

  afterAll(async () => {
    await app.close();
  });
});
