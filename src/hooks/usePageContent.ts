// src/hooks/usePageContent.ts
import { useState, useEffect } from 'react';
import { getPageContentByIdentifier } from '@/admin/services/pageContentService'; // Ajuste o caminho se necessário
import type { PageContent } from '@/admin/types/pageContentTypes'; // Ajuste o caminho

export const usePageContent = (pageIdentifier: string) => {
  const [pageData, setPageData] = useState<PageContent | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!pageIdentifier) {
      setLoading(false);
      setError("Identificador da página não fornecido.");
      return;
    }

    const fetchPageContent = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getPageContentByIdentifier(pageIdentifier);
        setPageData(data);
        if (!data) {
          // setError(`Conteúdo para a página "${pageIdentifier}" não encontrado.`);
          // Não definir erro aqui se for esperado que algumas páginas possam não existir ainda
          // A página que usa o hook pode tratar pageData null como "não encontrado"
          console.warn(`Conteúdo para a página "${pageIdentifier}" não encontrado.`);
        }
      } catch (err: any) {
        console.error(`Erro ao buscar conteúdo da página "${pageIdentifier}":`, err);
        setError(err.message || `Erro ao buscar conteúdo para "${pageIdentifier}".`);
      } finally {
        setLoading(false);
      }
    };

    fetchPageContent();
  }, [pageIdentifier]);

  return { pageData, loading, error };
};
