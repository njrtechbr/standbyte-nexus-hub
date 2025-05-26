// src/admin/types/serviceTypes.ts
export interface Service {
  id?: string; // UUID, gerado pelo Supabase
  created_at?: string; // TIMESTAMPTZ, gerado pelo Supabase
  name: string; // TEXT, obrigatório (Nome do Serviço)
  slug: string; // TEXT, obrigatório, único
  description?: string | null; // TEXT (longo), descrição completa do serviço
  // Adicionar campos específicos de serviço se necessário, ex:
  // duration?: string | null; 
  // service_area?: string | null;
  image_url?: string | null; // TEXT, URL da imagem principal do serviço
  image_alt_text?: string | null; // TEXT, obrigatório se image_url presente
  category?: string | null; // TEXT, categoria do serviço
  is_published?: boolean; // BOOLEAN, padrão false
  meta_title?: string | null; // TEXT, máximo 60 caracteres
  meta_description?: string | null; // TEXT, máximo 160 caracteres
  meta_keywords?: string | null; // TEXT, separado por vírgulas
  structured_data?: any | null; // JSONB, para Schema.org (ex: Service)
  user_id?: string | null; // UUID FK para auth.users (opcional)
}
