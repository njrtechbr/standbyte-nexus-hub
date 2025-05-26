
import { Server, Shield, Headphones, Cloud, Brain, Rocket, Network, Camera, Zap, FileCheck, Sun, HardDrive, Mail } from "lucide-react";

const Services = () => {
  const services = [
    {
      icon: Network,
      title: "Cabeamento Estruturado",
      description: "Infraestrutura completa de rede lógica e voz com certificação padrão internacional.",
      category: "Infraestrutura"
    },
    {
      icon: Zap,
      title: "Fibra Óptica",
      description: "Lançamento e fusão de fibra óptica para conexões de alta velocidade.",
      category: "Infraestrutura"
    },
    {
      icon: FileCheck,
      title: "Projeto de Rede",
      description: "Projetos técnicos de rede com assinatura de engenheiro responsável.",
      category: "Projetos"
    },
    {
      icon: Camera,
      title: "Câmeras de Segurança",
      description: "Instalação de sistemas CFTV IP e analógico para monitoramento completo.",
      category: "Segurança"
    },
    {
      icon: Zap,
      title: "Projeto Elétrico",
      description: "Projetos elétricos profissionais com assinatura de engenheiro.",
      category: "Projetos"
    },
    {
      icon: Server,
      title: "Infraestrutura de TI",
      description: "Projetos completos de infraestrutura e redes de tecnologia.",
      category: "Projetos"
    },
    {
      icon: Sun,
      title: "Painéis Solares",
      description: "Instalação de sistemas de energia solar On-Grid e Off-Grid.",
      category: "Energia"
    },
    {
      icon: Shield,
      title: "Nobreaks",
      description: "Sistemas de energia ininterrupta de grande e pequeno porte.",
      category: "Energia"
    },
    {
      icon: HardDrive,
      title: "Backup de Dados",
      description: "Sistema automatizado de backup mensal para proteção de dados.",
      category: "TI Corporativo"
    },
    {
      icon: Mail,
      title: "E-mail Corporativo",
      description: "Implantação completa de sistema de e-mail empresarial.",
      category: "TI Corporativo"
    },
    {
      icon: Brain,
      title: "Consultoria em TI",
      description: "Soluções inteligentes e consultoria especializada em tecnologia.",
      category: "TI Corporativo"
    },
    {
      icon: Headphones,
      title: "Suporte Especializado",
      description: "Atendimento técnico especializado e manutenção preventiva.",
      category: "Suporte"
    },
  ];

  return (
    <section id="services" className="py-24 bg-standbyte-light">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-standbyte-blue mb-6">
            Nossos Serviços
          </h2>
          <p className="text-xl text-standbyte-mid leading-relaxed">
            Soluções completas em tecnologia da informação para impulsionar 
            seu negócio com inovação e qualidade.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="p-8 rounded-2xl bg-standbyte-white border border-standbyte-mid/20 hover:shadow-lg hover:border-standbyte-blue/30 transition-all duration-300 hover:-translate-y-2"
            >
              <div className="w-16 h-16 bg-standbyte-blue rounded-xl flex items-center justify-center mb-6">
                <service.icon className="w-8 h-8 text-standbyte-white" />
              </div>
              
              <div className="mb-2">
                <span className="text-xs font-bold text-standbyte-red bg-standbyte-red/10 px-3 py-1 rounded-full">
                  {service.category}
                </span>
              </div>
              
              <h3 className="text-xl font-bold text-standbyte-dark mb-4">
                {service.title}
              </h3>
              
              <p className="text-standbyte-mid leading-relaxed mb-6">
                {service.description}
              </p>

              <button className="w-full bg-standbyte-white border-2 border-standbyte-blue text-standbyte-blue font-bold py-3 px-6 rounded-lg hover:bg-standbyte-blue hover:text-standbyte-white transition-all duration-300">
                Solicitar Orçamento
              </button>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <a
            href="/servicos"
            className="inline-flex items-center px-8 py-4 bg-standbyte-red text-standbyte-white font-semibold rounded-lg hover:bg-red-700 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            <Rocket className="mr-2 w-5 h-5" />
            Ver Todos os Serviços
          </a>
        </div>
      </div>
    </section>
  );
};

export default Services;
