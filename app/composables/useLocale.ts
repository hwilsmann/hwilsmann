import pt from '~/locales/pt'
import en from '~/locales/en'

type Locale = 'pt' | 'en'

type TranslationKey<T> = {
  [K in keyof T & string]: T[K] extends string
    ? K
    : `${K}.${TranslationKey<T[K]>}`
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

  function translate(key: TranslationKey<typeof pt>): string {
    const current = locale.value === 'en' ? en : pt

    let value: unknown = current

    for (const part of key.split('.')) {
      if (typeof value !== 'object' || value === null || !(part in value)) {
        return key
      }

      value = (value as Record<string, unknown>)[part]
    }

    return typeof value === 'string' ? value : key
  }

  return { locale, setLocale, translate }
}
