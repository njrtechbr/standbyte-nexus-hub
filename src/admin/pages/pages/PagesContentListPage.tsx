// src/admin/pages/pages/PagesContentListPage.tsx
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Edit, FileSliders, PlusCircle, Loader2, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { getPagesContentList } from '@/admin/services/pageContentService'; // Ajustado
import type { PageContent } from '@/admin/types/pageContentTypes'; // Ajustado
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

// Usando Pick para selecionar apenas os campos que getPagesContentList retorna
type PageContentListItem = Pick<PageContent, 'id' | 'page_identifier' | 'title' | 'created_at'>;

export default function PagesContentListPage() {
  const navigate = useNavigate();
  const [pages, setPages] = useState<PageContentListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPagesContent = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getPagesContentList();
      setPages(data);
    } catch (err: any) {
      setError(err.message || 'Erro ao buscar lista de conteúdo das páginas.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPagesContent();
  }, []);
  
  // UI de Loading e Erro (similar às outras ListPages)
  // Os blocos de loading e error foram movidos para dentro do CardContent para melhor estrutura
  // if (loading) { /* ... UI de loading ... */ }
  // if (error) { /* ... UI de erro ... */ }

  return (
    <div className="p-2 md:p-4">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-primaryBlue">Gerenciamento de Conteúdo das Páginas</h1>
        {/* Opcional: Botão para criar nova entrada de página de conteúdo */}
        {/* <Button asChild className="bg-primaryBlue hover:bg-opacity-90 text-primary-foreground">
          <Link to="/admin/pages-content/new">
            <PlusCircle className="mr-2 h-5 w-5" />
            Adicionar Nova Página
          </Link>
        </Button> */}
      </div>

      <Card className="shadow-lg">
        <CardHeader>
            <CardTitle>Páginas Gerenciáveis</CardTitle>
            <CardDescription>
                {loading ? "Carregando..." : (pages.length > 0 ? `Total de ${pages.length} páginas com conteúdo gerenciável.` : "Nenhuma página de conteúdo configurada.")}
            </CardDescription>
        </CardHeader>
        <CardContent>
            {loading && ( <div className="flex justify-center items-center py-12"><Loader2 className="h-16 w-16 animate-spin text-primaryBlue" /></div> )}
            {!loading && error && ( <div className="p-4 rounded-md bg-destructive/10 text-destructive flex flex-col items-center justify-center py-12"><AlertTriangle className="h-12 w-12 mb-4" /><h2 className="text-xl font-semibold mb-2">Erro ao carregar páginas</h2><p>{error}</p><Button onClick={fetchPagesContent} className="mt-4 bg-destructive hover:bg-destructive/90 text-destructive-foreground">Tentar Novamente</Button></div> )}
            {!loading && !error && pages.length === 0 && (
                <div className="text-center py-12">
                    <FileSliders className="mx-auto h-24 w-24 text-neutralMid/50" />
                    <h3 className="mt-4 text-xl font-semibold text-neutralDark">Nenhuma Página Configurada</h3>
                    <p className="mt-2 text-sm text-neutralMid">Configure as páginas no sistema ou no banco de dados.</p>
                    {/* Exemplo de botão para criar uma, se a funcionalidade for habilitada */}
                    {/* <Button asChild className="mt-6 bg-primaryBlue hover:bg-opacity-90 text-primary-foreground">
                        <Link to="/admin/pages-content/new">
                            <PlusCircle className="mr-2 h-5 w-5" />
                            Configurar Primeira Página
                        </Link>
                    </Button> */}
                </div>
            )}
            {!loading && !error && pages.length > 0 && (
            <Table>
            <TableHeader>
                <TableRow>
                <TableHead>Identificador da Página</TableHead>
                <TableHead>Título Principal</TableHead>
                <TableHead>Criada/Atualizada em</TableHead>
                <TableHead className="text-center w-[150px]">Ações</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {pages.map((page) => (
                <TableRow key={page.id} className="hover:bg-neutralLight/50">
                    <TableCell className="font-mono text-sm text-neutralDark bg-neutralLight/30 px-3 py-1 rounded-sm">{page.page_identifier}</TableCell>
                    <TableCell className="font-medium text-neutralDark">{page.title || '(Sem título definido)'}</TableCell>
                    <TableCell className="text-neutralMid text-sm">
                        {/* Idealmente, usar um campo 'updated_at' se disponível e relevante. Usando 'created_at' por enquanto. */}
                        {page.created_at ? format(new Date(page.created_at), 'dd/MM/yyyy HH:mm', { locale: ptBR }) : 'N/A'}
                    </TableCell>
                    <TableCell className="text-center">
                        <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => navigate(`/admin/pages-content/edit/${page.id}`)} // Usar ID para edição
                            className="border-primaryBlue text-primaryBlue hover:bg-primaryBlue hover:text-white"
                        >
                            <Edit className="mr-2 h-4 w-4" /> Editar Conteúdo
                        </Button>
                    </TableCell>
                </TableRow>
                ))}
            </TableBody>
            </Table>
            )}
        </CardContent>
      </Card>
    </div>
  );
}
