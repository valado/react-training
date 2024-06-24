import { useState } from 'react';
import { Hello } from 'src/app/components/hello';
import { Input } from 'src/app/components/input';

import classes from './home.module.css';
import { SolarSystem } from 'src/app/components/solar-system';
import { StarWars } from 'src/app/components/star-wars';
import { Joke } from 'src/app/components/joke';
import { Planet } from 'src/app/components/planet';

export const Home = () => {
  const [name, setName] = useState('example');
  return (
    <div className={classes.home}>
      <div>
        <Hello name={name} />
      </div>
      <div>
        <Input
          onInputChange={(input: string) => {
            setName(input);
          }}
        />
      </div>
      <div>
        <Planet />
      </div>
      <div>
        <SolarSystem />
      </div>
      <div>
        <Joke />
      </div>
      <div>
        <StarWars />
      </div>
    </div>
  );
};

export default Home;
