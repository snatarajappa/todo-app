// WARNING: DO NOT DELETE ANY BOILERPLATE COMMENTS IN THIS FILE.
// IF YOU DO, GENERATED REDUCERS WILL NOT BE WIRED UP AUTOMATICALLY.
import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import taskReducer from './task/reducer';
import taskGroupReducer from './task-group/reducer';
import authenticationReducer from './identity/reducer';
// importRef

export const store = configureStore({
  reducer: {
    task: taskReducer,
    taskGroup: taskGroupReducer,
    authentication: authenticationReducer,
    // reducerRef
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
