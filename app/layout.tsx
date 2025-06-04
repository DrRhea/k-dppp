import { Inter } from 'next/font/google';
import type { Metadata } from 'next';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'K-DPPP | Kuesioner Distres Psikologis Pasien Paliatif',
  description: 'Kuesioner untuk mengukur tingkat distres psikologis pada pasien paliatif',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'K-DPPP',
  },
  formatDetection: {
    telephone: false,
  },
  icons: {
    icon: '/logo.png',
    shortcut: '/logo.png',
    apple: '/logo.png',
  },
};

export const viewport = {
  themeColor: '#2E7D63',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <head>
        <meta name="application-name" content="K-DPPP" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="K-DPPP" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        <meta name="msapplication-TileColor" content="#2E7D63" />
        <meta name="msapplication-tap-highlight" content="no" />
        
        <link rel="apple-touch-icon" href="/logo.png" />
        <link rel="apple-touch-icon" sizes="152x152" href="/logo.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/logo.png" />
        <link rel="apple-touch-icon" sizes="167x167" href="/logo.png" />
        
        <link rel="icon" type="image/png" sizes="32x32" href="/logo.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/logo.png" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="mask-icon" href="/logo.png" color="#2E7D63" />
        <link rel="shortcut icon" href="/logo.png" />
        
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:url" content="https://k-dppp.vercel.app" />
        <meta name="twitter:title" content="K-DPPP" />
        <meta name="twitter:description" content="Kuesioner Distres Psikologis Pasien Paliatif" />
        <meta name="twitter:image" content="https://k-dppp.vercel.app/logo.png" />
        <meta name="twitter:creator" content="@kdppp" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="K-DPPP" />
        <meta property="og:description" content="Kuesioner Distres Psikologis Pasien Paliatif" />
        <meta property="og:site_name" content="K-DPPP" />
        <meta property="og:url" content="https://k-dppp.vercel.app" />
        <meta property="og:image" content="https://k-dppp.vercel.app/logo.png" />
      </head>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}