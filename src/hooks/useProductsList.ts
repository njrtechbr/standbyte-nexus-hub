// src/hooks/useProductsList.ts
import { useState, useEffect } from 'react';
import { getProducts } from '@/admin/services/productService'; // Idealmente, productService seria movido/acessado de forma mais genérica
import type { Product } from '@/admin/types/productTypes';

export const useProductsList = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getProducts(); // productService.getProducts()
        // Filtra por publicados no frontend por enquanto
        setProducts(data.filter(p => p.is_published));
      } catch (err: any) {
        setError(err.message || "Erro ao buscar produtos.");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return { products, loading, error };
};
