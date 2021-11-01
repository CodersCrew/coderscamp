export const createEventAction = {
  type: 'add',
  path: 'packages/api/src/module/shared/events/{{dashCase event}}.domain-event.ts',
  templateFile: './templates/event/event.hbs',
};
