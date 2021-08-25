# How to EventModeling -> NestJS Code

## Write Slice

The example is so simple, but will be good solution for more complex business logic.
It's where it sits, so write slice is the most complex part.
But during the whole implementation you don't need to think about data persistence / data models / database etc.
everything is at your disposal.

### Domain Layer

#### Start from Event & Command
It's pretty simple. Just type from MIRO and data with types: 
```ts
export type LearningMaterialsUrlWasGenerated = {
  type: 'LearningMaterialsUrlWasGenerated';
  data: { userId: UserId; materialsUrl: string };
};
```
Create a command, which is a cause of the event:
```ts
export type GenerateLearningMaterialsUrl = {
  type: 'GenerateLearningMaterialsUrl';
  data: { userId: UserId };
};
```

#### Connect them with business logic

Implement business logic. Your logic is: how to react on user request (command)
Business logic is a function, which always takes two params: 
list of previous events and the command.
Optionally it takes some other params if required. 
In this case we need learningMaterialsUrl, which are not come from command.
```ts
export function generateLearningMaterialsUrl(
  previousEvents: LearningMaterialsUrlDomainEvent[],
  command: GenerateLearningMaterialsUrl,
  learningMaterialsUrl: LearningMaterialsUrl,
): LearningMaterialsUrlDomainEvent[] {
  return [
    {
      type: 'LearningMaterialsUrlWasGenerated',
      data: { userId: command.data.userId, materialsUrl: learningMaterialsUrl },
    },
  ];
}
```

But, where are business rules? There are ifs in our code. 
We need to consider previous steps, if the command is OK, or should be rejected. 
Let's do that. 

It's always the same. Make reduce on previousEvents and read from them whatever you want to determine if command is OK.
```ts
  const state = previousEvents.reduce<{ generated: boolean }>(
    (acc, event) => {
      switch (event.type) {
        case 'LearningMaterialsUrlWasGenerated': {
          return { generated: true };
        }
        default: {
          return acc;
        }
      }
    },
    { generated: false },
  );
```
There you are only interested in if url was generated. 

For example, if you also need generation date:
//todo: MORE

It's whole your business logic, you place it in the DOMAIN 

Test your business logic. It's extreamly testable, because it's just pure function (no external dependencies).
Output depends only on input.

### Application Layer
Now you need to connect your business logic with external services and dependencies. 
Also it's a place to communicate somehow with another modules. 

#### Application Command
Define how we can communicate with your module.
Because NestJS support CommandBus just for classes, we need to create class from our domain command type.
Let's call it ApplicationCommand.
```ts
export class GenerateLearningMaterialsUrlApplicationCommand extends AbstractApplicationCommand<GenerateLearningMaterialsUrl> {}
```
It's part of your module API (do not misunderstand as REST API). An input into your write module.
If someone wants to do some action inside your module should execute a command. 
External issuer may be REST API / WebSocket etc. or another module (commonly - automation slice).

#### CommandHandler
You need a handler for your command

CommandHandler code is described in NestJS documentation here: `https://github.com/nestjs/cqrs`
Ignore events part because, we will use a little bit differnt soluion.

Read comments about this code: 
```ts
@CommandHandler(GenerateLearningMaterialsUrlApplicationCommand)
export class GenerateLearningMaterialsUrlCommandHandler
  implements ICommandHandler<GenerateLearningMaterialsUrlApplicationCommand>
{
  constructor(
      /*You always inject ApplicationService. It execute method it's a place where: 
       - all previous events will be loaded
       - your domain logic (passed as third argument) will be executed with loaded events
       - new events (returned from your business logic) will be stored
       - your events will be published in order to be able to handle by event handlers 
       */
    @Inject(APPLICATION_SERVICE)
    private readonly applicationService: ApplicationService,
    
    /*
    Sometimes you need external dependencies (like generator of learning materials url - by web browser)
    Its a place to inject it. Use just interfaces to be able to stub external service.
     */
    @Inject(LEARNING_MATERIALS_URL_GENERATOR)
    private readonly learningMaterialsUrlGenerator: LearningMaterialsUrlGenerator,
  ) {}

  async execute(command: GenerateLearningMaterialsUrlApplicationCommand): Promise<void> {
    const learningMaterialsUrl = await this.learningMaterialsUrlGenerator.generateUrlFor(command.data.userId);

    /**
     * EventStream - you can read it from Event Modeling. 
     */
    const eventStream = `LearningMaterialsUrl_${command.data.userId}`
    await this.applicationService.execute<LearningMaterialsUrlDomainEvent>(
        eventStream,
      { causationId: command.id, correlationId: command.metadata.correlationId }, //metadata - for tracking and monitoring
      (previousEvents) => generateLearningMaterialsUrl(previousEvents, command, learningMaterialsUrl), //load events and pass them to business logic
    );
  }
}
```

