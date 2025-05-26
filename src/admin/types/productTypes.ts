// src/admin/types/productTypes.ts
export interface Product {
  id?: string; // UUID, gerado pelo Supabase, opcional na criação
  created_at?: string; // TIMESTAMPTZ, gerado pelo Supabase
  name: string; // TEXT, obrigatório
  slug: string; // TEXT, obrigatório, único
  description?: string | null; // TEXT (longo)
  details?: any | null; // JSONB (ou TEXT), especificações técnicas, características
  price?: number | null; // NUMERIC
  image_url?: string | null; // TEXT, URL da imagem principal
  image_alt_text?: string | null; // TEXT, obrigatório se image_url presente
  category?: string | null; // TEXT
  is_published?: boolean; // BOOLEAN, padrão false
  meta_title?: string | null; // TEXT, máximo 60 caracteres
  meta_description?: string | null; // TEXT, máximo 160 caracteres
  meta_keywords?: string | null; // TEXT, separado por vírgulas
  structured_data?: any | null; // JSONB, para Schema.org (ex: Product)
  user_id?: string | null; // UUID FK para auth.users (opcional)
  // Campos adicionais do mock que podem ou não ir para o Supabase diretamente:
  // brand?: string;
  // stock?: number;
}

// Você também pode querer um tipo para os valores do formulário,
// que pode ser ligeiramente diferente do tipo Product (ex: price como string no form, number no DB)
// Por agora, vamos usar o ProductFormValues do ProductFormPage.tsx como referência.
