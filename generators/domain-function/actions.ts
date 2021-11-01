export const createDomainFunctionAction = {
  type: 'add',
  path: '{{directory}}/domain/{{dashCase domainFunction}}.ts',
  templateFile: './generators/domain-function/domain-function.hbs',
};

export const createDomainFunctionTestAction = {
  type: 'add',
  path: '{{directory}}/domain/{{dashCase domainFunction}}.spec.ts',
  templateFile: './generators/domain-function/domain-function.spec.hbs',
};
