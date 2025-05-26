// src/admin/services/productService.ts
import { supabase } from '@/lib/supabaseClient'; // Ajuste o caminho
import type { Product } from '@/admin/types/productTypes'; // Ajuste o caminho

const PRODUCTS_TABLE = 'products';

/**
 * Busca todos os produtos.
 * TODO: Adicionar paginação, filtros, ordenação
 */
export const getProducts = async (): Promise<Product[]> => {
  const { data, error } = await supabase
    .from(PRODUCTS_TABLE)
    .select('*')
    .order('created_at', { ascending: false }); // Exemplo de ordenação

  if (error) {
    console.error('Erro ao buscar produtos:', error);
    throw error;
  }
  return data || [];
};

/**
 * Cria um novo produto.
 * @param productData Dados do produto a serem criados.
 *                    Omitir 'id' e 'created_at', pois são gerados pelo Supabase.
 */
export const createProduct = async (productData: Omit<Product, 'id' | 'created_at'>): Promise<Product | null> => {
  // Garante que is_published tenha um valor, default false se undefined
  const dataToInsert = {
    ...productData,
    is_published: productData.is_published === undefined ? false : productData.is_published,
    // user_id: (await supabase.auth.getUser()).data.user?.id // Exemplo de como pegar user_id se necessário
  };
  
  // Remover campos que não devem ser inseridos diretamente se vierem undefined
  // (Supabase pode lidar com isso, mas é bom ser explícito)
  Object.keys(dataToInsert).forEach(key => {
    if (dataToInsert[key as keyof typeof dataToInsert] === undefined) {
      delete dataToInsert[key as keyof typeof dataToInsert];
    }
  });


  const { data, error } = await supabase
    .from(PRODUCTS_TABLE)
    .insert([dataToInsert]) // insert espera um array
    .select() // Retorna o registro inserido
    .single(); // Esperamos inserir e retornar um único registro

  if (error) {
    console.error('Erro ao criar produto:', error);
    // Poderia verificar por erros específicos, ex: violação de constraint 'unique' no slug
    if (error.code === '23505') { // Código para unique_violation
        if (error.message.includes('products_slug_key')) {
            throw new Error('Já existe um produto com este slug. Por favor, altere o slug.');
        }
    }
    throw error;
  }
  return data;
};

// Funções para getProductById, updateProduct, deleteProduct virão depois.

/**
 * Busca um produto pelo ID.
 * @param id ID do produto.
 */
export const getProductById = async (id: string): Promise<Product | null> => {
  const { data, error } = await supabase
    .from(PRODUCTS_TABLE)
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    // Se o erro for "PGRST116" (resultado não único ou não encontrado), é normal se o ID não existe.
    if (error.code === 'PGRST116' && !data) {
        return null; 
    }
    console.error('Erro ao buscar produto por ID:', error);
    throw error;
  }
  return data;
};

/**
 * Atualiza um produto existente.
 * @param id ID do produto a ser atualizado.
 * @param productData Dados do produto a serem atualizados.
 */
export const updateProduct = async (id: string, productData: Partial<Omit<Product, 'id' | 'created_at'>>): Promise<Product | null> => {
  const { data, error } = await supabase
    .from(PRODUCTS_TABLE)
    .update(productData)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Erro ao atualizar produto:', error);
    if (error.code === '23505') { 
        if (error.message.includes('products_slug_key')) {
            throw new Error('Já existe um produto com este slug. Por favor, altere o slug.');
        }
    }
    throw error;
  }
  return data;
};


/**
 * Exclui um produto.
 * @param id ID do produto a ser excluído.
 */
export const deleteProduct = async (id: string): Promise<void> => {
  const { error } = await supabase
    .from(PRODUCTS_TABLE)
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Erro ao excluir produto:', error);
    throw error;
  }
};

/**
 * Busca um produto publicado pelo seu SLUG.
 * @param slug Slug do produto.
 */
export const getPublishedProductBySlug = async (slug: string): Promise<Product | null> => {
  const { data, error } = await supabase
    .from(PRODUCTS_TABLE) // PRODUCTS_TABLE já deve estar definido no arquivo
    .select('*')
    .eq('slug', slug)
    .eq('is_published', true) // Apenas produtos publicados
    .maybeSingle(); // Retorna null se não encontrar, em vez de erro

  if (error) {
    // Não tratar "not found" (PGRST116) como erro aqui, pois o maybeSingle já faz isso.
    // Apenas logar outros tipos de erro.
    if (error.code !== 'PGRST116') {
        console.error('Erro ao buscar produto por slug:', error);
        throw error; // Lançar outros erros
    }
  }
  return data; // Retorna o produto ou null
};
