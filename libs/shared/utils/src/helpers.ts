const getExcerpt = (content: string): string =>
  content.length >= 100 ? `${content.slice(0, 150)}...` : content;

const formatDate = (date: Date, locale?: UserLocale): string => {
  if (isNaN(date.getTime())) {
    return 'Invalid Date';
  }

  const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const supportedLocales = {
    en: 'en-GB',
    de: 'de-DE',
  };

  return new Intl.DateTimeFormat((locale && supportedLocales[locale]) || 'en-GB', {
    dateStyle: 'medium',
    timeStyle: 'short',
    timeZone: userTimezone,
  }).format(date);
};

const formatPromptData = (data: any, locale: string) => {
  const formattedSymbolsLeft = new Intl.NumberFormat().format(
    data.promptSymbolsLimit - data.promptSymbolsUsed,
  );
  const formattedSymbolsLimit = new Intl.NumberFormat().format(data.promptSymbolsLimit);
  const userPromptLimitRenewal = formatDate(data.promptSymbolsLimitRenewal, locale as UserLocale);

  return {
    symbolsUsed: formattedSymbolsLeft,
    symbolsLimit: formattedSymbolsLimit,
    limitRenewalDate: userPromptLimitRenewal,
  };
};

export { getExcerpt, formatDate, formatPromptData };