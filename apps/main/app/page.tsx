import { getTranslations } from 'next-intl/server';

import { Hero, LanguageSwitcher } from '@components';

import { auth } from '@clerk/nextjs/server';

const Home = async () => {
  const { userId } = auth();
  const headline = 'OpenAI Game Arcade';
  const description = '';
  const t = await getTranslations('HomePage');
  const buttonLabel = userId ? t('buttons.authorized') : t('buttons.unauthorized');
  const href = userId ? '/dashboard' : '/new-user';

  return (
    <>
      <div className="mb-12 flex w-full px-10 pt-5">
        <LanguageSwitcher />
      </div>

      <Hero buttonLabel={buttonLabel} description={description} headline={headline} href={href} />
    </>
  );
};

export default Home;
