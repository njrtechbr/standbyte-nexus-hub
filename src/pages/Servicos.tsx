
import { CheckCircle, ArrowRight, Star, Award, Shield, Clock, Users, Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Servicos = () => {
  const services = [
    {
      id: 1,
      title: "Certificação de Cabeamento",
      description: "Certificação profissional de rede estruturada com equipamento Fluke DSX2-8000",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
      price: "A partir de R$ 45,00/ponto",
      features: [
        "Certificação Cat5e até Cat8",
        "Relatórios técnicos detalhados",
        "Conformidade TIA/ISO",
        "Garantia de performance"
      ],
      badge: "Mais Procurado",
      category: "Infraestrutura"
    },
    {
      id: 2,
      title: "Instalação de Rede Estruturada",
      description: "Projeto e instalação completa de cabeamento estruturado para empresas",
      image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=400&h=300&fit=crop",
      price: "A partir de R$ 120,00/ponto",
      features: [
        "Projeto técnico personalizado",
        "Instalação profissional",
        "Testes de qualidade",
        "1 ano de garantia"
      ],
      badge: "Premium",
      category: "Infraestrutura"
    },
    {
      id: 3,
      title: "Manutenção Preventiva",
      description: "Manutenção completa de computadores e servidores com relatório técnico",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop",
      price: "A partir de R$ 85,00",
      features: [
        "Limpeza interna completa",
        "Verificação de componentes",
        "Backup de dados",
        "Relatório de saúde"
      ],
      badge: "Essencial",
      category: "Manutenção"
    },
    {
      id: 4,
      title: "Consultoria em TI",
      description: "Consultoria especializada para otimização da infraestrutura tecnológica",
      image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop",
      price: "A partir de R$ 150,00/hora",
      features: [
        "Análise da infraestrutura atual",
        "Planejamento estratégico",
        "Recomendações técnicas",
        "Acompanhamento da implementação"
      ],
      badge: "Profissional",
      category: "Consultoria"
    },
    {
      id: 5,
      title: "Suporte Técnico 24/7",
      description: "Suporte técnico especializado disponível 24 horas por dia",
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=300&fit=crop",
      price: "A partir de R$ 299,00/mês",
      features: [
        "Atendimento 24/7",
        "Suporte remoto",
        "Técnicos especializados",
        "SLA garantido"
      ],
      badge: "24/7",
      category: "Suporte"
    },
    {
      id: 6,
      title: "Segurança Digital",
      description: "Implementação de soluções de segurança digital avançadas",
      image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400&h=300&fit=crop",
      price: "Sob consulta",
      features: [
        "Análise de vulnerabilidades",
        "Implementação de firewall",
        "Políticas de segurança",
        "Treinamento da equipe"
      ],
      badge: "Segurança",
      category: "Segurança"
    }
  ];

  const categories = ["Todos", "Infraestrutura", "Manutenção", "Consultoria", "Suporte", "Segurança"];

  const testimonials = [
    {
      name: "João Silva",
      company: "TechCorp Ltda",
      text: "Excelente serviço de certificação de rede. Profissionais qualificados e equipamentos de primeira linha.",
      rating: 5
    },
    {
      name: "Maria Santos",
      company: "Inovação Digital",
      text: "A Standbyte transformou nossa infraestrutura de TI. Recomendo para todas as empresas.",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-standbyte-white">
      <Header />
      
      <main className="pt-8">
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-standbyte-blue to-blue-800 text-standbyte-white py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-5xl lg:text-6xl font-bold mb-6">
                Serviços Especializados em TI
              </h1>
              <p className="text-xl mb-8 text-blue-100">
                Soluções completas para sua empresa com tecnologia de ponta e equipe especializada
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-standbyte-red hover:bg-red-700 text-standbyte-white px-8 py-4">
                  Solicitar Orçamento Grátis
                </Button>
                <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-standbyte-blue px-8 py-4">
                  Falar com Especialista
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Services Grid */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-standbyte-blue mb-4">
              Nossos Serviços
            </h2>
            <p className="text-xl text-standbyte-mid max-w-3xl mx-auto">
              Oferecemos soluções completas em tecnologia da informação para empresas de todos os portes
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <Card key={service.id} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-standbyte-light">
                <CardHeader className="p-0 relative overflow-hidden">
                  <div className="relative h-48">
                    <img 
                      src={service.image} 
                      alt={service.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-standbyte-red text-standbyte-white px-3 py-1 text-sm font-bold rounded-full">
                        {service.badge}
                      </span>
                    </div>
                    <div className="absolute top-4 right-4">
                      <span className="bg-white/90 text-standbyte-dark px-3 py-1 text-xs font-medium rounded-full">
                        {service.category}
                      </span>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-standbyte-dark mb-3">
                    {service.title}
                  </h3>
                  
                  <p className="text-standbyte-mid mb-4 leading-relaxed">
                    {service.description}
                  </p>

                  <div className="space-y-2 mb-6">
                    {service.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <CheckCircle className="w-4 h-4 text-standbyte-blue flex-shrink-0" />
                        <span className="text-sm text-standbyte-dark">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-standbyte-light pt-4">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-2xl font-bold text-standbyte-blue">
                        {service.price}
                      </span>
                    </div>
                    
                    <Button className="w-full bg-standbyte-blue hover:bg-blue-800 text-standbyte-white">
                      Solicitar Orçamento
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Features Section */}
        <div className="bg-standbyte-light py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-standbyte-blue mb-4">
                Por que escolher a Standbyte?
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { icon: Award, title: "Certificados", desc: "Profissionais qualificados" },
                { icon: Shield, title: "Garantia", desc: "Serviços garantidos" },
                { icon: Clock, title: "Agilidade", desc: "Atendimento rápido" },
                { icon: Users, title: "Experiência", desc: "+10 anos no mercado" }
              ].map((feature, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-standbyte-blue rounded-xl flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="w-8 h-8 text-standbyte-white" />
                  </div>
                  <h3 className="text-lg font-bold text-standbyte-dark mb-2">{feature.title}</h3>
                  <p className="text-standbyte-mid">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Testimonials */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-standbyte-blue mb-4">
              O que nossos clientes dizem
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="p-6 border-standbyte-light">
                <CardContent className="p-0">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-standbyte-dark mb-4 italic">"{testimonial.text}"</p>
                  <div>
                    <div className="font-bold text-standbyte-dark">{testimonial.name}</div>
                    <div className="text-sm text-standbyte-mid">{testimonial.company}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-standbyte-blue text-standbyte-white py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl font-bold mb-4">
              Pronto para transformar sua TI?
            </h2>
            <p className="text-xl mb-8 text-blue-100 max-w-2xl mx-auto">
              Entre em contato conosco e receba um orçamento personalizado para suas necessidades
            </p>
            <Button size="lg" className="bg-standbyte-red hover:bg-red-700 text-standbyte-white px-8 py-4">
              <Wrench className="mr-2 w-5 h-5" />
              Solicitar Orçamento Agora
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Servicos;
