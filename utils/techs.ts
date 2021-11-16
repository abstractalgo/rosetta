export const TechOptions = [
  'js',
  'ts',
  'rust',
  'go',
  'python',
  'java',
] as const;

export type Technology = typeof TechOptions[number];

export const TechMeta: Record<
  Technology,
  {
    // label is how the tech will be displayed
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
