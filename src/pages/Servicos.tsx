// src/pages/Servicos.tsx
import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Helmet } from 'react-helmet-async';
import { useServicesList } from '@/hooks/useServicesList'; // Novo hook
import type { Service } from '@/admin/types/serviceTypes';
import { Loader2, AlertTriangle, Wrench, ChevronRight } from 'lucide-react';

const Servicos = () => {
  const { services: allServicesFromHook, loading, error } = useServicesList();
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [filteredServices, setFilteredServices] = useState<Service[]>([]);
  const [categories, setCategories] = useState<string[]>(["Todos"]);

  useEffect(() => {
    if (allServicesFromHook.length > 0) {
      const uniqueCategories = ["Todos", ...new Set(allServicesFromHook.map(s => s.category).filter(Boolean) as string[])];
      setCategories(uniqueCategories);
    } else {
      setCategories(["Todos"]);
    }
    // Aplicar filtro de categoria
    if (selectedCategory === 'Todos') {
      setFilteredServices(allServicesFromHook);
    } else {
      setFilteredServices(allServicesFromHook.filter(service => service.category === selectedCategory));
    }
  }, [allServicesFromHook, selectedCategory]);

  const handleRetryFetch = () => {
    console.log("Tentativa de recarregar dados (implementação de refetch no hook seria ideal).");
    window.location.reload(); 
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-neutralWhite"> <Header />
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
          <Loader2 className="h-12 w-12 animate-spin text-primaryBlue" />
          <p className="mt-3 text-neutralDark">Carregando serviços...</p>
        </div> <Footer />
      </div>
    );
  }

  if (error) {
     return (
      <div className="min-h-screen bg-neutralWhite"> <Header />
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-destructive p-4 text-center">
          <AlertTriangle className="h-12 w-12 mb-3" />
          <h2 className="text-xl font-semibold">Erro ao Carregar Serviços</h2>
          <p className="mb-4">{error}</p>
          <Button onClick={handleRetryFetch} className="bg-destructive hover:bg-destructive/90 text-destructive-foreground">
            Tentar Novamente
          </Button>
        </div> <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutralWhite">
      <Helmet>
        <title>Nossos Serviços - StandByte</title>
        <meta name="description" content="Descubra os serviços especializados que a StandByte oferece para impulsionar seu negócio. Soluções em TI, infraestrutura e mais." />
      </Helmet>
      <Header />
      <main className="pt-8">
        <div className="bg-neutralLight py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl lg:text-5xl font-bold text-primaryBlue mb-4">Nossos Serviços</h1>
            <p className="text-xl text-neutralMid max-w-3xl mx-auto">Soluções completas e personalizadas para atender às necessidades da sua empresa.</p>
          </div>
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {categories.length > 1 && (
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-2 rounded-full font-medium transition-colors ${ category === selectedCategory ? "bg-primaryBlue text-neutralWhite" : "bg-neutralLight text-neutralDark hover:bg-primaryBlue hover:text-neutralWhite" }`}
                >
                  {category}
                </button>
              ))}
            </div>
          )}
          {filteredServices.length === 0 ? (
            <div className="text-center py-16">
              <Wrench className="mx-auto h-24 w-24 text-neutralMid/50" />
              <h3 className="mt-6 text-2xl font-semibold text-neutralDark">Nenhum Serviço Encontrado</h3>
              <p className="mt-3 text-neutralMid">
                {selectedCategory === 'Todos' ? "Não há serviços publicados no momento." : `Não há serviços publicados na categoria "${selectedCategory}".`}
              </p>
              {selectedCategory !== 'Todos' && ( <Button variant="link" onClick={() => setSelectedCategory('Todos')} className="mt-4 text-primaryBlue">Ver todos os serviços</Button> )}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredServices.map((service) => (
                <Card key={service.id} className="group hover:shadow-xl transition-shadow duration-300 flex flex-col overflow-hidden rounded-lg border-neutralLight">
                  {service.image_url ? ( <div className="relative aspect-[16/9] overflow-hidden"><img src={service.image_url} alt={service.image_alt_text || service.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" /></div> ) 
                  : ( <div className="aspect-[16/9] bg-neutralLight/40 flex items-center justify-center"><Wrench className="w-16 h-16 text-neutralMid/40" /></div> )}
                  <CardHeader className="p-5">
                    <CardTitle className="text-xl font-semibold text-neutralDark group-hover:text-primaryBlue transition-colors line-clamp-2">{service.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="p-5 pt-0 flex-grow">
                    <p className="text-neutralMid text-sm line-clamp-3 mb-4">{service.description || "Descrição do serviço não disponível."}</p>
                  </CardContent>
                  <div className="p-5 pt-2 mt-auto">
                    <Button asChild className="w-full bg-primaryBlue hover:bg-opacity-80 text-neutralWhite"><Link to={`/servico/${service.slug}`}>Ver Detalhes<ChevronRight className="ml-2 h-4 w-4" /></Link></Button>
                  </div>
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
export default Servicos;
