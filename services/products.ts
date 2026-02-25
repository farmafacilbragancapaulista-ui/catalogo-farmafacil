import { supabase } from '@/lib/supabaseClient';
import type { Product } from '@/types/catalog';

type RawProduct = any;

const baseProductSelect = `
  id,
  name,
  slug,
  description,
  price,
  promotion,
  highlight,
  unavailable,
  category_id,
  brand_id,
  category:categories (
    id,
    name,
    slug,
    active
  ),
  brand:brands (
    id,
    name,
    slug
  ),
  variants:product_variants (
    id,
    name,
    price
  ),
  product_tags:product_tags (
    tags (
      id,
      name,
      slug
    )
  ),
  images:product_images (
    id,
    url,
    position
  )
`;

function normalizeProduct(raw: RawProduct): Product {
  const tags = (raw.product_tags ?? [])
    .map((pt: any) => pt?.tags)
    .filter(Boolean);

  const images = (raw.images ?? [])
    .slice()
    .sort((a: any, b: any) => (a?.position ?? 0) - (b?.position ?? 0));

  return {
    ...raw,
    tags,
    images
  } as Product;
}

function normalizeProducts(raw: RawProduct[]): Product[] {
  return (raw ?? []).map(normalizeProduct);
}

export async function getHomeProducts() {
  const { data, error } = await supabase
    .from('products')
    .select(baseProductSelect)
    .eq('unavailable', false)
    .order('highlight', { ascending: false })
    .order('promotion', { ascending: false })
    .order('created_at', { ascending: false })
    .limit(40);

  if (error) {
    // eslint-disable-next-line no-console
    console.error('Erro ao buscar produtos da home:', error);
    return [];
  }

  return normalizeProducts((data as RawProduct[]) ?? []);
}

export async function getCatalogProducts(params: {
  page?: number;
  pageSize?: number;
  categorySlug?: string;
  onlyPromotion?: boolean;
}) {
  const page = params.page ?? 1;
  const pageSize = params.pageSize ?? 24;
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  let query = supabase.from('products').select(baseProductSelect, { count: 'exact' });

  if (params.categorySlug) {
    const { data: category, error: categoryError } = await supabase
      .from('categories')
      .select('id')
      .eq('slug', params.categorySlug)
      .maybeSingle();

    if (categoryError) {
      // eslint-disable-next-line no-console
      console.error('Erro ao buscar categoria por slug:', categoryError);
      return { products: [], total: 0 };
    }

    if (!category?.id) {
      return { products: [], total: 0 };
    }

    query = query.eq('category_id', category.id);
  }

  if (params.onlyPromotion) {
    query = query.eq('promotion', true);
  }

  const { data, error, count } = await query
    .order('promotion', { ascending: false })
    .order('created_at', { ascending: false })
    .range(from, to);

  if (error) {
    // eslint-disable-next-line no-console
    console.error('Erro ao buscar catálogo:', error);
    return { products: [], total: 0 };
  }

  return { products: normalizeProducts((data as RawProduct[]) ?? []), total: count ?? 0 };
}

export async function getProductBySlug(slug: string) {
  // Log para depuração do slug recebido
  // eslint-disable-next-line no-console
  console.log('[getProductBySlug] slug recebido:', slug);

  const { data, error } = await supabase
    .from('products')
    .select(baseProductSelect)
    .eq('slug', slug)
    .single();

  if (error) {
    // eslint-disable-next-line no-console
    console.error('[getProductBySlug] Erro ao buscar produto por slug:', slug, error);
    return null;
  }

  if (!data) {
    // eslint-disable-next-line no-console
    console.warn('[getProductBySlug] Produto não encontrado para slug:', slug);
    return null;
  }
  return normalizeProduct(data as RawProduct);
}

export async function getAllProductsForSearch() {
  const { data, error } = await supabase
    .from('products')
    .select(
      `
      id,
      name,
      slug,
      description,
      price,
      promotion,
      unavailable,
      category:categories ( id, name, slug ),
      brand:brands ( id, name, slug ),
      product_tags:product_tags (
        tags (
          id,
          name,
          slug
        )
      )
    `
    )
    .eq('unavailable', false);

  if (error) {
    // eslint-disable-next-line no-console
    console.error('Erro ao buscar produtos para busca:', error);
    return [];
  }

  return normalizeProducts((data as RawProduct[]) ?? []);
}

