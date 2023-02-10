import { AppError } from 'src/models/appError';
import { Post } from 'src/models/post';

/** Posts state. */
export interface PostsState {

  /** Posts list. */
  readonly posts: Post[];

  /** Error. */
  readonly error?: AppError;

  /** Whether posts are loading or not. */
  readonly isLoading: boolean;
}

export const initialState: PostsState = {
  isLoading: false,
  posts: [],
};
