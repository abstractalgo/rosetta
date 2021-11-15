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
    label: string;
    alt?: string[];
  }
> = {
  javascript: { label: 'JavaScript', alt: ['js'] },
  typescript: { label: 'Typescript', alt: ['ts'] },
  golang: { label: 'Go', alt: ['go'] },
  python3: { label: 'Python 3', alt: ['py'] },
  rust: { label: 'Rust', alt: ['rs'] },
  java: { label: 'Java' },
};
