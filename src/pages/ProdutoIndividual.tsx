// src/pages/ProdutoIndividual.tsx
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ShoppingCart, ArrowLeft, Plus, Minus, Loader2, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Helmet } from 'react-helmet-async';
import { useProductDetails } from '@/hooks/useProductDetails'; // Novo hook
import type { Product } from '@/admin/types/productTypes';

const formatPrice = (price: number | null | undefined): string => {
  if (price === null || price === undefined) return 'Preço sob consulta';
  return price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
};

const ProdutoIndividual = () => {
  const { slug } = useParams<{ slug: string }>();
  const { product, loading, error } = useProductDetails(slug);
  
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (type: 'increase' | 'decrease') => {
    if (type === 'increase') setQuantity(prev => prev + 1);
    else if (type === 'decrease' && quantity > 1) setQuantity(prev => prev - 1);
  };

  const imageGallery = product?.image_url ? [product.image_url] : []; 

  const handleRetryFetch = () => {
    console.log("Tentativa de recarregar dados (implementação de refetch no hook seria ideal).");
    window.location.reload(); 
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-neutralWhite"> <Header />
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
          <Loader2 className="h-16 w-16 animate-spin text-primaryBlue" />
          <p className="mt-4 text-lg text-neutralDark">Carregando detalhes do produto...</p>
        </div> <Footer />
      </div>
    );
  }
  
  if (error) { // Erro de fetch, não necessariamente "não encontrado"
    return (
      <div className="min-h-screen bg-neutralWhite"> <Header />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <AlertTriangle className="h-16 w-16 mb-4 text-destructive mx-auto" />
          <h1 className="text-2xl font-bold text-neutralDark mb-3">Erro ao Carregar Produto</h1>
          <p className="text-neutralMid mb-6">{error}</p>
          <Button onClick={handleRetryFetch} className="mt-6 bg-destructive hover:bg-destructive/90 text-destructive-foreground">
            Tentar Novamente
          </Button>
        </div> <Footer />
      </div>
    );
  }

  if (!product) { // Não está carregando, não houve erro de fetch, mas o produto é null (não encontrado/publicado)
     return (
      <div className="min-h-screen bg-neutralWhite"> <Header />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <ShoppingCart className="h-24 w-24 mb-6 text-neutralMid/50 mx-auto" />
          <h1 className="text-3xl font-bold text-neutralDark mb-4">Produto não encontrado</h1>
          <p className="text-neutralMid mb-6">O produto que você está procurando não existe ou não está mais disponível.</p>
          <Button asChild className="bg-primaryBlue text-neutralWhite hover:bg-opacity-90">
            <Link to="/produtos">Ver todos os produtos</Link>
          </Button>
        </div> <Footer />
      </div>
    );
  }

  const siteName = "StandByte";
  const pageTitle = product.meta_title || `${product.name} - ${siteName}`;
  const pageDescription = product.meta_description || product.description?.substring(0, 160) || `Compre ${product.name} na ${siteName}.`;
  const pageKeywords = product.meta_keywords || product.category || "";
  
  let structuredDataJson = null;
  if (product.structured_data) {
    try { structuredDataJson = typeof product.structured_data === 'string' ? JSON.parse(product.structured_data) : product.structured_data; } 
    catch (e) { console.error("Erro ao parsear structured_data JSON do produto:", e); }
  } else {
    structuredDataJson = {
      "@context": "https://schema.org/", "@type": "Product", "name": product.name,
      "image": product.image_url || undefined, "description": product.description || pageDescription,
      "sku": product.id, 
      "offers": {
        "@type": "Offer", "url": typeof window !== 'undefined' ? window.location.href : undefined,
        "priceCurrency": "BRL", "price": product.price,
        "availability": (product.details && typeof product.details === 'object' && (product.details as any).stock > 0) ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
        "itemCondition": "https://schema.org/NewCondition"
      }
    };
  }

  return (
    <div className="min-h-screen bg-neutralWhite">
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta name="keywords" content={pageKeywords} />
        {typeof window !== 'undefined' && <link rel="canonical" href={window.location.href} />}
        {structuredDataJson && ( <script type="application/ld+json">{JSON.stringify(structuredDataJson)}</script> )}
      </Helmet>
      <Header />
      
      <main className="pt-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center gap-2 mb-4 text-sm">
            <Link to="/" className="text-neutralMid hover:text-primaryBlue">Home</Link>
            <span className="text-neutralMid">/</span>
            <Link to="/produtos" className="text-neutralMid hover:text-primaryBlue">Produtos</Link>
            <span className="text-neutralMid">/</span>
            <span className="text-neutralDark">{product.name}</span>
          </div>
          <Button variant="outline" onClick={() => window.history.back()} className="mb-8">
            <ArrowLeft className="w-4 h-4 mr-2" /> Voltar
          </Button>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
            <div className="space-y-4">
              <div className="aspect-square bg-neutralLight/40 rounded-lg overflow-hidden shadow-md">
                {imageGallery.length > 0 ? ( <img src={imageGallery[selectedImageIndex]} alt={product.image_alt_text || product.name} className="w-full h-full object-contain transition-opacity duration-300" /> ) 
                : ( <div className="w-full h-full flex items-center justify-center"><ShoppingCart className="w-24 h-24 text-neutralMid/30" /></div> )}
              </div>
              {imageGallery.length > 1 && (
                <div className="flex gap-3 overflow-x-auto pb-2">
                  {imageGallery.map((image, index) => (
                    <button key={index} onClick={() => setSelectedImageIndex(index)} className={`flex-shrink-0 w-20 h-20 rounded-md overflow-hidden border-2 transition-colors ${ selectedImageIndex === index ? 'border-primaryBlue' : 'border-neutralLight hover:border-neutralMid' }`}>
                      <img src={image} alt={`${product.name} ${index + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>
            <div className="space-y-5">
              <div>
                {product.category && ( <span className="text-xs bg-neutralLight text-neutralDark px-2 py-1 rounded mb-2 inline-block">{product.category}</span> )}
                <h1 className="text-3xl md:text-4xl font-bold text-neutralDark">{product.name}</h1>
              </div>
              <div className="border-t border-neutralLight pt-5">
                <div className="text-3xl md:text-4xl font-bold text-primaryBlue mb-1">{formatPrice(product.price)}</div>
              </div>
              {product.description && (
                <div className="border-t border-neutralLight pt-5">
                   <h3 className="text-lg font-semibold text-neutralDark mb-2">Descrição</h3>
                   <p className="text-neutralMid leading-relaxed whitespace-pre-line">{product.description}</p>
                </div>
              )}
              <div className="border-t border-neutralLight pt-5">
                <div className="flex items-center gap-4 mb-4">
                  <span className="font-medium text-neutralDark">Quantidade:</span>
                  <div className="flex items-center border border-neutralLight rounded-md">
                    <Button variant="ghost" size="icon" onClick={() => handleQuantityChange('decrease')} className="h-9 w-9"><Minus className="w-4 h-4" /></Button>
                    <span className="px-4 py-1.5 font-medium text-lg">{quantity}</span>
                    <Button variant="ghost" size="icon" onClick={() => handleQuantityChange('increase')} className="h-9 w-9"><Plus className="w-4 h-4" /></Button>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button size="lg" className="flex-1 bg-primaryBlue hover:bg-opacity-90 text-neutralWhite text-base"><ShoppingCart className="w-5 h-5 mr-2" /> Adicionar ao Carrinho</Button>
                </div>
              </div>
            </div>
          </div>
          {product.details && typeof product.details === 'object' && Object.keys(product.details).length > 0 && (
            <div className="mt-12 lg:mt-16 pt-8 border-t border-neutralLight">
              <h2 className="text-2xl font-bold text-neutralDark mb-6">Especificações Técnicas</h2>
              <Card className="bg-neutralLight/30">
                <CardContent className="p-6 space-y-3">
                  {Object.entries(product.details as Record<string, any>).map(([key, value]) => !['stock', 'gallery_urls'].includes(key) && ( 
                    <div key={key} className="flex flex-col sm:flex-row justify-between sm:items-center border-b border-neutralMid/20 pb-2 last:border-b-0">
                      <span className="font-semibold text-neutralDark capitalize">{key.replace(/_/g, ' ').replace(/([A-Z])/g, ' $1').trim()}:</span>
                      <span className="text-neutralMid text-left sm:text-right">{typeof value === 'boolean' ? (value ? 'Sim' : 'Não') : Array.isArray(value) ? value.join(', ') : String(value)}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};
export default ProdutoIndividual;
