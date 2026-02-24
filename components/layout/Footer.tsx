export function Footer() {
  return (
    <footer className="mt-6 border-t border-slate-100 bg-slate-50/80">
      <div className="container-page grid gap-6 py-6 text-sm text-slate-700 sm:grid-cols-3">
        <div>
          <h3 className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Telefone</h3>
          <p className="font-medium text-slate-900">(11) 4034-5000 (WhatsApp)</p>
        </div>

        <div>
          <h3 className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Lojas</h3>
          <div className="space-y-2">
            <div>
              <p className="text-xs font-semibold text-slate-600">Loja 1</p>
              <p className="text-xs text-slate-700">
                Praça Coronel Jacinto Osório, 4, Matadouro, Bragança Paulista - SP, 12910-330
              </p>
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-600">Loja 2</p>
              <p className="text-xs text-slate-700">Tv. Dona Carolina 196 Lava-pés Bragança Pta</p>
            </div>
          </div>
        </div>

        <div>
          <h3 className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Horários</h3>
          <p className="text-xs text-slate-700">Atendimento delivery até 23h</p>
          <p className="text-xs text-slate-700">Lojas abertas até 00h</p>
        </div>
      </div>
      <div className="border-t border-slate-100 bg-white/80">
        <div className="container-page flex items-center justify-between py-3 text-[11px] text-slate-500">
          <span>© {new Date().getFullYear()} Farma Fácil. Todos os direitos reservados.</span>
          <span>Catálogo digital para consulta e pedidos via WhatsApp.</span>
        </div>
      </div>
    </footer>
  );
}

