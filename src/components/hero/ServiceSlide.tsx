
import { ArrowRight, CheckCircle, Star, Award, Shield, Zap, Target, FileCheck } from "lucide-react";

const ServiceSlide = () => {
  return (
    <>
      {/* Content Section */}
      <div className="space-y-6 animate-fade-in">
        {/* Badge */}
        <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-standbyte-red/10 to-red-100/50 border border-standbyte-red/20">
          <Star className="w-4 h-4 text-standbyte-red mr-2 animate-pulse-custom" />
          <span className="text-standbyte-red text-sm font-bold">EXCLUSIVO NA REGIÃO</span>
        </div>
        
        {/* Title */}
        <div className="space-y-4">
          <h1 className="text-4xl lg:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-standbyte-blue to-blue-700 leading-tight">
            Certificação Fluke DSX2-8000
          </h1>
          <h2 className="text-2xl lg:text-3xl font-bold text-standbyte-red">
            Máxima Performance de Rede
          </h2>
        </div>
        
        {/* Description */}
        <p className="text-standbyte-dark leading-relaxed bg-white/80 backdrop-blur-sm p-4 rounded-xl border border-white/30">
          <strong className="text-standbyte-blue">Garanta performance e confiabilidade!</strong> 
          Utilizamos o <span className="text-standbyte-red font-bold">Fluke DSX2-8000</span>, 
          padrão ouro mundial em testes de cabeamento.
        </p>

        {/* Benefits */}
        <div className="space-y-3">
          {[
            "Certificação Cat5e até Cat8 e fibra óptica",
            "Conformidade TIA e ISO/IEC",
            "Relatórios técnicos detalhados"
          ].map((benefit, index) => (
            <div key={index} className="flex items-center space-x-3">
              <div className="w-5 h-5 bg-gradient-to-r from-standbyte-red to-red-600 rounded-full flex items-center justify-center">
                <CheckCircle className="w-3 h-3 text-white" />
              </div>
              <span className="text-standbyte-dark font-medium">{benefit}</span>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3">
          <a 
            href="#services" 
            className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-standbyte-red to-red-600 text-white font-bold rounded-lg hover:from-red-600 hover:to-red-700 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Solicitar Certificação
            <ArrowRight className="ml-2 w-4 h-4" />
          </a>
          
          <button className="inline-flex items-center justify-center px-6 py-3 bg-white/80 border-2 border-standbyte-blue text-standbyte-blue font-bold rounded-lg hover:bg-standbyte-blue hover:text-white transition-all duration-300">
            <FileCheck className="mr-2 w-4 h-4" />
            Saiba Mais
          </button>
        </div>
      </div>

      {/* Visual Section */}
      <div className="relative animate-fade-in-scale">
        <div className="bg-white/40 backdrop-blur-sm rounded-2xl p-6 border border-white/30 shadow-xl">
          {/* Header */}
          <div className="bg-gradient-to-r from-standbyte-blue to-blue-700 p-4 rounded-xl mb-4">
            <div className="flex items-center space-x-2 mb-2">
              <Award className="w-6 h-6 text-white" />
              <span className="text-white font-black text-lg">Fluke DSX2-8000</span>
            </div>
            <div className="text-white/90 text-sm">Padrão Ouro Mundial</div>
          </div>
          
          {/* Features Grid */}
          <div className="grid grid-cols-2 gap-3">
            {[
              { icon: Award, text: "Fluke DSX2-8000", color: "from-standbyte-blue to-blue-700" },
              { icon: Shield, text: "Normas TIA/ISO", color: "from-standbyte-red to-red-600" },
              { icon: Zap, text: "Até 40+ Gbps", color: "from-standbyte-blue to-blue-700" },
              { icon: Target, text: "Precisão Total", color: "from-standbyte-red to-red-600" }
            ].map((service, index) => (
              <div 
                key={index} 
                className="flex flex-col items-center p-3 rounded-lg bg-white/60 backdrop-blur-sm border border-white/30 text-center hover:bg-white/80 transition-all duration-300"
              >
                <div className={`w-8 h-8 bg-gradient-to-r ${service.color} rounded-lg flex items-center justify-center mb-2`}>
                  <service.icon className="w-4 h-4 text-white" />
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
