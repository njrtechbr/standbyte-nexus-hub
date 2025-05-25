
import { ArrowRight, CheckCircle, Wifi, Camera, Battery, Shield, Award, Star, Zap, Target, FileCheck } from "lucide-react";

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
              <span className="text-standbyte-red text-sm font-semibold">EXCLUSIVO E INÉDITO NA REGIÃO</span>
            </div>
            
            {/* Main Title */}
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-5xl font-bold text-standbyte-blue leading-tight">
                Maximize o Desempenho e a Confiabilidade da Sua Rede
              </h1>
              <h2 className="text-3xl lg:text-4xl font-bold text-standbyte-red leading-tight">
                Certificação Profissional Fluke DSX2-8000
              </h2>
            </div>
            
            {/* Description */}
            <p className="text-lg text-standbyte-dark leading-relaxed">
              <strong>Garanta a máxima performance, segurança e confiabilidade para sua infraestrutura de rede!</strong> 
              Utilizamos o <span className="text-standbyte-blue font-semibold">Fluke DSX2-8000 CableAnalyzer™</span>, 
              o padrão ouro mundial em testes de precisão para cabeamento estruturado.
            </p>

            {/* Key Benefits */}
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-standbyte-red mt-1 flex-shrink-0" />
                <span className="text-standbyte-dark">Certificação completa Cat5e, Cat6, Cat6A, Cat7, Cat7A, Cat8 e fibra óptica</span>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-standbyte-red mt-1 flex-shrink-0" />
                <span className="text-standbyte-dark">Conformidade total com normas internacionais TIA e ISO/IEC</span>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-standbyte-red mt-1 flex-shrink-0" />
                <span className="text-standbyte-dark">Relatórios técnicos detalhados para auditorias e validação</span>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-standbyte-red mt-1 flex-shrink-0" />
                <span className="text-standbyte-dark">Velocidades de 1 Gbps até 40 Gbps e além</span>
              </div>
            </div>

            {/* Service Tags */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { icon: Award, text: "Fluke DSX2-8000", color: "bg-standbyte-blue" },
                { icon: Shield, text: "Normas TIA/ISO", color: "bg-standbyte-red" },
                { icon: Zap, text: "Até 40+ Gbps", color: "bg-standbyte-blue" },
                { icon: Target, text: "Precisão Total", color: "bg-standbyte-red" }
              ].map((service, index) => (
                <div 
                  key={index} 
                  className="flex flex-col items-center p-3 rounded-lg bg-standbyte-light border border-standbyte-mid/20 text-center"
                >
                  <div className={`w-8 h-8 ${service.color} rounded-lg flex items-center justify-center mb-2`}>
                    <service.icon className="w-4 h-4 text-standbyte-white" />
                  </div>
                  <span className="text-standbyte-dark text-xs font-medium">{service.text}</span>
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
                <FileCheck className="mr-2 w-5 h-5" />
                Saiba Mais
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-8 border-t border-standbyte-light">
              {[
                { number: "ÚNICA", label: "Empresa na Região", sublabel: "Fluke DSX2-8000" },
                { number: "100%", label: "Normas Internacionais", sublabel: "TIA & ISO/IEC" },
                { number: "40+", label: "Gbps Suportados", sublabel: "Performance Máxima" }
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl lg:text-3xl font-bold text-standbyte-red mb-1">
                    {stat.number}
                  </div>
                  <div className="text-standbyte-dark text-sm font-medium mb-1">{stat.label}</div>
                  <div className="text-standbyte-mid text-xs">{stat.sublabel}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Visual Section */}
          <div className="relative">
            <div className="bg-standbyte-light rounded-2xl p-8 border border-standbyte-mid/20">
              {/* Fluke Certification Highlight */}
              <div className="bg-gradient-to-r from-standbyte-blue to-blue-800 p-6 rounded-xl mb-6">
                <div className="flex items-center space-x-3 mb-3">
                  <Award className="w-6 h-6 text-standbyte-white" />
                  <span className="text-standbyte-white font-bold text-lg">Fluke DSX2-8000</span>
                </div>
                <div className="text-standbyte-white/90 text-sm mb-3">CableAnalyzer™ - Padrão Ouro Mundial</div>
                <div className="flex items-center space-x-2">
                  <Star className="w-4 h-4 text-yellow-400" />
                  <span className="text-standbyte-white text-sm font-semibold">EXCLUSIVO NA REGIÃO</span>
                </div>
              </div>
              
              {/* Certification Benefits */}
              <div className="space-y-4 mb-6">
                <h3 className="text-standbyte-blue font-bold text-lg">Por Que Certificar?</h3>
                <div className="space-y-3">
                  {[
                    { icon: Zap, text: "Performance Garantida", desc: "Máxima velocidade e capacidade" },
                    { icon: Target, text: "Diagnóstico Preciso", desc: "Detecta falhas ocultas" },
                    { icon: Shield, text: "Padrões Internacionais", desc: "Conformidade TIA/ISO" },
                    { icon: FileCheck, text: "Relatórios Completos", desc: "Laudos técnicos detalhados" }
                  ].map((benefit, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-standbyte-red/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <benefit.icon className="w-4 h-4 text-standbyte-red" />
                      </div>
                      <div>
                        <div className="text-standbyte-dark font-semibold text-sm">{benefit.text}</div>
                        <div className="text-standbyte-mid text-xs">{benefit.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Call to Action */}
              <div className="p-4 bg-gradient-to-r from-standbyte-red/10 to-red-50 rounded-xl border border-standbyte-red/20">
                <div className="text-center">
                  <div className="text-standbyte-red font-bold text-sm mb-2">NOVIDADE ABSOLUTA</div>
                  <div className="text-standbyte-dark text-sm font-medium mb-2">
                    Primeira e única empresa da região com certificação Fluke DSX2-8000
                  </div>
                  <div className="text-standbyte-mid text-xs">
                    Não comprometa a espinha dorsal do seu negócio!
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

export default Hero;
