import { BadRequestException, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { UserSurvey } from '@coderscamp/shared/models/user';

import { UsersRepository } from '../../users.repository';
import { SaveSurveyCommand } from '../save-survey.command';

@CommandHandler(SaveSurveyCommand)
export class RegisterHandler implements ICommandHandler<SaveSurveyCommand> {
  constructor(private repository: UsersRepository) {}

  async execute({ input: { UserSurvey: survey, ...user } }: SaveSurveyCommand): Promise<UserSurvey> {
    await this.repository.updateUser(user);
    const userFromDb = await this.repository.getUser(user.id);

    if (!userFromDb) throw new NotFoundException('User does not exists.');
    if (userFromDb.Survey) throw new BadRequestException('Survey already filled.');

    const userResult = this.repository.updateUser(user);
    const surveyResult = this.repository.saveSurvey(survey);

    return Promise.all([userResult, surveyResult]).then((results) => {
      return { ...results[0], UserSurvey: results[1] };
    });
  }
}
