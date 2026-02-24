## Catálogo Farma Fácil

Catálogo online mobile first para farmácia focada em cosméticos, perfumaria, maquiagem, skincare, produtos faciais e infantis. Sem venda online direta, com botão para pedido via WhatsApp.

### Stack

- **Next.js (App Router)**
- **TypeScript**
- **Tailwind CSS**
- **Supabase (Database + Storage)**
- **Fuse.js** para busca inteligente no frontend

### Como rodar localmente

1. **Instalar dependências**

```bash
npm install
```

2. **Configurar variáveis de ambiente**

Crie um arquivo `.env.local` na raiz copiando de `.env.example` e preencha:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

3. **Configurar Supabase**

- Crie um projeto no Supabase.
- No painel SQL, execute o conteúdo de `supabase/schema.sql`.
- Crie um bucket de Storage (por exemplo `products`) e envie as imagens dos produtos.
- Salve as URLs públicas no campo `url` da tabela `product_images`.
- Cadastre categorias, marcas, produtos, variações e tags pelo painel do Supabase.

4. **Rodar o projeto**

```bash
npm run dev
```

O projeto ficará disponível em `http://localhost:3000`.

### Deploy na Vercel

1. Crie um novo projeto na Vercel apontando para este repositório.
2. Configure as mesmas variáveis de ambiente da `.env.local` no painel da Vercel.
3. Deploy padrão com `npm run build` (configuração já pronta em `package.json`).

