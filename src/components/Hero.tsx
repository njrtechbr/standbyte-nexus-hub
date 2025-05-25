
import { ArrowRight, Play, Zap, Shield, Wifi, Camera, Battery, CheckCircle } from "lucide-react";

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }}></div>

      {/* Floating elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-20 h-20 bg-blue-500/20 rounded-full animate-float blur-sm"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-purple-500/20 rounded-full animate-float blur-sm" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-40 left-20 w-24 h-24 bg-indigo-600/20 rounded-full animate-float blur-sm" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 right-10 w-12 h-12 bg-cyan-400/20 rounded-full animate-float blur-sm" style={{ animationDelay: '3s' }}></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 pt-32 min-h-screen flex items-center">
        <div className="grid lg:grid-cols-2 gap-16 items-center w-full">
          
          {/* Content Section */}
          <div className="space-y-8 animate-fade-in">
            {/* Badge */}
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 animate-slide-in-up">
              <Zap className="w-5 h-5 text-blue-400 mr-2" />
              <span className="text-white font-medium">Standbyte - Inovação em Tecnologia</span>
            </div>
            
            {/* Main Title */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight animate-slide-in-up" style={{ animationDelay: '0.2s' }}>
              <div className="text-white mb-2">Infraestrutura</div>
              <div className="text-white mb-2">Profissional</div>
              <div className="bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
                Certificada
              </div>
            </h1>
            
            {/* Description */}
            <p className="text-xl text-gray-300 leading-relaxed max-w-2xl animate-slide-in-up" style={{ animationDelay: '0.4s' }}>
              Especialistas em cabeamento estruturado, segurança eletrônica, energia solar e 
              soluções completas de TI. Certificação Fluke DSX-2000 para máxima qualidade.
            </p>

            {/* Service Tags */}
            <div className="flex flex-wrap gap-3 animate-slide-in-up" style={{ animationDelay: '0.6s' }}>
              {[
                { icon: Wifi, text: "Fibra Óptica" },
                { icon: Camera, text: "CFTV IP" },
                { icon: Battery, text: "Energia Solar" },
                { icon: Shield, text: "Segurança" }
              ].map((service, index) => (
                <div 
                  key={index} 
                  className="flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105"
                >
                  <service.icon className="w-4 h-4 text-blue-400 mr-2" />
                  <span className="text-white text-sm font-medium">{service.text}</span>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 animate-slide-in-up" style={{ animationDelay: '0.8s' }}>
              <a 
                href="#services" 
                className="group inline-flex items-center justify-center px-8 py-4 font-semibold text-white rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-300 hover:scale-105 hover:shadow-xl"
              >
                Ver Nossos Serviços
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </a>
              
              <button className="group inline-flex items-center justify-center px-8 py-4 text-white font-semibold rounded-xl border-2 border-white/30 bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all duration-300 hover:scale-105">
                <Play className="mr-2 w-5 h-5" />
                Certificação Fluke
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-8 animate-slide-in-up" style={{ animationDelay: '1s' }}>
              {[
                { number: "500+", label: "Projetos Entregues" },
                { number: "15+", label: "Anos de Experiência" },
                { number: "24/7", label: "Suporte Técnico" }
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">
                    {stat.number}
                  </div>
                  <div className="text-gray-300 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Visual Section */}
          <div className="relative animate-slide-in-right">
            {/* Main Card */}
            <div className="relative z-10 bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 hover:scale-105 transition-transform duration-500">
              {/* Header dots */}
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                <div className="w-3 h-3 bg-indigo-500 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
              </div>
              
              {/* Fluke Certification */}
              <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 p-4 rounded-xl border border-blue-400/30 mb-6">
                <div className="flex items-center space-x-3 mb-2">
                  <CheckCircle className="w-5 h-5 text-blue-400" />
                  <span className="text-white font-semibold">Certificação Fluke DSX-2000</span>
                </div>
                <div className="text-gray-300 text-sm">Garantia de máxima performance</div>
              </div>
              
              {/* Progress bars */}
              <div className="space-y-4 mb-8">
                <div className="h-3 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"></div>
                <div className="h-3 bg-gradient-to-r from-purple-300 to-indigo-300 rounded-full w-4/5"></div>
                <div className="h-3 bg-gradient-to-r from-indigo-200 to-blue-200 rounded-full w-3/5"></div>
              </div>

              {/* Service Icons Grid */}
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: Wifi, gradient: "from-blue-500 to-purple-600" },
                  { icon: Camera, gradient: "from-purple-500 to-indigo-600" },
                  { icon: Battery, gradient: "from-indigo-500 to-blue-600" },
                  { icon: Shield, gradient: "from-blue-600 to-purple-500" }
                ].map((item, index) => (
                  <div 
                    key={index} 
                    className={`h-20 bg-gradient-to-br ${item.gradient} rounded-xl flex items-center justify-center hover:scale-110 transition-transform duration-300 cursor-pointer`}
                  >
                    <item.icon className="w-8 h-8 text-white" />
                  </div>
                ))}
              </div>
            </div>

            {/* Background card shadow */}
            <div className="absolute -bottom-6 -right-6 w-full h-full bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-indigo-600/20 rounded-3xl -z-10"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
