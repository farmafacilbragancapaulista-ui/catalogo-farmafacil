"use client";

export const dynamic = "force-dynamic";

import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import type { Product } from '@/types/catalog';
import { createFuseIndex } from '@/lib/search/fuseConfig';
import { ProductGrid } from '@/components/catalog/ProductGrid';

export default function SearchPage() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') ?? '';

  const [query, setQuery] = useState('');
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setQuery(initialQuery);
  }, [initialQuery]);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await fetch('/api/search/products', {
          cache: 'no-store',
        });
        const json = (await res.json()) as { products: Product[] };
        setProducts(json.products);
      } catch (err) {
        console.error('Erro ao carregar produtos para busca:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const fuse = useMemo(() => createFuseIndex(products), [products]);

  const results = useMemo(() => {
    if (!query.trim()) return products;

    const normalized = query.replace(/s\b/gi, '');

    return fuse.search(normalized).map((r) => r.item);
  }, [fuse, products, query]);

  return (
    <div className="space-y-4">
      <section className="space-y-2">
        <h1 className="text-xl font-bold text-slate-900 sm:text-2xl">
          Resultados da busca
        </h1>

        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar por nome, marca, categoria, descrição ou tags"
          className="w-full rounded-full border border-slate-200 bg-slate-50/60 px-4 py-2 text-sm outline-none transition focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/10"
        />

        {query && (
          <p className="text-xs text-slate-500">
            Exibindo {results.length} resultado(s) para &quot;{query}&quot;
          </p>
        )}
      </section>

      {loading ? (
        <p className="py-8 text-center text-sm text-slate-500">
          Carregando produtos para busca...
        </p>
      ) : (
        <ProductGrid products={results} />
      )}
    </div>
  );
}