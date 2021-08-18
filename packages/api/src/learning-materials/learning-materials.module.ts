import { Module } from '@nestjs/common';

import { UsersModule } from '../users/users.module';
import { UsersRepository } from '../users/users.repository';
import { UsersAdapter } from './adapters/users.adapter';
import { LearningMaterialsController } from './learning-materials.controller';
import { LearningMaterialsRepository } from './learning-materials.repository';
import { LearningMaterialsService } from './learning-materials.service';
import { USERS_PORT } from './ports/users.port';

@Module({
  imports: [UsersModule],
  controllers: [LearningMaterialsController],
  providers: [
    LearningMaterialsService,
    LearningMaterialsRepository,
    {
      provide: USERS_PORT,
      useFactory: (usersRepository: UsersRepository) => new UsersAdapter(usersRepository),
      inject: [UsersRepository],
    },
  ],
})
export class LearningMaterialsModule {}
