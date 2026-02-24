create table public.categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  active boolean not null default true,
  created_at timestamp with time zone default now()
);

create table public.brands (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  created_at timestamp with time zone default now()
);

create table public.products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  description text,
  price numeric(10,2) not null,
  promotion boolean not null default false,
  highlight boolean not null default false,
  unavailable boolean not null default false,
  category_id uuid not null references public.categories(id) on delete restrict,
  brand_id uuid not null references public.brands(id) on delete restrict,
  created_at timestamp with time zone default now()
);

create table public.product_variants (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.products(id) on delete cascade,
  name text not null,
  price numeric(10,2),
  created_at timestamp with time zone default now()
);

create table public.tags (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique
);

create table public.product_tags (
  product_id uuid not null references public.products(id) on delete cascade,
  tag_id uuid not null references public.tags(id) on delete cascade,
  primary key (product_id, tag_id)
);

-- Tabela auxiliar para armazenar URLs das imagens no Storage
create table public.product_images (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.products(id) on delete cascade,
  url text not null,
  position int not null default 0
);

-- Índices para performance de busca/consulta
create index products_category_idx on public.products (category_id);
create index products_brand_idx on public.products (brand_id);
create index products_promotion_idx on public.products (promotion);
create index products_unavailable_idx on public.products (unavailable);
create index tags_slug_idx on public.tags (slug);

