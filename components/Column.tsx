/* eslint-disable @next/next/no-img-element */
import {
  AnchorButton,
  Button,
  MenuItem,
  Spinner,
  ButtonGroup,
} from '@blueprintjs/core';
import { Select } from '@blueprintjs/select';
import { FC, useEffect, useState } from 'react';
import { Topic } from '../utils/topic';
import { Technology, TechMeta } from '../utils/techs';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { CONSTANTS } from '../utils/constants';

const TechItem: FC<{ tech: Technology }> = ({ tech }) => (
  <div
    style={{
      display: 'grid',
      gridAutoFlow: 'column',
      gridAutoColumns: 'max-content',
      columnGap: '4px',
    }}
  >
    {/* eslint-disable-next-line jsx-a11y/alt-text */}
    <img src={TechMeta[tech].icon} width={16} height={16} />{' '}
    {TechMeta[tech].label}
  </div>
);

type ColumnProps = {
  idx: number;
  topic: Topic;
  availableTechs: Technology[];
  tech: Technology | null;
  onSelect: (tech: Technology) => void;
  onRemove: () => void;
};

export const Column: FC<ColumnProps> = ({
  idx,
  topic,
  availableTechs,
  tech,
  onSelect,
  onRemove,
}) => {
  const [content, setContent] = useState<string | null>(null);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        setContent(null);

        const docUrl =
          process.env.NODE_ENV === 'production'
            ? `https://raw.githubusercontent.com/${CONSTANTS.github_user}/${CONSTANTS.github_repo}/master/public/topics/${topic}/${tech}.md`
            : `/topics/${topic.id}/${tech}.md`;

        const res = await fetch(docUrl);
        const rawMarkdown = await res.text();
        setContent(rawMarkdown);
      } catch {
        setContent('Something went wrong. Try refreshing the page.');
      }
    };
    if (tech) {
      fetchContent();
    }
  }, [tech, topic]);

  return (
    <div className="column" /* bp4-dark */>
      <header className={!tech ? 'empty' : ''}>
        <Select<Technology>
          filterable
          activeItem={tech}
          items={availableTechs}
          popoverProps={{
            minimal: true,
          }}
          inputProps={{
            small: true,
          }}
          itemRenderer={(
            techItem,
            { handleClick, modifiers: { active, disabled } },
          ) => (
            <MenuItem
              key={techItem}
              selected={active}
              onClick={handleClick}
              text={<TechItem tech={techItem} />}
            />
          )}
          onItemSelect={(techItem) => onSelect(techItem)}
          itemPredicate={(query, techItem) => {
            if (!query || tech === techItem) {
              return true;
            }
            return [techItem, ...(TechMeta[techItem].alt || [])]
              .map((name) => name.toLowerCase())
              .some((name) => name.match(query.toLowerCase()));
          }}
        >
          <Button
            text={
              tech ? (
                <TechItem tech={tech} />
              ) : (
                `Select ${
                  idx === 0 ? 'first' : idx === 1 ? 'second' : 'another'
                } tech...`
              )
            }
            small
            outlined
            rightIcon="caret-down"
          />
        </Select>
        {
          tech && (
            <div>
              <ButtonGroup>
                <AnchorButton
                  href={`https://raw.githubusercontent.com/${CONSTANTS.github_user}/${CONSTANTS.github_repo}/master/public/topics/${topic}/${tech}.md`}
                  target="_blank"
                  rel="noopener noreferrer"
                  minimal
                  small
                  title="View raw Markdown"
                  style={{
                    fontSize: '85%',
                    fontWeight: 600,
                    color: 'rgba(87, 96, 106, 0.7)',
                  }}
                >
                  raw
                </AnchorButton>
                <AnchorButton
                  href={`https://github.com/${CONSTANTS.github_user}/${CONSTANTS.github_repo}/edit/master/public/topics/${topic}/${tech}.md`}
                  target="_blank"
                  rel="noopener noreferrer"
                  minimal
                  small
                  title="Edit on Github"
                  style={{
                    fontSize: '85%',
                    fontWeight: 600,
                    color: 'rgba(87, 96, 106, 0.7)',
                  }}
                >
                  edit
                </AnchorButton>
              </ButtonGroup>
              <Button
                small
                icon="small-cross"
                title="Close this column"
                onClick={() => onRemove()}
                minimal
                style={{
                  marginLeft: '16px',
                }}
              />
            </div>
          )
          /* <div><Icon icon="caret-left" /> Select a tech from the list.</div> */
        }
      </header>

      {tech &&
        (content !== null ? (
          <div className="markdown">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
          </div>
        ) : (
          <div className="spinner">
            <Spinner size={48} />
          </div>
        ))}
    </div>
  );
};
