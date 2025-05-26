
import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ServiceBreadcrumb from "@/components/service/ServiceBreadcrumb";
import ServiceImageGallery from "@/components/service/ServiceImageGallery";
import ServiceInfo from "@/components/service/ServiceInfo";
import ServiceProjectGallery from "@/components/service/ServiceProjectGallery";
import ServiceDetails from "@/components/service/ServiceDetails";
import ServiceCTA from "@/components/service/ServiceCTA";
import { getServiceBySlug } from "@/data/services";

const ServicoIndividual = () => {
  const { slug } = useParams<{ slug: string }>();
  const service = slug ? getServiceBySlug(slug) : null;

  if (!service) {
    return (
      <div className="min-h-screen bg-standbyte-white">
        <Header />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h1 className="text-3xl font-bold text-standbyte-dark mb-4">Serviço não encontrado</h1>
          <Link to="/servicos" className="text-standbyte-blue hover:underline">
            Voltar para serviços
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-standbyte-white">
      <Header />
      
      <main className="pt-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <ServiceBreadcrumb serviceTitle={service.title} />

          {/* Back Button */}
          <Link 
            to="/servicos" 
            className="inline-flex items-center gap-2 text-standbyte-blue hover:text-blue-700 mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar para Serviços
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <ServiceImageGallery gallery={service.gallery} title={service.title} />
            <ServiceInfo 
              title={service.title}
              description={service.description}
              badge={service.badge}
              category={service.category}
              duration={service.duration}
              warranty={service.warranty}
            />
          </div>

          <ServiceProjectGallery 
            projectGallery={service.projectGallery} 
            serviceTitle={service.title}
          />

          <ServiceDetails 
            fullDescription={service.fullDescription}
            features={service.features}
            benefits={service.benefits}
            process={service.process}
          />

          <ServiceCTA />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ServicoIndividual;
