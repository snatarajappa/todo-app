import { createReducer, PayloadAction } from '@reduxjs/toolkit';
import * as TaskGroupActions from '../task-group/actions';
import { TaskGroup } from 'models';

interface TaskGroupState {
  isLoading: boolean;
  taskGroup: TaskGroup | null;
}

const initialState: TaskGroupState = {
  isLoading: false,
  taskGroup: null,
};

const TaskGroupReducer = createReducer(initialState, (taskGroup) => {
  taskGroup
    .addCase(
      TaskGroupActions.loadUserTaskGroup.pending,
      (state: TaskGroupState) => ({
        ...state,
        isLoading: true,
      }),
    )
    .addCase(
      TaskGroupActions.loadUserTaskGroup.fulfilled,
      (state: TaskGroupState, { payload }: PayloadAction<TaskGroup>) => ({
        ...state,
        taskGroup: payload,
        isLoading: false,
      }),
    )
    .addCase(
      TaskGroupActions.updateTaskGroup.fulfilled,
      (state: TaskGroupState) => ({
        ...state,
        isLoading: false,
      }),
    )
    .addCase(
      TaskGroupActions.updateTaskGroup.pending,
      (state: TaskGroupState) => ({
        ...state,
        isLoading: true,
      }),
    )
    .addCase(
      TaskGroupActions.setIsLoading,
      (state: TaskGroupState, { payload }: PayloadAction<boolean>) => ({
        ...state,
        isLoading: payload,
      }),
    );
});

export default TaskGroupReducer;
