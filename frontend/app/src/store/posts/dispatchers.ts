import { createComposeActionFn } from 'src/utils/createComposeAction';
import { AppError } from 'src/models/appError';
import { Post } from 'src/models/post';

export namespace PostsActions {
  const composeAction = createComposeActionFn('posts');

  export const get = composeAction('get');
  export const getSuccess = composeAction<Post[]>('getSuccess');
  export const getFailure = composeAction<AppError>('getFailure');
  export const cancelGet = composeAction('cancelGet');
}
