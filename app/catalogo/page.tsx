import { supabase } from '@/lib/supabaseClient';
import { getCatalogProducts } from '@/services/products';
import { CategoryFilter } from '@/components/catalog/CategoryFilter';
import { ProductGrid } from '@/components/catalog/ProductGrid';
import { PromotionFilter } from '@/components/catalog/PromotionFilter';

type Props = {
  searchParams: Promise<{
    pagina?: string;
    categoria?: string;
    promocao?: string;
  }>;
};

export default async function CatalogPage({ searchParams }: Props) {
  const sp = await searchParams;
  const page = Number(sp.pagina ?? '1') || 1;
  const categorySlug = sp.categoria;
  const onlyPromotion = sp.promocao === '1';

  const [{ products, total }, { data: categories }] = await Promise.all([
    getCatalogProducts({ page, pageSize: 24, categorySlug, onlyPromotion }),
    supabase
      .from('categories')
      .select('id, name, slug')
      .eq('active', true)
      .order('name', { ascending: true })
  ]);

  const totalPages = Math.max(1, Math.ceil((total ?? 0) / 24));

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-900 sm:text-2xl">Catálogo completo</h1>
          <p className="text-sm text-slate-600">
            Utilize os filtros para encontrar rapidamente produtos de cosméticos, perfumaria, maquiagem, skincare,
            facial e infantil.
          </p>
        </div>
      </div>

      <PromotionFilter />
      <CategoryFilter categories={(categories ?? []).map((c) => ({ slug: c.slug, name: c.name }))} />

      <ProductGrid products={products} />

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 py-4 text-sm">
          <Pagination currentPage={page} totalPages={totalPages} categorySlug={categorySlug} onlyPromotion={onlyPromotion} />
        </div>
      )}
    </div>
  );
}

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  categorySlug?: string;
  onlyPromotion?: boolean;
};

function Pagination({ currentPage, totalPages, categorySlug, onlyPromotion }: PaginationProps) {
  const createLink = (page: number) => {
    const params = new URLSearchParams();
    params.set('pagina', String(page));
    if (categorySlug) params.set('categoria', categorySlug);
    if (onlyPromotion) params.set('promocao', '1');
    return `/catalogo?${params.toString()}`;
  };

  return (
    <>
      <span className="text-slate-500">
        Página {currentPage} de {totalPages}
      </span>
      <div className="flex items-center gap-2">
        <a
          href={createLink(Math.max(1, currentPage - 1))}
          className={`rounded-full border px-3 py-1 text-xs font-medium ${
            currentPage === 1
              ? 'cursor-not-allowed border-slate-200 text-slate-300'
              : 'border-slate-200 text-slate-700 hover:border-primary/40'
          }`}
          aria-disabled={currentPage === 1}
        >
          Anterior
        </a>
        <a
          href={createLink(Math.min(totalPages, currentPage + 1))}
          className={`rounded-full border px-3 py-1 text-xs font-medium ${
            currentPage === totalPages
              ? 'cursor-not-allowed border-slate-200 text-slate-300'
              : 'border-slate-200 text-slate-700 hover:border-primary/40'
          }`}
          aria-disabled={currentPage === totalPages}
        >
          Próxima
        </a>
      </div>
    </>
  );
}

