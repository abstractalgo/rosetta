import { NextPage } from 'next';
import RosettaPage from './[...path]';

// for some reason [...path] page doesn't capture the root, so here it is, separately
const Home: NextPage = () => {
  return (
    <RosettaPage
      availableTechs={[]}
      files={{}}
      query={{ topic: null, techs: [] }}
    />
  );
};

export default Home;
