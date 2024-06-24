import { useRouteError } from 'react-router-dom';

export const ErrorElement = () => {
  const error = useRouteError();
  console.error(error);
  return <div>Some Error!</div>;
};
