'use client';

import { Heading } from '@ui-lib';
import { useTranslations } from 'next-intl';

const JournalList = ({ entries }: { entries: any}) => {
  const t = useTranslations('JournalList');

  return (
    <>
      <Heading>{t('headline')}</Heading>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
      </div>
    </>
  );
};

export default JournalList;
