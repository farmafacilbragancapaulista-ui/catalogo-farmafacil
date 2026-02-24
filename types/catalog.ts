export type Category = {
  id: string;
  name: string;
  slug: string;
  active: boolean;
};

export type Brand = {
  id: string;
  name: string;
  slug: string;
};

export type Tag = {
  id: string;
  name: string;
  slug: string;
};

export type ProductVariant = {
  id: string;
  product_id: string;
  name: string;
  price?: number | null;
};

export type ProductImage = {
  id: string;
  product_id: string;
  url: string;
  position: number;
};

export type Product = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  price: number;
  promotion: boolean;
  highlight: boolean;
  unavailable: boolean;
  category_id: string;
  brand_id: string;
  category?: Category;
  brand?: Brand;
  variants?: ProductVariant[];
  tags?: Tag[];
  images?: ProductImage[];
};

