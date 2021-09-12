import { Body, Controller, HttpCode, Logger, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';

import { DevTestRequest } from '@coderscamp/shared/models/dev-test-request';

import {
  devTestCommand1,
  DevTestCommand1ApplicationCommand,
} from '@/module/commands/dev-test-command-1.domain-command';
import {
  devTestCommand2,
  DevTestCommand2ApplicationCommand,
} from '@/module/commands/dev-test-command-2.domain-command';
import { ApplicationCommandFactory } from '@/write/shared/application/application-command.factory';

@Controller('dev-test')
export class DevTestRestController {
  private readonly logger = new Logger(DevTestRestController.name);

  constructor(private readonly commandBus: CommandBus, private readonly commandFactory: ApplicationCommandFactory) {}

  @Post('/1')
  @HttpCode(204)
  async command1(@Body() req: DevTestRequest): Promise<void> {
    this.logger.log(`recived request(${JSON.stringify(req)})`);

    const command = this.commandFactory.applicationCommand(() => ({
      class: DevTestCommand1ApplicationCommand,
      ...devTestCommand1(req),
    }));

    this.logger.log(`sending command(${JSON.stringify(command)}) to commandBus`);
    await this.commandBus.execute(command);
  }

  @Post('/2')
  @HttpCode(204)
  async command2(@Body() req: DevTestRequest): Promise<void> {
    this.logger.log(`recived request(${JSON.stringify(req)})`);

    const command = this.commandFactory.applicationCommand(() => ({
      class: DevTestCommand2ApplicationCommand,
      ...devTestCommand2(req),
    }));

    this.logger.log(`sending command(${JSON.stringify(command)}) to commandBus`);
    await this.commandBus.execute(command);
  }
}
