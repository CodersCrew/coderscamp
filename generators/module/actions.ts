export const createModuleAction = {
  type: 'add',
  path: '{{directory}}/{{dashCase module}}/{{dashCase module}}.module.ts',
  templateFile: './templates/module/module.hbs',
};

export const createTestModuleAction = {
  type: 'add',
  path: '{{directory}}/{{dashCase module}}/{{dashCase module}}.test-module.ts',
  templateFile: './templates/module/module.test.hbs',
};

export const createTestFileAction = {
  type: 'add',
  path: '{{directory}}/{{dashCase module}}/{{dashCase module}}.module.spec.ts',
  templateFile: './templates/module/module.spec.hbs',
};
