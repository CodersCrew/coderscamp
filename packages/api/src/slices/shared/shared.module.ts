import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { APPLICATION_SERVICE } from './core/application-service';
import { EVENT_STORE } from './core/event-store';
import { ID_GENERATOR } from './core/id-generator';
import { TIME_PROVIDER } from './core/time-provider.port';
import { EventStoreApplicationService } from './infrastructure/event-store-application-service';
import { PrismaEventStore } from './infrastructure/prisma-event-store';
import { SystemTimeProvider } from './infrastructure/system-time-provider';
import { UuidGenerator } from './infrastructure/uuid-generator';

@Module({
  imports: [CqrsModule],
  providers: [
    {
      provide: TIME_PROVIDER,
      useClass: SystemTimeProvider,
    },
    {
      provide: ID_GENERATOR,
      useClass: UuidGenerator,
    },
    {
      provide: EVENT_STORE,
      useClass: PrismaEventStore,
    },
    {
      provide: APPLICATION_SERVICE,
      useClass: EventStoreApplicationService,
    },
  ],
  exports: [CqrsModule, TIME_PROVIDER, ID_GENERATOR, APPLICATION_SERVICE],
})
export class SharedModule {}
