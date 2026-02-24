"use client";

import { useMemo, useState } from 'react';
import type { ProductVariant } from '@/types/catalog';
import { buildWhatsAppLink } from '@/utils/whatsapp';

type Props = {
  productName: string;
  unavailable: boolean;
  variants?: ProductVariant[];
};

export function WhatsAppOrderBox({ productName, unavailable, variants }: Props) {
  const hasVariants = (variants?.length ?? 0) > 0;
  const [selectedVariant, setSelectedVariant] = useState<string>(variants?.[0]?.name ?? '');

  const message = useMemo(() => {
    if (hasVariants && selectedVariant) {
      return `Olá, tenho interesse no produto: ${productName} - ${selectedVariant}`;
    }
    return `Olá, tenho interesse no produto: ${productName}`;
  }, [hasVariants, productName, selectedVariant]);

  const href = buildWhatsAppLink(message);

  return (
    <div className="mt-3 space-y-3 rounded-lg border border-primary/10 bg-primary/5 p-3 sm:p-4">
      <div className="space-y-1">
        <p className="text-xs text-slate-700">
          Clique para abrir o WhatsApp com a mensagem já preenchida. Selecione uma variação antes, se houver.
        </p>
        {unavailable && (
          <p className="text-xs font-medium text-slate-700">
            Produto marcado como <span className="font-semibold">indisponível</span> no momento.
          </p>
        )}
      </div>

      {hasVariants && (
        <div className="space-y-2">
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">Variação</p>
          <div className="flex flex-wrap gap-2">
            {variants!.map((v) => {
              const active = v.name === selectedVariant;
              return (
                <button
                  key={v.id}
                  type="button"
                  onClick={() => setSelectedVariant(v.name)}
                  className={`rounded-full border px-3 py-1 text-xs font-medium transition ${
                    active
                      ? 'border-primary bg-primary text-white'
                      : 'border-slate-200 bg-white text-slate-700 hover:border-primary/40'
                  }`}
                >
                  {v.name}
                </button>
              );
            })}
          </div>
        </div>
      )}

      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-disabled={unavailable}
        className={`inline-flex w-full items-center justify-center rounded-full px-4 py-2.5 text-xs font-semibold uppercase tracking-[0.16em] shadow-md transition ${
          unavailable ? 'cursor-not-allowed bg-slate-300 text-white' : 'bg-primary text-white hover:bg-primary/90'
        }`}
        onClick={(e) => {
          if (unavailable) e.preventDefault();
        }}
      >
        Pedir pelo WhatsApp
      </a>
    </div>
  );
}

