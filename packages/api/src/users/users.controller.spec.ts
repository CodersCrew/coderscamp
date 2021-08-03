import { BadRequestException, INestApplication, NotFoundException } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';

import type { UserSurveyDTO } from '../../../shared/src/models/user';
import { UserRepositoryService } from '../contracts/user.repository.service';
import { MemoryDbService } from '../memoryDB/memoryDB.service';
import { PgMemUserRepositoryAdapter } from '../memoryDB/user.repository.service';
import { UserFactory } from './user.factory';
import { UsersController } from './users.controller';
import { CommandHandlers, EventHandlers } from './users.module';
import { UsersRepository } from './users.repository';
import { UsersService } from './users.service';

describe('Users controller', () => {
  let app: INestApplication;
  let usersController: UsersController;
  let userSurvey: UserSurveyDTO;
  // let repository: UserRepositoryService;

  describe('saveUserSurvey', () => {
    it('Should update user and create UserSurvey', async () => {
      expect(await usersController.saveUserSurvey(userSurvey)).toBeTruthy();
    });

    it('Should throw not found error if user does not exists', async () => {
      await expect(usersController.saveUserSurvey({ ...userSurvey, id: 99 })).rejects.toBeInstanceOf(NotFoundException);
    });

    it('Should throw bad request error if survey already exists', async () => {
      await expect(usersController.saveUserSurvey(userSurvey)).rejects.toBeInstanceOf(BadRequestException);
    });
  });

  async function setup() {
    const module = await Test.createTestingModule({
      imports: [CqrsModule],
      controllers: [UsersController],
      providers: [
        MemoryDbService,
        {
          provide: UserRepositoryService,
          useClass: PgMemUserRepositoryAdapter,
        },
        UserFactory,
        UsersRepository,
        UsersService,
        ...CommandHandlers,
        ...EventHandlers,
      ],
    }).compile();

    app = module.createNestApplication();
    usersController = app.get<UsersController>(UsersController);

    const db = app.get<MemoryDbService>(MemoryDbService);
    const repository = app.get<UserRepositoryService>(UserRepositoryService);

    await db.migrate();
    await repository.create({
      githubId: 12345678,
      fullName: 'Name',
      email: 'example@test.com',
      image: 'https://photo-url.com',
    });
    await app.init();

    userSurvey = {
      id: 1,
      githubId: 12345678,
      fullName: 'Albert Einstein',
      email: 'albert.einstein@gmail.com',
      image: 'https://avatars.githubusercontent.com/u/12345678?v=4',
      city: 'Wrocław',
      gender: 'male',
      birthYear: 1999,
      isStudent: false,
      Survey: {
        userId: 1,
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
  }

  beforeAll(async () => {
    await setup();
  });

  afterAll(async () => {
    await app.close();
  });
});
