import Footer from '@/components/Footer';
import Header from '@/components/Header';
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

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
        <Header />
<<<<<<< HEAD
        <div className="m-4 sm:mx-12">{children}</div>
=======
        <div className="my-4 mx-4 lg:mx-32">{children}</div>
>>>>>>> 3e7502976bdd18900017790ea33460ccd838ed95
        <Footer />
      </body>
    </html>
  );
}
