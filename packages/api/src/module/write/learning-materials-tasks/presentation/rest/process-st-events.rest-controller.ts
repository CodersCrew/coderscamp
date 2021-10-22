import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';

import { UncompleteTaskApplicationCommand } from '@/commands/uncomplete-task.application-command';
import { CompleteTaskApplicationCommand } from '@/module/commands/complete-task.application-command';
import { ApplicationCommandFactory } from '@/write/shared/application/application-command.factory';

import { TaskCompletedRequestBody } from '../../types/taskCompletedRequestBody';

@Controller('process-st/events')
export class LearningMaterialsTaskRestController {
  constructor(private readonly commandBus: CommandBus, private readonly commandFactory: ApplicationCommandFactory) {}

  @Post('task-checked-unchecked')
  @HttpCode(204)
  async taskCheckedUnchecked(
    @Body() { id: learningMaterialsId, data: { id: taskId, status } }: TaskCompletedRequestBody,
  ): Promise<void> {
    if (status === 'Completed') {
      const command = this.commandFactory.applicationCommand(() => ({
        class: CompleteTaskApplicationCommand,
        type: 'CompleteTask',
        data: { learningMaterialsId, taskId },
      }));

      await this.commandBus.execute(command);
    }

    const command = this.commandFactory.applicationCommand(() => ({
      class: UncompleteTaskApplicationCommand,
      type: 'UncompleteTask',
      data: { learningMaterialsId, taskId },
    }));

    await this.commandBus.execute(command);
  }
}
