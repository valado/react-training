import { FC } from 'react';
import { Planet } from '../planet';

export const SolarSystem: FC = () => {
  const planets = [
    'Mercury',
    'Venus',
    'Earth',
    'Mars',
    'Jupiter',
    'Saturn',
    'Uranus',
    'Neptune',
  ];
  return (
    <>
      <h1>Solar System</h1>
      <div>
        {planets.map((planet) => {
          return <Planet name={planet} key={planet} />;
        })}
      </div>
    </>
  );
};
