import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { EventEmitterModule } from '@nestjs/event-emitter';

import { ApplicationEventBus } from './application/application.event-bus';
import { ApplicationCommandFactory } from './application/application-command.factory';
import { APPLICATION_SERVICE } from './application/application-service';
import { EVENT_STORE } from './application/event-repository';
import { ID_GENERATOR } from './application/id-generator';
import { TIME_PROVIDER } from './application/time-provider.port';
import { EventStoreApplicationService } from './infrastructure/application-service/event-store-application-service';
import { InMemoryEventRepository } from './infrastructure/event-repository/in-memory-event-repository';
import { UuidGenerator } from './infrastructure/id-generator/uuid-generator';
import { SystemTimeProvider } from './infrastructure/time-provider/system-time-provider';

@Module({
  imports: [
    CqrsModule,
    EventEmitterModule.forRoot({
      // set this to `true` to use wildcards
      wildcard: true,
      // the delimiter used to segment namespaces
      delimiter: '.',
      // set this to `true` if you want to emit the newListener event
      newListener: false,
      // set this to `true` if you want to emit the removeListener event
      removeListener: false,
      // the maximum amount of listeners that can be assigned to an event
      maxListeners: 10,
      // show event name in memory leak message when more than maximum amount of listeners is assigned
      verboseMemoryLeak: false,
      // disable throwing uncaughtException if an error event is emitted and it has no listeners
      ignoreErrors: false,
    }),
  ],
  providers: [
    ApplicationEventBus,
    {
      provide: TIME_PROVIDER,
      useClass: SystemTimeProvider,
    },
    {
      provide: ID_GENERATOR,
      useClass: UuidGenerator,
    },
    // {
    //   provide: EVENT_STORE,
    //   useClass: PrismaEventRepository,
    // },
    {
      provide: EVENT_STORE,
      useClass: InMemoryEventRepository,
    },
    {
      provide: APPLICATION_SERVICE,
      useClass: EventStoreApplicationService,
    },
    ApplicationCommandFactory,
  ],
  exports: [CqrsModule, ApplicationCommandFactory, TIME_PROVIDER, ID_GENERATOR, APPLICATION_SERVICE],
})
export class SharedModule {}
