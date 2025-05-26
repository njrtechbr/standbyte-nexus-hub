// src/pages/Produtos.tsx
import React, { useState, useEffect } from 'react';
import { ShoppingCart, Grid3X3, List, Loader2, AlertTriangle } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Helmet } from 'react-helmet-async';
import { useProductsList } from '@/hooks/useProductsList'; // Novo hook
import type { Product } from '@/admin/types/productTypes';

const formatPrice = (price: number | null | undefined): string => {
  if (price === null || price === undefined) return 'N/A';
  return price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
};

const Produtos = () => {
  const { products: allProductsFromHook, loading, error } = useProductsList();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>(["Todos"]);

  useEffect(() => {
    if (allProductsFromHook.length > 0) {
      const uniqueCategories = ["Todos", ...new Set(allProductsFromHook.map(p => p.category).filter(Boolean) as string[])];
      setCategories(uniqueCategories);
    } else {
      setCategories(["Todos"]);
    }
    // Aplicar filtro de categoria
    if (selectedCategory === 'Todos') {
      setFilteredProducts(allProductsFromHook);
    } else {
      setFilteredProducts(allProductsFromHook.filter(product => product.category === selectedCategory));
    }
  }, [allProductsFromHook, selectedCategory]);

  const handleRetryFetch = () => {
    // O hook não expõe uma função de refetch diretamente.
    // Para simular um refetch, poderíamos recarregar a página ou
    // o hook precisaria ser modificado para retornar uma função de refetch.
    // Por simplicidade, vamos apenas logar ou sugerir recarregar a página.
    console.log("Tentativa de recarregar dados (implementação de refetch no hook seria ideal).");
    window.location.reload(); // Solução simples mas não ideal
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-neutralWhite"> <Header />
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
          <Loader2 className="h-16 w-16 animate-spin text-primaryBlue" />
          <p className="mt-4 text-lg text-neutralDark">Carregando produtos...</p>
        </div> <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-neutralWhite"> <Header />
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-destructive p-4 text-center">
          <AlertTriangle className="h-16 w-16 mb-4" />
          <h1 className="text-2xl font-semibold mb-2">Erro ao Carregar Produtos</h1>
          <p>{error}</p>
          <Button onClick={handleRetryFetch} className="mt-6 bg-destructive hover:bg-destructive/90 text-destructive-foreground">
            Tentar Novamente
          </Button>
        </div> <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutralWhite">
      <Helmet>
        <title>Nossos Produtos - StandByte</title>
        <meta name="description" content="Explore nossa vasta gama de produtos de tecnologia e informática. Encontre as melhores ofertas e novidades do mercado na StandByte." />
      </Helmet>
      <Header />
      
      <main className="pt-8">
        <div className="bg-neutralLight py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl lg:text-5xl font-bold text-primaryBlue mb-4">Produtos de Informática</h1>
            <p className="text-xl text-neutralMid max-w-3xl mx-auto">Encontre os melhores produtos de tecnologia com qualidade garantida e preços competitivos.</p>
          </div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-8">
            <div className="flex flex-wrap gap-3">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-2 rounded-full font-medium transition-colors ${
                    category === selectedCategory 
                      ? "bg-primaryBlue text-neutralWhite" 
                      : "bg-neutralLight text-neutralDark hover:bg-primaryBlue hover:text-neutralWhite"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <button onClick={() => setViewMode('grid')} className={`p-2 rounded ${viewMode === 'grid' ? 'bg-primaryBlue text-neutralWhite' : 'text-neutralMid hover:bg-primaryBlue/10'}`}> <Grid3X3 className="w-5 h-5" /> </button>
                <button onClick={() => setViewMode('list')} className={`p-2 rounded ${viewMode === 'list' ? 'bg-primaryBlue text-neutralWhite' : 'text-neutralMid hover:bg-primaryBlue/10'}`}> <List className="w-5 h-5" /> </button>
              </div>
            </div>
          </div>
          
          {filteredProducts.length === 0 ? (
            <div className="text-center py-16">
              <ShoppingCart className="mx-auto h-24 w-24 text-neutralMid/50" />
              <h3 className="mt-6 text-2xl font-semibold text-neutralDark">Nenhum Produto Encontrado</h3>
              <p className="mt-3 text-neutralMid">
                {selectedCategory === 'Todos' 
                  ? "Não há produtos publicados no momento." 
                  : `Não há produtos publicados na categoria "${selectedCategory}".`}
              </p>
              {selectedCategory !== 'Todos' && ( <Button variant="link" onClick={() => setSelectedCategory('Todos')} className="mt-4 text-primaryBlue">Ver todos os produtos</Button> )}
            </div>
          ) : (
            <div className={`grid gap-8 mb-12 ${ viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' : 'grid-cols-1' }`}>
              {filteredProducts.map((product) => (
                <Card key={product.id} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-neutralLight flex flex-col">
                  <CardHeader className="p-0 relative overflow-hidden">
                    <Link to={`/produto/${product.slug}`}>
                      <div className="relative aspect-[4/3] bg-neutralLight/30">
                        {product.image_url ? ( <img src={product.image_url} alt={product.image_alt_text || product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" /> ) 
                        : ( <div className="w-full h-full flex items-center justify-center bg-neutralLight"><ShoppingCart className="w-16 h-16 text-neutralMid/50" /></div> )}
                      </div>
                    </Link>
                  </CardHeader>
                  <CardContent className="p-4 md:p-5 flex-grow flex flex-col">
                    <div className="flex items-center justify-between mb-1 text-xs">
                      <span className="bg-neutralLight text-neutralDark px-2 py-0.5 rounded">{product.category || 'Sem Categoria'}</span>
                    </div>
                    <Link to={`/produto/${product.slug}`} className="flex-grow">
                      <h3 className="text-md lg:text-lg font-semibold text-neutralDark mb-2 line-clamp-2 hover:text-primaryBlue transition-colors">{product.name}</h3>
                    </Link>
                    <div className="mt-auto">
                        <div className="mb-3">
                            <div className="text-xl lg:text-2xl font-bold text-primaryBlue">{formatPrice(product.price)}</div>
                        </div>
                        <div className="flex gap-2">
                            <Button size="sm" className="flex-1 bg-primaryBlue hover:bg-opacity-80 text-neutralWhite"><ShoppingCart className="w-4 h-4 mr-1.5" />Comprar</Button>
                            <Button size="sm" variant="outline" asChild className="border-primaryBlue text-primaryBlue hover:bg-primaryBlue hover:text-neutralWhite"><Link to={`/produto/${product.slug}`}>Ver Mais</Link></Button>
                        </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};
export default Produtos;
