// src/admin/types/contactMessageTypes.ts
export type ContactMessageStatus = "Não Lido" | "Lido" | "Respondido" | "Arquivado";

export interface ContactMessage {
  id?: string; // UUID
  created_at?: string; // TIMESTAMPTZ
  name: string; // TEXT
  email: string; // TEXT
  phone?: string | null; // TEXT (opcional)
  subject?: string | null; // TEXT (opcional)
  message: string; // TEXT
  status?: ContactMessageStatus; // TEXT, padrão "Não Lido"
}
