import { BadRequestException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { SurveyErrorMessage } from '@coderscamp/shared/errors/survey.errors';
import type { Survey } from '@coderscamp/shared/models';

import { SurveyRepository } from '../../survey.repository';
import { SaveFilledSurveyCommand } from '../saveSurvey.command';

@CommandHandler(SaveFilledSurveyCommand)
export class SaveFilledSurveyHandler implements ICommandHandler<SaveFilledSurveyCommand, Survey> {
  constructor(private surveyRepository: SurveyRepository) {}

  async execute({ input }: SaveFilledSurveyCommand): Promise<Survey> {
    const surveyFromDb = await this.surveyRepository.findByUserId(input.userId);

    if (surveyFromDb) throw new BadRequestException(SurveyErrorMessage.SURVEY_ALREADY_FILLED);

    return this.surveyRepository.save(input);
  }
}
