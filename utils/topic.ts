import { ReactNode } from 'react';

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
