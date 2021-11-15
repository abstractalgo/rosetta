import { NextPage } from 'next';
import RosettaPage from './[...path]';

const Home: NextPage = () => {
  return (
    <RosettaPage
      availableLangs={[]}
      files={{}}
      query={{ feature: null, langs: [] }}
    />
  );
};

export default Home;
