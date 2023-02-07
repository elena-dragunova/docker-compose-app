import { SagaIterator } from 'redux-saga';
import {
  call, put, takeLatest,
} from 'redux-saga/effects';
import { AppErrorMapper } from 'src/api/mappers/appErrorMapper';
import { loginMapper } from 'src/api/mappers/loginMapper';
import { AuthApi } from 'src/api/services/authApi';
import { UserSecretStorageService } from 'src/api/services/userSecretStorage';
import { UserSecret } from 'src/models/userSecret';
import { isApiError } from 'src/utils/axiosErrorGuard';

import { UserActions } from '../user/dispatchers';

import { AuthActions } from './dispatchers';

/**
 * Worker saga which logs in the user.
 * @param action - Login action.
 */
function* loginUserWorker(action: ReturnType<typeof AuthActions.login>): SagaIterator {
  try {
    const userSecret: UserSecret = yield call(AuthApi.login, action.payload);
    yield call(UserSecretStorageService.save, userSecret);
    yield put(AuthActions.loginSuccess());
    yield put(UserActions.get());
  } catch (error: unknown) {
    if (isApiError(error)) {
      const appError = AppErrorMapper.fromDtoWithValidationSupport(error, loginMapper);
      yield put(AuthActions.loginFailure(appError));
    }
    throw error;
  }
}

/** Worker saga which logs out the user. */
function* logoutUserWorker(): SagaIterator {
  try {
    yield call(AuthApi.logout);
    yield put(UserActions.remove());
    yield put(AuthActions.logoutSuccess());
  } catch (error: unknown) {
    if (isApiError(error)) {
      const appError = AppErrorMapper.fromDto(error);
      yield put(AuthActions.logoutFailure(appError));
    }

    throw error;
  }
}

/** Watcher saga for auth. */
export function* authSaga(): SagaIterator {
  yield takeLatest(AuthActions.login.type, loginUserWorker);
  yield takeLatest(AuthActions.logout.type, logoutUserWorker);
}
