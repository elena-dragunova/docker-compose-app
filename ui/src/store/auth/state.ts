import { AppError } from 'src/models/appError';
import { Login } from 'src/models/loginValues';

/** Auth state. */
export interface AuthState {

  /** Whether authentication is in process or not. */
  readonly isLoading: boolean;

  /** Error. */
  readonly error?: AppError<Login>;

}

export const initialState: AuthState = {
  isLoading: false,
};
