// src/admin/pages/contacts/ContactMessagesListPage.tsx
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger, DropdownMenuSub, DropdownMenuSubTrigger, DropdownMenuSubContent, DropdownMenuPortal, DropdownMenuSeparator } from '@/components/ui/dropdown-menu'; // Adicionado DropdownMenuSeparator
import { MoreHorizontal, Trash2, Eye, CheckCircle, Archive, Mail, MessageSquare, Loader2, AlertTriangle, MailWarning, MailCheck } from 'lucide-react'; // Adicionados ícones relevantes
import { Badge } from '@/components/ui/badge';
import { Label } // Adicionado Label
from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'; // Para filtro de status
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { getContactMessages, deleteContactMessage, updateContactMessageStatus } from '@/admin/services/contactMessageService'; // Ajustado
import type { ContactMessage, ContactMessageStatus } from '@/admin/types/contactMessageTypes'; // Ajustado
// import { useToast } from '@/components/ui/use-toast';
import { format } from 'date-fns'; // Para formatar datas
import { ptBR } from 'date-fns/locale'; // Para localização pt-BR

const statusMapping: Record<ContactMessageStatus, { label: string; color: string; icon: React.ElementType }> = {
  "Não Lido": { label: "Não Lido", color: "bg-yellow-500", icon: MailWarning },
  "Lido": { label: "Lido", color: "bg-blue-500", icon: Mail },
  "Respondido": { label: "Respondido", color: "bg-green-500", icon: MailCheck },
  "Arquivado": { label: "Arquivado", color: "bg-neutral-500", icon: Archive },
};

