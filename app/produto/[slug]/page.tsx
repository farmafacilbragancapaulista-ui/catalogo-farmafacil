import type { Metadata } from 'next';
import Image from 'next/image';
import { getProductBySlug } from '@/services/products';
import { WhatsAppOrderBox } from '@/components/product/WhatsAppOrderBox';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return {
      title: 'Produto não encontrado | Catálogo Farma Fácil'
    };
  }

  const title = `${product.name} | ${product.brand?.name ?? 'Farma Fácil'}`;
  const description =
    product.description ??
    `Veja detalhes do produto ${product.name} no catálogo online da Farma Fácil e faça seu pedido pelo WhatsApp.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description
    }
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return <p className="py-10 text-center text-sm text-slate-500">Produto não encontrado.</p>;
  }

  const mainImage = product.images?.[0];
  const otherImages = product.images?.slice(1) ?? [];

  return (
    <div className="grid gap-6 py-2 sm:grid-cols-[1.2fr,1fr] sm:gap-10">
      <section>
        <div className="card flex flex-col gap-3 p-3 sm:p-4">
          <div className="relative aspect-[4/5] w-full rounded-lg bg-slate-50">
            {mainImage ? (
              <Image
                src={mainImage.url}
                alt={product.name}
                fill
                className="rounded-lg object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-xs text-slate-400">
                Sem imagem
              </div>
            )}
          </div>

          {otherImages.length > 0 && (
            <div className="no-scrollbar flex gap-2 overflow-x-auto pt-1">
              {otherImages.map((img) => (
                <div key={img.id} className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-md bg-slate-50">
                  <Image src={img.url} alt={product.name} fill className="object-cover" sizes="80px" />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="space-y-4">
        <div>
          <p className="mb-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
            {product.brand?.name}
          </p>
          <h1 className="mb-2 text-xl font-bold text-slate-900 sm:text-2xl">{product.name}</h1>
          <p className="text-sm text-slate-600">
            {product.category?.name} • {product.unavailable ? 'Indisponível no momento' : 'Disponível'}
          </p>
        </div>

        <div className="flex items-end gap-2">
          <p className="text-2xl font-bold text-primary">
            {product.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
          </p>
          {product.promotion && (
            <span className="rounded-full bg-primary/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-primary">
              Promoção
            </span>
          )}
          {product.unavailable && (
            <span className="rounded-full bg-slate-900/80 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-white">
              Indisponível
            </span>
          )}
        </div>

        {product.description && (
          <div>
            <h2 className="mb-1 text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Descrição</h2>
            <p className="text-sm leading-relaxed text-slate-700 whitespace-pre-line">{product.description}</p>
          </div>
        )}

        {product.variants && product.variants.length > 0 && (
          <div>
            <h2 className="mb-1 text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Variações</h2>
            <ul className="flex flex-wrap gap-2">
              {product.variants.map((v) => (
                <li
                  key={v.id}
                  className="rounded-full border border-slate-200 px-3 py-1 text-xs text-slate-700"
                >
                  {v.name}
                </li>
              ))}
            </ul>
          </div>
        )}

        {product.tags && product.tags.length > 0 && (
          <div>
            <h2 className="mb-1 text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Indicações</h2>
            <ul className="flex flex-wrap gap-1.5">
              {product.tags.map((t) => (
                <li
                  key={t.id}
                  className="rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.16em] text-slate-700"
                >
                  {t.name}
                </li>
              ))}
            </ul>
          </div>
        )}

        <WhatsAppOrderBox productName={product.name} unavailable={product.unavailable} variants={product.variants} />
      </section>
    </div>
  );
}
