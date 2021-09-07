import { AsyncReturnType } from 'type-fest';

import { CompleteTaskApplicationCommand } from '@/module/commands/complete-task.application-command';
import { TaskWasCompleted } from '@/module/events/task-was-completed.domain-event';

import { EventStreamName } from '../shared/application/event-stream-name.value-object';
import { learningMaterialsTasksTestModule } from './learning-materials-tasks.test-module';

describe('learning materials tasks', () => {
  let module: AsyncReturnType<typeof learningMaterialsTasksTestModule>;
  const commandBuilder = (taskId = 'VmkxXnPG02CaUNV8Relzk', learningMaterialsId = 'ZpMpw2eh1llFCGKZJEN6r') => ({
    class: CompleteTaskApplicationCommand,
    type: 'CompleteTask',
    data: { taskId, learningMaterialsId },
  });

  it('should change state of the task to complete', async () => {
    // Given
    const command = commandBuilder();

    // When
    await module.executeCommand(() => command);

    // Then
    await module.expectEventPublishedLastly<TaskWasCompleted>({
      type: 'TaskWasCompleted',
      data: {
        learningMaterialsId: command.data.learningMaterialsId,
        taskId: command.data.taskId,
      },
      streamName: EventStreamName.from('LearningMaterialsTasks', command.data.learningMaterialsId),
    });
  });

  it('should not change task state if task is already completed', async () => {
    // Given
    const command = commandBuilder();

    // When
    await module.executeCommand(() => command);

    // Then
    await expect(() => module.executeCommand(() => command)).rejects.toThrow();
  });

  beforeEach(async () => {
    module = await learningMaterialsTasksTestModule();
  });

  afterEach(async () => {
    await module.close();
  });
});
