import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Providers } from './providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'MCP AI Law Firm | RWA Tokenization Compliance Platform',
  description:
    'Institutional-grade RWA tokenization compliance platform powered by multi-agent control plane',
  keywords: [
    'RWA',
    'tokenization',
    'compliance',
    'securities',
    'ERISA',
    'smart contracts',
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
