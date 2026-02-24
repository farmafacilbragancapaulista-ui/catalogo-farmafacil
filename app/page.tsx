import Link from 'next/link';
import { getHomeProducts } from '@/services/products';
import { ProductGrid } from '@/components/catalog/ProductGrid';

export default async function HomePage() {
  const products = await getHomeProducts();

  const destaque = products.filter((p) => p.highlight);
  const promocao = products.filter((p) => p.promotion);

  return (
    <div className="space-y-8">
      <section className="card flex flex-col overflow-hidden sm:flex-row">
        <div className="flex-1 bg-gradient-to-br from-primary/5 via-white to-primary/5 px-4 py-6 sm:px-8 sm:py-10">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
            Cosméticos • Perfumaria • Skincare
          </p>
          <h1 className="mb-3 text-2xl font-bold text-slate-900 sm:text-3xl">
            Sua vitrine digital de beleza Farma Fácil
          </h1>
          <p className="mb-5 max-w-xl text-sm text-slate-700 sm:text-base">
            Explore perfumes, maquiagem, skincare, produtos faciais e linha infantil. Consulte valores e faça o pedido
            em poucos cliques pelo WhatsApp.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/catalogo"
              className="inline-flex items-center justify-center rounded-full bg-primary px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.16em] text-white shadow-md hover:bg-primary/90"
            >
              Ver catálogo completo
            </Link>
            <Link
              href="/catalogo?promocao=1"
              className="inline-flex items-center justify-center rounded-full border border-primary/30 bg-white px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.16em] text-primary hover:border-primary"
            >
              Promoções do dia
            </Link>
          </div>
        </div>
      </section>

      {!!destaque.length && (
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-slate-700">
              Produtos em destaque
            </h2>
            <Link href="/catalogo" className="text-xs font-medium text-primary hover:underline">
              Ver todos
            </Link>
          </div>
          <ProductGrid products={destaque} />
        </section>
      )}

      {!!promocao.length && (
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-slate-700">Em promoção</h2>
            <Link href="/catalogo?promocao=1" className="text-xs font-medium text-primary hover:underline">
              Ver todas as promoções
            </Link>
          </div>
          <ProductGrid products={promocao} />
        </section>
      )}

      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-slate-700">
            Todos os produtos recentes
          </h2>
          <Link href="/catalogo" className="text-xs font-medium text-primary hover:underline">
            Abrir catálogo
          </Link>
        </div>
        <ProductGrid products={products} />
      </section>
    </div>
  );
}

