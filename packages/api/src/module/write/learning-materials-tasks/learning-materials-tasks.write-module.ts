import { Module } from '@nestjs/common';

import { UncompleteTaskCommandHandler } from '@/write/learning-materials-tasks/application/uncomplete-task.command-handler';

import { SharedModule } from '../shared/shared.module';
import { CompleteTaskCommandHandler } from './application/complete-task.command-handler';
import { LearningMaterialsTaskRestController } from './presentation/rest/process-st-events.rest-controller';

@Module({
  imports: [SharedModule],
  providers: [CompleteTaskCommandHandler, UncompleteTaskCommandHandler],
  controllers: [LearningMaterialsTaskRestController],
})
export class LearningMaterialsTasksModule {}
