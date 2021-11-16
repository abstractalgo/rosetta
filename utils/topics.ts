// Unique identifiers for topics.
//
// IMPORTANT: try not to update existing identifiers, but only add new ones,
// otherwise, existing URLs would get broken.
//
// Do order topics in a way that makes the most sense.
//
// Identifiers will be used to form a URL in the shape of:
// /<topic_id>/<tech_id1>/<tech_id2>/...
// so use something URL-encoding friendly.
//
export const TopicOptions = ['tooling-watchers'] as const;

export type Topic = typeof TopicOptions[number];

export const TopicMeta: Record<
  Topic,
  {
    // this is how the topic will be displayed in the list
    label: string;
    // used for browser tab title
    description: string;
  }
> = {
  'tooling-watchers': {
    label: 'Tooling — Watching for file changes and live reloading',
    description: 'Watching for file changes and live reloading',
  },
} as const;
