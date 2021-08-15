/* eslint-disable no-underscore-dangle */
import { Test } from '@nestjs/testing';
import httpMocks from 'node-mocks-http';

import { SurveyPostRequest } from '@coderscamp/shared/api';

import { SurveyController } from './survey.controller';
import { SurveyService } from './survey.service';

describe('Survey controller', () => {
  let controller: SurveyController;
  let surveyRequest: SurveyPostRequest;
  const userId = 1;

  describe('saveUserSurvey', () => {
    it('Returns void if request is Successful', async () => {
      const response = httpMocks.createResponse();

      const result = await controller.saveUserSurvey(surveyRequest, userId, response);

      expect(result).toBeUndefined();
    });

    it('Sends 204 code as a successful response', async () => {
      const response = httpMocks.createResponse();

      await controller.saveUserSurvey(surveyRequest, userId, response);

      expect(response._getStatusCode()).toBe(204);
    });
  });

  async function setup() {
    const module = await Test.createTestingModule({
      controllers: [SurveyController],
      providers: [{ provide: SurveyService, useValue: { saveUserSurvey: jest.fn() } }],
    }).compile();

    const app = await module.createNestApplication();

    controller = app.get<SurveyController>(SurveyController);

    await app.init();
  }

  beforeEach(async () => {
    await setup();
  });
});
