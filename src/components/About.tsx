
import { Award, Users, Target, Heart } from "lucide-react";

const About = () => {
  const values = [
    {
      icon: Award,
      title: "Excelência",
      description: "Buscamos sempre a máxima qualidade em nossos produtos e serviços.",
    },
    {
      icon: Users,
      title: "Equipe Especializada",
      description: "Profissionais certificados e em constante atualização tecnológica.",
    },
    {
      icon: Target,
      title: "Foco no Cliente",
      description: "Soluções personalizadas para atender às necessidades específicas.",
    },
    {
      icon: Heart,
      title: "Compromisso",
      description: "Parcerias duradouras baseadas na confiança e transparência.",
    },
  ];

  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div>
              <h2 className="text-4xl font-bold text-standbyte-blue mb-6">
                Sobre a Standbyte
              </h2>
              <div className="space-y-4 text-lg text-standbyte-gray-medium">
                <p>
                  A Standbyte é uma empresa líder em soluções de tecnologia da informação, 
                  com mais de 15 anos de experiência no mercado brasileiro.
                </p>
                <p>
                  Nossa missão é fornecer produtos e serviços de alta qualidade que 
                  impulsionem o crescimento e a eficiência dos nossos clientes através 
                  da tecnologia.
                </p>
                <p>
                  Combinamos expertise técnica com atendimento personalizado para 
                  entregar soluções que realmente fazem a diferença no seu negócio.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              {values.map((value, index) => (
                <div
                  key={index}
                  className="space-y-3"
                >
                  <div className="w-12 h-12 bg-standbyte-gray-light rounded-lg flex items-center justify-center">
                    <value.icon className="w-6 h-6 text-standbyte-blue" />
                  </div>
                  <h3 className="font-semibold text-standbyte-gray-dark">{value.title}</h3>
                  <p className="text-sm text-standbyte-gray-medium">{value.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Visual */}
          <div className="relative">
            <div className="bg-gradient-to-br from-standbyte-gray-light to-white rounded-2xl p-8 shadow-lg">
              <div className="space-y-6">
                <div className="text-center">
                  <div className="text-4xl font-bold text-standbyte-blue mb-2">15+</div>
                  <div className="text-standbyte-gray-medium">Anos de Experiência</div>
                </div>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-standbyte-gray-dark">500+</div>
                    <div className="text-sm text-standbyte-gray-medium">Projetos Entregues</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-standbyte-gray-dark">98%</div>
                    <div className="text-sm text-standbyte-gray-medium">Satisfação</div>
                  </div>
                </div>
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <div className="text-center">
                    <div className="text-lg font-semibold text-standbyte-gray-dark mb-2">
                      "Tecnologia que Transforma"
                    </div>
                    <div className="text-sm text-standbyte-gray-medium">
                      Nossa filosofia de trabalho
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
