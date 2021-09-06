import { EventEmitterModule } from '@nestjs/event-emitter';

export const eventEmitterRootModule = EventEmitterModule.forRoot({
  wildcard: true,
  delimiter: '.',
  newListener: false,
  removeListener: false,
  maxListeners: 40,
  verboseMemoryLeak: true,
  ignoreErrors: false,
});
