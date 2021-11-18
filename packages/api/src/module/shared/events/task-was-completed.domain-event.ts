export type TaskWasCompleted = {
  type: 'TaskWasCompleted';
  data: {
    learningMaterialsId: string;
    taskId: string;
  };
};

export const taskWasCompletedEvent = (
  data: TaskWasCompleted['data'],
): TaskWasCompleted => ({
  type: 'TaskWasCompleted',
  data,
});
