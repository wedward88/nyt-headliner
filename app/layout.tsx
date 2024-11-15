import '@/styles/globals.css';
import { Metadata } from 'next';
import clsx from 'clsx';

import { siteConfig } from '@/config/site';
import { fontSans, chomsky } from '@/config/fonts';

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning data-theme='retro' lang='en'>
      <meta content='width=device-width, initial-scale=1.0' name='viewport' />
      <head />
      <body
        className={clsx(
          'flex min-h-screen font-sans antialiased justify-center',
          fontSans.variable,
          chomsky.variable
        )}
      >
        <main className='container'>{children}</main>
      </body>
    </html>
  );
}
