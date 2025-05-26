// src/hooks/useProductDetails.ts
import { useState, useEffect } from 'react';
import { getPublishedProductBySlug } from '@/admin/services/productService';
import type { Product } from '@/admin/types/productTypes';

export const useProductDetails = (slug: string | undefined) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) {
      setProduct(null);
      setLoading(false);
      // setError("Slug do produto não fornecido."); // Pode ser opcional não definir erro aqui
      return;
    }

    const fetchProductDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getPublishedProductBySlug(slug);
        setProduct(data);
        if (!data) {
            // Não necessariamente um erro de fetch, mas produto não encontrado.
            // A página que usa o hook pode tratar 'product === null' como "não encontrado".
            // setError("Produto não encontrado ou não disponível.");
        }
      } catch (err: any) {
        setError(err.message || "Erro ao buscar detalhes do produto.");
      } finally {
        setLoading(false);
      }
    };
    fetchProductDetails();
  }, [slug]);

  return { product, loading, error };
};
