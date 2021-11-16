import { AnchorButton, Button, MenuItem } from '@blueprintjs/core';
import { Select } from '@blueprintjs/select';
import { FC } from 'react';
import { Topic } from '../utils/topic';
import { Technology, TechMeta } from '../utils/techs';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const TechSelect = Select.ofType<Technology>();

type ColumnProps = {
  topic: Topic;
  availableTechs: Technology[];
  tech: Technology | null;
  content?: string;
  onSelect: (tech: Technology) => void;
  onRemove: () => void;
};

export const Column: FC<ColumnProps> = ({
  topic,
  availableTechs,
  tech,
  content,
  onSelect,
  onRemove,
}) => {
  return (
    <div className="column" /* bp4-dark */>
      <header>
        <div>
          <TechSelect
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
                text={TechMeta[techItem].label}
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
              text={tech ? TechMeta[tech].label : 'Select tech...'}
              small
              outlined
            />
          </TechSelect>
          {tech && (
            <Button
              small
              icon="small-cross"
              onClick={() => onRemove()}
              minimal
            />
          )}
        </div>
        {tech && (
          <AnchorButton
            style={{
              fontSize: '85%',
              fontWeight: 600,
            }}
            href={`/rosetta/${topic}/${tech}.md`}
            target="_blank"
            rel="noopener noreferrer"
            minimal
            small
            title="View raw Markdown"
          >
            raw
          </AnchorButton>
        )}
      </header>

      <div className="markdown">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {!tech || !content ? '^ Select a tech from the list.' : content}
        </ReactMarkdown>
      </div>
    </div>
  );
};
