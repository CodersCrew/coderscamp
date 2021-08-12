import { BadRequestException, INestApplication } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';

import { SurveyErrorMessage } from '@coderscamp/shared/errors/survey.errors';
import { UserErrorMessage } from '@coderscamp/shared/errors/user.errors';
import { Survey, User, UserSurvey } from '@coderscamp/shared/models';

import { UpdateUserHandler } from '../users/commands';
import { UsersRepository } from '../users/users.repository';
import { SaveFilledSurveyHandler } from './commands';
import { SurveyController } from './survey.controller';
import { SurveyRepository } from './survey.repository';

describe('Survey controller', () => {
  let app: INestApplication;
  let surveyController: SurveyController;
  let userSurvey: UserSurvey;
  let user: User;
  let survey: Survey;
  let surveySaveHandler: SaveFilledSurveyHandler;
  let userUpdateHandler: UpdateUserHandler;

  describe('saveUserSurvey', () => {
    it('Should update user and create UserSurvey', async () => {
      const result = await surveyController.saveUserSurvey(userSurvey);

      expect(userUpdateHandler.execute).toBeCalledWith({ input: user });
      expect(surveySaveHandler.execute).toBeCalledWith({ input: survey });
      expect(result).toEqual({ message: 'Operation successful' });
    });

    it('Should throw not found error if user does not exists', async () => {
      userUpdateHandler.execute = jest
        .fn()
        .mockRejectedValueOnce(new BadRequestException(UserErrorMessage.USER_NOT_FOUND));

      await expect(surveyController.saveUserSurvey(userSurvey)).rejects.toEqual(
        new BadRequestException(UserErrorMessage.USER_NOT_FOUND),
      );
    });

    it('Should throw bad request error if survey already exists', async () => {
      surveySaveHandler.execute = jest
        .fn()
        .mockRejectedValueOnce(new BadRequestException(SurveyErrorMessage.SURVEY_ALREADY_FILLED));

      expect(userUpdateHandler.execute).toBeCalledWith({ input: user });
      await expect(surveyController.saveUserSurvey(userSurvey)).rejects.toEqual(
        new BadRequestException(SurveyErrorMessage.SURVEY_ALREADY_FILLED),
      );
    });
  });

  async function setup() {
    const surveyRepository: Partial<SurveyRepository> = {};
    const usersRepository: Partial<UsersRepository> = {};

    const module = await Test.createTestingModule({
      imports: [CqrsModule],
      providers: [
        { provide: UsersRepository, useValue: usersRepository },
        UpdateUserHandler,
        { provide: SurveyRepository, useValue: surveyRepository },
        SaveFilledSurveyHandler,
      ],
      controllers: [SurveyController],
    }).compile();

    app = module.createNestApplication();
    surveyController = app.get<SurveyController>(SurveyController);
    userUpdateHandler = app.get<UpdateUserHandler>(UpdateUserHandler);
    surveySaveHandler = app.get<SaveFilledSurveyHandler>(SaveFilledSurveyHandler);

    surveySaveHandler.execute = jest.fn().mockResolvedValue(survey);
    userUpdateHandler.execute = jest.fn().mockResolvedValue(user);

    user = {
      id: 'a234b',
      githubId: Math.floor(Math.random() * 1000),
      fullName: 'Albert Einstein',
      email: 'albert.einstein@gmail.com',
      image: 'https://avatars.githubusercontent.com/u/12345678?v=4',
      city: 'Wrocław',
      gender: 'male',
      birthYear: 1999,
      isStudent: false,
    };

    survey = {
      userId: 'a234b',
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
    };

    userSurvey = {
      ...user,
      Survey: survey,
    };

    await app.init();
  }

  beforeAll(async () => {
    await setup();
  });

  afterAll(async () => {
    await app.close();
  });
});
