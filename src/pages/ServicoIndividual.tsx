
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, CheckCircle, Clock, Shield, Users, FileText, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getServiceBySlug } from "@/data/services";

const ServicoIndividual = () => {
  const { slug } = useParams<{ slug: string }>();
  const [selectedImage, setSelectedImage] = useState(0);

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
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 mb-8 text-sm">
            <Link to="/" className="text-standbyte-mid hover:text-standbyte-blue">Home</Link>
            <span className="text-standbyte-mid">/</span>
            <Link to="/servicos" className="text-standbyte-mid hover:text-standbyte-blue">Serviços</Link>
            <span className="text-standbyte-mid">/</span>
            <span className="text-standbyte-dark">{service.title}</span>
          </div>

          {/* Back Button */}
          <Link 
            to="/servicos" 
            className="inline-flex items-center gap-2 text-standbyte-blue hover:text-blue-700 mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar para Serviços
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Service Images */}
            <div className="space-y-4">
              <div className="aspect-video bg-standbyte-light rounded-lg overflow-hidden">
                <img 
                  src={service.gallery[selectedImage]} 
                  alt={service.title}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {service.gallery.length > 1 && (
                <div className="flex gap-3">
                  {service.gallery.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`w-20 h-16 rounded-lg overflow-hidden border-2 ${
                        selectedImage === index ? 'border-standbyte-blue' : 'border-standbyte-light'
                      }`}
                    >
                      <img 
                        src={image} 
                        alt={`${service.title} ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Service Info */}
            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="bg-standbyte-red text-standbyte-white px-3 py-1 text-sm font-bold rounded-full">
                    {service.badge}
                  </span>
                  <span className="text-xs bg-standbyte-light text-standbyte-dark px-3 py-1 rounded">
                    {service.category}
                  </span>
                </div>
                
                <h1 className="text-3xl font-bold text-standbyte-dark mb-4">
                  {service.title}
                </h1>
                
                <p className="text-xl text-standbyte-mid leading-relaxed">
                  {service.description}
                </p>
              </div>

              {/* Service Details */}
              <div className="border-t border-standbyte-light pt-6">
                <div className="grid grid-cols-2 gap-6">
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-standbyte-blue" />
                    <div>
                      <span className="block text-sm text-standbyte-mid">Prazo</span>
                      <span className="font-medium text-standbyte-dark">{service.duration}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Shield className="w-5 h-5 text-standbyte-blue" />
                    <div>
                      <span className="block text-sm text-standbyte-mid">Garantia</span>
                      <span className="font-medium text-standbyte-dark">{service.warranty}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="border-t border-standbyte-light pt-6">
                <div className="flex flex-col gap-4">
                  <Link to="/orcamento">
                    <Button 
                      size="lg" 
                      className="w-full bg-standbyte-red hover:bg-red-700 text-standbyte-white"
                    >
                      <FileText className="w-5 h-5 mr-2" />
                      Solicitar Orçamento Grátis
                    </Button>
                  </Link>
                  
                  <Link to="/contato">
                    <Button 
                      size="lg" 
                      variant="outline"
                      className="w-full border-standbyte-blue text-standbyte-blue hover:bg-standbyte-blue hover:text-standbyte-white"
                    >
                      <Phone className="w-5 h-5 mr-2" />
                      Falar com Especialista
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Service Details Sections */}
          <div className="mt-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Full Description */}
              <Card>
                <CardHeader>
                  <h3 className="text-xl font-bold text-standbyte-dark">Sobre o Serviço</h3>
                </CardHeader>
                <CardContent>
                  <p className="text-standbyte-mid leading-relaxed">{service.fullDescription}</p>
                </CardContent>
              </Card>

              {/* Features */}
              <Card>
                <CardHeader>
                  <h3 className="text-xl font-bold text-standbyte-dark">O que Inclui</h3>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {service.features.map((feature, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-standbyte-blue flex-shrink-0 mt-0.5" />
                        <span className="text-standbyte-dark">{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Benefits */}
              <Card>
                <CardHeader>
                  <h3 className="text-xl font-bold text-standbyte-dark">Benefícios</h3>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {service.benefits.map((benefit, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-standbyte-blue rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-standbyte-dark">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Process */}
              <Card>
                <CardHeader>
                  <h3 className="text-xl font-bold text-standbyte-dark">Como Funciona</h3>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {service.process.map((step, index) => (
                      <div key={index} className="flex items-start gap-4">
                        <div className="w-8 h-8 bg-standbyte-blue text-standbyte-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                          {index + 1}
                        </div>
                        <span className="text-standbyte-dark pt-1">{step}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* CTA Section */}
          <div className="mt-16 bg-standbyte-light rounded-2xl p-8 text-center">
            <h2 className="text-3xl font-bold text-standbyte-dark mb-4">
              Pronto para começar seu projeto?
            </h2>
            <p className="text-xl text-standbyte-mid mb-8 max-w-2xl mx-auto">
              Entre em contato conosco e receba um orçamento personalizado para suas necessidades
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/orcamento">
                <Button size="lg" className="bg-standbyte-red hover:bg-red-700 text-standbyte-white px-8">
                  Solicitar Orçamento
                </Button>
              </Link>
              <Link to="/contato">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-standbyte-blue text-standbyte-blue hover:bg-standbyte-blue hover:text-standbyte-white px-8"
                >
                  Falar Conosco
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ServicoIndividual;
