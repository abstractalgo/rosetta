export const LanguageOptions = ['javascript', 'typescript', 'rust', 'go', 'python3', 'java'] as const;

export type Language = typeof LanguageOptions[number];

export const LanguageMeta: Record<Language, string> = {
  javascript: 'JavaScript',
  typescript: 'Typescript',
  go: 'Go',
  python3: 'Python 3',
  rust: 'Rust',
  java: 'Java',
};
