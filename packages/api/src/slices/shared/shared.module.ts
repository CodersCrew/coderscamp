import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { PrismaModule } from '../../prisma/prisma.module';
import { APPLICATION_SERVICE } from './core/application-service';
import { EVENT_STORE } from './core/event-repository';
import { ID_GENERATOR } from './core/id-generator';
import { TIME_PROVIDER } from './core/time-provider.port';
import { EventStoreApplicationService } from './infrastructure/application-service/event-store-application-service';
import { PrismaEventRepository } from './infrastructure/event-repository/prisma-event-repository.service';
import { UuidGenerator } from './infrastructure/id-generator/uuid-generator';
import { SystemTimeProvider } from './infrastructure/time-provider/system-time-provider';

@Module({
  imports: [CqrsModule, PrismaModule],
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
