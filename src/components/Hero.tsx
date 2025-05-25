
import { ArrowRight, Play, Zap, Shield, Cpu, Wifi, Camera, Wrench, Battery, Server, CheckCircle } from "lucide-react";

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen overflow-hidden">
      {/* Background animado com gradiente melhorado */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
        <div className="absolute inset-0 opacity-30" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
        
        {/* Overlay com gradiente adicional */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 via-transparent to-blue-900/20"></div>
      </div>

      {/* Elementos flutuantes com mais animações */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-20 h-20 bg-blue-500 rounded-full opacity-20 animate-float"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-purple-500 rounded-full opacity-15 animate-float animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-40 left-20 w-24 h-24 bg-indigo-600 rounded-full opacity-20 animate-float" style={{ animationDelay: '3s' }}></div>
        <div className="absolute top-60 right-40 w-12 h-12 bg-blue-400 rounded-full opacity-25 animate-bounce" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-60 right-10 w-18 h-18 bg-purple-400 rounded-full opacity-20 animate-float" style={{ animationDelay: '4s' }}></div>
        
        {/* Linhas animadas de conexão */}
        <div className="absolute top-1/4 left-1/4 w-32 h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent opacity-30 animate-pulse"></div>
        <div className="absolute top-1/2 right-1/4 w-24 h-px bg-gradient-to-r from-transparent via-purple-400 to-transparent opacity-25 animate-pulse" style={{ animationDelay: '1.5s' }}></div>
      </div>

      <div className="relative z-10 pt-32 min-h-screen flex items-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Content com animações aprimoradas */}
            <div className="space-y-8 animate-slide-in-left">
              <div className="space-y-6">
                <div className="inline-flex items-center px-4 py-2 rounded-full glass-effect animate-fade-in-scale animate-glow">
                  <Zap className="w-5 h-5 text-blue-400 mr-2 animate-pulse" />
                  <span className="text-white font-medium">Standbyte - Inovação em Tecnologia</span>
                </div>
                
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight">
                  <span className="text-white animate-fade-in-scale">Infraestrutura</span>
                  <br />
                  <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent animate-fade-in-scale text-shimmer" style={{ animationDelay: '0.2s' }}>
                    Profissional
                  </span>
                  <br />
                  <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent animate-fade-in-scale" style={{ animationDelay: '0.4s' }}>
                    Certificada
                  </span>
                </h1>
                
                <p className="text-xl text-gray-300 leading-relaxed max-w-2xl animate-slide-in-up" style={{ animationDelay: '0.6s' }}>
                  Especialistas em cabeamento estruturado, segurança eletrônica, energia solar e 
                  soluções completas de TI. Certificação Fluke DSX-2000 para máxima qualidade.
                </p>
              </div>

              {/* Services badges com animação */}
              <div className="flex flex-wrap gap-3 animate-fade-in-scale" style={{ animationDelay: '0.8s' }}>
                {[
                  { icon: Wifi, text: "Fibra Óptica" },
                  { icon: Camera, text: "CFTV IP" },
                  { icon: Battery, text: "Energia Solar" },
                  { icon: Shield, text: "Segurança" }
                ].map((service, index) => (
                  <div key={index} className="flex items-center px-3 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105 animate-bounce" style={{ animationDelay: `${1 + index * 0.1}s` }}>
                    <service.icon className="w-4 h-4 text-blue-400 mr-2" />
                    <span className="text-white text-sm font-medium">{service.text}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-6 animate-slide-in-up" style={{ animationDelay: '1s' }}>
                <a
                  href="#services"
                  className="group relative inline-flex items-center justify-center px-8 py-4 font-semibold text-white rounded-full overflow-hidden hover:scale-110 transition-all duration-300 animate-pulse-custom"
                  style={{
                    background: 'linear-gradient(45deg, #1e40af, #7c3aed, #3b82f6)',
                    backgroundSize: '200% 200%',
                    animation: 'gradient-shift 3s ease infinite, pulse-custom 2s ease-in-out infinite'
                  }}
                >
                  <span className="relative z-10 flex items-center">
                    Ver Nossos Serviços
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
                  </span>
                </a>
                
                <button className="group inline-flex items-center justify-center px-8 py-4 text-white font-semibold rounded-full border-2 border-white/30 glass-effect hover:bg-white/20 hover:scale-105 transition-all duration-300 animate-fade-in-scale" style={{ animationDelay: '1.2s' }}>
                  <Play className="mr-3 w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                  Certificação Fluke
                </button>
              </div>

              {/* Stats com animação melhorada */}
              <div className="grid grid-cols-3 gap-8 pt-8">
                {[
                  { number: "500+", label: "Projetos Entregues", delay: "1.4s" },
                  { number: "15+", label: "Anos de Experiência", delay: "1.6s" },
                  { number: "24/7", label: "Suporte Técnico", delay: "1.8s" }
                ].map((stat, index) => (
                  <div key={index} className="text-center animate-fade-in-scale hover:scale-110 transition-transform duration-300" style={{ animationDelay: stat.delay }}>
                    <div className="text-3xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent mb-2 animate-pulse">{stat.number}</div>
                    <div className="text-gray-300 text-sm">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Visual com animações aprimoradas */}
            <div className="relative animate-slide-in-right">
              <div className="relative z-10 glass-effect rounded-3xl p-8 hover:scale-105 transition-transform duration-500 animate-glow">
                <div className="space-y-6">
                  {/* Header simulado com animação */}
                  <div className="flex items-center space-x-3 mb-6 animate-bounce" style={{ animationDelay: '2s' }}>
                    <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                    <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-3 h-3 bg-indigo-500 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                  
                  {/* Certificação Fluke highlight */}
                  <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 p-4 rounded-xl border border-blue-400/30 animate-fade-in-scale" style={{ animationDelay: '2.2s' }}>
                    <div className="flex items-center space-x-3 mb-2">
                      <CheckCircle className="w-5 h-5 text-blue-400 animate-pulse" />
                      <span className="text-white font-semibold">Certificação Fluke DSX-2000</span>
                    </div>
                    <div className="text-gray-300 text-sm">Garantia de máxima performance</div>
                  </div>
                  
                  {/* Conteúdo simulado com animação */}
                  <div className="space-y-4">
                    <div className="h-4 bg-gradient-to-r from-blue-400 to-purple-400 rounded animate-pulse animate-fade-in-scale" style={{ animationDelay: '2.4s' }}></div>
                    <div className="h-4 bg-gradient-to-r from-purple-300 to-indigo-300 rounded w-3/4 animate-pulse animate-fade-in-scale" style={{ animationDelay: '2.6s' }}></div>
                    <div className="h-4 bg-gradient-to-r from-indigo-200 to-blue-200 rounded w-1/2 animate-pulse animate-fade-in-scale" style={{ animationDelay: '2.8s' }}></div>
                  </div>

                  {/* Cards de serviços com mais animação */}
                  <div className="grid grid-cols-2 gap-4 mt-8">
                    {[
                      { icon: Wifi, color: "from-blue-500 to-purple-600", delay: "3s" },
                      { icon: Camera, color: "from-purple-500 to-indigo-600", delay: "3.1s" },
                      { icon: Battery, color: "from-indigo-500 to-blue-600", delay: "3.2s" },
                      { icon: Server, color: "from-blue-600 to-purple-500", delay: "3.3s" }
                    ].map((item, index) => (
                      <div key={index} className={`h-24 bg-gradient-to-br ${item.color} rounded-xl flex items-center justify-center hover:scale-110 hover:rotate-3 transition-all duration-300 animate-fade-in-scale animate-float`} style={{ animationDelay: item.delay }}>
                        <item.icon className="w-8 h-8 text-white animate-pulse" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Elementos decorativos com animação */}
              <div className="absolute -bottom-6 -right-6 w-full h-full bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-600 rounded-3xl -z-10 opacity-30 animate-pulse"></div>
              <div className="absolute -top-6 -left-6 w-32 h-32 bg-gradient-to-br from-purple-500 via-blue-500 to-indigo-500 rounded-full opacity-20 animate-float"></div>
              <div className="absolute top-1/2 -right-4 w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full opacity-25 animate-bounce" style={{ animationDelay: '1s' }}></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
