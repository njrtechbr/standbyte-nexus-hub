// src/admin/types/pageContentTypes.ts
export interface ContentSection {
  id?: string; // Pode ser um UUID gerado no frontend ou um índice
  type: 'hero' | 'textWithImage' | 'faq' | 'cta_banner' | 'generic_text' | string; // Tipos de seção pré-definidos ou customizados
  title?: string | null;
  text_content?: string | null;
  image_url?: string | null;
  image_alt_text?: string | null;
  cta_text?: string | null;
  cta_link?: string | null;
  // Outros campos específicos por tipo de seção podem ser adicionados
  // Ex: items para FAQ (array de {question: string, answer: string})
  items?: Array<{ question: string; answer: string; }> | null; 
}

export interface PageContent {
  id?: string; // UUID, gerado pelo Supabase para a tabela pages_content
  created_at?: string; // TIMESTAMPTZ
  page_identifier: string; // TEXT, obrigatório, único (ex: "home", "sobre", "contato")
  title?: string | null; // Título principal da página (H1 padrão ou título interno)
  meta_title?: string | null; // TEXT SEO
  meta_description?: string | null; // TEXT SEO
  meta_keywords?: string | null; // TEXT SEO (separado por vírgulas)
  structured_data?: any | null; // JSONB, Schema.org específico da página
  content_sections?: ContentSection[] | null; // JSONB (array de objetos ContentSection)
  user_id?: string | null; // UUID FK para auth.users (opcional)
}
