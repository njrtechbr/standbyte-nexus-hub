
import { Server, Shield, Headphones, Cloud, Brain, Rocket } from "lucide-react";

const Services = () => {
  const services = [
    {
      icon: Server,
      title: "Infraestrutura Inteligente",
      description: "Arquiteturas de TI modernas com IA integrada e automação avançada.",
    },
    {
      icon: Shield,
      title: "Segurança Avançada",
      description: "Proteção de dados de próxima geração com criptografia moderna.",
    },
    {
      icon: Brain,
      title: "IA & Machine Learning",
      description: "Soluções de inteligência artificial personalizadas para seu negócio.",
    },
    {
      icon: Headphones,
      title: "Suporte Especializado",
      description: "Atendimento 24/7 com equipe especializada e resolução eficiente.",
    },
    {
      icon: Cloud,
      title: "Cloud Híbrida",
      description: "Ecossistemas multi-cloud com orquestração automática.",
    },
    {
      icon: Rocket,
      title: "Transformação Digital",
      description: "Aceleração da inovação com tecnologias emergentes.",
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
              className="p-8 rounded-2xl bg-standbyte-white border border-standbyte-mid/20 hover:shadow-lg hover:border-standbyte-blue/30"
            >
              <div className="w-16 h-16 bg-standbyte-blue rounded-xl flex items-center justify-center mb-6">
                <service.icon className="w-8 h-8 text-standbyte-white" />
              </div>
              
              <h3 className="text-xl font-bold text-standbyte-dark mb-4">
                {service.title}
              </h3>
              
              <p className="text-standbyte-mid leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <a
            href="#contact"
            className="inline-flex items-center px-8 py-4 bg-standbyte-red text-standbyte-white font-semibold rounded-lg hover:bg-red-700"
          >
            <Rocket className="mr-2 w-5 h-5" />
            Solicitar Orçamento
          </a>
        </div>
      </div>
    </section>
  );
};

export default Services;
