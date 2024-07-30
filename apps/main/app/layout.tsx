import type { Metadata } from 'next';
import { ClerkProvider } from '@clerk/nextjs';
import { deDE, enUS } from '@clerk/localizations';
import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages } from 'next-intl/server';
import { Inter } from 'next/font/google';
import './global.css';

/* istanbul ignore next */
const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'NextJS | TypeScript | Tailwind | Prisma | Clerk | Nx',
  manifest: '/manifest.json',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const messages = await getMessages();
  const clerkLocalization = locale === 'de' ? deDE : enUS;

  return (
    <ClerkProvider afterSignOutUrl="/sign-in" localization={clerkLocalization}>
      <html lang={locale}>
        <body className={`min-h-dvh bg-slate-900/25 ${inter.className}`}>
          <NextIntlClientProvider messages={messages}>{children}</NextIntlClientProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
