"use client";

import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';

export function Header() {
  const router = useRouter();
  const [query, setQuery] = useState('');

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) return;
    router.push(`/buscar?q=${encodeURIComponent(trimmed)}`);
  };

  return (
    <header className="border-b border-slate-100 bg-white/90 backdrop-blur">
      <div className="container-page flex items-center justify-between gap-3 py-3 sm:py-4">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="h-10 w-10 rounded-lg bg-primary/10" />
          <div className="leading-tight">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-primary">Farma Fácil</p>
            <p className="text-sm font-semibold text-slate-900 sm:text-base">Catálogo de Beleza &amp; Cuidados</p>
          </div>
        </div>

        <form
          onSubmit={onSubmit}
          className="relative hidden max-w-md flex-1 items-center sm:flex"
          aria-label="Buscar produtos"
        >
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar por produto, marca, categoria..."
            className="w-full rounded-full border border-slate-200 bg-slate-50/60 px-4 py-2 text-sm outline-none transition focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/10"
          />
          <button
            type="submit"
            className="absolute right-1 top-1 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-white shadow-md hover:bg-primary/90"
          >
            Buscar
          </button>
        </form>
      </div>

      <div className="container-page pb-3 sm:hidden">
        <form onSubmit={onSubmit} className="relative" aria-label="Buscar produtos">
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar por produto, marca, categoria..."
            className="w-full rounded-full border border-slate-200 bg-slate-50/60 px-4 py-2 text-sm outline-none transition focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/10"
          />
          <button
            type="submit"
            className="absolute right-1 top-1 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-white shadow-md hover:bg-primary/90"
          >
            Buscar
          </button>
        </form>
      </div>
    </header>
  );
}

