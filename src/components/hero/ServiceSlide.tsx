
import { ArrowRight, CheckCircle, Star, Award, Shield, Zap, Target, FileCheck } from "lucide-react";

const ServiceSlide = () => {
  return (
    <>      {/* Content Section */}
      <div className="space-y-6 animate-fade-in">
        {/* Badge */}
        <div className="inline-flex items-center px-4 py-2 rounded-full bg-standbyte-red/10 border border-standbyte-red/20 shadow-sm">
          <Star className="w-4 h-4 text-standbyte-red mr-2 animate-pulse-custom" />
          <span className="text-standbyte-red text-xs font-bold tracking-wide">EXCLUSIVO NA REGIÃO</span>
        </div>
        
        {/* Title */}
        <div className="space-y-3">
          <h1 className="text-3xl lg:text-4xl font-black text-standbyte-blue leading-tight">
            Certificação Fluke
            <span className="block text-standbyte-red">DSX2-8000</span>
          </h1>
          <p className="text-lg text-standbyte-dark/80 font-medium">
            Máxima Performance de Rede Garantida
          </p>
        </div>
        
        {/* Description */}
        <div className="bg-standbyte-white p-4 rounded-xl border border-standbyte-light shadow-sm">
          <p className="text-sm text-standbyte-dark leading-relaxed">
            Utilizamos o <span className="text-standbyte-red font-bold">Fluke DSX2-8000</span>, 
            padrão ouro mundial em testes de cabeamento para garantir máxima performance.
          </p>
        </div>        {/* Benefits */}
        <div className="space-y-3">
          {[
            "Certificação Cat5e até Cat8",
            "Conformidade TIA e ISO/IEC",
            "Relatórios técnicos detalhados"
          ].map((benefit, index) => (
            <div key={index} className="flex items-center space-x-3 bg-standbyte-white/60 p-2 rounded-lg border border-standbyte-light/50">
              <div className="w-5 h-5 bg-standbyte-red rounded-full flex items-center justify-center flex-shrink-0">
                <CheckCircle className="w-3 h-3 text-standbyte-white" />
              </div>
              <span className="text-standbyte-dark text-sm font-medium">{benefit}</span>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <a 
            href="#services" 
            className="inline-flex items-center justify-center px-6 py-3 bg-standbyte-red hover:bg-standbyte-red/90 text-standbyte-white font-bold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 text-sm"
          >
            Solicitar Certificação
            <ArrowRight className="ml-2 w-4 h-4" />          </a>
          
          <button className="inline-flex items-center justify-center px-6 py-3 bg-standbyte-white border-2 border-standbyte-blue text-standbyte-blue font-bold rounded-lg hover:bg-standbyte-blue hover:text-standbyte-white transition-all duration-300 text-sm">
            <FileCheck className="mr-2 w-4 h-4" />
            Saiba Mais
          </button>
        </div>
      </div>

      {/* Visual Section */}
      <div className="relative animate-fade-in-scale">
        <div className="bg-standbyte-white rounded-xl p-6 border border-standbyte-light shadow-xl">
          {/* Header */}
          <div className="bg-standbyte-blue p-4 rounded-lg mb-4">
            <div className="flex items-center space-x-2 mb-2">
              <Award className="w-6 h-6 text-standbyte-white" />
              <span className="text-standbyte-white font-black text-lg">Fluke DSX2-8000</span>            </div>
            <div className="text-standbyte-white/90 text-sm">Padrão Ouro Mundial</div>
          </div>
          
          {/* Features Grid */}
          <div className="grid grid-cols-2 gap-3">
            {[
              { icon: Award, text: "Fluke DSX2-8000", color: "standbyte-blue" },
              { icon: Shield, text: "Normas TIA/ISO", color: "standbyte-red" },
              { icon: Zap, text: "Até 40+ Gbps", color: "standbyte-blue" },
              { icon: Target, text: "Precisão Total", color: "standbyte-red" }
            ].map((service, index) => (
              <div 
                key={index} 
                className="flex flex-col items-center p-3 rounded-lg bg-standbyte-light/30 border border-standbyte-light text-center hover:bg-standbyte-light/50 transition-all duration-300 hover:scale-105"
              >
                <div className={`w-8 h-8 bg-${service.color} rounded-lg flex items-center justify-center mb-2`}>
                  <service.icon className="w-4 h-4 text-standbyte-white" />
                </div>
                <span className="text-standbyte-dark text-xs font-bold">{service.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ServiceSlide;
