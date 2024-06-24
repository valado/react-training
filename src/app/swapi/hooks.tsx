import { useEffect, useState } from 'react';
import { Planet } from './model/planet';

const SWAPI_API_URL = 'https://swapi.dev/api';

interface PlanetsResponse {
  next: string;
  previous: string;
  results: { name: string }[];
}

interface PlanetDetailsResponse {
  name: string;
  rotation_period: string;
  orbital_period: string;
  diameter: string;
  population: string;
}

export const usePlanets = (): {
  loading: boolean;
  error: boolean;
  planets: Planet[];
  previous?: () => void;
  next?: () => void;
} => {
  const [url, setUrl] = useState(`${SWAPI_API_URL}/planets/`);
  const [response, setResponse] = useState<PlanetsResponse | null>(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(url)
      .then((response) => response.json())
      .then((data: PlanetsResponse) => {
        setResponse(data);
      })
      .catch((e) => {
        console.error(e);
        setError(true);
      })
      .finally(() => setLoading(false));
  }, [url]);

  return {
    loading,
    error,
    planets: response?.results || [],
    previous: response?.previous ? () => setUrl(response?.previous) : undefined,
    next: response?.next ? () => setUrl(response?.next) : undefined,
  };
};

export const usePlanetDetails = (
  id?: string
): {
  loading: boolean;
  error: boolean;
  planetDetails: PlanetDetailsResponse;
} => {
  const [response, setResponse] = useState<PlanetDetailsResponse | null>(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    const url = `${SWAPI_API_URL}/planets/${id}`;
    fetch(url)
      .then((response) => response.json())
      .then((data: PlanetDetailsResponse) => {
        setResponse(data);
      })
      .catch((e) => {
        console.error(e);
        setError(true);
      })
      .finally(() => setLoading(false));
  }, [id]);

  return {
    loading,
    error,
    planetDetails: response || ({} as PlanetDetailsResponse),
  };
};
