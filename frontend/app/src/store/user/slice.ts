import { createSlice } from '@reduxjs/toolkit';

import { UserActions } from './dispatchers';
import { initialState } from './state';

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: builder => builder
    .addCase(UserActions.get, state => {
      state.error = undefined;
      state.isLoading = true;
    })
    .addCase(UserActions.getSuccess, (state, action) => {
      state.user = action.payload;
      state.isLoading = false;
    })
    .addCase(UserActions.getFailure, (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    })
    .addCase(UserActions.remove, state => {
      state.user = null;
    }),
});
