import { SagaIterator } from 'redux-saga';
import {
  call, cancel, cancelled, fork, put, take,
} from 'redux-saga/effects';
import { AppErrorMapper } from 'src/api/mappers/appErrorMapper';
import { PostApiService } from 'src/api/services/postApi';
import { Post } from 'src/models/post';
import { isApiError } from 'src/utils/axiosErrorGuard';

import { PostsActions } from './dispatchers';

/** Worker saga which fetches posts. */
function* fetchPostsWorker(): SagaIterator {
  const abortController = new AbortController();
  try {
    const posts: Post[] = yield call(PostApiService.fetchPosts, abortController.signal);
    yield put(PostsActions.getSuccess(posts));
  } catch (error: unknown) {
    if (isApiError(error)) {
      const appError = AppErrorMapper.fromDto(error);
      yield put(PostsActions.getFailure(appError));
    }

    throw error;
  } finally {
    // You can read more about task cancellation here: https://redux-saga.js.org/docs/advanced/TaskCancellation/
    if (yield cancelled()) {
      abortController.abort();
    }
  }
}

/** Watcher saga for posts. */
export function* postsSaga(): SagaIterator {
  while (yield take(PostsActions.get.type)) {
    const task = yield fork(fetchPostsWorker);
    yield take(PostsActions.cancelGet.type);
    yield cancel(task);
  }
}
