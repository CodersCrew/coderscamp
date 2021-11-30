export const createAutomationModuleAction = {
    type: 'add',
    path: '{{directory}}/{{dashCase module}}/{{dashCase module}}.automation-module.ts',
    templateFile: './generators/automationModule/module.hbs',
  };
  
  export const createAutomationTestModuleAction = {
    type: 'add',
    path: '{{directory}}/{{dashCase module}}/{{dashCase module}}.test-module.ts',
    templateFile: './generators/automationModule/module.test.hbs',
  };
  
  export const createAutomationTestFileAction = {
    type: 'add',
    path: '{{directory}}/{{dashCase module}}/{{dashCase module}}.module.spec.ts',
    templateFile: './generators/automationModule/module.spec.hbs',
  };
  