export type I18nString<TLanguage extends string = string> = {
  [TLang in TLanguage]?: string;
};
