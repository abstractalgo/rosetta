import { Button, Card, MenuItem } from '@blueprintjs/core';
import { Select } from '@blueprintjs/select';
import { FC } from 'react';
import { Feature } from '../utils/features';
import { Language, LanguageMeta } from '../utils/langs';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const LangSelect = Select.ofType<Language>();

type ColumnProps = {
  feature: Feature;
  languages: Language[];
  lang: Language | null;
  onSelect: (lang: Language) => void;
  onRemove: () => void;
};

export const Column: FC<ColumnProps> = ({
  feature,
  languages,
  lang,
  onSelect,
  onRemove,
}) => {
  return (
    <div className="column">
      <LangSelect
        filterable
        activeItem={lang}
        items={languages}
        popoverProps={{
          minimal: true,
        }}
        inputProps={{
          small: true,
        }}
        itemRenderer={(
          langItem,
          { handleClick, modifiers: { active, disabled } },
        ) => (
          <MenuItem
            key={langItem}
            selected={active}
            onClick={handleClick}
            text={LanguageMeta[langItem].label}
          />
        )}
        onItemSelect={(langItem) => onSelect(langItem)}
        itemPredicate={(query, langItem) => {
          if (!query || lang === langItem) {
            return true;
          }
          return [langItem, ...(LanguageMeta[langItem].alt || [])]
            .map((name) => name.toLowerCase())
            .some((name) => name.match(query.toLowerCase()));
        }}
      >
        <Button
          text={lang ? LanguageMeta[lang].label : 'Select language...'}
          small
        />
      </LangSelect>
      {lang && <Button small icon="small-cross" onClick={() => onRemove()} />}

      {!lang ? (
        <div>select a language</div>
      ) : (
        <div className="markdown">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            ```js const fuck = 34;```
          </ReactMarkdown>
        </div>
      )}
      <p>list</p>
    </div>
  );
};
