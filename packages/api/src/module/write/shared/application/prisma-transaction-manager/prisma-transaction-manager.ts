import { CommandBus } from '@nestjs/cqrs';
import { PrismaClient, PrismaPromise } from '@prisma/client';

import { ApplicationCommand, DefaultCommandMetadata } from '@/module/application-command-events';
import { PrismaService } from '@/shared/prisma/prisma.service';

type PrismaTransactionClient = Omit<PrismaClient, '$connect' | '$disconnect' | '$on' | '$transaction' | '$use'>;

type WithTransactionCallback<TPrismaPromise extends PrismaPromise<unknown> = PrismaPromise<unknown>> = (
  prismaClient: PrismaTransactionClient,
) => TPrismaPromise;
type AfterTransactionCallback = (prismaClient: PrismaTransactionClient) => void | Promise<void>;

interface PrismaTransactionContext {
  executeWithTransaction<TPrismaPromise extends PrismaPromise<unknown>>(
    cb: WithTransactionCallback<TPrismaPromise>,
  ): void;

  executeCommand<TApplicationCommand extends ApplicationCommand>(command: TApplicationCommand): Promise<void>;

  executeAfterTransaction(cb: AfterTransactionCallback): void;

  trxId: string;
}

type PrismaTransactionManagerState = 'created' | 'executing' | 'executed';

class PrismaTransactionManager implements PrismaTransactionContext {
  private readonly afterTransactionCallbacks: AfterTransactionCallback[] = [];

  private readonly withTransactionCallbacks: WithTransactionCallback[] = [];

  private internalState: PrismaTransactionManagerState = 'created';

  public get state() {
    return this.internalState;
  }

  static CONTEXT_TOKEN = Symbol('PRISMA_TRANSACTION_MANAGER_CONTEXT_TOKEN');

  constructor(
    private readonly commandBus: CommandBus,
    private readonly prismaService: PrismaService,
    public readonly trxId: string,
  ) {}

  async executeTransaction(): Promise<void> {
    this.validateInternalState();
    this.internalState = 'executing';

    try {
      const prismaPromises = this.withTransactionCallbacks.map((cb) => cb(this.prismaService));

      await this.prismaService.$transaction(prismaPromises);
      await Promise.all(this.afterTransactionCallbacks.map((cb) => cb(this.prismaService)));
    } finally {
      this.internalState = 'executed';
      this.cleanup();
    }
  }

  cleanup() {
    this.afterTransactionCallbacks.length = 0;
    this.withTransactionCallbacks.length = 0;
  }

  executeWithTransaction<TPrismaPromise extends PrismaPromise<unknown>>(
    cb: WithTransactionCallback<TPrismaPromise>,
  ): void {
    this.validateInternalState();
    this.withTransactionCallbacks.push(cb);
  }

  executeCommand<
    TApplicationCommand extends ApplicationCommand<string, Record<string, unknown>, DefaultCommandMetadata>,
  >(command: TApplicationCommand): Promise<void> {
    this.validateInternalState();
    this.injectContextIntoCommand(command);

    return this.commandBus.execute(command);
  }

  executeAfterTransaction(cb: AfterTransactionCallback): void {
    this.validateInternalState();
    this.afterTransactionCallbacks.push(cb);
  }

  private validateInternalState() {
    if (this.internalState !== 'created') {
      throw new Error(`Invalid operation on PrismaTransactionManager(${this.trxId}) state(${this.internalState})`);
    }
  }

  private injectContextIntoCommand(command: ApplicationCommand) {
    // eslint-disable-next-line no-param-reassign
    (command as unknown as Record<symbol, PrismaTransactionManager>)[PrismaTransactionManager.CONTEXT_TOKEN] = this;
  }

  static getContextFromCommand(command: ApplicationCommand): PrismaTransactionContext | undefined {
    return (command as unknown as Record<symbol, PrismaTransactionManager>)[PrismaTransactionManager.CONTEXT_TOKEN];
  }
}

export { PrismaTransactionManager };
export type { PrismaTransactionClient, PrismaTransactionContext };
