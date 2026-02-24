"use client";

import Link from 'next/link';
import { useSearchParams, usePathname } from 'next/navigation';

type CategoryFilterItem = {
  slug: string;
  name: string;
};

type Props = {
  categories: CategoryFilterItem[];
};

export function CategoryFilter({ categories }: Props) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const current = searchParams.get('categoria') ?? '';

  const buildHref = (slug: string | null) => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete('pagina');
    if (slug) {
      params.set('categoria', slug);
    } else {
      params.delete('categoria');
    }
    return `${pathname}?${params.toString()}`;
  };

  if (!categories.length) return null;

  return (
    <div className="no-scrollbar mb-4 flex gap-2 overflow-x-auto pb-1">
      <Link
        href={buildHref(null)}
        className={`whitespace-nowrap rounded-full border px-3 py-1 text-xs font-medium ${
          !current
            ? 'border-primary bg-primary text-white'
            : 'border-slate-200 bg-white text-slate-700 hover:border-primary/40'
        }`}
      >
        Todas
      </Link>
      {categories.map((c) => (
        <Link
          key={c.slug}
          href={buildHref(c.slug)}
          className={`whitespace-nowrap rounded-full border px-3 py-1 text-xs font-medium ${
            current === c.slug
              ? 'border-primary bg-primary text-white'
              : 'border-slate-200 bg-white text-slate-700 hover:border-primary/40'
          }`}
        >
          {c.name}
        </Link>
      ))}
    </div>
  );
}

