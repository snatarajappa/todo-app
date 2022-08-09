import { RootState } from '..';

export const selectTasksList = (state: RootState) => state.task.tasksList;
export const selectSearchText = (state: RootState) => state.task.searchText;
export const selectFilterBy = (state: RootState) => state.task.filterBy;
export const selectSort = (state: RootState) => state.task.sort;
export const selectDataList = (state: RootState) => state.task.dataList;
export const selectIsSavedFinished = (state: RootState) =>
  state.task.isSaveFinished;
export const selectIsLoading = (state: RootState) => state.task.isLoading;
export const selectIsLoadingAll = (state: RootState) => state.task.isLoadingAll;
export const selectIsSearch = (state: RootState) => state.task.isSearch;
export const selectShowSearchBar = (state: RootState) =>
  state.task.showSearchBar;
