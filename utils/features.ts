import { ReactNode } from 'react';

export const FeatureOptions = ['watchers'] as const;

export type Feature = typeof FeatureOptions[number];

export const FeatureCategoryOptions = [] as const;
export type FeatureCategory = typeof FeatureCategoryOptions[number];

export const FeatureMeta: Record<
  string,
  {
    label: string;
    description?: ReactNode;
    category?: FeatureCategory;
  }
> = {
  watchers: {
    label: 'Watchers',
    description: 'Watching file changes and hot-reload',
  },
} as const;
