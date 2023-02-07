import { memo, useEffect, FC } from 'react';
import { AppLoadingSpinner } from 'src/components/AppLoadingSpinner';
import { useAppDispatch, useAppSelector } from 'src/store';
import { PostsActions } from 'src/store/posts/dispatchers';

import { PostCard } from '../../components/PostCard';

const PostsPageComponent: FC = () => {
  const dispatch = useAppDispatch();
  const { posts, isLoading } = useAppSelector(state => state.posts);

  useEffect(() => {
    dispatch(PostsActions.get());
    return () => {
      dispatch(PostsActions.cancelGet());
    };
  }, [dispatch]);

  if (isLoading && posts.length === 0) {
    return <AppLoadingSpinner />;
  }

  return (
    <>
      <h2>Posts</h2>
      {posts.map(post => (
        <PostCard key={post.id} post={post} />
      ))}
    </>
  );
};

export const PostsPage = memo(PostsPageComponent);
