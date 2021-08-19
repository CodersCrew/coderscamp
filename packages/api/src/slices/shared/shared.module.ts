import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { APPLICATION_SERVICE } from './core/application-service';
import { EVENT_STORE } from './core/event-repository';
import { ID_GENERATOR } from './core/id-generator';
import { TIME_PROVIDER } from './core/time-provider.port';
import { EventStoreApplicationService } from './infrastructure/event-store-application-service';
import { PrismaEventRepository } from './infrastructure/prisma-event-repository.service';
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
      useClass: PrismaEventRepository,
    },
    {
      provide: APPLICATION_SERVICE,
      useClass: EventStoreApplicationService,
    },
  ],
  exports: [CqrsModule, TIME_PROVIDER, ID_GENERATOR, APPLICATION_SERVICE],
})
export class SharedModule {}
