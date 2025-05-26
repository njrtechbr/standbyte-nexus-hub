
// src/admin/pages/quotes/QuotesListPage.tsx
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger, DropdownMenuSub, DropdownMenuSubTrigger, DropdownMenuSubContent, DropdownMenuPortal, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import { MoreHorizontal, Trash2, Eye, CheckCircle, Archive, MailQuestion, Loader2, AlertTriangle, FileText } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { getQuotes, deleteQuote, updateQuoteStatus } from '@/admin/services/quoteService';
import type { Quote, QuoteStatus } from '@/admin/types/quoteTypes';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

const statusMapping: Record<QuoteStatus, { label: string; color: string; icon: React.ElementType }> = {
  Pendente: { label: "Pendente", color: "bg-yellow-500", icon: MailQuestion },
  Respondido: { label: "Respondido", color: "bg-blue-500", icon: CheckCircle },
  Arquivado: { label: "Arquivado", color: "bg-neutral-500", icon: Archive },
};

export default function QuotesListPage() {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<QuoteStatus | "Todos">("Todos");

  const fetchQuotes = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getQuotes();
      setQuotes(data);
    } catch (err: any) {
      setError(err.message || 'Erro ao buscar solicitações de orçamento.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuotes();
  }, []);

  const handleDeleteQuote = async (quoteId: string) => {
    if (!quoteId) return;
    if (window.confirm('Tem certeza que deseja excluir esta solicitação?')) {
      try {
        await deleteQuote(quoteId);
        setQuotes(prevQuotes => prevQuotes.filter(q => q.id !== quoteId));
      } catch (err: any) {
        setError(err.message || 'Erro ao excluir solicitação.');
      }
    }
  };

  const handleUpdateStatus = async (quoteId: string, status: QuoteStatus) => {
    try {
      const updatedQuote = await updateQuoteStatus(quoteId, status);
      if (updatedQuote) {
        setQuotes(prevQuotes => prevQuotes.map(q => q.id === quoteId ? updatedQuote : q));
      }
    } catch (err: any) {
      setError(err.message || `Erro ao atualizar status para ${status}.`);
    }
  };
  
  const filteredQuotes = quotes.filter(quote => 
    filterStatus === "Todos" || quote.status === filterStatus
  );

  return (
    <div className="p-2 md:p-4">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-primaryBlue">Solicitações de Orçamento</h1>
      </div>

      <Card className="shadow-lg mb-6">
        <CardHeader>
          <CardTitle>Filtros</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-1">
              <Label htmlFor="filterStatus" className="text-sm font-medium text-neutralDark">Filtrar por Status</Label>
              <Select 
                value={filterStatus} 
                onValueChange={(value: string) => setFilterStatus(value as QuoteStatus | "Todos")}
              >
                <SelectTrigger id="filterStatus">
                  <SelectValue placeholder="Selecione um status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Todos">Todos</SelectItem>
                  {Object.keys(statusMapping).map(statusKey => (
                    <SelectItem key={statusKey} value={statusKey}>
                      {statusMapping[statusKey as QuoteStatus].label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-lg">
        <CardHeader>
            <CardTitle>Lista de Solicitações</CardTitle>
            <CardDescription>
                {loading ? "Carregando..." : (filteredQuotes.length > 0 ? `Total de ${filteredQuotes.length} solicitações.` : "Nenhuma solicitação encontrada.")}
            </CardDescription>
        </CardHeader>
        <CardContent>
            {loading && (
                <div className="flex justify-center items-center py-12">
                    <Loader2 className="h-16 w-16 animate-spin text-primaryBlue" />
                </div>
            )}
            {!loading && error && (
                <div className="p-4 rounded-md bg-destructive/10 text-destructive flex flex-col items-center justify-center py-12">
                    <AlertTriangle className="h-12 w-12 mb-4" />
                    <h2 className="text-xl font-semibold mb-2">Erro ao carregar solicitações</h2>
                    <p>{error}</p>
                    <Button onClick={fetchQuotes} className="mt-4 bg-destructive hover:bg-destructive/90 text-destructive-foreground">
                    Tentar Novamente
                    </Button>
                </div>
            )}
            {!loading && !error && filteredQuotes.length === 0 && (
                <div className="text-center py-12">
                    <FileText className="mx-auto h-24 w-24 text-neutralMid/50" />
                    <h3 className="mt-4 text-xl font-semibold text-neutralDark">Nenhuma Solicitação Encontrada</h3>
                    <p className="mt-2 text-sm text-neutralMid">Aguardando novas solicitações de orçamento do site.</p>
                </div>
            )}
            {!loading && !error && filteredQuotes.length > 0 && (
            <Table>
            <TableHeader>
                <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Email/Telefone</TableHead>
                <TableHead>Serviço de Interesse</TableHead>
                <TableHead>Data</TableHead>
                <TableHead className="text-center">Status</TableHead>
                <TableHead className="text-center w-[100px]">Ações</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {filteredQuotes.map((quote) => {
                  const statusInfo = statusMapping[quote.status || 'Pendente'];
                  const StatusIcon = statusInfo.icon;
                  
                  return (
                <TableRow key={quote.id} className="hover:bg-neutralLight/50">
                    <TableCell className="font-medium text-neutralDark">{quote.name}</TableCell>
                    <TableCell>
                        <div className="text-sm text-neutralDark">{quote.email}</div>
                        {quote.phone && <div className="text-xs text-neutralMid">{quote.phone}</div>}
                    </TableCell>
                    <TableCell className="text-neutralMid">{quote.service_interest || 'N/A'}</TableCell>
                    <TableCell className="text-neutralMid">
                        {quote.created_at ? format(new Date(quote.created_at), 'dd/MM/yyyy HH:mm', { locale: ptBR }) : 'N/A'}
                    </TableCell>
                    <TableCell className="text-center">
                    <Badge 
                        variant="default"
                        className={`${statusInfo.color} text-white`}
                    >
                        <StatusIcon className="mr-1 h-3 w-3"/> 
                        {statusInfo.label}
                    </Badge>
                    </TableCell>
                    <TableCell className="text-center">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0 text-neutralMid hover:text-primaryBlue">
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Ações</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => alert(`Detalhes: ${quote.message}\n\nServiço: ${quote.service_interest || 'Não especificado'}`)}>
                            <Eye className="mr-2 h-4 w-4" /> Ver Detalhes
                        </DropdownMenuItem>
                        <DropdownMenuSub>
                            <DropdownMenuSubTrigger><CheckCircle className="mr-2 h-4 w-4" /> Mudar Status</DropdownMenuSubTrigger>
                            <DropdownMenuPortal>
                            <DropdownMenuSubContent>
                                {Object.keys(statusMapping).map(statusKey => {
                                  const SubStatusIcon = statusMapping[statusKey as QuoteStatus].icon;
                                  return (
                                <DropdownMenuItem 
                                    key={statusKey} 
                                    onClick={() => handleUpdateStatus(quote.id!, statusKey as QuoteStatus)}
                                    disabled={quote.status === statusKey}
                                >
                                    <SubStatusIcon className="mr-2 h-4 w-4" />
                                    {statusMapping[statusKey as QuoteStatus].label}
                                </DropdownMenuItem>
                                  );
                                })}
                            </DropdownMenuSubContent>
                            </DropdownMenuPortal>
                        </DropdownMenuSub>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                            onClick={() => handleDeleteQuote(quote.id!)}
                            className="text-destructive hover:!text-destructive-foreground hover:!bg-destructive"
                        >
                            <Trash2 className="mr-2 h-4 w-4" /> Excluir
                        </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    </TableCell>
                </TableRow>
                  );
                })}
            </TableBody>
            </Table>
            )}
        </CardContent>
      </Card>
    </div>
  );
}
