import { TaskPriority } from 'models/enums/task-priority';
import { TaskStatus } from 'models/enums/task-status';

export interface TaskInput {
  title: string;
  notes?: string | null;
  url?: string | null;
  dueDate?: string | null;
  priority: TaskPriority;
  status: TaskStatus;
  taskGroupId?: string | null;
}

export interface Task {
  id: string;
  title: string;
  notes?: string | null;
  url?: string | null;
  dueDate?: string | null;
  priority: TaskPriority;
  status: TaskStatus;
  taskGroupId?: string | null;
}

export interface TaskDocument {
  id: string;
  content: Task;
}
