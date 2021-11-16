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
  'nodejs',
] as const;

export type Technology = typeof TechOptions[number];

export const TechMeta: {
  [tech in Technology]: {
    // label is how the tech will be displayed
    label: string;
    // alternative names that will be used while filtering with query
    // (these ids aren't used in the formation of the URL)
    alt?: string[];
    // icons
    icon: `/tech-icons/${tech}.png`;
  };
} = {
  js: {
    label: 'Javascript',
    alt: ['javascript'],
    icon: '/tech-icons/js.png',
  },
  ts: { label: 'Typescript', alt: ['typescript'], icon: '/tech-icons/ts.png' },
  go: { label: 'Go', alt: ['golang'], icon: '/tech-icons/go.png' },
  python: { label: 'Python', alt: ['py'], icon: '/tech-icons/python.png' },
  rust: { label: 'Rust', alt: ['rs'], icon: '/tech-icons/rust.png' },
  java: { label: 'Java', icon: '/tech-icons/java.png' },
  nodejs: { label: 'NodeJS', icon: '/tech-icons/nodejs.png' },
};
