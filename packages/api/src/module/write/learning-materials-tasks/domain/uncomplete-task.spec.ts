import { UncompleteTask } from "@/commands/uncomplete-task.domain-command";
import { TaskWasCompleted } from "@/events/task-was-completed.domain-event";
import { uncompleteTask } from "@/write/learning-materials-tasks/domain/uncomplete-task";
import { TaskWasUncompleted } from "@/events/task-was-uncompleted-event.domain-event";

describe("uncomplete task", () => {
  const command: UncompleteTask = {
    type: "UncompleteTask",
    data: { learningMaterialsId: "sbAPITNMsl2wW6j2cg1H2A", taskId: "L9EXtwmBNBXgo_qh0uzbq" }
  };

  it("should uncomplete completed task", () => {
    // Given
    const pastEvents: TaskWasCompleted[] = [
      {
        type: "TaskWasCompleted",
        data: { learningMaterialsId: command.data.learningMaterialsId, taskId: "L9EXtwmBNBXgo_qh0uzbq" }
      }
    ];

    // When
    const events = uncompleteTask(pastEvents, command);

    // Then
    expect(events).toStrictEqual([
      {
        type: "TaskWasUncompleted",
        data: { learningMaterialsId: command.data.learningMaterialsId, taskId: command.data.taskId }
      }
    ]);
  });

  it("should throw an error if try to uncomplete uncompleted task", () => {
    // given
    const pastEvents: TaskWasUncompleted[] = [
      {
        type: "TaskWasUncompleted",
        data: { learningMaterialsId: command.data.learningMaterialsId, taskId: command.data.taskId }
      }
    ];

    // when
    const events = () => uncompleteTask(pastEvents, command);

    // then
    expect(events).toThrowError('Can not uncomplete uncompleted task');
  });

  it('should throw an error if try to uncomplete task that was neither completed nor uncompleted yet', () => {
    // given
    const pastEvents: (TaskWasCompleted | TaskWasUncompleted)[] = [];

    // when
    const events = () => uncompleteTask(pastEvents, command);

    // then
    expect(events).toThrowError('Can not uncomplete uncompleted task');
  });
});
