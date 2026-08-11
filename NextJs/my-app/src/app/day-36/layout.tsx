// app/layout.tsx
import type { Metadata } from 'next';
import Navbar from '@/components/day-36/Navbar';
import Footer from '@/components/day-36/Footer';


export const metadata: Metadata = {
  title: 'Product Store',
  description: 'A simple product store built with Next.js',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body >
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-grow container mx-auto px-4 py-8">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}