import { User as UserModel } from '@appteam6/domoapps.js/dist/lib/models';
import { TaskStatus } from '../enums/task-status';

export type User = UserModel;

export interface Query {
  filter?: TaskStatus | null;
  search?: string | null;
  taskGroupId?: string | null;
  sort?: boolean;
}

export interface TaskFilterOption {
  key: TaskStatus | null;
  option: string;
}
