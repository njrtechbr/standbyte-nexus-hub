// src/admin/services/contactMessageService.ts
import { supabase } from '@/lib/supabaseClient'; // Ajuste o caminho
import type { ContactMessage, ContactMessageStatus } from '@/admin/types/contactMessageTypes'; // Ajuste

const CONTACT_MESSAGES_TABLE = 'contact_messages';

export const getContactMessages = async (): Promise<ContactMessage[]> => {
  const { data, error } = await supabase
    .from(CONTACT_MESSAGES_TABLE)
    .select('*')
    .order('created_at', { ascending: false });
  if (error) {
    console.error('Erro ao buscar mensagens de contato:', error);
    throw error;
  }
  return data || [];
};

export const getContactMessageById = async (id: string): Promise<ContactMessage | null> => {
  const { data, error } = await supabase
    .from(CONTACT_MESSAGES_TABLE)
    .select('*')
    .eq('id', id)
    .single();
  if (error) {
    if (error.code === 'PGRST116' && !data) return null; // Not found
    console.error('Erro ao buscar mensagem de contato por ID:', error);
    throw error;
  }
  return data;
};

export const updateContactMessageStatus = async (id: string, status: ContactMessageStatus): Promise<ContactMessage | null> => {
  const { data, error } = await supabase
    .from(CONTACT_MESSAGES_TABLE)
    .update({ status })
    .eq('id', id)
    .select()
    .single();
  if (error) {
    console.error('Erro ao atualizar status da mensagem de contato:', error);
    throw error;
  }
  return data;
};

// Se precisar editar outros campos além do status:
export const updateContactMessage = async (id: string, messageData: Partial<Omit<ContactMessage, 'id' | 'created_at'>>): Promise<ContactMessage | null> => {
  const { data, error } = await supabase
    .from(CONTACT_MESSAGES_TABLE)
    .update(messageData)
    .eq('id', id)
    .select()
    .single();
  if (error) {
    console.error('Erro ao atualizar mensagem de contato:', error);
    throw error;
  }
  return data;
};

export const deleteContactMessage = async (id: string): Promise<void> => {
  const { error } = await supabase
    .from(CONTACT_MESSAGES_TABLE)
    .delete()
    .eq('id', id);
  if (error) {
    console.error('Erro ao excluir mensagem de contato:', error);
    throw error;
  }
};

/**
 * Cria uma nova mensagem de contato.
 * Geralmente chamada pelo site público.
 */
export const createContactMessage = async (
  messageData: Omit<ContactMessage, 'id' | 'created_at' | 'status'>
): Promise<ContactMessage | null> => {
  const dataToInsert: Partial<ContactMessage> = {
    ...messageData,
    status: "Não Lido", // Define o status padrão
  };

  const { data, error } = await supabase
    .from(CONTACT_MESSAGES_TABLE) // CONTACT_MESSAGES_TABLE já deve estar definido
    .insert([dataToInsert])
    .select()
    .single();

  if (error) {
    console.error('Erro ao criar mensagem de contato:', error);
    throw error;
  }
  return data;
};
