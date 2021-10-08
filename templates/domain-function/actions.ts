export const domainFunctionActionConfig = {
  type: 'add',
  path: '{{directory}}/domain/{{dashCase domain-function}}.ts',
  templateFile: './templates/domain-function/domain-function.hbs',
};

export const domainFunctionTestActionConfig = {
  type: 'add',
  path: '{{directory}}/domain/{{dashCase domain-function}}.spec.ts',
  templateFile: './templates/domain-function/domain-function.spec.hbs',
};
