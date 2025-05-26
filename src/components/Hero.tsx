// src/components/Hero.tsx
import React from 'react';
import { Button } from "@/components/ui/button"; // Ajuste o caminho
import { Link } from "react-router-dom"; // Se o CTA for um link interno
import { ChevronRight } from "lucide-react";
// Supondo que ContentSection tenha esta estrutura para 'hero'
import type { ContentSection } from '@/admin/types/pageContentTypes'; // Ajuste o caminho

interface HeroProps {
  sectionData?: ContentSection | null; // Dados da seção Hero
}

// Conteúdo Padrão/Fallback
const defaultHeroData: Partial<ContentSection> = {
  title: "Bem-vindo à StandByte!",
  text_content: "Sua parceira completa em soluções de tecnologia e infraestrutura. Inovação e eficiência para o seu negócio.",
  cta_text: "Explore Nossos Serviços",
  cta_link: "/servicos",
  image_url: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2020&q=80", // Imagem de fallback
  image_alt_text: "Tecnologia e inovação abstratas"
};

const Hero: React.FC<HeroProps> = ({ sectionData }) => {
  const data = sectionData && sectionData.type === 'hero' ? sectionData : defaultHeroData;

  // Se nem sectionData nem defaultHeroData tiverem título (improvável com fallback), não renderizar nada.
  if (!data.title) {
    return null;
  }

  return (
    <section 
      className="relative bg-neutralDark text-neutralWhite py-20 md:py-32 min-h-[70vh] flex items-center"
      // Se tiver imagem de fundo dinâmica:
      // style={data.image_url ? { backgroundImage: `url(${data.image_url})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}}
    >
      {/* Overlay escuro para melhor contraste do texto se houver imagem de fundo */}
      {data.image_url && <div className="absolute inset-0 bg-black opacity-50 z-0"></div>}
      
      {/* Imagem de fundo, se fornecida */}
      {data.image_url && (
        <img 
          src={data.image_url} 
          alt={data.image_alt_text || 'Imagem de fundo do Hero'} 
          className="absolute inset-0 w-full h-full object-cover z-0" 
        />
      )}

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 animate-slide-in-up text-shadow-lg">
          {data.title}
        </h1>
        {data.text_content && (
          <p className="text-lg sm:text-xl md:text-2xl text-neutralLight mb-10 max-w-3xl mx-auto animate-slide-in-up animation-delay-300">
            {data.text_content}
          </p>
        )}
        {data.cta_text && data.cta_link && (
          <Button 
            size="lg" 
            asChild 
            className="bg-primaryBlue hover:bg-opacity-80 text-neutralWhite text-lg px-8 py-6 animate-fade-in-scale animation-delay-600"
          >
            <Link to={data.cta_link}>
              {data.cta_text}
              <ChevronRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        )}
      </div>
    </section>
  );
};

export default Hero;
