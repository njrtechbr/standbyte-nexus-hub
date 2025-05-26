// src/components/About.tsx
import React from 'react';
import { Button } from "@/components/ui/button"; // Ajuste o caminho
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import type { ContentSection } from '@/admin/types/pageContentTypes'; // Ajuste o caminho

interface AboutProps {
  sectionData?: ContentSection | null;
}

// Conteúdo Padrão/Fallback
const defaultAboutData: Partial<ContentSection> = {
  title: "Sobre a StandByte",
  text_content: "Somos uma equipe apaixonada por tecnologia, dedicada a fornecer soluções inovadoras e personalizadas para nossos clientes. Com anos de experiência no mercado, combinamos conhecimento técnico com um atendimento ao cliente excepcional para impulsionar o sucesso do seu negócio. Nossa missão é simplificar a complexidade tecnológica e transformar desafios em oportunidades.",
  image_url: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80", // Imagem de fallback
  image_alt_text: "Equipe colaborando em um projeto",
  cta_text: "Conheça Nossa História",
  cta_link: "/sobre" // Link para a página "Sobre" completa
};

const About: React.FC<AboutProps> = ({ sectionData }) => {
  // Usar sectionData se for do tipo esperado (ex: 'textWithImage' ou 'about_us_content'), senão usar fallback.
  // Ajuste o 'sectionData.type' conforme o tipo que você usará no admin para esta seção.
  const data = sectionData && (sectionData.type === 'textWithImage' || sectionData.type === 'about_us_content') 
               ? sectionData 
               : defaultAboutData;

  if (!data.title) { // Se não houver título (nem no fallback), não renderizar.
    return null;
  }

  return (
    <section id="about" className="py-16 md:py-24 bg-neutralWhite">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Coluna de Imagem */}
          <div className={`animate-fade-in-scale ${data.image_url ? 'order-1 md:order-2' : 'hidden'}`}>
            {data.image_url && (
              <img 
                src={data.image_url} 
                alt={data.image_alt_text || 'Sobre nós'} 
                className="rounded-lg shadow-xl w-full h-auto max-h-[500px] object-cover"
              />
            )}
          </div>

          {/* Coluna de Texto */}
          <div className={`space-y-6 ${data.image_url ? 'order-2 md:order-1' : 'md:col-span-2 text-center'}`}>
            <h2 className="text-3xl md:text-4xl font-bold text-primaryBlue mb-4">
              {data.title}
            </h2>
            {data.text_content && (
              <p className="text-lg text-neutralDark leading-relaxed whitespace-pre-line">
                {data.text_content}
              </p>
            )}
            {data.cta_text && data.cta_link && (
              <Button size="lg" asChild className="mt-6 bg-accentRed hover:bg-opacity-80 text-neutralWhite">
                <Link to={data.cta_link}>
                  {data.cta_text}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
