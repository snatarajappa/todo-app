import { TaskDocument, TaskStatus } from 'models';

export const isNotVoid = (val?: string | null): boolean =>
  val !== undefined && val !== null && val !== '';

export const customSort = (data: TaskDocument[]): TaskDocument[] =>
  data.sort((task1: TaskDocument, task2: TaskDocument) => {
    if (
      task1.content.status === TaskStatus.ACTIVE &&
      task2.content.status === TaskStatus.ACTIVE
    ) {
      if (task1.content.priority > task2.content.priority) {
        return -1;
      } else if (task1.content.priority < task2.content.priority) {
        return 1;
      }
    } else if (
      task1.content.status === TaskStatus.COMPLETED &&
      task2.content.status === TaskStatus.ACTIVE
    ) {
      return 1;
    } else if (
      task1.content.status === TaskStatus.ACTIVE &&
      task2.content.status === TaskStatus.COMPLETED
    ) {
      return -1;
    } else if (
      task1.content.status === TaskStatus.COMPLETED &&
      task2.content.status === TaskStatus.COMPLETED
    ) {
      if (task1.content.priority > task2.content.priority) {
        return -1;
      } else if (task1.content.priority < task2.content.priority) {
        return 1;
      }
    }
    return 0;
  });
