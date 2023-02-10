import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '../store';

export const selectAuthIsLoading = createSelector((state: RootState) => state.auth.isLoading, isLoading => isLoading);

export const selectAuthError = createSelector((state: RootState) => state.auth.error, error => error);
