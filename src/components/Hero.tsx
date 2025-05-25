
import { ArrowRight, CheckCircle, Wifi, Camera, Battery, Shield, Award, Star } from "lucide-react";

const Hero = () => {
  return (
    <section id="home" className="pt-16 py-24 bg-standbyte-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Content Section */}
          <div className="space-y-8">
            {/* Badge de Novidade */}
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-standbyte-red/10 border border-standbyte-red/20">
              <Star className="w-4 h-4 text-standbyte-red mr-2" />
              <span className="text-standbyte-red text-sm font-semibold">EXCLUSIVO NA REGIÃO</span>
            </div>
            
            {/* Main Title */}
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-6xl font-bold text-standbyte-blue leading-tight">
                Certificação de
              </h1>
              <h1 className="text-5xl lg:text-6xl font-bold text-standbyte-blue leading-tight">
                Cabos Profissional
              </h1>
              <h1 className="text-4xl lg:text-5xl font-bold text-standbyte-red leading-tight">
                Fluke DSX2-8000
              </h1>
            </div>
            
            {/* Description */}
            <p className="text-xl text-standbyte-mid leading-relaxed max-w-xl">
              <strong>Garanta o desempenho, segurança e confiabilidade da sua infraestrutura de rede!</strong> 
              Somos a única empresa da região com certificação Fluke DSX2-8000 para cabos de cobre e fibra óptica.
            </p>

            {/* Highlights */}
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-standbyte-red mt-1 flex-shrink-0" />
                <span className="text-standbyte-dark">Certificação completa Cat5e, Cat6, Cat6A, Cat7 e fibra óptica</span>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-standbyte-red mt-1 flex-shrink-0" />
                <span className="text-standbyte-dark">Atende normas TIA/EIA e ISO/IEC internacionais</span>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-standbyte-red mt-1 flex-shrink-0" />
                <span className="text-standbyte-dark">Relatórios técnicos detalhados para auditorias</span>
              </div>
            </div>

            {/* Service Tags */}
            <div className="flex flex-wrap gap-3">
              {[
                { icon: Award, text: "Fluke DSX2-8000" },
                { icon: Shield, text: "Normas TIA/EIA" },
                { icon: Wifi, text: "1Gbps - 10Gbps+" },
                { icon: Camera, text: "Fibra Óptica" }
              ].map((service, index) => (
                <div 
                  key={index} 
                  className="flex items-center px-4 py-2 rounded-lg bg-standbyte-light border border-standbyte-mid/20"
                >
                  <service.icon className="w-4 h-4 text-standbyte-red mr-2" />
                  <span className="text-standbyte-dark text-sm font-medium">{service.text}</span>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <a 
                href="#services" 
                className="inline-flex items-center justify-center px-8 py-4 bg-standbyte-red text-standbyte-white font-semibold rounded-lg hover:bg-red-700 transition-colors"
              >
                Solicitar Certificação
                <ArrowRight className="ml-2 w-5 h-5" />
              </a>
              
              <button className="inline-flex items-center justify-center px-8 py-4 border-2 border-standbyte-blue text-standbyte-blue font-semibold rounded-lg hover:bg-standbyte-blue hover:text-standbyte-white transition-colors">
                Saiba Mais
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-8 border-t border-standbyte-light">
              {[
                { number: "ÚNICA", label: "Empresa na Região" },
                { number: "100%", label: "Normas Internacionais" },
                { number: "24/7", label: "Suporte Técnico" }
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl font-bold text-standbyte-red mb-2">
                    {stat.number}
                  </div>
                  <div className="text-standbyte-mid text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Visual Section */}
          <div className="relative">
            <div className="bg-standbyte-light rounded-2xl p-8 border border-standbyte-mid/20">
              {/* Fluke Certification Highlight */}
              <div className="bg-standbyte-blue p-6 rounded-xl mb-6">
                <div className="flex items-center space-x-3 mb-3">
                  <Award className="w-6 h-6 text-standbyte-white" />
                  <span className="text-standbyte-white font-bold text-lg">Fluke DSX2-8000</span>
                </div>
                <div className="text-standbyte-white/90 text-sm mb-3">Referência mundial em certificação</div>
                <div className="flex items-center space-x-2">
                  <Star className="w-4 h-4 text-yellow-400" />
                  <span className="text-standbyte-white text-sm font-semibold">EXCLUSIVO NA REGIÃO</span>
                </div>
              </div>
              
              {/* Service Icons Grid */}
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: Wifi, color: "bg-standbyte-blue", label: "Cat6A/Cat7", desc: "Alta Velocidade" },
                  { icon: Shield, color: "bg-standbyte-red", label: "TIA/EIA", desc: "Normas Internacionais" },
                  { icon: Camera, color: "bg-standbyte-blue", label: "Fibra Óptica", desc: "Mono/Multimodo" },
                  { icon: Award, color: "bg-standbyte-red", label: "Relatórios", desc: "Técnicos Completos" }
                ].map((item, index) => (
                  <div 
                    key={index} 
                    className="text-center p-4 bg-standbyte-white rounded-xl border border-standbyte-mid/20"
                  >
                    <div className={`w-12 h-12 ${item.color} rounded-lg flex items-center justify-center mx-auto mb-3`}>
                      <item.icon className="w-6 h-6 text-standbyte-white" />
                    </div>
                    <div className="text-standbyte-dark font-semibold text-sm mb-1">{item.label}</div>
                    <div className="text-standbyte-mid text-xs">{item.desc}</div>
                  </div>
                ))}
              </div>
              
              {/* Call to Action */}
              <div className="mt-6 p-4 bg-standbyte-red/10 rounded-xl border border-standbyte-red/20">
                <div className="text-center">
                  <div className="text-standbyte-red font-bold text-sm mb-1">NOVIDADE NA REGIÃO</div>
                  <div className="text-standbyte-dark text-xs">Certificação profissional disponível agora!</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
