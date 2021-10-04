export const eventGenerator = {
  description: 'Create a new event',
  prompts: [
    {
      type: 'input',
      name: 'name',
      message: 'event name',
    },
  ],
  actions: [
    {
      type: 'add',
      path: 'packages/api/src/module/shared/events/{{dashCase name}}.domain-event.ts',
      templateFile: './templates/event/event.hbs',
    },
  ],
};
