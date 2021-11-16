import { ReactNode } from 'react';

// Unique identifiers for topics.
// IMPORTANT: try not to update existing identifiers, but only add new ones.
// Identifiers will be used to form a URL in the shape of:
// /<topic_id>/<tech_id1>/<tech_id2>/...
// so use something URL-encoding friendly.
export const TopicOptions = ['watchers'] as const;

export type Topic = typeof TopicOptions[number];

export const TopicMeta: Record<
  string,
  {
    label: string;
    description?: ReactNode;
  }
> = {
  watchers: {
    label: 'Watchers',
    description: 'Watching file changes and hot-reload',
  },
} as const;
