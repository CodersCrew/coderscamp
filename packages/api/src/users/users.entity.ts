import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';

import { UserSurvey } from '@coderscamp/shared/models/user';

import type { GithubUserData } from '../auth/github/github.model';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersEntity {
  constructor(private usersRepository: UsersRepository) {}

  async getByGithubId(id: number) {
    return this.usersRepository.getByGithubId(id);
  }

  async register(userData: GithubUserData) {
    return this.usersRepository.create(userData);
  }

  async completeSurvey(surveyData: UserSurvey): Promise<UserSurvey> {
    const { UserSurvey: survey, ...user } = surveyData;
    const userFromDb = await this.usersRepository.getUserRepresentationById(user.id);

    if (!userFromDb) throw new NotFoundException('User does not exists.');
    if (userFromDb.UserSurvey) throw new BadRequestException('Survey already filled.');

    const userResult = this.usersRepository.updateUser(user);
    const surveyResult = this.usersRepository.saveUserSurvey(survey, user.id);

    return Promise.all([userResult, surveyResult]).then((results) => {
      return { ...results[0], UserSurvey: results[1] };
    });
  }
}
