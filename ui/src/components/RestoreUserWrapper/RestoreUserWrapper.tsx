import { FC, memo, PropsWithChildren, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'src/store';
import { UserActions } from 'src/store/user/dispatchers';
import { selectIsUserLoading } from 'src/store/user/selectors';
import { AppLoadingSpinner } from 'src/components/AppLoadingSpinner';

/** This component is required to add a user to the redux store if the user's secret is present. */
const RestoreUserWrapperComponent: FC<PropsWithChildren> = ({ children }) => {
  const dispatch = useAppDispatch();
  const isUserLoading = useAppSelector(selectIsUserLoading);

  useEffect(() => {
    dispatch(UserActions.get());
  }, [dispatch]);

  if (isUserLoading) {
    return <AppLoadingSpinner />;
  }

  return <>{children}</>;
};

export const RestoreUserWrapper = memo(RestoreUserWrapperComponent);
