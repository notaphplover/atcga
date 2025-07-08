import { I18nString } from '@atcga/backend-catalog-domain';
import { Builder } from '@atcga/backend-common';
import { I18nString as LimitlessTcgI18nString } from '@atcga/limitlesstcg-game-data';

import { Mapping } from '../../../../common/models/Mapping';

export abstract class I18nStringFromI18nStringLimitlessTcgBuilder<
  TLanguage extends string,
  TLimitlessLanguage extends string,
> implements
    Builder<I18nString<TLanguage>, [LimitlessTcgI18nString<TLimitlessLanguage>]>
{
  protected readonly _mappings: Mapping<TLimitlessLanguage, TLanguage>;

  constructor(mappings: Mapping<TLimitlessLanguage, TLanguage>) {
    this._mappings = mappings;
  }

  public build(
    limitlessTcgI18nString: LimitlessTcgI18nString<TLimitlessLanguage>,
  ): I18nString<TLanguage> {
    const i18nString: I18nString<TLanguage> = {};

    for (const [language, text] of Object.entries(limitlessTcgI18nString) as [
      TLimitlessLanguage,
      string,
    ][]) {
      i18nString[this._mappings[language]] = text;
    }

    return i18nString;
  }
}
