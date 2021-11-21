/* eslint-disable @next/next/no-img-element */
import { Button, MenuItem } from '@blueprintjs/core';
import { Select } from '@blueprintjs/select';
import type { NextPage, NextPageContext } from 'next';
import { useRouter } from 'next/dist/client/router';
import { useEffect, useState } from 'react';
import { Column } from '../components/Column';
import { Topic } from '../utils/topic';
import { Technology, TechOptions } from '../utils/techs';
import { readdir, readFile } from 'fs/promises';
import pathFS from 'path';
import { CONSTANTS } from '../utils/constants';
import { MetaTags } from '../components/MetaTags';
import meta from '../scripts/meta.json';
import yaml from 'yaml';

type RosettaPageProps = {
  topics: Topic[];
  query: {
    topic: Topic | null;
    techs: Technology[];
  };
};

const RosettaPage: NextPage<RosettaPageProps> = ({ query, topics }) => {
  const router = useRouter();

  const [topic, setTopic] = useState<Topic | null>(query.topic || null);
  const [techs, setTechs] = useState<Technology[]>(query.techs || []);

  const currentPath = topic ? `/${topic.id}/${techs.join('/')}` : '';

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
      <MetaTags titleSection={topic ? topic.description : ''} />

      <header>
        <div>
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
            languages, side by side. Can be used for learning or as a reference.
          </p>
        </div>
        <div>
          <p>
            This is an open source project.
            <br />
            Contribute on{' '}
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
        </div>
      </header>

      <div className="topic-wrapper">
        Topic:{' '}
        <Select<Topic>
          filterable
          activeItem={topic}
          items={topics}
          onItemSelect={(topic) => setTopic(topic)}
          itemRenderer={(topic, { handleClick, modifiers: { active } }) => (
            <MenuItem
              key={topic.id}
              selected={active}
              onClick={handleClick}
              text={topic.label}
              label={topic.categories.join(', ')}
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
            {topic === null ? 'Select a topic...' : `${topic.label}`}
          </Button>
        </Select>
        {/* topic && (
          <span className="topic-desc">{TopicMeta[topic].description}</span>
        ) */}
      </div>

      {topic && (
        <div className="column-grid">
          {(techs.length === topic.availableTechs.length
            ? techs
            : [...techs, null]
          ).map((tech, idx) => (
            <Column
              idx={idx}
              topic={topic}
              availableTechs={topic.availableTechs.filter(
                (item) => item === tech || !techs.includes(item),
              )}
              key={`${tech}-${idx}`}
              tech={tech}
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
  const { path } = context.query as { path: [string, ...Technology[]] };
  const [topicId, ...techs] = path.length ? path : [null];

  // this is the shape of props we'll be passing to the page component
  const props: RosettaPageProps = {
    topics: [],
    query: {
      topic: null,
      techs: [],
    },
  };

  // ! THIS IS VERY SENSITIVE !
  // (don't change unless restructuring intentionally)
  const TOPICS_DIR = pathFS.resolve('./public', 'topics');

  const isProd = process.env.NODE_ENV === 'production';

  if (isProd) {
    props.topics = meta['topics'] as Topic[];
  } else {
    const topicIds = await readdir(TOPICS_DIR);
    const topicsMetaFiles = await Promise.all(
      topicIds.map(async (topicId) => {
        try {
          return await readFile(pathFS.join(TOPICS_DIR, topicId, 'about.yml'), {
            encoding: 'utf-8',
          });
        } catch {
          return '';
        }
      }),
    );

    props.topics = await Promise.all(
      topicIds.map(async (topicId, idx) => {
        const meta = yaml.parse(topicsMetaFiles[idx]) || {};
        const techs = (await readdir(pathFS.join(TOPICS_DIR, topicId)))
          .filter((filename) => filename !== 'about.yml')
          .map((filename) => filename.replace('.md', '')) as Technology[];

        return {
          id: topicId,
          label: meta['label'] || '',
          description: meta['description'] || '',
          categories: meta['categories'] || [],
          availableTechs: techs.filter((tech) => TechOptions.includes(tech)),
        };
      }),
    );
  }

  if (
    topicId &&
    props.topics.filter((topic) => topic.id === topicId).length === 1
  ) {
    props.query.topic = props.topics.find((topic) => topic.id === topicId)!;

    if (techs.length > 0) {
      props.query.techs = Array.from(
        // make sure all techs are loaded at most once
        new Set(
          techs
            // only allow registered techs
            .filter((tech) => TechOptions.includes(tech))
            // and only allow techs that have files
            .filter((tech) => props.query.topic!.availableTechs.includes(tech)),
        ),
      );
    }
  }

  return {
    props,
  };
}

export default RosettaPage;
