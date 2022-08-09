import { ResponseWithBody } from '@appteam6/domoapps.js/dist/lib/models';
import { AppDBClient } from '@appteam6/domoapps.js';
import { TaskGroup, TaskGroupDocument, TaskGroupInput } from 'models';
const COLLECTION_NAME = 'TaskGroup';

export const loadTaskGroup = async (userId: string): Promise<TaskGroup> => {
  let userTaskGroup: TaskGroup | null = await getTaskGroupByUser(userId);

  if (!userTaskGroup) {
    const defaultTaskGroup: TaskGroupInput = {
      name: 'My Tasks',
      userId,
    };
    userTaskGroup = await createTaskGroupUser(defaultTaskGroup);
  }
  return userTaskGroup;
};

export const getTaskGroupByUser = async (
  userId: string,
): Promise<TaskGroup | null> => {
  const result = (await new AppDBClient.DocumentsClient(COLLECTION_NAME).get({
    'content.userId': userId,
  })) as ResponseWithBody<TaskGroupDocument[]>;
  if (result.data.length === 0) {
    return null;
  }
  const doc = result.data[0] as TaskGroupDocument;
  const taskGroup: TaskGroup = {
    ...doc.content,
  };
  return taskGroup;
};

export const createTaskGroupUser = async (
  data: TaskGroupInput,
): Promise<TaskGroup> => {
  const result = (await new AppDBClient.DocumentsClient(COLLECTION_NAME).create(
    data,
  )) as ResponseWithBody<TaskGroupDocument>;

  return updateTaskGroupTitle(result.data.id, data);
};

export const updateTaskGroupTitle = async (
  id: string,
  data: TaskGroupInput,
): Promise<TaskGroup> => {
  const result = (await new AppDBClient.DocumentsClient(COLLECTION_NAME).update(
    {
      id,
      content: { id, ...data },
    },
  )) as ResponseWithBody<TaskGroupDocument>;
  const taskGroup: TaskGroup = {
    ...result.data.content,
  };
  return taskGroup;
};
