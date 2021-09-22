import { Module } from '@nestjs/common';

import { UserProfileModule } from '@/crud/user-profile/user-profile.module';
import { UserProfileService } from '@/crud/user-profile/user-profile.service';
import { SharedModule } from '@/write/shared/shared.module';

import { GenerateLearningMaterialsUrlCommandHandler } from './application/generate-learning-materials-url.command-handler';
import { LEARNING_MATERIALS_URL_GENERATOR } from './application/learning-materials-url-generator';
import { USERS_PORT } from './application/users.port';
import { PuppeteerLearningMaterialsGenerator } from './infrastructure/puppeteer-learning-materials-generator';
import { UsersAdapter } from './infrastructure/users.adapter';
import { LearningMaterialsUrlRestController } from './presentation/rest/learning-materials-url.rest-controller';

@Module({
  imports: [SharedModule, UserProfileModule],
  controllers: [LearningMaterialsUrlRestController],
  providers: [
    GenerateLearningMaterialsUrlCommandHandler,
    { provide: LEARNING_MATERIALS_URL_GENERATOR, useClass: PuppeteerLearningMaterialsGenerator },
    {
      provide: USERS_PORT,
      useFactory: (usersService: UserProfileService) => new UsersAdapter(usersService),
      inject: [UserProfileService],
    },
  ],
})
export class LearningMaterialsUrlWriteModule {}
