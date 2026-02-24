import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  // Em build/execução, apenas logamos. Em produção, configure as variáveis.
  // eslint-disable-next-line no-console
  console.warn('NEXT_PUBLIC_SUPABASE_URL ou NEXT_PUBLIC_SUPABASE_ANON_KEY não configurados.');
}

export const supabase = createClient(supabaseUrl || '', supabaseAnonKey || '');

