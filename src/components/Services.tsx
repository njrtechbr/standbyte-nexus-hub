
import { Server, Shield, Settings, Headphones, Cloud, Zap } from "lucide-react";

const Services = () => {
  const services = [
    {
      icon: Server,
      title: "Infraestrutura de TI",
      description: "Configuração e manutenção de servidores, redes e sistemas corporativos.",
    },
    {
      icon: Shield,
      title: "Segurança Digital",
      description: "Proteção contra ameaças virtuais e implementação de políticas de segurança.",
    },
    {
      icon: Settings,
      title: "Consultoria Técnica",
      description: "Análise e otimização de processos tecnológicos para seu negócio.",
    },
    {
      icon: Headphones,
      title: "Suporte Especializado",
      description: "Atendimento técnico 24/7 com profissionais qualificados.",
    },
    {
      icon: Cloud,
      title: "Cloud Computing",
      description: "Migração e gerenciamento de soluções em nuvem para sua empresa.",
    },
    {
      icon: Zap,
      title: "Automação",
      description: "Desenvolvimento de soluções automatizadas para otimizar workflows.",
    },
  ];

  return (
    <section id="services" className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Nossos Serviços
          </h2>
          <p className="text-xl text-gray-600">
            Oferecemos soluções completas em tecnologia da informação para 
            empresas de todos os portes, sempre com foco na excelência e inovação.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="group p-8 rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all duration-300 animate-fade-in hover-scale"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mb-6 group-hover:bg-blue-600 transition-colors duration-300">
                <service.icon className="w-8 h-8 text-blue-600 group-hover:text-white transition-colors duration-300" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                {service.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
