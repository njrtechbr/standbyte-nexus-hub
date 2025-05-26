
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
    <section id="about" className="py-24 bg-standbyte-light">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div>
              <h2 className="text-4xl lg:text-5xl font-bold text-standbyte-blue mb-6">
                Sobre a Standbyte
              </h2>
              <div className="space-y-4 text-lg text-standbyte-mid">
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

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {values.map((value, index) => (
                <div
                  key={index}
                  className="p-6 bg-standbyte-white rounded-xl border border-standbyte-mid/20"
                >
                  <div className="w-12 h-12 bg-standbyte-blue rounded-lg flex items-center justify-center mb-4">
                    <value.icon className="w-6 h-6 text-standbyte-white" />
                  </div>
                  <h3 className="font-bold text-standbyte-dark mb-2">{value.title}</h3>
                  <p className="text-sm text-standbyte-mid">{value.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Visual */}
          <div className="bg-standbyte-white rounded-2xl p-8 border border-standbyte-mid/20">
            <div className="space-y-8">
              <div className="text-center">
                <div className="text-5xl font-bold text-standbyte-blue mb-2">15+</div>
                <div className="text-standbyte-mid">Anos de Experiência</div>
              </div>
              
              <div className="grid grid-cols-2 gap-6 text-center">
                <div className="p-4 bg-standbyte-light rounded-xl">
                  <div className="text-3xl font-bold text-standbyte-dark">500+</div>
                  <div className="text-sm text-standbyte-mid">Projetos Entregues</div>
                </div>
                <div className="p-4 bg-standbyte-light rounded-xl">
                  <div className="text-3xl font-bold text-standbyte-dark">98%</div>
                  <div className="text-sm text-standbyte-mid">Satisfação</div>
                </div>
              </div>
              
              <div className="bg-standbyte-blue p-6 rounded-xl text-center">
                <div className="text-xl font-bold text-standbyte-white mb-2">
                  "Tecnologia que Transforma"
                </div>
                <div className="text-standbyte-white/80">
                  Nossa filosofia de trabalho
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
