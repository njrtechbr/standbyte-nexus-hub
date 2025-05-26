// src/admin/pages/products/ProductsListPage.tsx
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Adicionado useNavigate
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { MoreHorizontal, PlusCircle, Search, Edit, Trash2, CheckCircle, XCircle, ShoppingBag, AlertTriangle, Loader2 } from 'lucide-react'; // Adicionados AlertTriangle, Loader2
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'; // Adicionado Card...
import { getProducts, deleteProduct } from '@/admin/services/productService'; // Ajuste o caminho
import type { Product } from '@/admin/types/productTypes'; // Ajuste o caminho
// import { useToast } from '@/components/ui/use-toast'; // Para feedback visual

const formatPrice = (price: number | null | undefined): string => {
  if (price === null || price === undefined) return 'N/A';
  return price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
};

export default function ProductsListPage() {
  const navigate = useNavigate(); // Para navegação programática
  // const { toast } = useToast(); // Para feedback visual

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (err: any) {
      setError(err.message || 'Erro ao buscar produtos.');
      // toast({ title: "Erro", description: err.message || 'Erro ao buscar produtos.', variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDeleteProduct = async (productId: string) => {
    if (!productId) {
        // toast({ title: "Erro", description: "ID do produto inválido.", variant: "destructive" });
        console.error("ID do produto inválido para exclusão.");
        return;
    }
    if (window.confirm('Tem certeza que deseja excluir este produto? Esta ação não pode ser desfeita.')) {
      try {
        await deleteProduct(productId);
        setProducts(prevProducts => prevProducts.filter(p => p.id !== productId));
        // toast({ title: "Sucesso", description: "Produto excluído com sucesso." });
      } catch (err: any) {
        setError(err.message || 'Erro ao excluir produto.');
        // toast({ title: "Erro", description: err.message || 'Erro ao excluir produto.', variant: "destructive" });
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-16 w-16 animate-spin text-primaryBlue" />
        <p className="ml-4 text-lg text-neutralDark">Carregando produtos...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 rounded-md bg-destructive/10 text-destructive flex flex-col items-center justify-center h-64">
        <AlertTriangle className="h-12 w-12 mb-4" />
        <h2 className="text-xl font-semibold mb-2">Erro ao carregar produtos</h2>
        <p>{error}</p>
        <Button onClick={fetchProducts} className="mt-4 bg-destructive hover:bg-destructive/90 text-destructive-foreground">
          Tentar Novamente
        </Button>
      </div>
    );
  }

  return (
    <div className="p-2 md:p-4">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-primaryBlue">Gerenciamento de Produtos</h1>
        <Button asChild className="bg-primaryBlue hover:bg-opacity-90 text-primary-foreground">
          <Link to="/admin/products/new">
            <PlusCircle className="mr-2 h-5 w-5" />
            Adicionar Novo Produto
          </Link>
        </Button>
      </div>

      {/* Área de Filtros e Busca - Placeholder */}
      <div className="mb-6 p-4 bg-neutralWhite rounded-lg shadow">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <div className="space-y-1">
            <label htmlFor="searchName" className="text-sm font-medium text-neutralDark">Buscar por Nome</label>
            <Input id="searchName" placeholder="Nome do produto..." className="text-neutralDark" />
          </div>
          {/* Outros filtros aqui */}
          <Button className="self-end bg-primaryBlue hover:bg-opacity-80 text-primary-foreground">
            <Search className="mr-2 h-4 w-4" />
            Buscar
          </Button>
        </div>
      </div>

      <Card className="shadow-lg">
        <CardHeader>
            <CardTitle>Lista de Produtos</CardTitle>
            <CardDescription>
                {products.length > 0 ? `Total de ${products.length} produtos cadastrados.` : "Nenhum produto cadastrado ainda."}
            </CardDescription>
        </CardHeader>
        <CardContent>
            {products.length === 0 && !loading ? (
                <div className="text-center py-12">
                    <ShoppingBag className="mx-auto h-24 w-24 text-neutralMid/50" />
                    <h3 className="mt-4 text-xl font-semibold text-neutralDark">Nenhum Produto Encontrado</h3>
                    <p className="mt-2 text-sm text-neutralMid">Comece adicionando um novo produto.</p>
                    <Button asChild className="mt-6 bg-primaryBlue hover:bg-opacity-90 text-primary-foreground">
                        <Link to="/admin/products/new">
                            <PlusCircle className="mr-2 h-5 w-5" />
                            Adicionar Primeiro Produto
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
                <TableHead className="text-right">Preço</TableHead>
                <TableHead className="text-center">Status</TableHead>
                {/* <TableHead className="text-center">Estoque</TableHead> */}
                <TableHead className="text-center w-[100px]">Ações</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {products.map((product) => (
                <TableRow key={product.id} className="hover:bg-neutralLight/50">
                    <TableCell>
                        <div className="w-10 h-10 bg-neutralMid/20 rounded-sm flex items-center justify-center overflow-hidden">
                        {product.image_url ? 
                            <img src={product.image_url} alt={product.image_alt_text || product.name} className="w-full h-full object-cover" /> : 
                            <ShoppingBag className="w-5 h-5 text-neutralMid" />}
                        </div>
                    </TableCell>
                    <TableCell className="font-medium text-neutralDark">{product.name}</TableCell>
                    <TableCell className="text-neutralMid">{product.category || 'N/A'}</TableCell>
                    <TableCell className="text-right text-neutralDark">{formatPrice(product.price)}</TableCell>
                    <TableCell className="text-center">
                    <Badge variant={product.is_published ? "default" : "outline"} 
                            className={product.is_published ? 'bg-primary text-primary-foreground hover:bg-primary/90' : 'border-neutralMid text-neutralDark hover:bg-neutralLight'}>
                        {product.is_published ? 
                            <><CheckCircle className="mr-1 h-3 w-3"/> Publicado</> : 
                            <><XCircle className="mr-1 h-3 w-3"/> Rascunho</>}
                    </Badge>
                    </TableCell>
                    {/* <TableCell className="text-center text-neutralDark">
                        {product.stock > 0 ? product.stock : <Badge variant="destructive" className="bg-accentRed text-neutralWhite">Zerado</Badge>}
                    </TableCell> */}
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
                        <DropdownMenuItem onClick={() => navigate(`/admin/products/edit/${product.id}`)}>
                            <Edit className="mr-2 h-4 w-4" /> Editar
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            onClick={() => handleDeleteProduct(product.id!)} // Adicionado '!' pois o ID deve existir aqui
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
