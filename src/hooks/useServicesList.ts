// src/hooks/useServicesList.ts
import { useState, useEffect } from 'react';
import { getServices } from '@/admin/services/serviceService';
import type { Service } from '@/admin/types/serviceTypes';

export const useServicesList = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchServices = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getServices();
        setServices(data.filter(s => s.is_published));
      } catch (err: any) {
        setError(err.message || "Erro ao buscar serviços.");
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  return { services, loading, error };
};
