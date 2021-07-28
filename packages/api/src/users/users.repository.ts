import { Injectable } from '@nestjs/common';

import type { RegisteredUser, Survey, User, UserSurvey } from '@coderscamp/shared/models/user';

import type { GithubUserData } from '../auth/github/github.model';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(userData: GithubUserData): Promise<RegisteredUser> {
    return this.prisma.user.create({ data: userData });
  }

  async saveUserSurvey(survey: Survey, userId: number): Promise<Survey> {
    const data = this.prisma.userSurvey.create({
      data: { ...survey, user: { connect: { id: userId } } },
    });
    return data;
  }

  async getUserSurvey({ id }: User) {
    const data = this.prisma.userSurvey.findUnique({ where: { userId: id }, include: { user: true } });
    return data;
  }

  async getByGithubId(githubId: number): Promise<RegisteredUser | User | null> {
    return this.prisma.user.findUnique({ where: { githubId } });
  }

  async updateUser({ id, ...data }: User): Promise<User> {
    return this.prisma.user.update({ data, where: { id } }) as unknown as User;
  }

  async getUserRepresentationById(id: number): Promise<UserSurvey | (User & { UserSurvey: Survey | null }) | null> {
    return this.prisma.user.findUnique({ where: { id }, include: { UserSurvey: true } }) as unknown as
      | UserSurvey
      | (User & { UserSurvey: Survey | null })
      | null;
  }
}
