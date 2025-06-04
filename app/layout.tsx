import './globals.css';
import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'K-DPPP | Kuesioner Distres Psikologis Perawat Paliatif',
  description: 'Kuesioner untuk mengukur tingkat distres psikologis pada perawat paliatif',
  manifest: '/manifest.json',
  icons: [
    { rel: 'icon', url: '/favicon.ico' },
    { rel: 'apple-touch-icon', url: '/apple-icon.png' },
  ],
};

export const viewport: Viewport = {
  themeColor: '#2E7D63',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" suppressHydrationWarning>
      <head />
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}