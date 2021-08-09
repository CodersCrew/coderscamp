import { BadRequestException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { SurveyRepository } from 'src/surveys/survey.repository';

import { SurveyErrorMessage } from '@coderscamp/shared/errors/survey.errors';
import { Survey } from '@coderscamp/shared/models/survey';

import { SaveSurveyCommand } from '../save-survey.command';

@CommandHandler(SaveSurveyCommand)
export class SaveSurveyHandler implements ICommandHandler<SaveSurveyCommand> {
  constructor(private surveyRepository: SurveyRepository) {}

  async execute({ input }: SaveSurveyCommand): Promise<Survey> {
    const surveyFromDb = await this.surveyRepository.findByUserId(input.userId);

    if (surveyFromDb) throw new BadRequestException(SurveyErrorMessage.SURVEY_ALREADY_FILLED);

    return this.surveyRepository.save(input);
  }
}
