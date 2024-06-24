import { Box, Button, Paper, Stack, TextField } from '@mui/material';
import { Field, FieldProps, Formik, Form } from 'formik';
import { FC } from 'react';
import { getErrors } from 'src/app/utils/formik';
import { LoginSchema } from './validation-schema';
import { Link } from 'react-router-dom';
import { useAuth } from 'src/app/auth/auth-context';

interface LoginFormValues {
  email: string;
  password: string;
}

const initialValues: LoginFormValues = {
  email: '',
  password: '',
};

export const LoginForm: FC = () => {
  const { login } = useAuth();
  return (
    <Box
      sx={(theme) => ({
        display: 'flex',
        alignItems: 'center',
        height: '100vh',
        width: '100vw',
        backgroundColor: theme.palette.primary.main,
      })}
    >
      <Paper
        sx={{
          width: '80%',
          maxWidth: '500px',
          margin: 'auto',
          padding: '2rem',
        }}
      >
        <Formik
          initialValues={initialValues}
          validationSchema={LoginSchema}
          onSubmit={(values, { setSubmitting }) => {
            login(values.email, values.password).finally(() => {
              setSubmitting(false);
            });
          }}
        >
          {({ isSubmitting, isValid, dirty }) => (
            <Form>
              <Stack spacing={3}>
                <h1>Login</h1>
                <Field name="email">
                  {({ field, form }: FieldProps<string>) => (
                    <TextField
                      {...field}
                      label="Email"
                      type="email"
                      error={!!getErrors(field.name, form)}
                      helperText={getErrors(field.name, form)}
                    />
                  )}
                </Field>
                <Field name="password">
                  {({ field, form }: FieldProps<string>) => (
                    <TextField
                      {...field}
                      label="Password"
                      type="password"
                      error={!!getErrors(field.name, form)}
                      helperText={getErrors(field.name, form)}
                    />
                  )}
                </Field>
                <Button
                  type="submit"
                  disabled={isSubmitting || !isValid || !dirty}
                >
                  Login
                </Button>
                <Link to="/register">Register</Link>
              </Stack>
            </Form>
          )}
        </Formik>
      </Paper>
    </Box>
  );
};
