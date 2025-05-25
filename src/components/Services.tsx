
import { Server, Shield, Headphones, Cloud, Zap, Brain, Rocket, ArrowRight } from "lucide-react";

const Services = () => {
  const services = [
    {
      icon: Server,
      title: "Infraestrutura Inteligente",
      description: "Arquiteturas de TI modernas com IA integrada e automação avançada.",
      color: "standbyte-blue"
    },
    {
      icon: Shield,
      title: "Segurança Avançada",
      description: "Proteção de dados de próxima geração com criptografia moderna.",
      color: "standbyte-red"
    },
    {
      icon: Brain,
      title: "IA & Machine Learning",
      description: "Soluções de inteligência artificial personalizadas para seu negócio.",
      color: "standbyte-blue"
    },
    {
      icon: Headphones,
      title: "Suporte Especializado",
      description: "Atendimento 24/7 com equipe especializada e resolução eficiente.",
      color: "standbyte-gray-dark"
    },
    {
      icon: Cloud,
      title: "Cloud Híbrida",
      description: "Ecossistemas multi-cloud com orquestração automática.",
      color: "standbyte-blue"
    },
    {
      icon: Rocket,
      title: "Transformação Digital",
      description: "Aceleração da inovação com tecnologias emergentes.",
      color: "standbyte-red"
    },
  ];

  return (
    <section id="services" className="relative py-24 bg-standbyte-gray-light overflow-hidden">
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto mb-20">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-white border border-standbyte-gray-light mb-6">
            <Zap className="w-5 h-5 text-standbyte-blue mr-2" />
            <span className="text-standbyte-gray-dark font-medium">Serviços Inovadores</span>
          </div>
          
          <h2 className="text-5xl font-bold mb-6">
            <span className="text-standbyte-gray-dark">Soluções que</span>
            <br />
            <span className="text-standbyte-blue">
              Transformam o Futuro
            </span>
          </h2>
          
          <p className="text-xl text-standbyte-gray-medium leading-relaxed">
            Revolucionamos a tecnologia da informação com serviços de vanguarda, 
            combinando inovação, segurança e performance excepcional.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="group relative p-8 rounded-2xl bg-white border border-standbyte-gray-light hover:border-standbyte-blue hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              <div className="relative z-10">
                <div className={`w-16 h-16 rounded-xl bg-${service.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <service.icon className="w-8 h-8 text-white" />
                </div>
                
                <h3 className="text-xl font-bold text-standbyte-gray-dark mb-4 group-hover:text-standbyte-blue transition-colors duration-300">
                  {service.title}
                </h3>
                
                <p className="text-standbyte-gray-medium leading-relaxed group-hover:text-standbyte-gray-dark transition-colors duration-300">
                  {service.description}
                </p>

                {/* Hover effect indicator */}
                <div className="mt-6 flex items-center text-transparent group-hover:text-standbyte-blue transition-colors duration-300">
                  <span className="text-sm font-medium mr-2">Saiba mais</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <a
            href="#contact"
            className="inline-flex items-center px-8 py-4 bg-standbyte-red text-white font-semibold rounded-full hover:bg-red-700 transition-colors"
          >
            <Rocket className="mr-2 w-5 h-5" />
            Transforme Seu Negócio Agora
          </a>
        </div>
      </div>
    </section>
  );
};

export default Services;
