import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '../store';

export const selectPosts = createSelector((state: RootState) => state.posts.posts, post => post);
