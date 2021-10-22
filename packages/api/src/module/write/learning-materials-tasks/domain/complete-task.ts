import { TaskWasCompleted } from '@/events/task-was-completed.domain-event';
import { TaskWasUncompleted } from '@/events/task-was-uncompleted-event.domain-event';
import { CompleteTask } from '@/module/commands/complete-task.domain-command';

export function completeTask(
  pastEvents: (TaskWasCompleted | TaskWasUncompleted)[],
  { data: { learningMaterialsId, taskId } }: CompleteTask,
): TaskWasCompleted[] {
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

  if (state.completed) {
    throw new Error('Task was already completed');
  }

  const newEvent: TaskWasCompleted = {
    type: 'TaskWasCompleted',
    data: {
      taskId,
      learningMaterialsId,
    },
  };

  return [newEvent];
}
