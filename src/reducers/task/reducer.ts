import { createReducer, PayloadAction } from '@reduxjs/toolkit';
import {
  changeStatusTask,
  createTask,
  deleteAllTasks,
  deleteTask,
  getDataList,
  loadTasks,
  searchTasks,
  setFilterBy,
  setSearchText,
  setShowSearchBar,
  setSort,
  updateTask,
} from '../task/actions';
import { Task, TaskStatus } from 'models';

interface TaskState {
  tasksList: Task[];
  dataList: Task[];
  searchText: string;
  filterBy: TaskStatus | null;
  sort: boolean;
  showSearchBar: boolean;
  isLoading: boolean;
  isLoadingAll: boolean;
  isSaveFinished: boolean;
  isSearch: boolean;
}

const initialState: TaskState = {
  tasksList: [],
  dataList: [],
  searchText: '',
  filterBy: null,
  sort: false,
  showSearchBar: false,
  isLoading: false,
  isLoadingAll: false,
  isSaveFinished: false,
  isSearch: false,
};

const TaskReducer = createReducer(initialState, (task) => {
  task
    .addCase(searchTasks.pending, (state: TaskState) => ({
      ...state,
      isSearch: true,
    }))
    .addCase(
      searchTasks.fulfilled,
      (state: TaskState, { payload }: PayloadAction<Task[]>) => ({
        ...state,
        tasksList: payload,
        isSearch: false,
      }),
    )
    .addCase(loadTasks.pending, (state: TaskState) => ({
      ...state,
      isLoading: true,
      isSaveFinished: false,
    }))
    .addCase(
      loadTasks.fulfilled,
      (state: TaskState, { payload }: PayloadAction<Task[]>) => ({
        ...state,
        tasksList: payload,
        isLoading: false,
        isSaveFinished: false,
      }),
    )
    .addCase(getDataList.pending, (state: TaskState) => ({
      ...state,
      isLoadingAll: true,
      isSaveFinished: false,
    }))
    .addCase(
      getDataList.fulfilled,
      (state: TaskState, { payload }: PayloadAction<Task[]>) => ({
        ...state,
        dataList: payload,
        isLoadingAll: false,
        isSaveFinished: false,
      }),
    )
    .addCase(createTask.pending, (state: TaskState) => ({
      ...state,
      isLoading: true,
      isSaveFinished: false,
    }))
    .addCase(
      createTask.fulfilled,
      (state: TaskState, { payload }: PayloadAction<Task>) => ({
        ...state,
        tasksList: [...state.tasksList, payload],
        isLoading: false,
        isLoadingAll: false,
        isSaveFinished: true,
      }),
    )
    .addCase(updateTask.pending, (state: TaskState) => ({
      ...state,
      isLoading: true,
      isLoadingAll: false,
      isSaveFinished: false,
    }))
    .addCase(
      updateTask.fulfilled,
      (state: TaskState, { payload }: PayloadAction<Task>) => {
        const auxTaskList = [...state.tasksList];
        const index = auxTaskList.findIndex((x) => x.id === payload.id);
        if (index !== -1) {
          auxTaskList[index] = payload;
        }
        return {
          ...state,
          tasksList: auxTaskList,
          isLoading: false,
          isLoadingAll: false,
          isSaveFinished: true,
        };
      },
    )
    .addCase(changeStatusTask.pending, (state: TaskState) => ({
      ...state,
      isLoading: true,
      isLoadingAll: false,
      isSaveFinished: false,
    }))
    .addCase(
      changeStatusTask.fulfilled,
      (state: TaskState, { payload }: PayloadAction<Task>) => {
        const auxTaskList = [...state.tasksList];
        const index = auxTaskList.findIndex((x) => x.id === payload.id);
        if (index !== -1) {
          auxTaskList[index] = payload;
        }
        return {
          ...state,
          tasksList: auxTaskList,
          isLoading: false,
          isLoadingAll: false,
          isSaveFinished: true,
        };
      },
    )
    .addCase(deleteTask.pending, (state: TaskState) => ({
      ...state,
      isLoading: true,
      isLoadingAll: false,
      isSaveFinished: false,
    }))
    .addCase(
      deleteTask.fulfilled,
      (state: TaskState, { payload }: PayloadAction<Task>) => {
        const auxTaskList = [...state.tasksList];
        const index = auxTaskList.findIndex((x) => x.id === payload.id);
        if (index !== -1) {
          auxTaskList.splice(index, 1);
        }

        return {
          ...state,
          tasksList: [...auxTaskList],
          isLoading: false,
          isLoadingAll: false,
          isSaveFinished: true,
        };
      },
    )
    .addCase(deleteAllTasks.pending, (state: TaskState) => ({
      ...state,
      isLoading: true,
      isLoadingAll: false,
      isSaveFinished: false,
    }))
    .addCase(deleteAllTasks.fulfilled, (state: TaskState) => ({
      ...state,
      tasksList: [],
      dataList: [],
      isLoading: false,
      isLoadingAll: false,
      isSaveFinished: true,
    }))
    .addCase(
      setSearchText,
      (state: TaskState, { payload }: PayloadAction<string>) => ({
        ...state,
        searchText: payload,
      }),
    )
    .addCase(
      setFilterBy,
      (state: TaskState, { payload }: PayloadAction<TaskStatus | null>) => ({
        ...state,
        filterBy: payload,
      }),
    )
    .addCase(setSort, (state: TaskState) => ({
      ...state,
      sort: state?.sort,
    }))
    .addCase(setShowSearchBar, (state: TaskState) => ({
      ...state,
      showSearchBar: !state.showSearchBar,
    }));
});

export default TaskReducer;
