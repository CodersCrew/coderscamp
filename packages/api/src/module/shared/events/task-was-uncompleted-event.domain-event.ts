export type TaskWasUncompleted = {
  type: 'TaskWasUncompleted';
  data: { learningMaterialsId: string; taskId: string };
};

export const taskWasUncompletedEvent = (
  data: TaskWasUncompleted['data'],
): TaskWasUncompleted => ({
  type: 'TaskWasUncompleted',
  data,
});
