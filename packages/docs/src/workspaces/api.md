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
Extremely easy for testing, because it's output depends on the output. No external dependencies and side effects.

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

```ts
@Injectable()
export class SendEmailWhenLearningMaterialsUrlWasGenerated {
  
  constructor(private readonly commandBus: CommandBus){}
  
  @OnEvent('LearningMaterialsUrl.*')
  handleLearningMaterialsUrlWasGenerated(event: ApplicationEvent<LearningMaterialsUrlDomainEvent>) {
    switch(event.type){ //you can use type guard to read certain event data
      case 'LearningMaterialsWere':
        this.commandBus.execute(/*SendEmailApplicationCommand etc...*/)
      default: 
        return;
    }
  }

  //or build just for certain event
  @OnEvent('LearningMaterialsUrl.LearningMaterialsUrlWasGenerated')
  handleLearningMaterialsUrlDomainEvent(event: ApplicationEvent<LearningMaterilsUrlWasGenerated>) {
    this.commandBus.execute(/*SendEmailApplicationCommand etc...*/)
  }
}
```

Of course if you need to react after some sequence of events, you need to keep some state in database between those events.


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

Just build for certain events (one or many) and collect data needed to be read after by REST API.
Every handler read some data from event and create/update an entity in the database.
This database is denormalized and prepared for fast reads. No complex queries with many joins anymore!
```ts
@Module({
   imports: [SharedModule],
   controllers: [LearningMaterialsRestController],
})
export class LearningMaterialsReadModule {
   constructor(private readonly prismaService: PrismaService) {}

   // define certain type in the @OnEvent or use wildcards and switch-case inside the handler like in domain logic
   @OnEvent('LearningMaterialsUrl.LearningMaterialsUrlWasGenerated')
   async onLearningResourcesUrlWasGenerated(event: ApplicationEvent<LearningMaterialsUrlWasGenerated>) {
      await this.prismaService.learningMaterials.create({
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
export class CourseProgressReadModule {
  constructor(private readonly prismaService: PrismaService) {}

  @OnEvent('LearningMaterialsUrl.LearningMaterialsUrlWasGenerated')
  async onLearningResourcesUrlWasGenerated(event: ApplicationEvent<LearningMaterialsUrlWasGenerated>) {
    await this.prismaService.courseProgress.create({
      data: {
        courseUserId: event.data.courseUserId,
        learningMaterialsId: event.data.learningMaterialsId,
        learningMaterialsCompletedTasks: 0,
      },
    });
  }

  //should be transaction here, ommited for readability
   @OnEvent('LearningMaterialsTask.TaskWasCompleted')
   async onTaskWasCompleted(event: ApplicationEvent<TaskWasCompleted>) {
      const where = { learningMaterialsId: event.data.learningMaterialsId }
      const courseProgress = await this.prismaService.findUnique({where})
      if(!courseProgress){
        return;
      }
      await this.prismaService.courseProgress.update({
         data: {
            learningMaterialsCompletedTasks: courseProgress.learningMaterialsCompletedTasks + 1,
         },
         where
      });
   }
}
```

#### Resilient event subscribers
Provided by NestJs `@OnEvent` mechanism doesn't quarantee event processing. 
Let's imagine simple situation. 
1. We published TaskWasCompleted event.
2. Read slice should take this event and increase completed tasks amount in CourseProgress by one.
3. Before CourseProgress update, the application break or there was some exception in handling logic.

After app rerun or fix deploy, the event won't be processed once more. 
So we introduced mechanism based on EventRepository.
Now, instead of using `@OnEvent` you should inject `EventsSubscriptionsFactory`. 
Usage is so simple with provided fluent api.
It's also type-safe, and you won't make a mistake in event pattern like in inside @OnEvent.
An example you can find in CourseProgressReadModule.

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
This method will read all events which were not processed by the subscription and will pass them to event handlers.
Best place to invoke it is `OnModuleInit` lifecycle hook.
Last piece is:
```ts
await this.eventsSubscription.stop()
```
This method will stop all event listeners.
Best place to invoke it is `OnModuleDestroy` lifecycle hook.


##### Best practices & use cases of EventSubscriptions

###### Error handling & processing quarante

###### Change in read model logic
If your subscription purpose is to build read model. 
Example of read model is processing TaskWasChecked / TaskWasUnchecked event to be able to show CourseProgress.
Let's say we want to change logic, and give 10 points per task.
If there is no past events stored, we would have a big problem.
But they are. Now we can just process events from the beginning and build a new one CourseProgress.
So we should delete all data while starting processing events.
You can do it in `onInitialPosition` method. 
Whenever you want to rebuild some read model just change subscription id (for example from `'CourseProgressReadModel_v1'` to `'CourseProgressReadModel_v2'`)
You should have one subscription per read model to maintain.




# ADR - Architecture Decision Records


## Use EventEmitter2 instead of CQRS EventBus
+ Support for types as events.
+ No need for classes.
- Mixed @nestjs/cqrs (commands) with @nestjs/event-emitter (events)


## Events definitions in shared instead of certain module.
- no clear event origin
+ easier to make small commits and for development parallelization


# TODO in infrastructure

1. Swagger for REST API
2. Publishing certain events via WebSocket for frontend
3. WebSocket documentation with AsyncAPI
4. How to test e2e? Generate valid JWT...
5. Monitoring with Grafana
