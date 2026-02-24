import type { Product } from '@/types/catalog';
import { ProductCard } from './ProductCard';

type Props = {
  products: Product[];
};

export function ProductGrid({ products }: Props) {
  if (!products.length) {
    return <p className="py-8 text-center text-sm text-slate-500">Nenhum produto encontrado.</p>;
  }

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
}

