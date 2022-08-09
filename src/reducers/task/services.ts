import { AppDBClient } from '@appteam6/domoapps.js';
import { Task, TaskDocument, TaskInput, Query, TaskStatus } from '../../models';
import { ResponseWithBody } from '@appteam6/domoapps.js/dist/lib/models';
import scapeStringRegex from 'escape-string-regexp';
import { customSort, isNotVoid } from 'utils';

const COLLECTION_NAME = 'Task';

export const buildQuery = (query: Query = {}) => {
  const conditions = [];
  if (query !== null && isNotVoid(query.filter)) {
    conditions.push({
      'content.status': query.filter,
    });
  }
  if (query !== null && isNotVoid(query.taskGroupId)) {
    conditions.push({
      'content.taskGroupId': query.taskGroupId,
    });
  }
  if (query !== null && isNotVoid(query.search)) {
    conditions.push({
      'content.title': {
        $regex: scapeStringRegex(query.search as string),
        $options: 'i',
      },
    });
  }
  if (conditions.length === 0) {
    return {};
  }
  const customQuery = {
    $and: conditions,
  };
  return customQuery;
};

export const apiGetTasks = async (query: Query = {}): Promise<Task[]> => {
  const customQuery = buildQuery(query);
  const result = (await new AppDBClient.DocumentsClient(COLLECTION_NAME).get(
    customQuery,
  )) as ResponseWithBody<TaskDocument[]>;
  const sortedList =
    query.sort === true ? customSort(result.data) : result.data;
  const tasks = sortedList.map((doc: TaskDocument) => {
    const task: Task = {
      ...doc.content,
    };
    task.id = doc.id;
    return task;
  });
  return tasks;
};

export const apiCreateTask = async (data: TaskInput): Promise<Task> => {
  const result = (await new AppDBClient.DocumentsClient(COLLECTION_NAME).create(
    data,
  )) as ResponseWithBody<TaskDocument>;
  return apiUpdateTask(result.data.id, data);
};

export const apiGetTask = async (id: string): Promise<Task | null> => {
  const result = (await new AppDBClient.DocumentsClient(COLLECTION_NAME).get({
    'content.id': id,
  })) as ResponseWithBody<TaskDocument[]>;
  if (result.data.length === 0) {
    return null;
  }
  const doc = result.data[0] as TaskDocument;
  const task: Task = {
    ...doc.content,
  };
  return task;
};

export const apiDeleteTask = async (id: string): Promise<Task> => {
  const task = (await apiGetTask(id)) as Task;
  await new AppDBClient.DocumentsClient(COLLECTION_NAME).delete(id);
  return task;
};

export const apiDeleteAllTasks = async () => {
  const result = (await new AppDBClient.DocumentsClient(
    COLLECTION_NAME,
  ).get()) as ResponseWithBody<TaskDocument[]>;
  const ids: string[] = [];
  result.data.map((doc: TaskDocument) => {
    ids.push(doc.id);
  });
  return await new AppDBClient.DocumentsClient(COLLECTION_NAME).delete(ids);
};

export const apiUpdateTask = async (
  id: string,
  data: TaskInput,
): Promise<Task> => {
  const result = (await new AppDBClient.DocumentsClient(COLLECTION_NAME).update(
    { id, content: { id, ...data } },
  )) as ResponseWithBody<TaskDocument>;
  const task: Task = {
    ...result.data.content,
  };
  return task;
};
