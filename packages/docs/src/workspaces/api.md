---
title: API (backend) workspace
description: Documentation related directly to the backend workspace of the project.
sidebar_position: 3
---

# Backend Architecture (How to EventModeling -> NestJS Code)

Architectural drivers are: fast introducing of new features and parallelization of development streams.

Useful materials to grasp following concepts:
- [DDD, Hexagonal, Onion, Clean, CQRS, … How I put it all together](https://herbertograca.com/2017/11/16/explicit-architecture-01-ddd-hexagonal-onion-clean-cqrs-how-i-put-it-all-together/)
- [DDDEU Booklet](https://drive.google.com/file/d/164be-M0MtV-nHuOZ1VlOyTYnzAFdFb8R/view?usp=sharing)

[We use plop as code generator to reduce need to write boilerplate code.](#code-generation) 

# Step-by-step implementation instructions

MIRO with EventModeling: https://miro.com/app/board/o9J_lQvnN28=/?moveToWidget=3074457362407512031&cot=14

![CodersCamp EventModeling](https://res.cloudinary.com/coderscamp/image/upload/v1630056473/docs/CodersCamp_App___Event_Storming_-_Frame_3_a5zbzt.jpg)

Just after defining events and commands you can split entire work by write/read and automation slices (module).
Follow instruction to see how to do that.

## Write Slice.
Write Slice is a command (blue sticky-note) connected to an event (orange sticky-note).
Sometimes there is also REST API endpoint and UI mockup for context.

![CodersCamp EventModeling | Write Slice](https://res.cloudinary.com/coderscamp/image/upload/v1630056664/docs/CodersCamp_App___Event_Storming_-_WriteSlice_1_nghaqa.jpg)


**Testing strategy:** unit tests on application layer (given past events, when execute command, then published events) and unit test for controller (if appropriate command executed). Optionally testing on domain layer.
**Reminder** First, read whole instruction, and after use this (graphical form) as a reminder: https://miro.com/app/board/o9J_lQvnN28=/?moveToWidget=3074457363092869959&cot=14

The example with generating learning materials url is so simple, but the solution will fit more complex business logic.
Write slice, it's where the business logic sits, so write slice is the most complex part, with layered architecture.
During developing of this layer you don't need to think about database / persistence / read etc. Leave it for Read Slice.
You have prepared SDK (provided by SharedModule from `module/write/shared`) which will lead you during development of this part.

### Domain Layer

#### Start from Event & Command

Event (code snippet below)
1. Find miro orange sticky-note
2. Read bolded name - it's name of your type. Create type with that name and place it in `modules/shared/event` directory. Add `type` property with the same name.
3. Add properties from sticky-note to the type and assign types to them. It's `data` property in the type.
4. Create a commit with just an event (if someone needs to use it, now can do they work without waiting for full domain logic)

```ts
// file: module/shared/events/learning-materials-url-was-generated.domain-event.ts
export type LearningMaterialsUrlWasGenerated = {
  type: 'LearningMaterialsUrlWasGenerated';
  data: { learningMaterialsId: string; courseUserId: UserId; materialsUrl: string };
};
```

```ts
// file: module/write/learning-materials-url/domain/events.ts

// Group in one type events which will have impact on that part of the system. 
// On EventModeling you will find them in the same horizontal line with event stream name
export type LearningMaterialsUrlDomainEvent = LearningMaterialsUrlWasGenerated
```

Command (code snippet below)
1. Find a cause of previously created event (blue sticky-note connected with event). It's a command.
2. Repeat steps 2 and 3 from event. But place file with the type in `module/shared/commands` directory.
3. Create a commit with just a command.

```ts
export type GenerateLearningMaterialsUrl = {
  type: 'GenerateLearningMaterialsUrl';
  data: { userId: UserId };
};
```

#### Connect Command & Event by domain logic

Domain logic is: how to react for certain user or external system action (command), based on info, which you have from past events.
Extremely easy for testing, because its output depends on the input. No external dependencies and side effects.

Domain Logic:
1. Create a function with parameters:
    1. pastEvents - events which occurred before in the stream. You don't care how to read them. It's responsibility of application layer.
    2. command - user or external system action (what you want to do)
    3. (optional) additional parameters needed to fulfill domain logic, but are not part of the command (learningMaterialsUrl in this case)
2. Return decision from the function is a list of events (in most cases one event). On next invocation this event will come in pastEvents list.

```ts
export function generateLearningMaterialsUrl(
  pastEvents: LearningMaterialsUrlDomainEvent[],
  command: GenerateLearningMaterialsUrl,
  learningMaterialsUrl: LearningMaterialsUrl,
  learningMaterialsId: string,
): LearningMaterialsUrlDomainEvent[] {
  return [
    {
      type: 'LearningMaterialsUrlWasGenerated',
      data: { learningMaterialsId, userId: command.data.userId, materialsUrl: learningMaterialsUrl },
    },
  ];
}
```

_Congratulations! That's it! You have completed the simplest domain layer!_

#### Domain Invariants based on past events

But... domain have no sense without business logic. The logic are "ifs" - conditions in our code.
Simple invariant is: "You cannot generate learning resource url twice".

In order to extend your domain logic to keep this rule, first: describe it with test.
Tests always follows same pattern:
1. Given some past events
2. When execute a command
3. Then assert if certain events were published, or an error was thrown

```ts
it('given was generated before, then should not be generated', () => {
   // Given
   const pastEvents: LearningMaterialsUrlDomainEvent[] = [
      {
         type: 'LearningMaterialsUrlWasGenerated',
         data: {
            learningMaterialsId: 'sbAPITNMsl2wW6j2cg1H2A',
            courseUserId: 'ca63d023-4cbd-40ca-9f53-f19dbb19b0ab',
            materialsUrl: 'https://app.process.st/runs/sbAPITNMsl2wW6j2cg1H2A/tasks/oFBpTVsw_DS_O5B-OgtHXA',
         },
      },
   ];

   // When
   const command: GenerateLearningMaterialsUrl = {
      type: 'GenerateLearningMaterialsUrl',
      data: {
         courseUserId: 'ca63d023-4cbd-40ca-9f53-f19dbb19b0ab',
      },
   };
   const learningMaterialsUrl = 'https://app.process.st/runs/sbAPITNMsl2wW6j2cg1H2A/tasks/agcdea_DS_O5B-OgtHXA';
   const learningMaterialsId = 'sbAPITNMsl2wW6j2cg1H2A';
   const domainLogic = () =>
           generateLearningMaterialsUrl(pastEvents, command, learningMaterialsUrl, learningMaterialsId);

   // Then
   expect(domainLogic).toThrow(new Error('Learning resources url was already generated!'));
});
```

After, create an implementation to fulfill the test.
You always follow the same pattern, and try to reflect how our brain works.
1. Make some observations (pastEvents)
2. Make some conclusions based on observations (reduce on events). Here your conclusion is if learning materials url was generated or not.
   Business logic, is that - if was generated, you reject the command by throwing an Error.
   It's always the same. Make reduce on pastEvents and read from them whatever you want to determine if command is OK.
   You care about only about information (distilled from events), which may change answer for your question. You can ignore everything else.

Domain logic extended by some rule:
```ts
export function generateLearningMaterialsUrl(
        pastEvents: LearningMaterialsUrlDomainEvent[],
        command: GenerateLearningMaterialsUrl,
        learningMaterialsUrl: LearningMaterialsUrl,
        learningMaterialsId: string,
): LearningMaterialsUrlDomainEvent[] {
   const state = pastEvents.reduce<{ generated: boolean }>(
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

   if (state.generated) {
      throw new Error('Learning resources url was already generated!');
   }

   return [
      {
         type: 'LearningMaterialsUrlWasGenerated',
         data: {
            learningMaterialsId,
            courseUserId: command.data.courseUserId,
            materialsUrl: learningMaterialsUrl,
         },
      },
   ];
}
```

It's whole your business logic, you place it in the DOMAIN.

Test your business logic carefully. It's extremely testable, because it's just [pure function](https://enterprisecraftsmanship.com/posts/what-is-functional-programming/) (no external dependencies).
Output depends only on input.

### Application Layer
Now you need to connect your business logic with external services and dependencies like database / process.st.
Also it's a place to communicate somehow with another modules (slices).
In NestJS we treat every slice from Event Modeling as separate module.
We can communicate with each other only by events and commands.
In some cases we can use Ports & Adapters to communicate with external world.

#### Application Command
Define how we can interact with your module.
Because NestJS support CommandBus just for classes, we need to create class from our domain command type.
Let's call it ApplicationCommand.
```ts
export class GenerateLearningMaterialsUrlApplicationCommand extends AbstractApplicationCommand<GenerateLearningMaterialsUrl> {}
```
It's part of your module API (do not misunderstand as REST API). An input into your write module.
If someone wants to do some action inside your module should execute a command.
External issuer may be REST API / WebSocket etc. or another module (commonly - automation slice).
Command reflect certain application use case. **AVOID COMMANDS LIKE CREATE/UPDATE/DELETE.**
You'r application has business logic, so it's not only an explorer for database.

#### CommandHandler
You need a handler for your command, which coordinate domain and external dependencies to fulfilll application's usecases.

CommandHandler code is described in NestJS documentation here: `https://github.com/nestjs/cqrs`
Ignore events part because, we will use different solution, which less overhead.

Read comments about this code below. This pattern repeats with every command.
```ts
@CommandHandler(GenerateLearningMaterialsUrlApplicationCommand)
export class GenerateLearningMaterialsUrlCommandHandler
  implements ICommandHandler<GenerateLearningMaterialsUrlApplicationCommand>
{
  constructor(
      /*You always inject ApplicationService. It works in such way: 
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
    
    @Inject(USERS_PORT) private readonly usersPort: UsersPort,
  ) {}

  async execute(command: GenerateLearningMaterialsUrlApplicationCommand): Promise<void> {
     const userFullName = await this.usersPort.getUserFullNameById(command.data.courseUserId);
     const learningMaterials = await this.learningMaterialsUrlGenerator.generateUrlFor(userFullName);
     
    /**
     * EventStream - you can read it from Event Modeling - it's the name on horizontal lane. 
     * Events from one stream will be read and passed as pastEvents to your domain logic. After domain logic execution new events will be appended to the stream.
     */
    const eventStream = `LearningMaterialsUrl_${command.data.courseUserId}`
    await this.applicationService.execute<LearningMaterialsUrlDomainEvent>(
        eventStream,
      { causationId: command.id, correlationId: command.metadata.correlationId }, //metadata - for tracking and monitoring. May be extended by issuerId etc.
      (pastEvents) => generateLearningMaterialsUrl(pastEvents, command, learningMaterials.url, learningMaterials.id), //load events and pass them to business logic
    );
  }
}
```

### Infrastructure Layer
Here you implement interfaces for application layer dependencies.
In application layer you define by interfaces what is needed, for example: "LearningMaterialsUrlGenerator".
By implementing the interface you communicate with some external dependencies to provide what is needed.

### Presentation Layer
#### REST API
One of possibilities to interact with your app it's an REST API.
It's just need to create command and execute it.
ApplicationCommandFactory class is helpful - you don't need to think how generate commandId, tracking metadata etc.
Just use it for new command, by passing Application Command class, domain command type and required data. As follows.
```ts
@Controller('learning-materials')
export class GenerateLearningMaterialsUrlController {
  constructor(private readonly commandBus: CommandBus, private readonly commandFactory: ApplicationCommandFactory) {}

  @UseGuards(JwtAuthGuard)
  @Post('/url')
  @HttpCode(204)
  async generateUserLearningResourcesUrl(@JwtUserId() userId: UserId): Promise<void> {
    const command = this.commandFactory.applicationCommand((idGenerator) => ({
      class: GenerateLearningMaterialsUrlApplicationCommand,
      type: 'GenerateLearningMaterialsUrl',
      data: { learningMaterialsId: idGenerator.generated(), userId },
    }));

    await this.commandBus.execute(command);
  }
}
```


## Automation Slice

![Automation](https://res.cloudinary.com/coderscamp/image/upload/v1630057227/docs/CodersCamp_App___Event_Storming_-_Automation_hb9c81.jpg)

**Testing strategy:** unit tests (when publish events, then assert if certain command executed)


It's a robot (R2-D2) from the event modeling.
It takes some events as an input (one or more), prepare tasks (green sticky-note) and execute them by issuing a command.

It's an event handler where you can react for something which happened.
Automation it's place where you automate reaction on certain events.
We're using EventEmitter with NestJS instead of EventBus from CQRS, because it's allow for simple usage of
types (without classes) as events. So we don't need wrapper like for application command. Also have more options for subscriptions (wildcards etc.)
You can read about it in NestJS documentation: [NestJS | Techniques | Events](https://docs.nestjs.com/techniques/events)
Instead `@OnEvent` decorator we use our implementation of events subscription, which is resilient and can recover from failures.
We can also track which events was processed by which handler.

```ts
export class LearningMaterialsUrlWasGeneratedEventHandler {
   private eventsSubscription: EventsSubscription;

   constructor(
       private readonly eventsSubscriptionsFactory: EventsSubscriptionsRegistry,
       private readonly commandBus: CommandBus,
   ) {}

   async onModuleInit() {
      this.eventsSubscription = this.eventsSubscriptionsFactory
              .subscription('SendEmailWhenLearningMaterialsUrlWasGenerated_Automation_v1')
              .onEvent<LearningMaterialsUrlWasGenerated>('LearningMaterialsUrlWasGenerated', this.onLearningMaterialsUrlWasGenerated)
              .build();
      await this.eventsSubscription.start();
   }

   async onModuleDestroy() {
      await this.eventsSubscription.stop();
   }

   onLearningMaterialsUrlWasGenerated(event: ApplicationEvent<LearningMaterialsUrlWasGenerated>) {
      this.commandBus.execute(/*SendEmailApplicationCommand etc...*/)
   }
}

```

Of course if you need to react after some sequence of events, you need to keep some state in database between those events.


## Read & Automation - Resilient event subscribers
Now it's time to learn more about how EventsSubscription works.
EventsSubscription is a custom implementation of listening for events which give us:   
- Failures recovery - we can reprocess events in case of failures
- Data source for new features. If you introduce new module for production you need to process old events to fill it with that (event those which are occurred before the module even exists). It can be done by using this implementation.
- Monitoring - we can track which events what processed by which handlers.
- Fast reactions for read models changes with ability to reset subscription and reprocess events.
- Type-safe fluent-api for event handling.
- Atomic event processing and handling acknowledgement.

To learn more you can read about Outbox Pattern, which is widely used in microservices or modular monoliths:
- http://www.kamilgrzybek.com/design/the-outbox-pattern/
- https://microservices.io/patterns/data/transactional-outbox.html

### Context
Provided by NestJs `@OnEvent` mechanism doesn't guarantee event re-processing in case of failure.
Let's imagine example scenario:
1. We published TaskWasCompleted event.
2. Read slice should take this event and increase completed tasks amount in CourseProgress by one.
3. Before CourseProgress update, the application break / there is bug in implementation / or there was some exception in handling logic. In fact, completed tasks count was not increased.

Look how we can create new EventsSubscription and how it works for given scenario.

First step is to compose subscription definition by using the API.
```ts
this.eventsSubscription = this.eventsSubscriptionsFactory
      .subscription('CourseProgressReadModel_v1') // unique subscription id
      .onInitialPosition(this.onInitialPosition) // what to do if subscription just start
      .onEvent<LearningMaterialsUrlWasGenerated>( // what to do on certain event type
        'LearningMaterialsUrlWasGenerated',
        this.onLearningMaterialsUrlWasGenerated,
      )
      .onEvent<TaskWasCompleted>('TaskWasCompleted', this.onTaskWasCompleted)
      .onEvent<TaskWasUncompleted>('TaskWasUncompleted', this.onTaskWasUncompleted)
      .build(); // return subscription configured like below
```

Then you need to start your subscription:
```ts
await this.eventsSubscription.start()
```
This method will read all events which were not processed by the subscription (subscription with given ID didn't exist while published, or was failure while processing) and will pass them to event handlers.
Best place to invoke it is `OnModuleInit` lifecycle hook.

Last piece of usage is to invoke stop() method. Best place to invoke it is `OnModuleDestroy` lifecycle hook.
This method will stop all event listeners.

```ts
await this.eventsSubscription.stop()
```

Now read docs for every method to grasp it better! You can find it in file `events-subscription.ts`.

Return to use case scenario from the beginning.
Let's say that there was a bug, and you have increased by 2 for every completed tasks instead of one.
How to fix it? Do you need to run some raw SQL and edit entries for all users? NO!
Just fix bug in the `onTaskWasCompleted` method. 
In `onInitialPosition` remove all data from CourseProgress table (where count of completed tasks is stored).
As a last change introduce new subscription id like `CourseProgressReadModel_v2` in order to reset subscription position (last processed event).
On the next application run. All wrong calculated CourseProgress rows will be removed, events reprocessed from beginning and every user will have properly calculated CourseProgress.

We provide self-healing solution and exactly-once delivery using Prisma transactions support.
All handlers as a second argument has context, which contain a reference to current database transaction.
Thanks for that handling event and saving last processed event globalOrder (as EventSubscription.currentPosition) is an atomic operation.

## Read Slice

On EventModeling it's a green sticky-note, connected with REST API.

![ReadSlice](https://res.cloudinary.com/coderscamp/image/upload/v1630057023/docs/CodersCamp_App___Event_Storming_-_ReadSlice_dkrybt.jpg)

**Testing strategy:** e2e testing with docker for data storage

Read doesn't belong to certain stream. It's a perfect model for your needs. You can accumulate even events from many streams.
Previously you didn't have requirement to read some data.
It's strictly related to storage technology (sql, graph, elastic search, files, amazon), so we will be testing it e2e and architecture will be without so much layers.
Controller may strictly reach database. Here we don't care about ports & adapters etc.
No abstractions.
We want to have fully access over how we read.

First, create table in database from which we'd like to read your data.
For this example LearningMaterials like this is sufficient:
```prisma
model LearningMaterials {
  id             String @id
  url            String
  courseUserId   String @unique
}
```

Just subscribe for certain events (one or many) and collect data needed to be read after by REST API.
Every handler read some data from event and create/update an entity in the database.
This database is denormalized and prepared for fast reads. No complex queries with many joins anymore!
```ts
@Module({
   imports: [SharedModule],
   controllers: [LearningMaterialsRestController],
})
export class LearningMaterialsReadModule implements OnApplicationBootstrap, OnModuleDestroy {
   private eventsSubscription: EventsSubscription;

   constructor(private readonly eventsSubscriptionsFactory: EventsSubscriptionsRegistry) {}

   async onApplicationBootstrap() {
      this.eventsSubscription = this.eventsSubscriptionsFactory
              .subscription('LearningMaterials_ReadModel_v1')
              .onInitialPosition(this.onInitialPosition)
              .onEvent<LearningMaterialsUrlWasGenerated>(
                      'LearningMaterialsUrlWasGenerated',
                      this.onLearningMaterialsUrlWasGenerated,
              )
              .build();
      await this.eventsSubscription.start();
   }

   async onModuleDestroy() {
      await this.eventsSubscription.stop();
   }

   async onInitialPosition(_position: number, context: { transaction: PrismaTransactionManager }) {
      await context.transaction.learningMaterials.deleteMany({});
   }

   async onLearningMaterialsUrlWasGenerated(
           event: ApplicationEvent<LearningMaterialsUrlWasGenerated>,
           context: { transaction: PrismaTransactionManager },
   ) {
      await context.transaction.learningMaterials.create({
         data: {
            id: event.data.learningMaterialsId,
            courseUserId: event.data.courseUserId,
            url: event.data.materialsUrl,
         },
      });
   }
}
```

After all introduce REST Controller.
```ts
@UseGuards(JwtAuthGuard)
@Controller('learning-materials')
export class LearningMaterialsRestController {
   constructor(private readonly prismaService: PrismaService) {}

   @Get()
   async getLearningMaterial(@JwtUserId() courseUserId: UserId): Promise<GetLearningMaterialResponse> {
      const learningMaterials = await this.prismaService.learningMaterials.findUnique({ where: { courseUserId } });

      if (!learningMaterials) {
         throw new NotFoundException();
      }

      return { id: learningMaterials.id, url: learningMaterials.url };
   }
}
```


There should be no relations / communication between read/write/automation just throughout events and command in `module/shared` directory.


#### Read Slice from many events

![ReadSliceManyEvents](https://res.cloudinary.com/coderscamp/image/upload/v1630058074/docs/CodersCamp_App___Event_Storming_-_ReadSliceManyEvents_yufqbs.jpg)

One event may be useful for many read models.
Another use case if when we'd like to track course progress - completed tasks on learning materials.
It'd be another table in database:

```prisma
model CourseProgress {
  id       String @id @default(dbgenerated("gen_random_uuid()")) @db.Uuid
  courseUserId   String @unique
  learningMaterialsId   String @unique
  learningMaterialsCompletedTasks Int
}
```

Here you need learningMaterialsId and courseUserId in order to read how much tasks every user completed.
courseUserId and learningMaterialsId we can read from LearningMaterialsUrlWasGenerated.
Then we will be increasing and decreasing counter for learningMaterialsCompletedTasks after handling events like
TaskWasCompleted and TaskWasUncompleted.

```ts
export class CourseProgressReadModule implements OnApplicationBootstrap, OnModuleDestroy {
   private eventsSubscription: EventsSubscription;

   constructor(private readonly eventsSubscriptionsFactory: EventsSubscriptionsRegistry) {}

   async onApplicationBootstrap() {
      this.eventsSubscription = this.eventsSubscriptionsFactory
              .subscription('CourseProgress_ReadModel_v1')
              .onInitialPosition(this.onInitialPosition)
              .onEvent<LearningMaterialsUrlWasGenerated>(
                      'LearningMaterialsUrlWasGenerated',
                      this.onLearningMaterialsUrlWasGenerated,
              )
              .onEvent<TaskWasCompleted>('TaskWasCompleted', this.onTaskWasCompleted)
              .onEvent<TaskWasUncompleted>('TaskWasUncompleted', this.onTaskWasUncompleted)
              .build();
      await this.eventsSubscription.start();
   }

   async onModuleDestroy() {
      await this.eventsSubscription.stop();
   }

   async onInitialPosition(_position: number, context: { transaction: PrismaTransactionManager }) {
      await context.transaction.courseProgress.deleteMany({});
   }

   async onLearningMaterialsUrlWasGenerated(
           event: ApplicationEvent<LearningMaterialsUrlWasGenerated>,
           context: { transaction: PrismaTransactionManager },
   ) {
      await context.transaction.courseProgress.create({
         data: {
            courseUserId: event.data.courseUserId,
            learningMaterialsId: event.data.learningMaterialsId,
            learningMaterialsCompletedTasks: 0,
         },
      });
   }

   async onTaskWasCompleted(
           event: ApplicationEvent<TaskWasCompleted>,
           context: { transaction: PrismaTransactionManager },
   ) {
      await context.transaction.courseProgress.update({
         where: {
            learningMaterialsId: event.data.learningMaterialsId,
         },
         data: {
            learningMaterialsCompletedTasks: {
               increment: 1,
            },
         },
      });
   }

   async onTaskWasUncompleted(
           event: ApplicationEvent<TaskWasUncompleted>,
           context: { transaction: PrismaTransactionManager },
   ) {
      const where = { learningMaterialsId: event.data.learningMaterialsId };
      const courseProgress = await context.transaction.courseProgress.findUnique({ where });

      if (!courseProgress || courseProgress.learningMaterialsCompletedTasks === 0) {
         return;
      }

      await context.transaction.courseProgress.update({
         where,
         data: {
            learningMaterialsCompletedTasks: { decrement: 1 },
         },
      });
   }
}
```



# ADR - Architecture Decision Records


## Use EventEmitter2 instead of CQRS EventBus
+ Support for types as events.
+ No need for classes.
- Mixed @nestjs/cqrs (commands) with @nestjs/event-emitter (events)


## Events definitions in shared instead of certain module.
- no clear event origin
+ easier to make small commits and for development parallelization

# Code generation

We use [Plop](https://plopjs.com/documentation/) as code generator.
To generate code run yarn plop and choose one of 6 generators:
- command
- command handler
- event
- domain function
- rest controller
- module

When providing parameters to generators you may use whichever case you want, but you **can't** use spaces as they are used to pass many parameters at once. In most cases if parameter will not be provided the default value will be used instead. 

## Generators

### Command

Creates a new command file in packages/api/src/module/shared/commands with provided name. 

Parameters:
- command name

### Command handler

Creates a new command handler in chosen module directory.

Parameters:
- module directory
- command name
- event name
- domain function name
- stream category name

### Event

Creates a new event file in packages/api/src/module/shared/events with provided name.

Parameters:
- event name

### Domain function

Creates a new domain function file with test file in provided module directory.

Parameters:
- module directory
- domain function name
- command name
- event name
### Rest controller

Creates a new rest controller file in chosen module directory.

Parameters:
- module directory
- controller class name
- method name
- command name
### Module

Combines all of previous generators to create whole module at once. Creates event and command files in proper directories if these does not exists.

Parameters:
- module name
- directory in which module should be created
- command name
- event name
- domain function name 
- stream category name (omitted if domain function name not provided)
- rest controller name
- rest controller method name (omitted if rest controller name not provided)

# TODO in infrastructure

1. Swagger for REST API
2. Publishing certain events via WebSocket for frontend
3. WebSocket documentation with AsyncAPI
4. How to test e2e? Generate valid JWT...
5. Monitoring with Grafana
