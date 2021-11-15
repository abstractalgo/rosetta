export const LanguageOptions = [
  'javascript',
  'typescript',
  'rust',
  'golang',
  'python3',
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
  javascript: { label: 'JavaScript', alt: ['js'] },
  typescript: { label: 'Typescript', alt: ['ts'] },
  golang: { label: 'Go', alt: ['go'] },
  python3: { label: 'Python3', alt: ['py'] },
  rust: { label: 'Rust', alt: ['rs'] },
  java: { label: 'Java' },
};
