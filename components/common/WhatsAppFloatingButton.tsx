import Link from 'next/link';
import { buildWhatsAppLink } from '@/utils/whatsapp';

export function WhatsAppFloatingButton() {
  const href = buildWhatsAppLink('Olá, gostaria de fazer um pedido pelo catálogo online.');

  return (
    <Link
      href={href}
      aria-label="Fazer pedido pelo WhatsApp"
      className="fixed bottom-4 right-4 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] text-white shadow-xl transition hover:scale-105 hover:bg-[#1ebe5c] sm:bottom-6 sm:right-6"
      target="_blank"
    >
      <span className="text-xl font-semibold">W</span>
    </Link>
  );
}

