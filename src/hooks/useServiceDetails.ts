// src/hooks/useServiceDetails.ts
import { useState, useEffect } from 'react';
import { getPublishedServiceBySlug } from '@/admin/services/serviceService';
import type { Service } from '@/admin/types/serviceTypes';

export const useServiceDetails = (slug: string | undefined) => {
  const [service, setService] = useState<Service | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) {
      setService(null);
      setLoading(false);
      return;
    }
    const fetchServiceDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getPublishedServiceBySlug(slug);
        setService(data);
      } catch (err: any) {
        setError(err.message || "Erro ao buscar detalhes do serviço.");
      } finally {
        setLoading(false);
      }
    };
    fetchServiceDetails();
  }, [slug]);

  return { service, loading, error };
};
