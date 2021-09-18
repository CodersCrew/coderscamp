import { Module } from '@nestjs/common';
import { ModuleMetadata } from '@nestjs/common/interfaces/modules/module-metadata.interface';
import { CqrsModule } from '@nestjs/cqrs';

import { PrismaModule } from '@/prisma/prisma.module';
import { env } from '@/shared/env';
import { EventsSubscriptionsRegistry } from '@/write/shared/application/events-subscription/events-subscriptions-registry';
import { PASSWORD_ENCODER } from '@/write/shared/application/password-encoder';
import { CryptoPasswordEncoder } from '@/write/shared/infrastructure/password-encoder/crypto-password-encoder';

import { ApplicationEventBus } from './application/application.event-bus';
import { ApplicationCommandFactory } from './application/application-command.factory';
import { APPLICATION_SERVICE } from './application/application-service';
import { EVENT_REPOSITORY } from './application/event-repository';
import { ID_GENERATOR } from './application/id-generator';
import { PrismaTransactionManagerFactory } from './application/prisma-transaction-manager/prisma-transaction-manager-factory';
import { TIME_PROVIDER } from './application/time-provider.port';
import { EventApplicationService } from './infrastructure/application-service/event-application-service';
import { InMemoryEventRepository } from './infrastructure/event-repository/in-memory-event-repository';
import { PrismaEventRepository } from './infrastructure/event-repository/prisma-event-repository.service';
import { UuidGenerator } from './infrastructure/id-generator/uuid-generator';
import { SystemTimeProvider } from './infrastructure/time-provider/system-time-provider';
import { PrismaTransactionEventRepository } from './infrastructure/transaction-event-repository/prisma-transaction-event-repository';

const imports: ModuleMetadata['imports'] = [CqrsModule, PrismaModule];

@Module({
  imports,
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
    env.EVENT_REPOSITORY === 'prisma'
      ? {
          provide: EVENT_REPOSITORY,
          useClass: PrismaEventRepository,
        }
      : {
          provide: EVENT_REPOSITORY,
          useClass: InMemoryEventRepository,
        },
    {
      provide: APPLICATION_SERVICE,
      useClass: EventApplicationService,
    },
    {
      provide: PASSWORD_ENCODER,
      useClass: CryptoPasswordEncoder,
    },
    ApplicationCommandFactory,
    PrismaTransactionManagerFactory,
    EventsSubscriptionsRegistry,
    PrismaTransactionEventRepository,
  ],
  exports: [
    CqrsModule,
    ApplicationCommandFactory,
    ApplicationEventBus,
    TIME_PROVIDER,
    ID_GENERATOR,
    APPLICATION_SERVICE,
    PASSWORD_ENCODER,
    EVENT_REPOSITORY,
    EventsSubscriptionsRegistry,
  ],
})
export class SharedModule {}
