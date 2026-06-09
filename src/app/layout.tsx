import Footer from '@/components/Footer';
import Header from '@/components/Header';
import type { Metadata } from 'next';
import { Geist } from 'next/font/google';
import Script from 'next/script';
import 'react-datepicker/dist/react-datepicker.css';
import AuthGuard from './AuthGuard';
import './globals.css';
import Providers from './Provider';

const geistSans = Geist({
  variable: '--font-geist-sans',
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
      <body className={`${geistSans.className} antialiased`}>
        <Providers>
          <AuthGuard>
            <div className="main_container">
              <Header />
              <div>{children}</div>
              <Footer />
            </div>
          </AuthGuard>
        </Providers>
        <Script async src="https://checkout.razorpay.com/v1/checkout.js"></Script>
      </body>
    </html>
  );
}
