import { CompleteTask } from '@/module/commands/complete-task.domain-command';
import { TaskWasCompleted } from '@/module/events/task-was-completed.domain-event';

import { completeTask } from './complete-task';

describe('complete task', () => {
  const command: CompleteTask = {
    type: 'CompleteTask',
    data: { learningMaterialsId: 'sbAPITNMsl2wW6j2cg1H2A', taskId: 'L9EXtwmBNBXgo_qh0uzbq' },
  };

  it('should return task was completed', () => {
    // Given
    const pastEvents: TaskWasCompleted[] = [];

    // When
    const events = completeTask(pastEvents, command);

    // Then
    expect(events).toStrictEqual([
      {
        type: 'TaskWasCompleted',
        data: { learningMaterialsId: command.data.learningMaterialsId, taskId: command.data.taskId },
      },
    ]);
  });

  it('should return task was completed if other tasks are completed', () => {
    // Given
    const pastEvents: TaskWasCompleted[] = [
      {
        type: 'TaskWasCompleted',
        data: { learningMaterialsId: command.data.learningMaterialsId, taskId: 'BIt23CR3dLKkHn_a2IM4V' },
      },
    ];

    // When
    const events = completeTask(pastEvents, command);

    // Then
    expect(events).toStrictEqual([
      {
        type: 'TaskWasCompleted',
        data: { learningMaterialsId: command.data.learningMaterialsId, taskId: command.data.taskId },
      },
    ]);
  });

  it('should throw exception if task was already completed', () => {
    // Given
    const pastEvents: TaskWasCompleted[] = [
      {
        type: 'TaskWasCompleted',
        data: { learningMaterialsId: command.data.learningMaterialsId, taskId: command.data.taskId },
      },
    ];

    // When
    const events = () => completeTask(pastEvents, command);

    // Then
    expect(events).toThrowError('Task was already completed');
  });
});
