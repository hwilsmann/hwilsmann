import pt from '~/locales/pt'
import en from '~/locales/en'

type Locale = 'pt' | 'en'

type TranslationKey<T> = {
  [K in keyof T & string]: T[K] extends string
    ? K
    : T[K] extends readonly string[]
      ? never
      : T[K] extends object
        ? `${K}.${TranslationKey<T[K]>}`
        : never
}[keyof T & string]

type TranslationArrayKey<T> = {
  [K in keyof T & string]: T[K] extends readonly string[]
    ? K
    : T[K] extends object
      ? `${K}.${TranslationArrayKey<T[K]>}`
      : never
}[keyof T & string]

export function useLocale() {
  const locale = useCookie<Locale>('site-locale', {
    default: () => 'pt',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 365,
  })

  function setLocale(value: Locale) {
    locale.value = value
  }

  function getTranslations() {
    return locale.value === 'en' ? en : pt
  }

  function translate(key: TranslationKey<typeof pt>): string {
    let value: unknown = getTranslations()

    for (const part of key.split('.')) {
      if (typeof value !== 'object' || value === null || !(part in value)) {
        return key
      }

      value = (value as Record<string, unknown>)[part]
    }

    return typeof value === 'string' ? value : key
  }

  function translateArray(
    key: TranslationArrayKey<typeof pt>,
  ): readonly string[] {
    let value: unknown = getTranslations()

    for (const part of key.split('.')) {
      if (typeof value !== 'object' || value === null || !(part in value)) {
        return []
      }

      value = (value as Record<string, unknown>)[part]
    }

    return Array.isArray(value) &&
      value.every((item) => typeof item === 'string')
      ? value
      : []
  }

  return { locale, setLocale, translate, translateArray }
}
