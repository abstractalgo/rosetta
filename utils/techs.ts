// Unique identifiers for technologies.
// IMPORTANT: try not to update existing identifiers, but only add new ones.
// Identifiers will be used to form a URL in the shape of:
// /<topic_id>/<tech_id1>/<tech_id2>/...
// so use something URL-encoding friendly.
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
    // (these ids aren't used in the formation of the URL)
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
