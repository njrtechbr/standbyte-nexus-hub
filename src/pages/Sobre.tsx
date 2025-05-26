// src/pages/Sobre.tsx
import React from 'react';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Helmet } from 'react-helmet-async';
import { usePageContent } from '@/hooks/usePageContent'; // Ajuste o caminho
import { Loader2, AlertTriangle } from 'lucide-react';
import type { ContentSection } from '@/admin/types/pageContentTypes'; // Ajuste

// Um componente simples para renderizar seções de conteúdo (pode ser expandido)
const RenderContentSection: React.FC<{ section: ContentSection }> = ({ section }) => {
  switch (section.type) {
    case 'hero': // Exemplo, pode não ser usado diretamente na página Sobre
      return (
        <div className="py-12 bg-primaryBlue text-neutralWhite text-center">
          {section.image_url && <img src={section.image_url} alt={section.image_alt_text || section.title || ""} className="w-full h-64 object-cover mb-4"/>}
          <h2 className="text-3xl font-bold">{section.title}</h2>
          {section.text_content && <p className="mt-2 text-lg">{section.text_content}</p>}
          {/* Adicionar CTA se existir */}
        </div>
      );
    case 'textWithImage':
      return (
        <div className="py-8 md:py-12 grid md:grid-cols-2 gap-8 items-center">
          <div className={section.image_url ? 'order-1 md:order-last' : 'md:col-span-2'}>
            {section.title && <h2 className="text-2xl md:text-3xl font-bold text-primaryBlue mb-4">{section.title}</h2>}
            {section.text_content && <div className="prose prose-lg max-w-none text-neutralDark" dangerouslySetInnerHTML={{ __html: section.text_content.replace(/\n/g, '<br />') }} />}
            {/* Adicionar CTA se existir */}
          </div>
          {section.image_url && (
            <div className="order-2 md:order-first">
              <img src={section.image_url} alt={section.image_alt_text || section.title || "Imagem da seção"} className="rounded-lg shadow-xl w-full h-auto max-h-[400px] object-cover"/>
            </div>
          )}
        </div>
      );
    case 'generic_text':
      return (
        <div className="py-8 md:py-12">
          {section.title && <h2 className="text-2xl md:text-3xl font-bold text-primaryBlue mb-4">{section.title}</h2>}
          {section.text_content && <div className="prose prose-lg max-w-none text-neutralDark" dangerouslySetInnerHTML={{ __html: section.text_content.replace(/\n/g, '<br />') }} />}
        </div>
      );
    // Adicionar outros tipos de seção conforme necessário (faq, cta_banner, etc.)
    default:
      return (
        <div className="py-4 my-2 border p-4 rounded-md bg-neutralLight/50">
          <p className="font-semibold text-neutralDark">Seção: {section.title || `Tipo: ${section.type}`}</p>
          {section.text_content && <p className="text-sm text-neutralMid">{section.text_content.substring(0,100)}...</p>}
        </div>
      );
  }
};


const Sobre = () => {
  const { pageData, loading, error } = usePageContent("sobre"); // Usando "sobre" como page_identifier

  // if (loading) { /* ... UI de loading ... */ } // Handled inline below
  // if (error && !pageData) { /* ... UI de erro ... */ } // Handled inline below

  const siteName = "StandByte";
  const pageTitle = pageData?.meta_title || pageData?.title || `Sobre Nós - ${siteName}`;
  const pageDescription = pageData?.meta_description || `Conheça mais sobre a ${siteName}, nossa missão, visão e valores.`;
  const pageKeywords = pageData?.meta_keywords || `sobre nós, ${siteName}, história, empresa`;

  let structuredDataJson = null;
  if (pageData?.structured_data) {
    try {
      structuredDataJson = typeof pageData.structured_data === 'string'
        ? JSON.parse(pageData.structured_data)
        : pageData.structured_data;
    } catch (e) { console.error("Erro ao parsear structured_data JSON da página Sobre:", e); }
  } else if (pageData) { // Somente criar fallback se pageData existir (mesmo que sem structured_data)
    structuredDataJson = {
      "@context": "https://schema.org",
      "@type": "AboutPage",
      "name": pageTitle,
      "description": pageDescription,
      "url": typeof window !== 'undefined' ? window.location.href : undefined,
      "publisher": {
        "@type": "Organization",
        "name": siteName
      }
    };
  }
  
  if (loading) {
    return (
      <div className="min-h-screen bg-neutralWhite"> <Header />
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
          <Loader2 className="h-16 w-16 animate-spin text-primaryBlue" />
          <p className="mt-4 text-lg text-neutralDark">Carregando página...</p>
        </div> <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutralWhite">
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta name="keywords" content={pageKeywords} />
        {typeof window !== 'undefined' && <link rel="canonical" href={window.location.href} />}
        {structuredDataJson && (
          <script type="application/ld+json">
            {JSON.stringify(structuredDataJson)}
          </script>
        )}
      </Helmet>
      <Header />
      
      <main className="pt-8">
        {/* Cabeçalho da Página (pode vir de pageData.title ou de uma seção específica) */}
        <div className="bg-primaryBlue text-neutralWhite py-16 md:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold">
              {pageData?.title || "Sobre Nós"}
            </h1>
            {/* Exibir meta_description como subtitulo se não houver uma seção hero específica */}
            {pageData?.meta_description && !pageData?.content_sections?.find(s => s.type === 'hero' && s.text_content) && (
                <p className="mt-4 text-xl max-w-2xl mx-auto text-neutralLight/90">{pageData.meta_description}</p>
            )}
          </div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16">
          {error && !pageData && ( // Erro ao carregar dados, mas a página base ainda é renderizada
            <div className="p-4 mb-6 rounded-md bg-destructive/10 text-destructive text-center">
              <AlertTriangle className="h-8 w-8 mb-2 inline-block" />
              <p><strong>Atenção:</strong> {error} Exibindo conteúdo padrão ou limitado.</p>
            </div>
          )}

          {!loading && !error && !pageData && ( // Conteúdo não encontrado
             <div className="text-center py-12">
                <AlertTriangle className="mx-auto h-24 w-24 text-neutralMid/50" />
                <h3 className="mt-4 text-xl font-semibold text-neutralDark">Conteúdo não disponível</h3>
                <p className="mt-2 text-sm text-neutralMid">O conteúdo para esta página ainda não foi configurado.</p>
             </div>
          )}

          {pageData?.content_sections && pageData.content_sections.length > 0 ? (
            <div className="space-y-8 md:space-y-12">
              {pageData.content_sections.map((section, index) => (
                <RenderContentSection key={section.id || `section-${index}`} section={section} />
              ))}
            </div>
          ) : (
            !loading && !error && pageData && ( // pageData existe mas não tem content_sections
              <div className="prose prose-lg max-w-none text-neutralDark text-center py-12">
                <p>Bem-vindo à nossa página Sobre!</p>
                <p>O conteúdo principal para esta página está sendo preparado e estará disponível em breve.</p>
              </div>
            )
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Sobre;
