import { CheckCircle, ArrowRight, Star, Award, Shield, Clock, Users, Wrench, Network, Camera, Zap, HardDrive, Mail, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Link } from "react-router-dom";
import HeaderWithAuth from "@/components/HeaderWithAuth";
import Footer from "@/components/Footer";

const Servicos = () => {
  const services = [
    // Infraestrutura de Rede e Comunicação
    {
      id: 1,
      title: "Cabeamento Estruturado",
      slug: "cabeamento-estruturado",
      description: "Serviços completos de cabeamento estruturado para rede lógica e voz com padrões internacionais",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
      features: [
        "Cabeamento de rede lógica Cat5e/Cat6/Cat6A",
        "Infraestrutura para telefonia (voz)",
        "Certificação com equipamentos Fluke",
        "Conformidade com normas TIA/EIA e ABNT"
      ],
      badge: "Mais Procurado",
      category: "Infraestrutura",
      icon: Network
    },
    {
      id: 2,
      title: "Fibra Óptica",
      slug: "fibra-optica",
      description: "Lançamento e fusão de fibra óptica para conexões de alta velocidade e longa distância",
      image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=400&h=300&fit=crop",
      features: [
        "Lançamento de cabos de fibra óptica",
        "Fusão de fibras com equipamentos certificados",
        "Testes de atenuação e reflectometria",
        "Documentação técnica completa"
      ],
      badge: "Premium",
      category: "Infraestrutura",
      icon: Zap
    },
    {
      id: 3,
      title: "Projeto de Rede Técnico",
      slug: "projeto-rede-tecnico",
      description: "Desenvolvimento de projetos de rede com assinatura de engenheiro responsável",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop",
      features: [
        "Projeto técnico detalhado",
        "Assinatura de engenheiro responsável",
        "Memorial descritivo e especificações",
        "Plantas baixas e diagramas unifilares"
      ],
      badge: "Profissional",
      category: "Projetos",
      icon: Award
    },

    // Segurança Eletrônica
    {
      id: 4,
      title: "Câmeras de Segurança (CFTV)",
      slug: "cameras-seguranca-cftv",
      description: "Instalação completa de sistemas de câmeras IP e analógicas para monitoramento",
      image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&h=300&fit=crop",
      features: [
        "Câmeras IP de alta resolução",
        "Sistemas analógicos tradicionais",
        "Gravação em DVR/NVR",
        "Acesso remoto via smartphone/web"
      ],
      badge: "Segurança",
      category: "Segurança",
      icon: Camera
    },

    // Projetos Técnicos
    {
      id: 5,
      title: "Projeto Elétrico",
      slug: "projeto-eletrico",
      description: "Desenvolvimento de projetos elétricos com assinatura de engenheiro responsável",
      image: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=400&h=300&fit=crop",
      features: [
        "Projeto elétrico residencial e comercial",
        "Assinatura de engenheiro responsável",
        "Cálculos de demanda e dimensionamento",
        "Conformidade com normas ABNT"
      ],
      badge: "Certificado",
      category: "Projetos",
      icon: Zap
    },
    {
      id: 6,
      title: "Projeto de Infraestrutura TI",
      slug: "projeto-infraestrutura-ti",
      description: "Projetos completos de infraestrutura de tecnologia da informação",
      image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop",
      features: [
        "Análise da infraestrutura atual",
        "Dimensionamento de equipamentos",
        "Topologia de rede otimizada",
        "Documentação técnica detalhada"
      ],
      badge: "Especializado",
      category: "Projetos",
      icon: Network
    },

    // Energia e Estabilização
    {
      id: 7,
      title: "Painéis Solares",
      slug: "paineis-solares",
      description: "Instalação de sistemas de energia solar On-Grid e Off-Grid",
      image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=400&h=300&fit=crop",
      features: [
        "Sistemas On-Grid (conectados à rede)",
        "Sistemas Off-Grid (isolados)",
        "Dimensionamento personalizado",
        "Monitoramento de geração"
      ],
      badge: "Sustentável",
      category: "Energia",
      icon: Sun
    },
    {
      id: 8,
      title: "Nobreaks",
      slug: "nobreaks",
      description: "Instalação de sistemas de energia ininterrupta de grande e pequeno porte",
      image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=300&fit=crop",
      features: [
        "Nobreaks de pequeno porte (até 3kVA)",
        "Sistemas de grande porte (acima de 3kVA)",
        "Configuração e programação",
        "Testes de autonomia"
      ],
      badge: "Confiável",
      category: "Energia",
      icon: Shield
    },

    // Serviços de TI e Corporativo
    {
      id: 9,
      title: "Backup de Dados",
      slug: "backup-dados",
      description: "Sistema de backup mensal automatizado para proteção de dados corporativos",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop",
      features: [
        "Backup automatizado mensal",
        "Armazenamento seguro em nuvem",
        "Recuperação rápida de dados",
        "Monitoramento contínuo"
      ],
      badge: "Essencial",
      category: "TI Corporativo",
      icon: HardDrive
    },
    {
      id: 10,
      title: "E-mail Corporativo",
      slug: "email-corporativo",
      description: "Implantação completa de sistema de e-mail corporativo profissional",
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=300&fit=crop",
      features: [
        "Domínio personalizado da empresa",
        "Caixas de e-mail ilimitadas",
        "Integração com Outlook/Thunderbird",
        "Suporte técnico especializado"
      ],
      badge: "Profissional",
      category: "TI Corporativo",
      icon: Mail
    }
  ];

  const categories = ["Todos", "Infraestrutura", "Segurança", "Projetos", "Energia", "TI Corporativo"];

  const testimonials = [
    {
      name: "João Silva",
      company: "TechCorp Ltda",
      text: "Excelente serviço de infraestrutura de rede. Profissionais qualificados e equipamentos de primeira linha.",
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
      <HeaderWithAuth />
      
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
                <Link to="/orcamento">
                  <Button size="lg" className="bg-standbyte-red hover:bg-red-700 text-standbyte-white px-8 py-4">
                    Solicitar Orçamento Grátis
                  </Button>
                </Link>
                <Link to="/contato">
                  <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-standbyte-blue px-8 py-4">
                    Falar com Especialista
                  </Button>
                </Link>
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
                  <Link to={`/servico/${service.slug}`}>
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
                      <div className="absolute bottom-4 right-4">
                        <div className="w-10 h-10 bg-standbyte-blue rounded-lg flex items-center justify-center">
                          <service.icon className="w-5 h-5 text-standbyte-white" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </CardHeader>

                <CardContent className="p-6">
                  <Link to={`/servico/${service.slug}`}>
                    <h3 className="text-xl font-bold text-standbyte-dark mb-3 hover:text-standbyte-blue transition-colors">
                      {service.title}
                    </h3>
                  </Link>
                  
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
                    <Link to={`/servico/${service.slug}`}>
                      <Button className="w-full bg-standbyte-blue hover:bg-blue-800 text-standbyte-white">
                        Ver Detalhes
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </Button>
                    </Link>
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
                { icon: Users, title: "Experiência", desc: "+15 anos no mercado" }
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
              Pronto para transformar sua infraestrutura?
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
