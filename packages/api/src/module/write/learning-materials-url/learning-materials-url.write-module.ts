import { Module } from '@nestjs/common';

import { UsersModule } from '@/users/users.module';
import { UsersService } from '@/users/users.service';
import { SharedModule } from '@/write/shared/shared.module';

import { GenerateLearningMaterialsUrlCommandHandler } from './application/generate-learning-materials-url.command-handler';
import { LEARNING_MATERIALS_URL_GENERATOR } from './application/learning-materials-url-generator';
import { USERS_PORT } from './application/users.port';
import { PuppeteerLearningMaterialsGenerator } from './infrastructure/puppeteer-learning-materials-generator';
import { UsersAdapter } from './infrastructure/users.adapter';
import { LearningMaterialsUrlRestController } from './presentation/rest/learning-materials-url.rest-controller';

@Module({
  imports: [SharedModule, UsersModule],
  controllers: [LearningMaterialsUrlRestController],
  providers: [
    GenerateLearningMaterialsUrlCommandHandler,
    { provide: LEARNING_MATERIALS_URL_GENERATOR, useClass: PuppeteerLearningMaterialsGenerator },
    {
      provide: USERS_PORT,
      useFactory: (usersService: UsersService) => new UsersAdapter(usersService),
      inject: [UsersService],
    },
  ],
})
export class LearningMaterialsUrlWriteModule {}
