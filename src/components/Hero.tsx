
import { ArrowRight, CheckCircle, Wifi, Camera, Battery, Shield } from "lucide-react";

const Hero = () => {
  return (
    <section id="home" className="pt-16 py-24 bg-standbyte-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Content Section */}
          <div className="space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-standbyte-light border border-standbyte-mid/20">
              <CheckCircle className="w-4 h-4 text-standbyte-red mr-2" />
              <span className="text-standbyte-dark text-sm font-medium">Certificação Fluke DSX-2000</span>
            </div>
            
            {/* Main Title */}
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-6xl font-bold text-standbyte-blue leading-tight">
                Infraestrutura
              </h1>
              <h1 className="text-5xl lg:text-6xl font-bold text-standbyte-blue leading-tight">
                Profissional
              </h1>
              <h1 className="text-5xl lg:text-6xl font-bold text-standbyte-red leading-tight">
                Certificada
              </h1>
            </div>
            
            {/* Description */}
            <p className="text-xl text-standbyte-mid leading-relaxed max-w-xl">
              Especialistas em cabeamento estruturado, segurança eletrônica, energia solar e 
              soluções completas de TI. Máxima qualidade garantida.
            </p>

            {/* Service Tags */}
            <div className="flex flex-wrap gap-3">
              {[
                { icon: Wifi, text: "Fibra Óptica" },
                { icon: Camera, text: "CFTV IP" },
                { icon: Battery, text: "Energia Solar" },
                { icon: Shield, text: "Segurança" }
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
                className="inline-flex items-center justify-center px-8 py-4 bg-standbyte-blue text-standbyte-white font-semibold rounded-lg hover:bg-blue-800"
              >
                Ver Nossos Serviços
                <ArrowRight className="ml-2 w-5 h-5" />
              </a>
              
              <button className="inline-flex items-center justify-center px-8 py-4 border-2 border-standbyte-blue text-standbyte-blue font-semibold rounded-lg hover:bg-standbyte-blue hover:text-standbyte-white">
                Certificação Fluke
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-8 border-t border-standbyte-light">
              {[
                { number: "500+", label: "Projetos Entregues" },
                { number: "15+", label: "Anos de Experiência" },
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
              {/* Fluke Certification */}
              <div className="bg-standbyte-blue p-6 rounded-xl mb-6">
                <div className="flex items-center space-x-3 mb-3">
                  <CheckCircle className="w-6 h-6 text-standbyte-white" />
                  <span className="text-standbyte-white font-bold text-lg">Certificação Fluke DSX-2000</span>
                </div>
                <div className="text-standbyte-white/80">Garantia de máxima performance e qualidade</div>
              </div>
              
              {/* Service Icons Grid */}
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: Wifi, color: "bg-standbyte-blue", label: "Rede" },
                  { icon: Camera, color: "bg-standbyte-red", label: "CFTV" },
                  { icon: Battery, color: "bg-standbyte-blue", label: "Solar" },
                  { icon: Shield, color: "bg-standbyte-red", label: "Segurança" }
                ].map((item, index) => (
                  <div 
                    key={index} 
                    className="text-center p-4 bg-standbyte-white rounded-xl border border-standbyte-mid/20"
                  >
                    <div className={`w-12 h-12 ${item.color} rounded-lg flex items-center justify-center mx-auto mb-3`}>
                      <item.icon className="w-6 h-6 text-standbyte-white" />
                    </div>
                    <div className="text-standbyte-dark font-medium text-sm">{item.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
