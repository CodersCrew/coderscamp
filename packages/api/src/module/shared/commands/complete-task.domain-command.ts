export type CompleteTask = {
  type: 'CompleteTask';
  data: { learningMaterialsId: string; taskId: string };
};
