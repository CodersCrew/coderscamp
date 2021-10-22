export type UncompleteTask = {
  type: 'UncompleteTask';
  data: { learningMaterialsId: string; taskId: string };
};
