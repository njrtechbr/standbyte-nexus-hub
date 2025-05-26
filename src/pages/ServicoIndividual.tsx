// src/pages/ServicoIndividual.tsx
import React from "react";
import { useParams, Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Helmet } from 'react-helmet-async';
import { useServiceDetails } from '@/hooks/useServiceDetails'; // Novo hook
import type { Service } from '@/admin/types/serviceTypes';
import { Loader2, AlertTriangle, ArrowLeft, Wrench } from 'lucide-react';

import ServiceBreadcrumb from "@/components/service/ServiceBreadcrumb";
import ServiceImageGallery from "@/components/service/ServiceImageGallery";
import ServiceInfo from "@/components/service/ServiceInfo";
import ServiceDetails from "@/components/service/ServiceDetails";
import ServiceProjectGallery from "@/components/service/ServiceProjectGallery";
import ServiceCTA from "@/components/service/ServiceCTA";

const ServicoIndividual = () => {
  const { slug } = useParams<{ slug: string }>();
  const { service, loading, error } = useServiceDetails(slug);

  const handleRetryFetch = () => {
    console.log("Tentativa de recarregar dados (implementação de refetch no hook seria ideal).");
    window.location.reload();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-neutralWhite"> <Header />
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
          <Loader2 className="h-16 w-16 animate-spin text-primaryBlue" />
          <p className="mt-4 text-lg text-neutralDark">Carregando detalhes do serviço...</p>
        </div> <Footer />
      </div>
    );
  }
  
  if (error) { // Erro de fetch
    return (
      <div className="min-h-screen bg-neutralWhite"> <Header />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <AlertTriangle className="h-16 w-16 mb-4 text-destructive mx-auto" />
          <h1 className="text-2xl font-bold text-neutralDark mb-3">Erro ao Carregar Serviço</h1>
          <p className="text-neutralMid mb-6">{error}</p>
          <Button onClick={handleRetryFetch} className="mt-6 bg-destructive hover:bg-destructive/90 text-destructive-foreground">
            Tentar Novamente
          </Button>
        </div> <Footer />
      </div>
    );
  }

  if (!service) { // Não está carregando, não houve erro de fetch, mas o serviço é null (não encontrado/publicado)
     return (
      <div className="min-h-screen bg-neutralWhite"> <Header />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <Wrench className="h-24 w-24 mb-6 text-neutralMid/50 mx-auto" />
          <h1 className="text-3xl font-bold text-neutralDark mb-4">Serviço não encontrado</h1>
          <p className="text-neutralMid mb-6">O serviço que você está procurando não existe ou não está mais disponível.</p>
          <Button asChild className="bg-primaryBlue text-neutralWhite hover:bg-opacity-90">
            <Link to="/servicos">Ver todos os serviços</Link>
          </Button>
        </div> <Footer />
      </div>
    );
  }

  const siteName = "StandByte";
  const pageTitle = service.meta_title || `${service.name} - Serviços - ${siteName}`;
  const pageDescription = service.meta_description || service.description?.substring(0, 160) || `Detalhes sobre o serviço ${service.name} oferecido pela ${siteName}.`;
  const pageKeywords = service.meta_keywords || service.category || "";

  let structuredDataJson = null;
  if (service.structured_data) {
    try { structuredDataJson = typeof service.structured_data === 'string' ? JSON.parse(service.structured_data) : service.structured_data; } 
    catch (e) { console.error("Erro ao parsear structured_data JSON do serviço:", e); }
  } else {
    structuredDataJson = {
      "@context": "https://schema.org/", "@type": "Service", "name": service.name,
      "description": service.description || pageDescription, "image": service.image_url || undefined,
      "provider": { "@type": "Organization", "name": siteName },
    };
  }
  
  const mockGallery = service.image_url ? [{ id: '1', src: service.image_url, alt: service.image_alt_text || service.name }] : [];

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
      
      <main className="bg-neutralLight/30">
        <ServiceBreadcrumb serviceName={service.name} serviceCategory={service.category} />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            <div className="lg:col-span-2 space-y-8">
              <ServiceImageGallery images={mockGallery} mainImageAlt={service.image_alt_text || service.name} />
              <ServiceInfo title={service.name} category={service.category} />
              <ServiceDetails description={service.description} />
            </div>
            <aside className="lg:col-span-1 space-y-8 lg:sticky lg:top-24 self-start">
              <ServiceCTA serviceName={service.name} />
              <ServiceProjectGallery />
            </aside>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};
export default ServicoIndividual;
