import { createSlice } from '@reduxjs/toolkit';

import { PostsActions } from './dispatchers';

import { initialState } from './state';

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: builder => builder
    .addCase(PostsActions.get, state => {
      state.error = undefined;
      state.isLoading = true;
    })
    .addCase(PostsActions.getSuccess, (state, action) => {
      state.posts = action.payload;
      state.isLoading = false;
    })
    .addCase(PostsActions.getFailure, (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    })
    .addCase(PostsActions.cancelGet, state => {
      state.error = undefined;
      state.isLoading = false;
    }),
});
