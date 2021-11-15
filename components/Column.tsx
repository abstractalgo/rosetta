import { Button, MenuItem } from '@blueprintjs/core';
import { Select } from '@blueprintjs/select';
import { FC } from 'react';
import { Feature } from '../utils/features';
import { Language, LanguageMeta } from '../utils/langs';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const LangSelect = Select.ofType<Language>();

type ColumnProps = {
  feature: Feature;
  availableLangs: Language[];
  lang: Language | null;
  content?: string;
  onSelect: (lang: Language) => void;
  onRemove: () => void;
};

export const Column: FC<ColumnProps> = ({
  feature,
  availableLangs,
  lang,
  content,
  onSelect,
  onRemove,
}) => {
  return (
    <div className="column">
      <LangSelect
        filterable
        activeItem={lang}
        items={availableLangs}
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

      {!lang || !content ? (
        <p>Please select a language from the list.</p>
      ) : (
        <div className="markdown">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
        </div>
      )}
    </div>
  );
};
