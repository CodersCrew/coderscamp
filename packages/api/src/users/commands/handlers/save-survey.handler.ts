import { BadRequestException, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { User } from '@coderscamp/shared/models/user';

import { ErrorMessage } from '../../error';
import { UsersRepository } from '../../users.repository';
import { SaveSurveyCommand } from '../save-survey.command';

@CommandHandler(SaveSurveyCommand)
export class SaveSurveyHandler implements ICommandHandler<SaveSurveyCommand> {
  constructor(private repository: UsersRepository) {}

  async execute({ input }: SaveSurveyCommand): Promise<User> {
    const userFromDb = await this.repository.getUser(input.id);

    if (!userFromDb) throw new NotFoundException(ErrorMessage.USER_NOT_FOUND);

    if (userFromDb.Survey) throw new BadRequestException(ErrorMessage.SURVEY_ALREADY_FILLED);

    return this.repository.saveSurvey(input);
  }
}
