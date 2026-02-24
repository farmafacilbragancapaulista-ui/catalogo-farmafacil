import { NextResponse } from 'next/server';
import { getAllProductsForSearch } from '@/services/products';

export async function GET() {
  const products = await getAllProductsForSearch();
  return NextResponse.json({ products });
}

