import { Module } from '@nestjs/common';

import { SharedModule } from '../shared/shared.module';
import { DevTestCommand1ApplicationCommandHandler } from './application/dev-test-command-1-handler';
import { DevTestCommand2ApplicationCommandHandler } from './application/dev-test-command-2-handler';
import { DevTestRestController } from './presentation/dev-test.rest-controller';

@Module({
  imports: [SharedModule],
  controllers: [DevTestRestController],
  providers: [DevTestCommand1ApplicationCommandHandler, DevTestCommand2ApplicationCommandHandler],
})
export class DevTestWriteModule {}
