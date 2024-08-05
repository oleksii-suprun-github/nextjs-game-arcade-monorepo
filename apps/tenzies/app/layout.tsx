import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ClerkProvider } from '@clerk/nextjs';
import { deDE, enUS } from '@clerk/localizations';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getLocale } from 'next-intl/server';
import { PromptProvider } from '@global-context';
import { getUserByClerkId } from '@utils/auth';
import { formatPromptData } from '@utils/helpers';
import { BASE_URL } from '../constants';
import './global.css';

/* istanbul ignore next */
const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Tenzies Game - NextJS | TypeScript | Tailwind | Prisma | Clerk | Nx',
  manifest: `${BASE_URL}/manifest.json`,
  icons: {
    icon: `${BASE_URL}/favicon.ico`,
  },
};

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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const userInfo = await getUserInfo();
  const locale = await getLocale();

  if (!userInfo) {
    return null;
  }

  const { symbolsUsed, symbolsLimit, limitRenewalDate } = formatPromptData(userInfo, locale);
  const messages = await getMessages();
  const clerkLocalization = locale === 'de' ? deDE : enUS;

  return (
    <ClerkProvider afterSignOutUrl="/sign-in" localization={clerkLocalization}>
      <html lang={locale}>
        <body className={`min-h-dvh bg-slate-900/25 ${inter.className}`}>
          <PromptProvider value={{ symbolsUsed, symbolsLimit, limitRenewalDate }}>
            <NextIntlClientProvider messages={messages}>{children}</NextIntlClientProvider>
          </PromptProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
