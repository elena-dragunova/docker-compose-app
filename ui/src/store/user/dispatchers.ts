import { createComposeActionFn } from 'src/utils/createComposeAction';
import { User } from 'src/models/user';
import { AppError } from 'src/models/appError';

export namespace UserActions {
  const composeAction = createComposeActionFn('user');

  export const get = composeAction('get');
  export const getSuccess = composeAction<User>('getSuccess');
  export const getFailure = composeAction<AppError>('getFailure');
  export const remove = composeAction('remove');
}
