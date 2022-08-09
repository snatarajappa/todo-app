import { Identity } from '@appteam6/domoapps.js';
import { createReducer, PayloadAction } from '@reduxjs/toolkit';
import * as AuthenticationActions from '../identity/actions';

interface AuthenticationState {
  user: Identity | null;
  isLoading: boolean;
}

const initialState: AuthenticationState = {
  user: null,
  isLoading: false,
};

const AuthenticationReducer = createReducer(initialState, (authentication) => {
  authentication
    .addCase(
      AuthenticationActions.getLoggedUser.pending,
      (state: AuthenticationState) => ({
        ...state,
        user: null,
        isLoading: true,
      }),
    )
    .addCase(
      AuthenticationActions.getLoggedUser.fulfilled,
      (state: AuthenticationState, { payload }: PayloadAction<Identity>) => ({
        ...state,
        user: payload,
        isLoading: false,
      }),
    );
});

export default AuthenticationReducer;
