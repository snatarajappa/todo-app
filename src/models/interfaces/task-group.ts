export interface TaskGroupInput {
  name: string;
  userId: string | undefined;
}

export interface TaskGroup {
  id: string;
  name: string;
  userId: string;
}

export interface TaskGroupDocument {
  id: string;
  content: TaskGroup;
}
