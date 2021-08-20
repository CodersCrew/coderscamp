import { Module } from '@nestjs/common';

import { UsersModule } from '../users/users.module';
import { UsersService } from '../users/users.service';
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
      useFactory: (usersService: UsersService) => new UsersAdapter(usersService),
      inject: [UsersService],
    },
  ],
})
export class LearningMaterialsModule {}
