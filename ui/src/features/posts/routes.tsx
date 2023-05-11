import { lazy } from 'react';
import { Navigate, RouteObject } from 'react-router-dom';
import { AuthGuard } from 'src/routes/guards/authGuard';

const PostsPage = lazy(() => import('./pages/PostsPage').then(module => ({ default: module.PostsPage })));

// TODO (template preparation): This feature was made for template. Remove it from your project.
export const postsRoutes: RouteObject[] = [
  {
    element: <AuthGuard />,
    children: [
      {
        path: 'posts',
        element: <PostsPage />,
      },
      {
        path: '*',
        element: <Navigate to="posts" />,
      },
    ],
  },
];
