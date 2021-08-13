import { Global, Module } from '@nestjs/common';

import { SURVEY_REPOSITORY_PORT } from '../contracts/survey.repository';
import { USER_REPOSITORY_PORT } from '../contracts/user.repository';
import { PrismaService } from './prisma.service';
import { PrismaSurveyAdapter } from './prisma.survey.adapter';
import { PrismaUserAdapter } from './prisma.user.adapter';

const adapters = [
  { provide: USER_REPOSITORY_PORT, useClass: PrismaUserAdapter },
  { provide: SURVEY_REPOSITORY_PORT, useClass: PrismaSurveyAdapter },
];

@Global()
@Module({
  providers: [PrismaService, ...adapters],
  exports: [PrismaService, ...adapters],
})
export class PrismaModule {}