This pattern repeats with every command.

### Infrastructure Layer 
Here you implement interfaces for external dependencies.

### Presentation Layer
#### REST API
One of possibilities to interact with your app it's an REST API.
It's just need to create command and execute it.
ApplicationCommandFactory class is helful - you don't need to think how generate commandId, tracking metadata etc. 
Just use it for new command, by passing Application Command class, domain command type and required data.
```ts
@Controller('learning-materials')
export class GenerateLearningMaterialsUrlController {
  constructor(private readonly commandBus: CommandBus, private readonly commandFactory: ApplicationCommandFactory) {}

  @UseGuards(JwtAuthGuard)
  @Post('/url')
  @HttpCode(204)
  async generateUserLearningResourcesUrl(@JwtUserId() userId: UserId): Promise<void> {
    const command = this.commandFactory.applicationCommand({
      class: GenerateLearningMaterialsUrlApplicationCommand,
      type: 'GenerateLearningMaterialsUrl',
      data: { userId },
    });

    await this.commandBus.execute(command);
  }
}
```


## Automation Slice
The simples one. It's a event handler where you can react for something which happened.
Automation it's place where you automate reaction on certain event.
We're using EventEmitter with NestJS instead of EventBus from CQRS, because it's allow for simple usage of 
types (without classes) as events. Also have more options for subscriptions (wildcards etc.)

```ts
@Injectable()
export class SendEmailWhenLearningMaterialsUrlWasGenerated {
  
  constructor(private commandBus: CommandBus)
  
  @OnEvent('LearningMaterialsUrl.*')
  handleLearningMaterialsUrlWasGenerated(event: ApplicationEvent<LearningMaterialsUrlDomainEvent>) {
    switch(event.type){ //you can use type guard to read certain event data
      case 'LearningMaterialsWere':
        this.commandBus.execute(/*SendEmailApplicationCommand etc...*/)
      default: 
        return;
    }
  }

  //or subscribe just for certain event
  @OnEvent('LearningMaterialsUrl.LearningMaterialsUrlWasGenerated')
  handleLearningMaterialsUrlDomainEvent(event: ApplicationEvent<LearningMaterilsUrlWasGenerated>) {
    this.commandBus.execute(/*SendEmailApplicationCommand etc...*/)
  }
}
```


## Read Slice
Read doesn't belong to certain stream, but can be.
Previously you didn't have requirement to read some data.
It's strictly related to event store, so we will be testing it e2e and architecture will be without so much layers. 

Simples part
```ts
@Module({
  imports: [SharedModule],
})
export class LearningMaterialsReadModule {
  constructor(private readonly prismaService: PrismaService) {}

  //todo: recovering from failures - reprocessing events:
  // -  Saving streamVersion in readmodel.
  // - catchup on start.
  @OnEvent('LearningMaterialsUrl.LearningMaterialsUrlWasGenerated')
  onLearningResourcesUrlWasGenerated(event: ApplicationEvent<LearningMaterialsUrlWasGenerated>) {
    this.prismaService.learningMaterial.create({ data: { userId: event.data.userId, url: event.data.materialsUrl } });
  }
}
```

Just subscribe for the event and read data needed to be read. 
After all introduce REST Controller. 
Green card on Event Modeling is a read model - what you can read from controller.
Read can be, but it's not a must 1:1 with Write.
Read may accummulate many needs. Or events from more than one stream.

Where is Query and QueryBus? 
No question between modules = no queries.

Controller may strictly reach database. Here we don't care about ports & adapters etc. 
No abstractions. 
We want to have fully access over how we read.
```ts
@Controller('learning-materials')
export class LearningMaterialsRestController {
  constructor(private readonly prismaService: PrismaService) {}

  @Get()
  getLearningMaterial(@JwtUserId() userId: UserId): Promise<GetLearningMaterialResponse> {
    return this.prismaService.learningMaterial.findUnique({ where: { userId } });
  }
}
```


There should be no relations between read/write/automation just throught events and command in shared.

# ADR - Architecture Decision Records


## Use EventEmitter2 instead of CQRS EventBus
Support for types as events.
No need for classes.




## Events definitions in shared instead of certain module.
Easier - just commit with event to be able to pararrelize work.


# TODO from infrastructure

1. Swagger for REST API
2. Publishing certain events via WebSocket for frontend
3. WebSocket documentation with AsyncAPI
4. Monitoring with Grafana 
5. Rebuilding read projections from events
