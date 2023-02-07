import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';

const HomePage = lazy(() => import('./pages').then(module => ({ default: module.HomePage })));

export const homeRoutes: RouteObject[] = [
  {
    path: '',
    element: <HomePage />,
  },
];
