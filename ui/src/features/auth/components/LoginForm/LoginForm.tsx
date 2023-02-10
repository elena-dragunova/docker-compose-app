import { memo, FC, useEffect } from 'react';
import { Box, Button } from '@mui/material';
import { Form, Field } from 'formik';
import { TextField } from 'formik-mui';
import { useAppDispatch, useAppSelector } from 'src/store';
import { AuthActions } from 'src/store/auth/dispatchers';
import { AppForm } from 'src/components/AppForm';
import { selectAuthError } from 'src/store/auth/selectors';

import {
  initValues,
  loginFormSchema,
  LoginFormValue,
} from './LoginForm.settings';

const LoginFormComponent: FC = () => {
  const error = useAppSelector(selectAuthError);
  const dispatch = useAppDispatch();

  const handleUserLogin = (values: LoginFormValue): void => {
    dispatch(AuthActions.login(values));
  };

  useEffect(() => () => {
    dispatch(AuthActions.reset());
  }, [dispatch]);

  return (
    <AppForm
      formikConfig={{
        initialValues: initValues,
        validationSchema: loginFormSchema,
        onSubmit: handleUserLogin,
      }}
      error={error}
    >
      <Box component={Form} sx={{ mt: 1 }}>
        <Field
          component={TextField}
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
        />
        <Field
          component={TextField}
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Sign In
        </Button>
      </Box>
    </AppForm>
  );
};

export const LoginForm = memo(LoginFormComponent);
