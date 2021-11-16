export const LanguageOptions = [
  'js',
  'ts',
  'rust',
  'go',
  'python',
  'java',
] as const;

export type Language = typeof LanguageOptions[number];

export const LanguageMeta: Record<
  Language,
  {
    // label is how the language will be displayed
    label: string;
    // alternative names that will be used while filtering with query
    alt?: string[];
  }
> = {
  js: { label: 'JavaScript', alt: ['javascript'] },
  ts: { label: 'Typescript', alt: ['typescript'] },
  go: { label: 'Go', alt: ['golang'] },
  python: { label: 'Python', alt: ['py'] },
  rust: { label: 'Rust', alt: ['rs'] },
  java: { label: 'Java' },
};
