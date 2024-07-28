import { auth } from '@clerk/nextjs/server';
import { Hero } from '@components';
import { LanguageSwitcher } from '@components';
import { getTranslations } from 'next-intl/server';

const Home = async () => {
  const { userId } = await auth();

  const headline = 'Sample Headline';
  const description = 'Sample Description';

  const t = await getTranslations('HomePage');
  const buttonLabel = userId ? t('buttons.authorized') : t('buttons.unauthorized');
  const href = userId ? '/dashboard' : '/new-user';

  return (
    <>
      <div className="mb-12 flex w-full px-10 pt-5">
        <LanguageSwitcher />
      </div>

      <Hero headline={headline} description={description} href={href} buttonLabel={buttonLabel} />
    </>
  );
};
export default Home;
