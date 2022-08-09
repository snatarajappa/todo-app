import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { Task, TaskStatus, Query, TaskInput } from 'models';
import {
  apiGetTasks,
  apiCreateTask,
  apiUpdateTask,
  apiDeleteTask,
  apiDeleteAllTasks,
} from '../task/services';

export const createTask = createAsyncThunk(
  'CREATE_TASK',
  async (payload: TaskInput) => await apiCreateTask(payload),
);

export const updateTask = createAsyncThunk(
  'UPDATE_TASK',
  async (payload: { id: string; data: TaskInput }) =>
    await apiUpdateTask(payload.id, payload.data),
);

export const deleteTask = createAsyncThunk(
  'DELETE_TASK',
  async (taskId: string) => await apiDeleteTask(taskId),
);

export const deleteAllTasks = createAsyncThunk(
  'DELETE_ALL_TASK',
  async () => await apiDeleteAllTasks(),
);

export const loadTasks = createAsyncThunk(
  'LOAD_TASKS',
  async (query: Query = {}) => await apiGetTasks(query),
);

export const getDataList = createAsyncThunk(
  'GET_TASKS',
  async (query: Query = {}) => await apiGetTasks(query),
);

export const searchTasks = createAsyncThunk(
  'SEARCH_TASKS',
  async (query: Query = {}) => await apiGetTasks(query),
);

export const changeStatusTask = createAsyncThunk(
  'CHANGE_STATUS_TASK',
  async (payload: Task) => {
    const data: TaskInput = {
      ...payload,
    };
    if (data.status === TaskStatus.COMPLETED) {
      data.status = TaskStatus.ACTIVE;
    } else {
      data.status = TaskStatus.COMPLETED;
    }
    return await apiUpdateTask(payload.id, data);
  },
);

export const setSearchText = createAction<string>('SEARCH_TEXT');
export const setFilterBy = createAction<TaskStatus | null>('FILTER_BY');
export const setSort = createAction<boolean>('SORT');
export const setShowSearchBar = createAction<boolean>('SHOW_SEARCH_BAR');
