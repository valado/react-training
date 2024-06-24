import { Button } from '@mui/material';
import { useState } from 'react';

const JOKE_API_URL = 'https://api.chucknorris.io/jokes/random?category=dev';

export const Joke = () => {
  const [joke, setJoke] = useState('');

  return (
    <div>
      <h1>Chuck Norris Jokes</h1>
      <p>{joke}</p>
      <Button
        onClick={() => {
          fetch(JOKE_API_URL)
            .then((response) => response.json())
            .then((data) => setJoke(data.value));
        }}
      >
        Fetch Joke
      </Button>
    </div>
  );
};
