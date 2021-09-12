import { Module } from '@nestjs/common';

import { SharedModule } from '@/write/shared/shared.module';

import { DevTestEvent1EventHandler } from './dev-test-event-1-was-published.event-handler';

@Module({
  imports: [SharedModule],
  providers: [DevTestEvent1EventHandler],
})
export class DevTestEvent1EventHandlerAutomationModule {}
