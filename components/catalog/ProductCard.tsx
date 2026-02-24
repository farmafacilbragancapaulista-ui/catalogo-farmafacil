import Link from 'next/link';
import Image from 'next/image';
import type { Product } from '@/types/catalog';

type Props = {
  product: Product;
};

export function ProductCard({ product }: Props) {
  const mainImage = product.images?.[0];

  return (
    <article className="card flex flex-col overflow-hidden">
      <div className="relative aspect-[4/5] w-full bg-slate-50">
        {mainImage ? (
          <Image
            src={mainImage.url}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 20vw"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-xs text-slate-400">
            Sem imagem
          </div>
        )}
        {product.promotion && (
          <span className="absolute left-2 top-2 rounded-full bg-primary px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white">
            Promoção
          </span>
        )}
        {product.unavailable && (
          <span className="absolute right-2 top-2 rounded-full bg-slate-900/80 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white">
            Indisponível
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-3 sm:p-4">
        <p className="mb-1 text-[11px] font-medium uppercase tracking-[0.14em] text-slate-500">
          {product.brand?.name}
        </p>
        <h3 className="mb-2 line-clamp-2 text-sm font-semibold text-slate-900 sm:text-base">{product.name}</h3>
        <p className="mb-3 text-sm font-bold text-primary">
          {product.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
        </p>
        <div className="mt-auto">
          <Link
            href={`/produto/${product.slug}`}
            className="inline-flex w-full items-center justify-center rounded-full bg-slate-900 px-3 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-white hover:bg-slate-800"
          >
            Ver detalhes
          </Link>
        </div>
      </div>
    </article>
  );
}

