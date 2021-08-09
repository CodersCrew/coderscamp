import { Global, Module } from '@nestjs/common';

import { GithubRepositoryPort } from '../contracts/github.repository';
import { SurveyRepositoryPort } from '../contracts/survey.repository';
import { UserRepositoryPort } from '../contracts/user.repository';
import { PrismaGithubAdapter } from './prisma.github.adapter';
import { PrismaService } from './prisma.service';
import { PrismaSurveyAdapter } from './prisma.survey.adapter';
import { PrismaUserAdapter } from './prisma.user.adapter';

const adapters = [
  { provide: UserRepositoryPort, useClass: PrismaUserAdapter },
  { provide: SurveyRepositoryPort, useClass: PrismaSurveyAdapter },
  { provide: GithubRepositoryPort, useClass: PrismaGithubAdapter },
];

@Global()
@Module({
  providers: [PrismaService, ...adapters],
  exports: [PrismaService, ...adapters],
})
export class PrismaModule {}
