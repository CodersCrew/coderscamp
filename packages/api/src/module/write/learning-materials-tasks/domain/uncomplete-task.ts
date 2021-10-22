import { UncompleteTask } from '@/commands/uncomplete-task.domain-command';
import { TaskWasUncompleted } from '@/events/task-was-uncompleted-event.domain-event';
import { LearningMaterialsTasksDomainEvent } from '@/write/learning-materials-tasks/domain/events';

export function uncompleteTask(
  pastEvents: LearningMaterialsTasksDomainEvent[],
  { data: { learningMaterialsId, taskId } }: UncompleteTask,
): TaskWasUncompleted[] {
  const state = pastEvents
    .filter(({ data }) => data.taskId === taskId)
    .reduce<{ completed: boolean }>(
      (acc, event) => {
        switch (event.type) {
          case 'TaskWasCompleted': {
            return { completed: true };
          }
          case 'TaskWasUncompleted': {
            return { completed: false };
          }
          default: {
            return acc;
          }
        }
      },
      { completed: false },
    );

  if (!state.completed) {
    throw new Error('Can not uncomplete task that was not completed yet.');
  }

  const newEvent: TaskWasUncompleted = {
    type: 'TaskWasUncompleted',
    data: {
      taskId,
      learningMaterialsId,
    },
  };

  return [newEvent];
}
