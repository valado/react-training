import { Field, FieldProps, Form, Formik } from 'formik';
import { FC } from 'react';
import { RegistrationSchema } from './validation-schema';
import { Box, Button, Paper, Stack, TextField } from '@mui/material';
import { getErrors } from 'src/app/utils/formik';
import { useAuth } from 'src/app/auth/auth-context';

interface RegistrationFormValues {
  email: string;
  password: string;
  repeatPassword: string;
}

const initialValues: RegistrationFormValues = {
  email: '',
  password: '',
  repeatPassword: '',
};

export const RegistrationForm: FC = () => {
  const { register } = useAuth();
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
          validationSchema={RegistrationSchema}
          onSubmit={(values, { setSubmitting }) => {
            register(values.email, values.password).finally(() => {
              setSubmitting(false);
            });
          }}
        >
          {({ isSubmitting, isValid, dirty }) => (
            <Form>
              <Stack spacing={3}>
                <h1>Register</h1>
                <Field name="email">
                  {({ field, form }: FieldProps<string>) => (
                    <TextField
                      {...field}
                      type="email"
                      label="Email"
                      error={!!getErrors(field.name, form)}
                      helperText={getErrors(field.name, form)}
                    />
                  )}
                </Field>
                <Field name="password">
                  {({ field, form }: FieldProps<string>) => (
                    <TextField
                      {...field}
                      type="password"
                      label="Password"
                      error={!!getErrors(field.name, form)}
                      helperText={getErrors(field.name, form)}
                    />
                  )}
                </Field>
                <Field name="repeatPassword">
                  {({ field, form }: FieldProps<string>) => (
                    <TextField
                      {...field}
                      type="password"
                      label="Repeat Password"
                      error={!!getErrors(field.name, form)}
                      helperText={getErrors(field.name, form)}
                    />
                  )}
                </Field>
                <Button
                  type="submit"
                  disabled={isSubmitting || !isValid || !dirty}
                >
                  Register
                </Button>
              </Stack>
            </Form>
          )}
        </Formik>
      </Paper>
    </Box>
  );
};
