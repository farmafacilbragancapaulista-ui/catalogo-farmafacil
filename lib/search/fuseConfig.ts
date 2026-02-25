import Fuse, { IFuseOptions } from 'fuse.js';
import type { Product } from '@/types/catalog';

export type SearchableProduct = Product & {
  category_name?: string;
  brand_name?: string;
  tag_names?: string[];
};

export const fuseOptions: IFuseOptions<SearchableProduct> = {
  includeScore: true,
  threshold: 0.35,
  distance: 50,
  minMatchCharLength: 2,
  ignoreLocation: true,
  keys: [
    { name: 'name', weight: 0.5 },
    { name: 'tags.name', weight: 0.2 },
    { name: 'description', weight: 0.15 },
    { name: 'category.name', weight: 0.075 },
    { name: 'brand.name', weight: 0.075 }
  ]
};

export function createFuseIndex(products: SearchableProduct[]) {
  return new Fuse(products, fuseOptions);
}
