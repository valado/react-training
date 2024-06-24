import { FC, PropsWithChildren } from 'react';
import { usePlanets } from 'src/app/swapi/hooks';
import { Planet } from '../planet';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';

const StarWarsContainer: FC<PropsWithChildren> = ({ children }) => (
  <>
    <h1>Star Wars</h1>
    {children}
  </>
);

export const StarWars: FC = () => {
  const { loading, error, planets, previous, next } = usePlanets();

  if (loading) {
    return <StarWarsContainer>Loading...</StarWarsContainer>;
  }

  if (error) {
    return <StarWarsContainer>Something went wrong</StarWarsContainer>;
  }

  return (
    <StarWarsContainer>
      <div>
        {planets?.map((planet, idx) => {
          return (
            <Link to={`/planet/${idx + 1}`} key={planet.name}>
              <Planet name={planet.name} />
            </Link>
          );
        })}
      </div>
      <div>
        {previous && (
          <Button sx={{ mx: '0.2rem' }} onClick={previous}>
            Previous
          </Button>
        )}
        {next && (
          <Button sx={{ mx: '0.2rem' }} onClick={next}>
            Next
          </Button>
        )}
      </div>
    </StarWarsContainer>
  );
};
