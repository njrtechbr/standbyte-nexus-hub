
import { Monitor, Smartphone, Laptop, HardDrive, Cpu, Wifi, Database, Gamepad2 } from "lucide-react";

const Products = () => {
  const products = [
    {
      icon: Monitor,
      title: "Workstations IA",
      description: "Estações de trabalho com processamento de IA e GPUs de última geração.",
      price: "A partir de R$ 12.500",
      gradient: "from-blue-500 to-cyan-500",
      features: ["RTX 4090", "Intel i9", "64GB RAM", "SSD 2TB"]
    },
    {
      icon: Laptop,
      title: "Notebooks Gamers",
      description: "Performance extrema para gaming e criação de conteúdo profissional.",
      price: "A partir de R$ 8.200",
      gradient: "from-purple-500 to-pink-500",
      features: ["RTX 4080", "AMD Ryzen 9", "32GB RAM", "240Hz Display"]
    },
    {
      icon: Database,
      title: "Servidores Quantum",
      description: "Infraestrutura empresarial com processamento quântico integrado.",
      price: "A partir de R$ 45.500",
      gradient: "from-green-500 to-emerald-500",
      features: ["Xeon Platinum", "512GB ECC", "Quantum Core", "Redundância Total"]
    },
    {
      icon: Smartphone,
      title: "Dispositivos IoT",
      description: "Ecossistema completo de dispositivos conectados e inteligentes.",
      price: "A partir de R$ 2.800",
      gradient: "from-orange-500 to-red-500",
      features: ["5G Ready", "IA Embarcada", "Edge Computing", "Blockchain"]
    },
  ];

  return (
    <section id="products" className="relative py-24 bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.03"%3E%3Ccircle cx="30" cy="30" r="1"/%3E%3Ccircle cx="15" cy="15" r="1"/%3E%3Ccircle cx="45" cy="15" r="1"/%3E%3Ccircle cx="15" cy="45" r="1"/%3E%3Ccircle cx="45" cy="45" r="1"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] animate-pulse"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto mb-20 animate-slide-in-up">
          <div className="inline-flex items-center px-4 py-2 rounded-full glass-effect mb-6 animate-fade-in-scale">
            <Cpu className="w-5 h-5 text-cyan-400 mr-2" />
            <span className="text-white font-medium">Produtos Revolucionários</span>
          </div>
          
          <h2 className="text-5xl font-bold mb-6">
            <span className="text-white">Hardware de</span>
            <br />
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent animate-gradient">
              Próxima Geração
            </span>
          </h2>
          
          <p className="text-xl text-gray-300 leading-relaxed">
            Equipamentos de última geração com tecnologia de ponta, 
            projetados para superar os limites da performance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {products.map((product, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-3xl glass-effect border border-white/10 hover:border-white/30 transition-all duration-500 animate-fade-in-scale hover-lift"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              {/* Background gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${product.gradient} opacity-10 group-hover:opacity-20 transition-opacity duration-500`}></div>
              
              {/* Product Header */}
              <div className="relative p-8">
                <div className="flex items-start justify-between mb-6">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${product.gradient} flex items-center justify-center animate-float group-hover:scale-110 transition-transform duration-300`}>
                    <product.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-white mb-1">{product.price}</div>
                    <div className="text-sm text-gray-400">Configuração base</div>
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:to-purple-400 transition-all duration-300">
                  {product.title}
                </h3>
                
                <p className="text-gray-300 leading-relaxed mb-6">
                  {product.description}
                </p>

                {/* Features */}
                <div className="grid grid-cols-2 gap-3 mb-8">
                  {product.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center space-x-2 animate-slide-in-left" style={{ animationDelay: `${(index * 200) + (idx * 100)}ms` }}>
                      <div className="w-2 h-2 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full"></div>
                      <span className="text-sm text-gray-300">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-4">
                  <button className={`flex-1 py-3 px-6 bg-gradient-to-r ${product.gradient} text-white font-semibold rounded-xl hover:scale-105 transition-transform duration-300 animate-glow`}>
                    Configurar
                  </button>
                  <button className="px-6 py-3 border border-white/30 text-white rounded-xl hover:bg-white/10 transition-colors duration-300">
                    Detalhes
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16 animate-slide-in-up">
          <div className="inline-flex items-center space-x-4">
            <a
              href="#contact"
              className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-full hover:from-blue-600 hover:to-purple-600 transition-all duration-300 animate-glow hover-lift"
            >
              Ver Catálogo Completo
            </a>
            <button className="px-8 py-4 border border-white/30 text-white rounded-full hover:bg-white/10 transition-colors duration-300">
              Solicitar Orçamento
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Products;
