import { getLocale } from 'next-intl/server';
import { Navbar } from '@components';
import { getUserByClerkId }  from '@utils/auth';
import { formatPromptData } from '@utils/helpers';
import { PromptProvider } from '@context/PromptContext';

const getUserInfo = async () => {
  const user = await getUserByClerkId();
  if (user) {
    return {
      promptSymbolsLimit: user.gamesLimit,
      promptSymbolsUsed: user.gamesPlayed,
      promptSymbolsLimitRenewal: user.gamesLimitRenewal,
    };
  }
  return null;
};

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  const userInfo = await getUserInfo();
  const locale = await getLocale();

  if (!userInfo) {
    return null;
  }

  const { symbolsUsed, symbolsLimit, limitRenewalDate } = formatPromptData(userInfo, locale);

  return (
    <PromptProvider value={{ symbolsUsed, symbolsLimit, limitRenewalDate }}>
      <div className="relative min-h-svh bg-gray-800">
        <Navbar />
        <div className="min-h-svh">{children}</div>
      </div>
    </PromptProvider>
  );
};

export default DashboardLayout;
