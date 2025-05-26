// src/admin/types/quoteTypes.ts
export type QuoteStatus = "Pendente" | "Respondido" | "Arquivado";

export interface Quote {
  id?: string; // UUID, gerado pelo Supabase
  created_at?: string; // TIMESTAMPTZ, gerado pelo Supabase
  name: string; // TEXT
  email: string; // TEXT
  phone?: string | null; // TEXT (opcional)
  service_interest?: string | null; // TEXT (ou FK para services.id)
  message: string; // TEXT
  status?: QuoteStatus; // TEXT (ex: "Pendente", "Respondido", "Arquivado"), padrão "Pendente"
}
