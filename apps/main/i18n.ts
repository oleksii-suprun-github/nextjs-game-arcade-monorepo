import { getRequestConfig } from 'next-intl/server';
import { headers } from 'next/headers';
import { getUserLocale } from '@utils/locales';

function getLocaleFromHeaders() {
  const headersList = headers();
  const acceptLanguage = headersList.get('accept-language');

  if (acceptLanguage) {
    const locales = acceptLanguage.split(',');

    if (locales.length > 0) {
      return locales[0].split('-')[0].split(';')[0];
    }
  }

  return 'en';
}

export default getRequestConfig(async () => {
  const defaultLocale = getLocaleFromHeaders();
  const locale = (await getUserLocale()) || defaultLocale;

  return {
    locale,
    messages: (await import(`./messages/${locale}.json`)).default,
  };
});
