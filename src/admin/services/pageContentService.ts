// src/admin/services/pageContentService.ts
import { supabase } from '@/lib/supabaseClient'; // Ajuste o caminho
import type { PageContent } from '@/admin/types/pageContentTypes'; // Ajuste

const PAGES_CONTENT_TABLE = 'pages_content';

/**
 * Lista informações básicas de todas as páginas de conteúdo (identificador, título).
 */
export const getPagesContentList = async (): Promise<Pick<PageContent, 'id' | 'page_identifier' | 'title' | 'created_at'>[]> => {
  const { data, error } = await supabase
    .from(PAGES_CONTENT_TABLE)
    .select('id, page_identifier, title, created_at') // Seleciona apenas campos chave para a listagem
    .order('page_identifier', { ascending: true });
  
  if (error) {
    console.error('Erro ao listar conteúdo das páginas:', error);
    throw error;
  }
  return data || [];
};

/**
 * Busca o conteúdo de uma página específica pelo seu identificador único.
 */
export const getPageContentByIdentifier = async (identifier: string): Promise<PageContent | null> => {
  const { data, error } = await supabase
    .from(PAGES_CONTENT_TABLE)
    .select('*')
    .eq('page_identifier', identifier)
    .maybeSingle(); // Usa maybeSingle para não dar erro se não encontrar, apenas retorna null

  if (error) {
    console.error(`Erro ao buscar conteúdo da página "${identifier}":`, error);
    throw error;
  }
  return data;
};

/**
 * Busca o conteúdo de uma página específica pelo seu ID da tabela.
 */
export const getPageContentById = async (id: string): Promise<PageContent | null> => {
  const { data, error } = await supabase
    .from(PAGES_CONTENT_TABLE)
    .select('*')
    .eq('id', id)
    .single(); // Use .single() if ID should always exist, or .maybeSingle() if it might not

  if (error) {
    // PGRST116: row-to-json conversion failed, probably because no rows were found or too many
    if (error.code === 'PGRST116' && !data) { // Check if data is null to confirm it's a "not found" case
        return null; 
    }
    console.error(`Erro ao buscar conteúdo da página por ID "${id}":`, error);
    throw error;
  }
  return data;
};


/**
 * Atualiza o conteúdo de uma página existente (identificada pelo ID da tabela).
 * O page_identifier não deve ser alterado por esta função.
 */
export const updatePageContent = async (id: string, pageData: Partial<Omit<PageContent, 'id' | 'created_at' | 'page_identifier' | 'user_id'>>): Promise<PageContent | null> => {
  // Garantir que page_identifier e user_id não sejam passados no update, se existirem em pageData
  // TypeScript Omit já faz isso no tipo, mas uma checagem em runtime pode ser adicionada se a entrada for de 'any'
  // const { page_identifier, user_id, ...dataToUpdate } = pageData as any; // Desestruturação para remover explicitamente

  const { data, error } = await supabase
    .from(PAGES_CONTENT_TABLE)
    .update(pageData) // pageData já está corretamente tipado por Omit
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Erro ao atualizar conteúdo da página:', error);
    throw error;
  }
  return data;
};

/**
 * Cria uma nova entrada de conteúdo de página.
 * Usar com cautela, idealmente page_identifiers são fixos ou gerenciados com cuidado.
 */
export const createPageContentEntry = async (pageData: Omit<PageContent, 'id' | 'created_at'>): Promise<PageContent | null> => {
  const { data, error } = await supabase
    .from(PAGES_CONTENT_TABLE)
    .insert([pageData])
    .select()
    .single();
  if (error) {
    if (error.code === '23505' && error.message.includes('pages_content_page_identifier_key')) {
        throw new Error('Já existe uma página com este identificador.');
    }
    console.error('Erro ao criar entrada de conteúdo de página:', error);
    throw error;
  }
  return data;
};
