/* eslint-disable @next/next/no-img-element */
import { Button, MenuItem } from '@blueprintjs/core';
import { Select } from '@blueprintjs/select';
import type { NextPage, NextPageContext } from 'next';
import { useRouter } from 'next/dist/client/router';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { Column } from '../components/Column';
import { Topic, TopicMeta, TopicOptions } from '../utils/topics';
import { Technology, TechOptions } from '../utils/techs';
import { readFile, readdir } from 'fs/promises';
import path from 'path';
import { CONSTANTS } from '../utils/constants';

const TopicSelect = Select.ofType<Topic>();

type RosettaPageProps = {
  files: Partial<Record<Technology, string>>;
  availableTechs: Technology[];
  query: {
    topic: Topic | null;
    techs: Technology[];
  };
};

const RosettaPage: NextPage<RosettaPageProps> = ({
  files,
  query,
  availableTechs,
}) => {
  const router = useRouter();

  const [topic, setTopic] = useState<Topic | null>(query.topic || null);
  const [techs, setTechs] = useState<Technology[]>(query.techs || []);

  const currentPath = `/${topic}/${techs.join('/')}`;

  useEffect(() => {
    if (!topic) {
      router.push(`/`);
      return;
    }

    if (router.pathname !== currentPath) {
      router.push(currentPath);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [techs, topic]);

  return (
    <main>
      <Head>
        <title>rosetta</title>
      </Head>
      <p>
        A{' '}
        <a
          href="https://www.google.com/search?q=rosetta+stone+meaning"
          target="_blank"
          rel="noopener noreferrer"
        >
          Rosetta stone
        </a>{' '}
        for software development.
      </p>
      <p>
        Compare solutions to the same problem in different technologies and
        languages, side by side. Useful for learning and recall.{' '}
      </p>

      <p>
        This is an open source project. Contribute on{' '}
        <a
          href={`https://github.com/${CONSTANTS.github_user}/${CONSTANTS.github_repo}`}
          target="_blank"
          rel="noreferrer"
        >
          Github
        </a>
        .
      </p>
      <p>
        <a
          href={`https://github.com/${CONSTANTS.github_user}/${CONSTANTS.github_repo}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            alt="GitHub Repo stars"
            src={`https://img.shields.io/github/stars/${CONSTANTS.github_user}/${CONSTANTS.github_repo}?label=Stars&style=social`}
          ></img>
        </a>
      </p>

      <div className="topic-wrapper">
        Topic:{' '}
        <TopicSelect
          filterable
          activeItem={topic}
          items={TopicOptions as unknown as Topic[]}
          onItemSelect={(topic) => setTopic(topic)}
          itemRenderer={(topic, { handleClick, modifiers: { active } }) => (
            <MenuItem
              key={topic}
              selected={active}
              onClick={handleClick}
              text={TopicMeta[topic].label}
            />
          )}
          inputProps={{
            small: true,
          }}
          popoverProps={{
            minimal: true,
          }}
        >
          <Button small outlined rightIcon="caret-down">
            {topic === null ? 'Select a topic...' : `${TopicMeta[topic].label}`}
          </Button>
        </TopicSelect>
        {/* topic && (
          <span className="topic-desc">{TopicMeta[topic].description}</span>
        ) */}
      </div>

      {topic && (
        <div className="column-grid">
          {(techs.length === availableTechs.length
            ? techs
            : [...techs, null]
          ).map((tech, idx) => (
            <Column
              topic={topic}
              availableTechs={availableTechs.filter(
                (item) => item === tech || !techs.includes(item),
              )}
              key={`${tech}-${idx}`}
              tech={tech}
              content={tech ? files[tech] : undefined}
              onSelect={(selectedTech) => {
                if (!tech) {
                  setTechs([...techs, selectedTech]);
                } else {
                  const idx = techs.indexOf(tech);
                  techs.splice(idx, 1, selectedTech);
                  setTechs([...techs]);
                }
              }}
              onRemove={() => {
                if (!tech) {
                  return;
                }
                techs.splice(idx, 1);
                setTechs([...techs]);
              }}
            />
          ))}
        </div>
      )}
    </main>
  );
};

export async function getServerSideProps(context: NextPageContext) {
  // parse pathname and try to extra initial 'topic' and 'techs'
  const query = context.query as { path: string[] };
  const topic = query.path.length > 0 ? (query.path[0] as Topic) : null;
  const techs =
    query.path.length > 1 ? (query.path.slice(1) as Technology[]) : [];

  // this is the shape of props we'll be passing to the page component
  const props: RosettaPageProps = {
    availableTechs: [],
    files: {},
    query: {
      topic: null,
      techs: [],
    },
  };

  // ! THIS IS VERY SENSITIVE !
  // (don't change unless restructuring intentionally)
  const DIR = path.resolve('./public', 'rosetta');

  // verify 'topic' and retrieve available options
  if (topic && TopicOptions.includes(topic)) {
    props.query.topic = topic;

    const filenames = await readdir(`${DIR}/${props.query.topic}`);

    props.availableTechs = filenames
      .map((filename) => filename.toString().replace('.md', '') as Technology)
      .filter((name) => TechOptions.includes(name as Technology));
  }

  // verify 'techs' and fetch file content for each of them
  if (props.query.topic && techs.length > 0) {
    // only allow specified techs
    props.query.techs = techs
      .filter((tech) => TechOptions.includes(tech))
      // and only allow techs that have files
      .filter((tech) => props.availableTechs.includes(tech));

    const files = await Promise.all(
      props.query.techs.map((tech) => {
        const path = `${DIR}/${props.query.topic}/${tech}.md`;
        return readFile(path);
      }),
    );

    props.query.techs.map(
      (tech, idx) => (props.files[tech] = files[idx]?.toString()),
    );
  }

  return {
    props,
  };
}

export default RosettaPage;
