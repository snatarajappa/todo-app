import { createAsyncThunk } from '@reduxjs/toolkit';
import { getAuthUser } from '../identity/services';

export const getLoggedUser = createAsyncThunk(
  'GET_LOGGED_USER',
  async () => await getAuthUser(),
);
