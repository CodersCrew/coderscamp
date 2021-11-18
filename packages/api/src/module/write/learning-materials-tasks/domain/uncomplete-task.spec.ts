import {  uncompleteTaskCommand } from '@/module/commands/uncomplete-task';
import { TaskWasCompleted } from '@/events/task-was-completed.domain-event';
import { TaskWasUncompleted, taskWasUncompletedEvent } from '@/events/task-was-uncompleted-event.domain-event';
import { LearningMaterialsTasksDomainEvent } from '@/write/learning-materials-tasks/domain/events';
import { uncompleteTask } from '@/write/learning-materials-tasks/domain/uncomplete-task';

describe('uncomplete task', () => {
  const command = uncompleteTaskCommand({ learningMaterialsId: 'sbAPITNMsl2wW6j2cg1H2A', taskId: 'L9EXtwmBNBXgo_qh0uzbq' })

  it('should uncomplete completed task', () => {
    // Given
    const pastEvents: TaskWasCompleted[] = [
      {
        type: 'TaskWasCompleted',
        data: { learningMaterialsId: command.data.learningMaterialsId, taskId: 'L9EXtwmBNBXgo_qh0uzbq' },
      },
    ];

    // When
    const events = uncompleteTask(command)(pastEvents);

    // Then
    expect(events).toStrictEqual([
      taskWasUncompletedEvent({ learningMaterialsId: command.data.learningMaterialsId, taskId: command.data.taskId })
    ]);
  });

  it('should throw an error if try to uncomplete uncompleted task', () => {
    // given
    const pastEvents: TaskWasUncompleted[] = [
      taskWasUncompletedEvent({ learningMaterialsId: command.data.learningMaterialsId, taskId: command.data.taskId })
    ];

    // when
    const events = () => uncompleteTask(command)(pastEvents);

    // then
    expect(events).toThrowError('Can not uncomplete task that was not completed yet.');
  });

  it('should throw an error if try to uncomplete task that was neither completed nor uncompleted yet', () => {
    // given
    const pastEvents: LearningMaterialsTasksDomainEvent[] = [];

    // when
    const events = () => uncompleteTask(command)(pastEvents);

    // then
    expect(events).toThrowError('Can not uncomplete task that was not completed yet.');
  });
});
