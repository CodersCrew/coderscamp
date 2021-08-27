export type TaskWasUncompleted = {
  type: 'TaskWasUncompleted';
  data: { learningMaterialsId: string; taskId: string };
};
