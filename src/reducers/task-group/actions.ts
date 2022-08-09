import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { TaskGroupInput } from 'models';
import { loadTaskGroup, updateTaskGroupTitle } from '../task-group/services';

export const loadUserTaskGroup = createAsyncThunk(
  'LOAD_TASK_GROUP',
  async (payload: { userId: string }) => await loadTaskGroup(payload.userId),
);

export const setIsLoading = createAction<boolean>('IS_LOADING_TASK_GROUP');

export const updateTaskGroup = createAsyncThunk(
  'UPDATE_TASK_GROUP',
  async (payload: { id: string; data: TaskGroupInput }) =>
    await updateTaskGroupTitle(payload.id, payload.data),
);
