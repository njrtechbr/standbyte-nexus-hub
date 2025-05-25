
import { ArrowRight, Play, Zap, Shield, Cpu } from "lucide-react";

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen overflow-hidden">
      {/* Background animado */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-red-900">
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
      </div>

      {/* Elementos flutuantes */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-20 h-20 bg-blue-500 rounded-full opacity-20 animate-float"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-red-500 rounded-full opacity-20 animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-40 left-20 w-24 h-24 bg-purple-500 rounded-full opacity-20 animate-float" style={{ animationDelay: '4s' }}></div>
      </div>

      <div className="relative z-10 pt-32 min-h-screen flex items-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Content */}
            <div className="space-y-8 animate-slide-in-left">
              <div className="space-y-6">
                <div className="inline-flex items-center px-4 py-2 rounded-full glass-effect animate-fade-in-scale">
                  <Zap className="w-5 h-5 text-yellow-400 mr-2" />
                  <span className="text-white font-medium">Inovação em Tecnologia</span>
                </div>
                
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight">
                  <span className="text-white">Soluções</span>
                  <br />
                  <span className="text-shimmer">Inteligentes</span>
                  <br />
                  <span className="bg-gradient-to-r from-blue-400 to-red-400 bg-clip-text text-transparent">
                    para o Futuro
                  </span>
                </h1>
                
                <p className="text-xl text-gray-300 leading-relaxed max-w-2xl">
                  A Standbyte revoluciona o mercado de TI com produtos e serviços de vanguarda, 
                  combinando inteligência artificial, segurança avançada e experiência excepcional.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-6">
                <a
                  href="#services"
                  className="group relative inline-flex items-center justify-center px-8 py-4 font-semibold text-white rounded-full overflow-hidden animate-glow hover-lift"
                  style={{
                    background: 'linear-gradient(45deg, #1e40af, #dc2626)',
                  }}
                >
                  <span className="relative z-10 flex items-center">
                    Explorar Soluções
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-blue-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </a>
                
                <button className="group inline-flex items-center justify-center px-8 py-4 text-white font-semibold rounded-full border-2 border-white/30 glass-effect hover-lift">
                  <Play className="mr-3 w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                  Assistir Demo
                </button>
              </div>

              {/* Stats com animação */}
              <div className="grid grid-cols-3 gap-8 pt-8">
                {[
                  { number: "500+", label: "Clientes Satisfeitos" },
                  { number: "15+", label: "Anos de Inovação" },
                  { number: "24/7", label: "Suporte Especializado" }
                ].map((stat, index) => (
                  <div key={index} className="text-center animate-fade-in-scale" style={{ animationDelay: `${index * 200}ms` }}>
                    <div className="text-3xl font-bold text-shimmer mb-2">{stat.number}</div>
                    <div className="text-gray-300 text-sm">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Visual futurista */}
            <div className="relative animate-slide-in-right">
              <div className="relative z-10 glass-effect rounded-3xl p-8 animate-float">
                <div className="space-y-6">
                  {/* Header simulado */}
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
                  </div>
                  
                  {/* Conteúdo simulado */}
                  <div className="space-y-4">
                    <div className="h-4 bg-gradient-to-r from-blue-400 to-red-400 rounded animate-pulse"></div>
                    <div className="h-4 bg-gradient-to-r from-blue-300 to-red-300 rounded w-3/4 animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                    <div className="h-4 bg-gradient-to-r from-blue-200 to-red-200 rounded w-1/2 animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                  </div>

                  {/* Cards de serviços */}
                  <div className="grid grid-cols-2 gap-4 mt-8">
                    {[
                      { icon: Shield, color: "from-blue-500 to-blue-700" },
                      { icon: Cpu, color: "from-red-500 to-red-700" },
                      { icon: Zap, color: "from-purple-500 to-purple-700" },
                      { icon: ArrowRight, color: "from-green-500 to-green-700" }
                    ].map((item, index) => (
                      <div key={index} className={`h-24 bg-gradient-to-br ${item.color} rounded-xl flex items-center justify-center animate-rotate-in hover-lift`} style={{ animationDelay: `${index * 150}ms` }}>
                        <item.icon className="w-8 h-8 text-white" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Elementos decorativos */}
              <div className="absolute -bottom-6 -right-6 w-full h-full bg-gradient-to-br from-blue-600 to-red-600 rounded-3xl -z-10 animate-pulse-custom"></div>
              <div className="absolute -top-6 -left-6 w-32 h-32 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full opacity-20 animate-float" style={{ animationDelay: '3s' }}></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
