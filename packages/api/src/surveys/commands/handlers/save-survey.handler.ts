import { BadRequestException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { SurveyErrorMessage } from '@coderscamp/shared/errors/survey.errors';
import type { UserSurvey } from '@coderscamp/shared/models';

import { SurveyRepository } from '../../survey.repository';
import { SaveFilledSurveyCommand } from '../save-survey.command';

@CommandHandler(SaveFilledSurveyCommand)
export class SaveFilledSurveyHandler implements ICommandHandler<SaveFilledSurveyCommand> {
  constructor(private surveyRepository: SurveyRepository) {}

  async execute({ input }: SaveFilledSurveyCommand): Promise<UserSurvey> {
    const surveyFromDb = await this.surveyRepository.findByUserId(input.id);

    // ! Prisma blocks (throws error) attempts of saving survey if user does not exist
    // ? If we want to allow this behavior we need to update user and save survey separately

    if (surveyFromDb) throw new BadRequestException(SurveyErrorMessage.SURVEY_ALREADY_FILLED);

    return this.surveyRepository.saveAndUpdateRelatedUser(input);
  }
}
