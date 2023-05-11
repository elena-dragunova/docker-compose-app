import { AppError } from 'src/models/appError';
import { User } from 'src/models/user';

/** User state. */
export interface UserState {

  /** Whether authentication is in process or not. */
  readonly isLoading: boolean;

  /** Error. */
  readonly error?: AppError;

  /** User. */
  readonly user: User | null;
}

export const initialState: UserState = {
  isLoading: false,
  user: null,
};