export default function ContactMessagesListPage() {
  // const { toast } = useToast();
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<ContactMessageStatus | "Todos">("Todos");

  const fetchMessages = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getContactMessages();
      setMessages(data);
    } catch (err: any) {
      setError(err.message || 'Erro ao buscar mensagens de contato.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleDeleteMessage = async (messageId: string) => {
    if (!messageId) return;
    if (window.confirm('Tem certeza que deseja excluir esta mensagem?')) {
      try {
        await deleteContactMessage(messageId);
        setMessages(prevMessages => prevMessages.filter(m => m.id !== messageId));
        // toast({ title: "Sucesso", description: "Mensagem excluída." });
      } catch (err: any) {
        setError(err.message || 'Erro ao excluir mensagem.');
        // toast({ title: "Erro", description: err.message, variant: "destructive" });
      }
    }
  };

  const handleUpdateStatus = async (messageId: string, status: ContactMessageStatus) => {
    try {
      const updatedMessage = await updateContactMessageStatus(messageId, status);
      if (updatedMessage) {
        setMessages(prevMessages => prevMessages.map(m => m.id === messageId ? updatedMessage : m));
        // toast({ title: "Sucesso", description: `Status atualizado para ${status}.` });
      }
    } catch (err: any) {
      setError(err.message || `Erro ao atualizar status para ${status}.`);
      // toast({ title: "Erro", description: err.message, variant: "destructive" });
    }
  };
  
  const filteredMessages = messages.filter(message => 
    filterStatus === "Todos" || message.status === filterStatus
  );

  // UI de Loading e Erro (similar ao QuotesListPage)
  // Os blocos de loading e error foram movidos para dentro do CardContent para melhor estrutura
  // if (loading) { /* ... UI de loading ... */ }
  // if (error) { /* ... UI de erro ... */ }


  return (
    <div className="p-2 md:p-4">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-primaryBlue">Mensagens de Contato</h1>
      </div>

      <Card className="shadow-lg mb-6">
        <CardHeader><CardTitle>Filtros</CardTitle></CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-1">
              <Label htmlFor="filterStatus" className="text-sm font-medium text-neutralDark">Filtrar por Status</Label>
              <Select 
                value={filterStatus} 
                onValueChange={(value: string) => setFilterStatus(value as ContactMessageStatus | "Todos")}
              >
                <SelectTrigger id="filterStatus"><SelectValue placeholder="Selecione um status" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Todos">Todos</SelectItem>
                  {Object.keys(statusMapping).map(statusKey => (
                    <SelectItem key={statusKey} value={statusKey}>
                      {statusMapping[statusKey as ContactMessageStatus].label}
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
            <CardTitle>Lista de Mensagens</CardTitle>
            <CardDescription>
                {loading ? "Carregando..." : (filteredMessages.length > 0 ? `Total de ${filteredMessages.length} mensagens.` : "Nenhuma mensagem encontrada.")}
            </CardDescription>
        </CardHeader>
        <CardContent>
            {loading && ( <div className="flex justify-center items-center py-12"><Loader2 className="h-16 w-16 animate-spin text-primaryBlue" /></div> )}
            {!loading && error && ( <div className="p-4 rounded-md bg-destructive/10 text-destructive flex flex-col items-center justify-center py-12"><AlertTriangle className="h-12 w-12 mb-4" /><h2 className="text-xl font-semibold mb-2">Erro ao carregar mensagens</h2><p>{error}</p><Button onClick={fetchMessages} className="mt-4 bg-destructive hover:bg-destructive/90 text-destructive-foreground">Tentar Novamente</Button></div> )}
            {!loading && !error && filteredMessages.length === 0 && (
                <div className="text-center py-12">
                    <MessageSquare className="mx-auto h-24 w-24 text-neutralMid/50" />
                    <h3 className="mt-4 text-xl font-semibold text-neutralDark">Nenhuma Mensagem Encontrada</h3>
                    <p className="mt-2 text-sm text-neutralMid">Aguardando novas mensagens de contato do site.</p>
                </div>
            )}
            {!loading && !error && filteredMessages.length > 0 && (
            <Table>
            <TableHeader>
                <TableRow>
                <TableHead>Remetente</TableHead>
                <TableHead>Email/Assunto</TableHead>
                <TableHead>Data</TableHead>
                <TableHead className="text-center">Status</TableHead>
                <TableHead className="text-center w-[100px]">Ações</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {filteredMessages.map((message) => (
                <TableRow key={message.id} className="hover:bg-neutralLight/50">
                    <TableCell className="font-medium text-neutralDark">{message.name}</TableCell>
                    <TableCell>
                        <div className="text-sm text-neutralDark">{message.email}</div>
                        {message.subject && <div className="text-xs text-neutralMid">Assunto: {message.subject}</div>}
                    </TableCell>
                    <TableCell className="text-neutralMid">
                        {message.created_at ? format(new Date(message.created_at), 'dd/MM/yyyy HH:mm', { locale: ptBR }) : 'N/A'}
                    </TableCell>
                    <TableCell className="text-center">
                    <Badge 
                        variant="default"
                        className={`${statusMapping[message.status || 'Não Lido']?.color || 'bg-gray-400'} text-white`}
                    >
                        <statusMapping[message.status || 'Não Lido'].icon className="mr-1 h-3 w-3"/> 
                        {statusMapping[message.status || 'Não Lido'].label}
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
                        <DropdownMenuItem onClick={() => alert(`Mensagem: ${message.message}`)}>
                            <Eye className="mr-2 h-4 w-4" /> Ver Detalhes
                        </DropdownMenuItem>
                        <DropdownMenuSub>
                            <DropdownMenuSubTrigger><CheckCircle className="mr-2 h-4 w-4" /> Mudar Status</DropdownMenuSubTrigger>
                            <DropdownMenuPortal>
                            <DropdownMenuSubContent>
                                {Object.keys(statusMapping).map(statusKey => (
                                <DropdownMenuItem 
                                    key={statusKey} 
                                    onClick={() => handleUpdateStatus(message.id!, statusKey as ContactMessageStatus)}
                                    disabled={message.status === statusKey}
                                >
                                    <statusMapping[statusKey as ContactMessageStatus].icon className="mr-2 h-4 w-4" />
                                    {statusMapping[statusKey as ContactMessageStatus].label}
                                </DropdownMenuItem>
                                ))}
                            </DropdownMenuSubContent>
                            </DropdownMenuPortal>
                        </DropdownMenuSub>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                            onClick={() => handleDeleteMessage(message.id!)}
                            className="text-destructive hover:!text-destructive-foreground hover:!bg-destructive"
                        >
                            <Trash2 className="mr-2 h-4 w-4" /> Excluir
                        </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
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
