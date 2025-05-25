
import { Server, Shield, Headphones, Cloud, Zap, Brain, Rocket, ArrowRight } from "lucide-react";

const Services = () => {
  const services = [
    {
      icon: Server,
      title: "Infraestrutura Inteligente",
      description: "Arquiteturas de TI modernas com IA integrada e automação avançada.",
      gradient: "from-blue-500 to-blue-700"
    },
    {
      icon: Shield,
      title: "Segurança Avançada",
      description: "Proteção de dados de próxima geração com criptografia moderna.",
      gradient: "from-red-500 to-red-700"
    },
    {
      icon: Brain,
      title: "IA & Machine Learning",
      description: "Soluções de inteligência artificial personalizadas para seu negócio.",
      gradient: "from-blue-600 to-gray-600"
    },
    {
      icon: Headphones,
      title: "Suporte Especializado",
      description: "Atendimento 24/7 com equipe especializada e resolução eficiente.",
      gradient: "from-gray-600 to-blue-600"
    },
    {
      icon: Cloud,
      title: "Cloud Híbrida",
      description: "Ecossistemas multi-cloud com orquestração automática.",
      gradient: "from-blue-500 to-gray-600"
    },
    {
      icon: Rocket,
      title: "Transformação Digital",
      description: "Aceleração da inovação com tecnologias emergentes.",
      gradient: "from-red-500 to-blue-700"
    },
  ];

  return (
    <section id="services" className="relative py-24 bg-gradient-to-br from-gray-50 to-blue-50 overflow-hidden">
      {/* Background Pattern simplificado */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%231e40af' fill-opacity='0.4' fill-rule='evenodd'/%3E%3C/svg%3E")`
        }}></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto mb-20 animate-slide-in-up">
          <div className="inline-flex items-center px-4 py-2 rounded-full glass-effect mb-6 animate-fade-in-scale">
            <Zap className="w-5 h-5 text-blue-600 mr-2" />
            <span className="text-gray-700 font-medium">Serviços Inovadores</span>
          </div>
          
          <h2 className="text-5xl font-bold mb-6">
            <span className="text-gray-900">Soluções que</span>
            <br />
            <span className="bg-gradient-to-r from-blue-600 to-red-600 bg-clip-text text-transparent">
              Transformam o Futuro
            </span>
          </h2>
          
          <p className="text-xl text-gray-600 leading-relaxed">
            Revolucionamos a tecnologia da informação com serviços de vanguarda, 
            combinando inovação, segurança e performance excepcional.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="group relative p-8 rounded-2xl bg-white/80 backdrop-blur-sm border border-white/50 hover:border-transparent hover:shadow-xl transition-all duration-300 animate-fade-in-scale hover:scale-105"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Gradient border on hover */}
              <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${service.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10`}></div>
              <div className="absolute inset-[2px] rounded-2xl bg-white/95 group-hover:bg-white transition-colors duration-300"></div>
              
              <div className="relative z-10">
                <div className={`w-16 h-16 rounded-xl bg-gradient-to-r ${service.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <service.icon className="w-8 h-8 text-white" />
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-red-600 transition-all duration-300">
                  {service.title}
                </h3>
                
                <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                  {service.description}
                </p>

                {/* Hover effect indicator */}
                <div className="mt-6 flex items-center text-transparent group-hover:text-blue-600 transition-colors duration-300">
                  <span className="text-sm font-medium mr-2">Saiba mais</span>
                  <ArrowRight className="w-4 h-4 transform translate-x-0 group-hover:translate-x-1 transition-transform duration-200" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16 animate-slide-in-up">
          <a
            href="#contact"
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-red-600 text-white font-semibold rounded-full hover:from-red-600 hover:to-blue-800 transition-all duration-300 hover:scale-105"
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
