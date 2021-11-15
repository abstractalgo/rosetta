import { MenuItem } from '@blueprintjs/core';
import { Select } from '@blueprintjs/select';
import type { NextPage, NextPageContext } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/dist/client/router';
import Head from 'next/head';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Column } from '../../components/Column';
import { Feature, FeatureMeta, FeatureOptions } from '../../utils/features';
import { Language, LanguageOptions } from '../../utils/langs';

const FeatureSelect = Select.ofType<Feature>();

type RosettaPageProps = {
  listing: Record<Feature, Record<Language, string>>;
};

const RosettaPage: NextPage<RosettaPageProps> = ({ listing }) => {
  const router = useRouter();

  const query = router.query as { feature: Feature; langs: Language[] };

  const [feature, setFeature] = useState<Feature | null>(query.feature || null);
  const [langs, setLangs] = useState<Language[]>(query.langs || []);

  useEffect(() => {
    if (!feature) {
      router.push(`/`);
      return;
    }

    router.push(`/${feature}/${langs.join('/')}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [langs, feature]);

  return (
    <div>
      <Head>
        <title>rosetta</title>
        <meta name="description" content="rosetta tech directory" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1>rosetta</h1>

      <p>rosetta for programming languages and tools.</p>

      <p>
        contribute on{' '}
        <a
          href="https://github.com/abstractalgo/rosetta"
          target="_blank"
          rel="noreferrer"
        >
          Github
        </a>
        .
      </p>

      <FeatureSelect
        filterable
        activeItem={feature}
        items={FeatureOptions as unknown as Feature[]}
        onItemSelect={(feature) => setFeature(feature)}
        itemRenderer={(feature, { handleClick, modifiers: { active } }) => (
          <MenuItem
            key={feature}
            selected={active}
            onClick={handleClick}
            text={FeatureMeta[feature].label}
          />
        )}
        inputProps={{
          small: true,
        }}
        popoverProps={{
          minimal: true,
        }}
      >
        {feature === null
          ? 'Select a feature...'
          : `${FeatureMeta[feature].label}`}
      </FeatureSelect>

      {feature && <div>{FeatureMeta[feature].description}</div>}

      {feature && (
        <div
          style={{
            display: 'grid',
            gridAutoFlow: 'column',
            gridAutoColumns: '400px',
            columnGap: '20px',
          }}
        >
          {[...langs, null].map((lang, idx) => (
            <Column
              key={`${lang}-${idx}`}
              feature={feature}
              languages={LanguageOptions as unknown as Language[]}
              lang={lang}
              onSelect={(selectedLang) => {
                if (!lang) {
                  setLangs([...langs, selectedLang]);
                } else {
                  const idx = langs.indexOf(lang);
                  langs.splice(idx, 1, selectedLang);
                  setLangs([...langs]);
                }
              }}
              onRemove={() => {
                if (!lang) {
                  return;
                }
                langs.splice(idx, 1);
                setLangs([...langs]);
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export async function getServerSideProps(context: NextPageContext) {
  return {
    props: {}, // will be passed to the page component as props
  };
}

export default RosettaPage;
