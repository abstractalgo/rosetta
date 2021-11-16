import { FC } from 'react';
import Head from 'next/head';
import { CONSTANTS } from '../utils/constants';

type MetaTagsProps = {
  titleSection?: string;
};

export const MetaTags: FC<MetaTagsProps> = ({ titleSection }) => {
  const title = titleSection ? `rosetta :: ${titleSection}` : CONSTANTS.title;

  return (
    <Head>
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={CONSTANTS.description} />

      {/* facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={CONSTANTS.description} />
      <meta property="og:image" content={CONSTANTS.img} />
      <meta property="og:url" content={CONSTANTS.url} />
      <meta property="og:site_name" content={CONSTANTS.title} />

      {/* twitter */}
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={CONSTANTS.description} />
      <meta name="twitter:image" content={CONSTANTS.img} />
      <meta name="twitter:card" content="summary" />
      {/* <meta name="twitter:site" content=___TBD___" /> */}
      {/* <meta name="twitter:creator" content="___TBD___" /> */}
      <link rel="icon" href="/logo.svg" />
    </Head>
  );
};
