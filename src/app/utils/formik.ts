import { FieldProps } from 'formik';

export const getErrors = (name: string, form: FieldProps['form']) => {
  const errors = form.errors[name] as string;
  const touched = form.touched[name];
  return errors && touched ? errors : '';
};
