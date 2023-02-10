import { memo, FC } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  AppBar, Box, Button, Link, Toolbar,
} from '@mui/material';
import { useAppDispatch, useAppSelector } from 'src/store';
import { AuthActions } from 'src/store/auth/dispatchers';
import { selectUser } from 'src/store/user/selectors';

const AppHeaderComponent: FC = () => {
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();

  const handleUserLogout = () => {
    dispatch(AuthActions.logout());
  };

  const rightSection = user ? (
    <Box sx={{ display: 'flex', alignItems: 'baseline' }}>
      <span>
        Hello,
        {' '}
        <b>{user.name}</b>
      </span>
      <Button
        color="inherit"
        onClick={handleUserLogout}
        sx={{ mx: 1 }}
      >
        Logout
      </Button>
    </Box>
  ) : (
    <Button
      component={RouterLink}
      color="inherit"
      variant="outlined"
      to="login"
    >
      Login
    </Button>
  );

  return (
    <AppBar position="relative">
      <Toolbar>
        {/* Read more about routing in MUI here: https://mui.com/guides/routing/ */}
        <Link
          component={RouterLink}
          to="/"
          variant="h5"
          color="inherit"
          underline="none"
          noWrap
        >
          React Boilerplate
        </Link>
        <div />
        <Box sx={{ flexGrow: 1 }} />
        {rightSection}
      </Toolbar>
    </AppBar>
  );
};

export const AppHeader = memo(AppHeaderComponent);
