import { BadRequestException } from '@nestjs/common';
import { Test } from '@nestjs/testing';

import { SurveyErrorMessage } from '@coderscamp/shared/api';
import type { Survey, User } from '@coderscamp/shared/models';

import { UsersService } from '../users/users.service';
import { SurveyRepository } from './survey.repository';
import { SurveyService } from './survey.service';
import { UserSurveyUpdateData } from './types';

describe('Survey Service', () => {
  let usersService: UsersService;
  let surveyService: SurveyService;
  let surveyRepository: SurveyRepository;
  let userSurveyData: UserSurveyUpdateData;
  let user: User;
  let survey: Survey;

  describe('saveUserSurvey', () => {
    it('returns updated user and survey', async () => {
      surveyRepository.findByUserId = jest.fn().mockResolvedValueOnce(null);
      surveyRepository.save = jest.fn().mockResolvedValueOnce(survey);
      usersService.update = jest.fn().mockResolvedValueOnce(user);

      const result = await surveyService.saveUserSurvey(userSurveyData);

      expect(result).toEqual([user, survey]);
    });

    it('Throws error if survey is already filled', async () => {
      surveyRepository.findByUserId = jest.fn().mockResolvedValueOnce(survey);

      const result = surveyService.saveUserSurvey(userSurveyData);

      await expect(result).rejects.toThrow(new BadRequestException(SurveyErrorMessage.SURVEY_ALREADY_FILLED));
    });
  });

  async function setup() {
    const module = await Test.createTestingModule({
      providers: [
        { provide: UsersService, useValue: { update: jest.fn() } },
        { provide: SurveyRepository, useValue: { save: jest.fn() } },
        SurveyService,
      ],
    }).compile();

    const app = await module.createNestApplication();

    usersService = app.get<UsersService>(UsersService);
    surveyService = app.get<SurveyService>(SurveyService);
    surveyRepository = app.get<SurveyRepository>(SurveyRepository);

    await app.init();

    user = {
      id: 123,
      fullName: 'Albert Einstein',
      githubId: 123,
      email: 'albert.einstein@gmail.com',
      town: 'Wrocław',
      gender: 'male',
      birthYear: 1999,
      educationStatus: 'Tak, studiuję',
      image: 'https://url-toImage.jpg',
    };

    survey = {
      userId: 123,
      description: 'description',
      prevParticipation: 'Nie',
      reasonForRetakingCourse: null,
      expectations: 'expectations',
      experience: 'experience',
      reasonToAccept: 'uniques',
      plans: 'plans',
      absencePeriod: 'yes',
      averageTime: 20,
      associatedWords: ['coders', 'camp'],
      courseInformationSource: ['fb'],
      marketingAccept: true,
    };

    userSurveyData = { Survey: survey, ...user };
  }

  beforeEach(async () => {
    await setup();
  });
});
