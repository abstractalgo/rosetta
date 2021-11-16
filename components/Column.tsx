import { AnchorButton, Button, MenuItem, Icon } from '@blueprintjs/core';
import { Select } from '@blueprintjs/select';
import { FC } from 'react';
import { Topic } from '../utils/topics';
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
            rightIcon="caret-down"
          />
        </TechSelect>
        {tech && (
          <div>
            <AnchorButton
              style={{
                fontSize: '85%',
                fontWeight: 600,
                color: 'rgba(87, 96, 106, 0.7)',
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
            <AnchorButton
              href={`https://github.com/abstractalgo/rosetta/tree/master/public/rosetta/${topic}/${tech}.md`}
              target="_blank"
              icon={
                <Icon
                  icon="annotation"
                  size={14}
                  color={'rgba(87, 96, 106, 0.7)'}
                />
              }
              rel="noopener noreferrer"
              minimal
              small
              title="Edit on Github"
            />
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
