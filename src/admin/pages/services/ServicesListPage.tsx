// src/admin/pages/services/ServicesListPage.tsx
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { MoreHorizontal, PlusCircle, Search, Edit, Trash2, CheckCircle, XCircle, Wrench, AlertTriangle, Loader2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { getServices, deleteService } from '@/admin/services/serviceService'; // Ajustado
import type { Service } from '@/admin/types/serviceTypes'; // Ajustado
// import { useToast } from '@/components/ui/use-toast';

export default function ServicesListPage() {
  const navigate = useNavigate();
  // const { toast } = useToast();

  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchServices = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getServices();
      setServices(data);
    } catch (err: any) {
      setError(err.message || 'Erro ao buscar serviços.');
      // toast({ title: "Erro", description: err.message || 'Erro ao buscar serviços.', variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleDeleteService = async (serviceId: string) => {
    if (!serviceId) return;
    if (window.confirm('Tem certeza que deseja excluir este serviço? Esta ação não pode ser desfeita.')) {
      try {
        await deleteService(serviceId);
        setServices(prevServices => prevServices.filter(s => s.id !== serviceId));
        // toast({ title: "Sucesso", description: "Serviço excluído com sucesso." });
      } catch (err: any) {
        setError(err.message || 'Erro ao excluir serviço.');
        // toast({ title: "Erro", description: err.message || 'Erro ao excluir serviço.', variant: "destructive" });
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-16 w-16 animate-spin text-primaryBlue" />
        <p className="ml-4 text-lg text-neutralDark">Carregando serviços...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 rounded-md bg-destructive/10 text-destructive flex flex-col items-center justify-center h-64">
        <AlertTriangle className="h-12 w-12 mb-4" />
        <h2 className="text-xl font-semibold mb-2">Erro ao carregar serviços</h2>
        <p>{error}</p>
        <Button onClick={fetchServices} className="mt-4 bg-destructive hover:bg-destructive/90 text-destructive-foreground">
          Tentar Novamente
        </Button>
      </div>
    );
  }

  return (
    <div className="p-2 md:p-4">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-primaryBlue">Gerenciamento de Serviços</h1>
        <Button asChild className="bg-primaryBlue hover:bg-opacity-90 text-primary-foreground">
          <Link to="/admin/services/new">
            <PlusCircle className="mr-2 h-5 w-5" />
            Adicionar Novo Serviço
          </Link>
        </Button>
      </div>

      <div className="mb-6 p-4 bg-neutralWhite rounded-lg shadow">
        {/* Placeholder para Filtros e Busca */}
      </div>

      <Card className="shadow-lg">
        <CardHeader>
            <CardTitle>Lista de Serviços</CardTitle>
            <CardDescription>
                {services.length > 0 ? `Total de ${services.length} serviços cadastrados.` : "Nenhum serviço cadastrado ainda."}
            </CardDescription>
        </CardHeader>
        <CardContent>
            {services.length === 0 && !loading ? (
                <div className="text-center py-12">
                    <Wrench className="mx-auto h-24 w-24 text-neutralMid/50" />
                    <h3 className="mt-4 text-xl font-semibold text-neutralDark">Nenhum Serviço Encontrado</h3>
                    <p className="mt-2 text-sm text-neutralMid">Comece adicionando um novo serviço.</p>
                    <Button asChild className="mt-6 bg-primaryBlue hover:bg-opacity-90 text-primary-foreground">
                        <Link to="/admin/services/new">
                            <PlusCircle className="mr-2 h-5 w-5" />
                            Adicionar Primeiro Serviço
                        </Link>
                    </Button>
                </div>
            ) : (
            <Table>
            <TableHeader>
                <TableRow>
                <TableHead className="w-[50px]">Imagem</TableHead>
                <TableHead>Nome</TableHead>
                <TableHead>Categoria</TableHead>
                <TableHead className="text-center">Status</TableHead>
                <TableHead className="text-center w-[100px]">Ações</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {services.map((service) => (
                <TableRow key={service.id} className="hover:bg-neutralLight/50">
                    <TableCell>
                        <div className="w-10 h-10 bg-neutralMid/20 rounded-sm flex items-center justify-center overflow-hidden">
                        {service.image_url ? 
                            <img src={service.image_url} alt={service.image_alt_text || service.name} className="w-full h-full object-cover" /> : 
                            <Wrench className="w-5 h-5 text-neutralMid" />}
                        </div>
                    </TableCell>
                    <TableCell className="font-medium text-neutralDark">{service.name}</TableCell>
                    <TableCell className="text-neutralMid">{service.category || 'N/A'}</TableCell>
                    <TableCell className="text-center">
                    <Badge variant={service.is_published ? "default" : "outline"} 
                            className={service.is_published ? 'bg-green-500 text-white' : 'border-yellow-500 text-yellow-600'}>
                        {service.is_published ? 
                            <><CheckCircle className="mr-1 h-3 w-3"/> Publicado</> : 
                            <><XCircle className="mr-1 h-3 w-3"/> Rascunho</>}
                    </Badge>
                    </TableCell>
                    <TableCell className="text-center">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0 text-neutralMid hover:text-primaryBlue">
                            <span className="sr-only">Abrir menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Ações</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => navigate(`/admin/services/edit/${service.id}`)}>
                            <Edit className="mr-2 h-4 w-4" /> Editar
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            onClick={() => handleDeleteService(service.id!)}
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
