import { FC } from 'react';

type PlanetProps = {
  name?: string;
};

export const Planet: FC<PlanetProps> = ({ name }) => {
  return <p>{name}</p>;
};

Planet.defaultProps = {
  name: 'Earth',
};
