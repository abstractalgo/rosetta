/* eslint-disable @next/next/no-img-element */
import { Button, MenuItem } from '@blueprintjs/core';
import { Select } from '@blueprintjs/select';
import type { NextPage, NextPageContext } from 'next';
import { useRouter } from 'next/dist/client/router';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { Column } from '../components/Column';
import { Feature, FeatureMeta, FeatureOptions } from '../utils/features';
import { Language, LanguageOptions } from '../utils/langs';
import { readFile, readdir } from 'fs/promises';

const FeatureSelect = Select.ofType<Feature>();

type RosettaPageProps = {
  files: Partial<Record<Language, string>>;
  availableLangs: Language[];
  query: {
    feature: Feature | null;
    langs: Language[];
  };
};

const RosettaPage: NextPage<RosettaPageProps> = ({
  files,
  query,
  availableLangs,
}) => {
  const router = useRouter();

  const [feature, setFeature] = useState<Feature | null>(query.feature || null);
  const [langs, setLangs] = useState<Language[]>(query.langs || []);

  const currentPath = `/${feature}/${langs.join('/')}`;

  useEffect(() => {
    if (!feature) {
      router.push(`/`);
      return;
    }

    if (router.pathname !== currentPath) {
      router.push(currentPath);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [langs, feature]);

  return (
    <div>
      <Head>
        <title>rosetta</title>
        <meta name="description" content="rosetta tech directory" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main
        style={{
          width: '100%',
          padding: '0 40px',
          maxWidth: 'calc(100% - 80px)',
          overflow: 'hidden',
        }}
      >
        <h1>rosetta</h1>

        <p>rosetta for software development.</p>

        <p>
          contribute on{' '}
          <a
            href="https://github.com/abstractalgo/rosetta"
            target="_blank"
            rel="noreferrer"
          >
            Github
          </a>
          <img
            alt="GitHub Repo stars"
            src="https://img.shields.io/github/stars/abstractalgo/rosetta?label=Stars&style=social"
          ></img>
          .
        </p>

        <div
          style={{
            margin: '40px 0',
          }}
        >
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
            <Button small>
              {feature === null
                ? 'Select a feature...'
                : `${FeatureMeta[feature].label}`}
            </Button>
          </FeatureSelect>

          {feature && <p>{FeatureMeta[feature].description}</p>}
        </div>

        {feature && (
          <div
            style={{
              display: 'grid',
              gridAutoFlow: 'column',
              gridAutoColumns: '400px',
              columnGap: '20px',
              width: '100%',
              overflow: 'scroll',
            }}
          >
            {(langs.length === availableLangs.length
              ? langs
              : [...langs, null]
            ).map((lang, idx) => (
              <Column
                availableLangs={availableLangs.filter(
                  (item) => item === lang || !langs.includes(item),
                )}
                key={`${lang}-${idx}`}
                lang={lang}
                content={lang ? files[lang] : undefined}
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
      </main>
    </div>
  );
};

export async function getServerSideProps(context: NextPageContext) {
  // parse pathname and try to extra initial 'feature' and 'langs'
  const query = context.query as { path: string[] };
  const feature = query.path.length > 0 ? (query.path[0] as Feature) : null;
  const langs =
    query.path.length > 1 ? (query.path.slice(1) as Language[]) : [];

  // this is the shape of props we'll be passing to the page component
  const props: RosettaPageProps = {
    availableLangs: [],
    files: {},
    query: {
      feature: null,
      langs: [],
    },
  };

  const PREFIX = process.env.NODE_ENV === 'production' ? '' : '.';

  // verify 'feature' and retrieve available options
  if (feature && FeatureOptions.includes(feature)) {
    props.query.feature = feature;

    const filenames = await readdir(`${PREFIX}/rosetta/${props.query.feature}`);

    props.availableLangs = filenames
      .map((filename) => filename.toString().replace('.md', '') as Language)
      .filter((name) => LanguageOptions.includes(name as Language));
  }

  // verify 'langs' and fetch file content for each of them
  if (props.query.feature && langs.length > 0) {
    // only allow specified languages
    props.query.langs = langs
      .filter((lang) => LanguageOptions.includes(lang))
      // and only allow languages that have files
      .filter((lang) => props.availableLangs.includes(lang));

    const files = await Promise.all(
      props.query.langs.map((lang) => {
        const path = `${PREFIX}/rosetta/${feature}/${lang}.md`;
        return readFile(path);
      }),
    );

    props.query.langs.map(
      (lang, idx) => (props.files[lang] = files[idx]?.toString()),
    );
  }

  return {
    props,
  };
}

export default RosettaPage;
