import type { Metadata } from 'next';
import './globals.css';
import { ReactNode } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { WhatsAppFloatingButton } from '@/components/common/WhatsAppFloatingButton';

export const metadata: Metadata = {
  title: 'Catálogo Farma Fácil',
  description: 'Catálogo online de cosméticos, perfumaria, maquiagem e skincare da Farma Fácil.'
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className="min-h-screen bg-white">
        <div className="flex min-h-screen flex-col">
          <Header />
          <main className="flex-1 py-4 sm:py-6">
            <div className="container-page">{children}</div>
          </main>
          <Footer />
          <WhatsAppFloatingButton />
        </div>
      </body>
    </html>
  );
}

