import { RootState } from '..';

export const selectIsLoading = (state: RootState) => state.taskGroup.isLoading;
export const selectTaskGroup = (state: RootState) => state.taskGroup.taskGroup;
