import Footer from '@/components/Footer';
import Header from '@/components/Header';
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import AuthGuard from './AuthGuard';
import './globals.css';
import Providers from './Provider';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Bid Box',
  description: 'Bidding App',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Providers>
          <AuthGuard>
            <div className="main_container">
              <Header />
              <div>{children}</div>
              <Footer />
            </div>
          </AuthGuard>
        </Providers>
      </body>
    </html>
  );
}
