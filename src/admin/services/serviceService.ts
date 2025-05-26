// src/admin/services/serviceService.ts
import { supabase } from '@/lib/supabaseClient'; // Ajuste o caminho
import type { Service } from '@/admin/types/serviceTypes'; // Ajuste o caminho

const SERVICES_TABLE = 'services';

export const getServices = async (): Promise<Service[]> => {
  const { data, error } = await supabase
    .from(SERVICES_TABLE)
    .select('*')
    .order('created_at', { ascending: false });
  if (error) {
    console.error('Erro ao buscar serviços:', error);
    throw error;
  }
  return data || [];
};

export const createService = async (serviceData: Omit<Service, 'id' | 'created_at'>): Promise<Service | null> => {
  const dataToInsert = {
    ...serviceData,
    is_published: serviceData.is_published === undefined ? false : serviceData.is_published,
    // user_id: (await supabase.auth.getUser()).data.user?.id // Exemplo
  };
  
  Object.keys(dataToInsert).forEach(key => {
    if (dataToInsert[key as keyof typeof dataToInsert] === undefined) {
      delete dataToInsert[key as keyof typeof dataToInsert];
    }
  });

  const { data, error } = await supabase
    .from(SERVICES_TABLE)
    .insert([dataToInsert])
    .select()
    .single();

  if (error) {
    console.error('Erro ao criar serviço:', error);
    if (error.code === '23505' && error.message.includes('services_slug_key')) {
        throw new Error('Já existe um serviço com este slug. Por favor, altere o slug.');
    }
    throw error;
  }
  return data;
};

export const getServiceById = async (id: string): Promise<Service | null> => {
  const { data, error } = await supabase
    .from(SERVICES_TABLE)
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    if (error.code === 'PGRST116' && !data) {
        return null; 
    }
    console.error('Erro ao buscar serviço por ID:', error);
    throw error;
  }
  return data;
};

export const updateService = async (id: string, serviceData: Partial<Omit<Service, 'id' | 'created_at'>>): Promise<Service | null> => {
  const { data, error } = await supabase
    .from(SERVICES_TABLE)
    .update(serviceData)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Erro ao atualizar serviço:', error);
    if (error.code === '23505' && error.message.includes('services_slug_key')) {
        throw new Error('Já existe um serviço com este slug. Por favor, altere o slug.');
    }
    throw error;
  }
  return data;
};

export const deleteService = async (id: string): Promise<void> => {
  const { error } = await supabase
    .from(SERVICES_TABLE)
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Erro ao excluir serviço:', error);
    throw error;
  }
};

/**
 * Busca um serviço publicado pelo seu SLUG.
 * @param slug Slug do serviço.
 */
export const getPublishedServiceBySlug = async (slug: string): Promise<Service | null> => {
  const { data, error } = await supabase
    .from(SERVICES_TABLE) // SERVICES_TABLE já deve estar definido no arquivo
    .select('*')
    .eq('slug', slug)
    .eq('is_published', true) // Apenas serviços publicados
    .maybeSingle(); // Retorna null se não encontrar

  if (error) {
    if (error.code !== 'PGRST116') { // Não tratar "not found" como erro aqui
        console.error('Erro ao buscar serviço por slug:', error);
        throw error;
    }
  }
  return data;
};
