import { FC } from 'react';
import { Navigate, Outlet, useSearchParams } from 'react-router-dom';
import { useAppSelector } from 'src/store';
import { selectUser } from 'src/store/user/selectors';

export const NonAuthGuard: FC = () => {
  const user = useAppSelector(selectUser);
  const [search] = useSearchParams();

  if (user != null) {
    const redirect = search.get('next') ?? '';
    return <Navigate to={redirect} replace />;
  }

  return <Outlet />;
};
