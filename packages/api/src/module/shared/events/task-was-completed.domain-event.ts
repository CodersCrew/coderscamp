export type TaskWasCompleted = {
  type: 'TaskWasCompleted';
  data: {
    learningMaterialsId: string;
    taskId: string;
  };
};
