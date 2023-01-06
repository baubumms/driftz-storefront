export type LangCode = 'en' | 'de';

export type Localized<T = string> = Record<LangCode, T>;
