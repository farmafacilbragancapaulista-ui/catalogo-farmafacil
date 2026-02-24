"use client";

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

export function PromotionFilter() {
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const active = searchParams.get('promocao') === '1';

  const href = (() => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete('pagina');
    if (active) params.delete('promocao');
    else params.set('promocao', '1');
    return `${pathname}?${params.toString()}`;
  })();

  return (
    <div className="mb-4 flex items-center justify-between gap-3">
      <p className="text-xs font-medium text-slate-600">Filtros</p>
      <Link
        href={href}
        className={`rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] transition ${
          active
            ? 'border-primary bg-primary text-white'
            : 'border-slate-200 bg-white text-slate-700 hover:border-primary/40'
        }`}
      >
        {active ? 'Promoções: ON' : 'Apenas promoções'}
      </Link>
    </div>
  );
}

