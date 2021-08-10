import { BadRequestException, NotFoundException } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';
import { SurveyRepositoryPort } from 'src/contracts/survey.repository';
import { MemoryDbService } from 'src/memoryDB/memoryDB.service';

import { SurveyController } from './survey.controller';
import { SurveyRepository } from './survey.repository';

describe('Survey controller', () => {
  let app: INestApplication;
  let surveyController: SurveyController;

  describe('saveUserSurvey', () => {
    it('Should update user and create UserSurvey', async () => {
      expect(await surveyController.saveUserSurvey(userSurvey)).toBeTruthy();
    });

    it('Should throw not found error if user does not exists', async () => {
      await expect(surveyController.saveUserSurvey({ ...userSurvey, id: 99 })).rejects.toBeInstanceOf(
        NotFoundException,
      );
    });

    it('Should throw bad request error if survey already exists', async () => {
      await expect(surveyController.saveUserSurvey(userSurvey)).rejects.toBeInstanceOf(BadRequestException);
    });
  });

  async function setup() {
    const module = await Test.createTestingModule({
      imports: [CqrsModule],
      providers: [
        MemoryDbService,
        {
          provide: SurveyRepositoryPort,
          useClass: PgMemSurveyRepositoryAdapter,
        },
        SurveyRepository,
      ],
      controllers: [SurveyController],
    }).compile();

    app = module.createNestApplication();
    surveyController = app.get<SurveyController>(SurveyController);

    const db = app.get<MemoryDbService>(MemoryDbService);
    // const repository = app.get<UserRepositoryPort>(UserRepositoryPort);

    await Promise.all([app.init(), db.migrate()]);
  }

  beforeAll(async () => {
    await setup();
  });

  afterAll(async () => {
    await app.close();
  });
});

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
