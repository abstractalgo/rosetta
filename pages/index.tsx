import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>rosetta</title>
        <meta name="description" content="rosetta tech directory" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1>rosetta</h1>
      
      <p>rosetta for programming languages and tools.</p>
    </div>
  );
};

export default Home;
