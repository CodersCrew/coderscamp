import { BadRequestException, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { SurveyRepository } from 'src/surveys/survey.repository';
import { UsersRepository } from 'src/users/users.repository';

import { ErrorMessage } from '@coderscamp/shared/errors/error';
import { Survey } from '@coderscamp/shared/models/user';

import { SaveSurveyCommand } from '../save-survey.command';

@CommandHandler(SaveSurveyCommand)
export class SaveSurveyHandler implements ICommandHandler<SaveSurveyCommand> {
  constructor(private surveyRepository: SurveyRepository, private userRepository: UsersRepository) {}

  async execute({ input }: SaveSurveyCommand): Promise<Survey> {
    const userFromDb = await this.userRepository.getUser(input.userId);

    if (!userFromDb) throw new NotFoundException(ErrorMessage.USER_NOT_FOUND);

    if (userFromDb.Survey) throw new BadRequestException(ErrorMessage.SURVEY_ALREADY_FILLED);

    return this.surveyRepository.save(input);
  }
}
