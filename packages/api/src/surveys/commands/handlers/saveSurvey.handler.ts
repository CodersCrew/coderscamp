import { BadRequestException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { SurveyErrorMessage } from '@coderscamp/shared/api';
import type { Survey } from '@coderscamp/shared/models';

import { SurveyRepository } from '../../survey.repository';
import { SaveFilledSurveyCommand } from '../saveSurvey.command';

@CommandHandler(SaveFilledSurveyCommand)
export class SaveFilledSurveyHandler implements ICommandHandler<SaveFilledSurveyCommand, Survey> {
  constructor(private surveyRepository: SurveyRepository) {}

  async execute({ input }: SaveFilledSurveyCommand): Promise<Survey> {
    const surveyFromDb = await this.surveyRepository.findSurveyByUserId(input.userId);

    if (surveyFromDb) throw new BadRequestException(SurveyErrorMessage.SURVEY_ALREADY_FILLED);

    return this.surveyRepository.save(input);
  }
}
