import { SagaIterator } from 'redux-saga';
import { call, put, takeLatest } from 'redux-saga/effects';
import { AppErrorMapper } from 'src/api/mappers/appErrorMapper';
import { UserApi } from 'src/api/services/userApi';
import { UserSecretStorageService } from 'src/api/services/userSecretStorage';
import { AppError } from 'src/models/appError';
import { User } from 'src/models/user';
import { isApiError } from 'src/utils/axiosErrorGuard';

import { UserActions } from './dispatchers';

/** Working saga that gets the current user. */
function* fetchUserWorker(): SagaIterator {
  try {
    const isUserSecretSaved: boolean = yield call(
      UserSecretStorageService.isValid,
    );

    if (isUserSecretSaved) {
      const user: User = yield call(UserApi.getCurrentUser);
      yield put(UserActions.getSuccess(user));
    } else {
      yield put(
        UserActions.getFailure(new AppError('The user secret is missing from the app')),
      );
    }
  } catch (error: unknown) {
    if (isApiError(error)) {
      const appError = AppErrorMapper.fromDto(error);
      yield put(UserActions.getFailure(appError));
    }

    throw error;
  }
}

/** Watcher saga for user. */
export function* userSaga(): SagaIterator {
  yield takeLatest(UserActions.get.type, fetchUserWorker);
}
