import { ArrowRight, Play, Zap, Shield, Wifi, Camera, Battery, CheckCircle } from "lucide-react";

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen overflow-hidden">
      {/* Background com gradiente */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
      </div>

      {/* Elementos flutuantes animados */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-20 h-20 bg-blue-500 rounded-full opacity-20 animate-float"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-purple-500 rounded-full opacity-15 animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-40 left-20 w-24 h-24 bg-indigo-600 rounded-full opacity-20 animate-float" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative z-10 pt-32 min-h-screen flex items-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            
            {/* Conteúdo principal */}
            <div className="space-y-8 animate-slide-in-left">
              <div className="space-y-6">
                <div className="inline-flex items-center px-4 py-2 rounded-full glass-effect animate-fade-in-scale">
                  <Zap className="w-5 h-5 text-blue-400 mr-2" />
                  <span className="text-white font-medium">Standbyte - Inovação em Tecnologia</span>
                </div>
                
                <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight text-left">
                  <div className="text-white mb-2">Infraestrutura</div>
                  <div className="text-white mb-2">Profissional</div>
                  <div className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    Certificada
                  </div>
                </h1>
                
                <p className="text-xl text-gray-300 leading-relaxed max-w-2xl">
                  Especialistas em cabeamento estruturado, segurança eletrônica, energia solar e 
                  soluções completas de TI. Certificação Fluke DSX-2000 para máxima qualidade.
                </p>
              </div>

              {/* Badges de serviços */}
              <div className="flex flex-wrap gap-3">
                {[
                  { icon: Wifi, text: "Fibra Óptica" },
                  { icon: Camera, text: "CFTV IP" },
                  { icon: Battery, text: "Energia Solar" },
                  { icon: Shield, text: "Segurança" }
                ].map((service, index) => (
                  <div 
                    key={index} 
                    className="flex items-center px-3 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300"
                  >
                    <service.icon className="w-4 h-4 text-blue-400 mr-2" />
                    <span className="text-white text-sm font-medium">{service.text}</span>
                  </div>
                ))}
              </div>

              {/* Botões de ação */}
              <div className="flex flex-col sm:flex-row gap-6">
                <a 
                  href="#services" 
                  className="group inline-flex items-center justify-center px-8 py-4 font-semibold text-white rounded-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-300 hover:scale-105"
                >
                  <span className="flex items-center">
                    Ver Nossos Serviços
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
                  </span>
                </a>
                
                <button className="group inline-flex items-center justify-center px-8 py-4 text-white font-semibold rounded-full border-2 border-white/30 glass-effect hover:bg-white/20 transition-all duration-300">
                  <Play className="mr-3 w-5 h-5" />
                  Certificação Fluke
                </button>
              </div>

              {/* Estatísticas */}
              <div className="grid grid-cols-3 gap-8 pt-8">
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

            {/* Visual lateral */}
            <div className="relative animate-slide-in-right">
              <div className="relative z-10 glass-effect rounded-3xl p-8 hover:scale-105 transition-transform duration-500">
                <div className="space-y-6">
                  {/* Header */}
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-indigo-500 rounded-full"></div>
                  </div>
                  
                  {/* Certificação Fluke */}
                  <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 p-4 rounded-xl border border-blue-400/30">
                    <div className="flex items-center space-x-3 mb-2">
                      <CheckCircle className="w-5 h-5 text-blue-400" />
                      <span className="text-white font-semibold">Certificação Fluke DSX-2000</span>
                    </div>
                    <div className="text-gray-300 text-sm">Garantia de máxima performance</div>
                  </div>
                  
                  {/* Barras de progresso simuladas */}
                  <div className="space-y-4">
                    <div className="h-4 bg-gradient-to-r from-blue-400 to-purple-400 rounded"></div>
                    <div className="h-4 bg-gradient-to-r from-purple-300 to-indigo-300 rounded w-3/4"></div>
                    <div className="h-4 bg-gradient-to-r from-indigo-200 to-blue-200 rounded w-1/2"></div>
                  </div>

                  {/* Grid de ícones */}
                  <div className="grid grid-cols-2 gap-4 mt-8">
                    {[
                      { icon: Wifi, color: "from-blue-500 to-purple-600" },
                      { icon: Camera, color: "from-purple-500 to-indigo-600" },
                      { icon: Battery, color: "from-indigo-500 to-blue-600" },
                      { icon: Shield, color: "from-blue-600 to-purple-500" }
                    ].map((item, index) => (
                      <div 
                        key={index} 
                        className={`h-24 bg-gradient-to-br ${item.color} rounded-xl flex items-center justify-center hover:scale-105 transition-transform duration-300`}
                      >
                        <item.icon className="w-8 h-8 text-white" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Elementos decorativos */}
              <div className="absolute -bottom-6 -right-6 w-full h-full bg-gradient-to-br from-blue-600/30 via-purple-600/30 to-indigo-600/30 rounded-3xl -z-10"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
