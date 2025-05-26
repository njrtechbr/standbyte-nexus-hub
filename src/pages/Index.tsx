// src/pages/Index.tsx
import React from 'react'; // Necessário para JSX
import Header from "@/components/Header";
// import Hero from "@/components/Hero"; // Manter por enquanto // Removido, será usado o Hero dinâmico
import Products from "@/components/Products"; // Manter por enquanto
import Services from "@/components/Services"; // Manter por enquanto
// import About from "@/components/About"; // Manter por enquanto // Removido, será usado o About dinâmico
import Footer from "@/components/Footer";
import { Helmet } from 'react-helmet-async';
import { usePageContent } from '@/hooks/usePageContent'; // Ajuste o caminho
import { Loader2, AlertTriangle } from 'lucide-react'; // Para feedback
import Hero from "@/components/Hero"; // Certifique-se que o caminho está correto
import About from "@/components/About"; // Certifique-se que o caminho está correto

const Index = () => {
  const { pageData, loading, error } = usePageContent("home");

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-neutralLight">
        <Loader2 className="h-16 w-16 animate-spin text-primaryBlue" />
        <p className="mt-4 text-lg text-neutralDark">Carregando página inicial...</p>
      </div>
    );
  }
  
  const siteName = "StandByte"; // Nome do site para usar em títulos
  const defaultTitle = `${siteName} - Soluções em Tecnologia e Infraestrutura`;
  const defaultDescription = "Oferecemos as melhores soluções em produtos e serviços de tecnologia e infraestrutura para sua empresa.";

  const title = pageData?.meta_title || pageData?.title || defaultTitle;
  const description = pageData?.meta_description || defaultDescription;
  const keywords = pageData?.meta_keywords || "tecnologia, infraestrutura, TI, serviços, produtos";
  
  let structuredDataJson = null;
  if (pageData?.structured_data) {
    try {
      structuredDataJson = typeof pageData.structured_data === 'string'
        ? JSON.parse(pageData.structured_data)
        : pageData.structured_data;
    } catch (e) {
      console.error("Erro ao parsear structured_data JSON:", e);
    }
  }

  // Encontrar a seção Hero nos dados da página
  const heroSectionData = pageData?.content_sections?.find(section => section.type === 'hero');
  
  // Encontrar a seção "Sobre" nos dados da página
  // Tente encontrar por um tipo específico como 'about_us_content' ou um genérico 'textWithImage'
  // Poderia haver uma lógica mais sofisticada se várias seções 'textWithImage' existirem.
  const aboutSectionData = pageData?.content_sections?.find(
    section => section.type === 'about_us_content' || section.type === 'textWithImage'
  ); 
  // Se não encontrar, o componente About usará seus próprios dados de fallback.


  return (
    <div className="min-h-screen bg-neutralWhite"> {/* Usando bg-neutralWhite como base */}
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        {structuredDataJson && (
          <script type="application/ld+json">
            {JSON.stringify(structuredDataJson)}
          </script>
        )}
      </Helmet>
      <Header />
      
      <Hero sectionData={heroSectionData} /> 
      
      <Products /> {/* Manter por enquanto */}
      <Services /> {/* Manter por enquanto */}
      
      {/* Passar os dados da seção About para o componente About */}
      <About sectionData={aboutSectionData} />
      
      {error && !pageData && ( // Mostrar erro discreto se o fetch falhou mas queremos renderizar o resto
        <div className="container mx-auto my-4 p-4 bg-destructive/10 text-destructive rounded-md text-center">
          <p><strong>Atenção:</strong> Não foi possível carregar o conteúdo dinâmico para esta página ({error}). Exibindo conteúdo padrão.</p>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default Index;
