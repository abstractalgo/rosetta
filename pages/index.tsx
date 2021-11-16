import { NextPage } from 'next';
import RosettaPage from './[...path]';

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
