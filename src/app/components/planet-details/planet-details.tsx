import { FC } from 'react';
import { useParams } from 'react-router-dom';
import PublicIcon from '@mui/icons-material/Public';
import { usePlanetDetails } from 'src/app/swapi/hooks';
import { Box, Card } from '@mui/material';

export const PlanetDetails: FC = () => {
  const { id: planetId } = useParams();
  const { planetDetails, loading, error } = usePlanetDetails(planetId);
  if (error) {
    return <div>Something went wrong</div>;
  }
  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Card sx={{ padding: '1rem' }}>
        <PublicIcon />
        <h1>{planetDetails.name}</h1>
        <div>Rotation period: {planetDetails.rotation_period}</div>
        <div>Orbital period: {planetDetails.orbital_period}</div>
        <div>Diameter: {planetDetails.diameter}</div>
        <div>Population: {planetDetails.population}</div>
      </Card>
    </Box>
  );
};
