// src/admin/services/quoteService.ts
import { supabase } from '@/lib/supabaseClient'; // Ajuste o caminho
import type { Quote, QuoteStatus } from '@/admin/types/quoteTypes'; // Ajuste o caminho

const QUOTES_TABLE = 'quotes';

/**
 * Busca todas as solicitações de orçamento.
 * TODO: Adicionar paginação, filtros, ordenação
 */
export const getQuotes = async (): Promise<Quote[]> => {
  const { data, error } = await supabase
    .from(QUOTES_TABLE)
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Erro ao buscar orçamentos:', error);
    throw error;
  }
  return data || [];
};

/**
 * Busca uma solicitação de orçamento pelo ID.
 */
export const getQuoteById = async (id: string): Promise<Quote | null> => {
  const { data, error } = await supabase
    .from(QUOTES_TABLE)
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    if (error.code === 'PGRST116' && !data) return null; // Not found
    console.error('Erro ao buscar orçamento por ID:', error);
    throw error;
  }
  return data;
};

/**
 * Atualiza o status de uma solicitação de orçamento.
 */
export const updateQuoteStatus = async (id: string, status: QuoteStatus): Promise<Quote | null> => {
  const { data, error } = await supabase
    .from(QUOTES_TABLE)
    .update({ status })
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Erro ao atualizar status do orçamento:', error);
    throw error;
  }
  return data;
};

/**
 * Atualiza uma solicitação de orçamento completa (excluindo id e created_at).
 * Usado se precisarmos editar mais do que apenas o status.
 */
export const updateQuote = async (id: string, quoteData: Partial<Omit<Quote, 'id' | 'created_at'>>): Promise<Quote | null> => {
  const { data, error } = await supabase
    .from(QUOTES_TABLE)
    .update(quoteData)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Erro ao atualizar orçamento:', error);
    throw error;
  }
  return data;
};

/**
 * Exclui uma solicitação de orçamento.
 */
export const deleteQuote = async (id: string): Promise<void> => {
  const { error } = await supabase
    .from(QUOTES_TABLE)
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Erro ao excluir orçamento:', error);
    throw error;
  }
};

/**
 * Cria uma nova solicitação de orçamento.
 * Geralmente chamada pelo site público.
 */
export const createQuote = async (
  quoteData: Omit<Quote, 'id' | 'created_at' | 'status'>
): Promise<Quote | null> => {
  const dataToInsert: Partial<Quote> = {
    ...quoteData,
    status: "Pendente", // Define o status padrão
  };

  const { data, error } = await supabase
    .from(QUOTES_TABLE) // QUOTES_TABLE já deve estar definido
    .insert([dataToInsert])
    .select()
    .single();

  if (error) {
    console.error('Erro ao criar solicitação de orçamento:', error);
    throw error;
  }
  return data;
};
