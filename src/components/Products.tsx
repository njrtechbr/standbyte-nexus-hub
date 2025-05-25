
import { Monitor, Smartphone, Laptop, Database, Cpu } from "lucide-react";

const Products = () => {
  const products = [
    {
      icon: Monitor,
      title: "Workstations IA",
      description: "Estações de trabalho com processamento de IA e GPUs de última geração.",
      price: "A partir de R$ 12.500",
      color: "standbyte-blue",
      features: ["RTX 4090", "Intel i9", "64GB RAM", "SSD 2TB"]
    },
    {
      icon: Laptop,
      title: "Notebooks Profissionais",
      description: "Performance extrema para trabalho e criação de conteúdo profissional.",
      price: "A partir de R$ 8.200",
      color: "standbyte-red",
      features: ["RTX 4080", "AMD Ryzen 9", "32GB RAM", "240Hz Display"]
    },
    {
      icon: Database,
      title: "Servidores Empresariais",
      description: "Infraestrutura empresarial com alta disponibilidade e performance.",
      price: "A partir de R$ 45.500",
      color: "standbyte-blue",
      features: ["Xeon Platinum", "512GB ECC", "NVMe Storage", "Redundância Total"]
    },
    {
      icon: Smartphone,
      title: "Dispositivos IoT",
      description: "Ecossistema completo de dispositivos conectados e inteligentes.",
      price: "A partir de R$ 2.800",
      color: "standbyte-gray-dark",
      features: ["5G Ready", "IA Embarcada", "Edge Computing", "Conectividade"]
    },
  ];

  return (
    <section id="products" className="relative py-24 bg-standbyte-gray-dark overflow-hidden">
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto mb-20">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6">
            <Cpu className="w-5 h-5 text-standbyte-red mr-2" />
            <span className="text-white font-medium">Produtos Inovadores</span>
          </div>
          
          <h2 className="text-5xl font-bold mb-6">
            <span className="text-white">Hardware de</span>
            <br />
            <span className="text-standbyte-blue">
              Próxima Geração
            </span>
          </h2>
          
          <p className="text-xl text-standbyte-gray-medium leading-relaxed">
            Equipamentos de última geração com tecnologia de ponta, 
            projetados para superar os limites da performance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {products.map((product, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-3xl bg-white/10 backdrop-blur-sm border border-white/10 hover:border-white/30 transition-all duration-300 hover:scale-105"
            >
              {/* Background gradient */}
              <div className={`absolute inset-0 bg-${product.color}/10 group-hover:bg-${product.color}/20 transition-opacity duration-300`}></div>
              
              {/* Product Header */}
              <div className="relative p-8">
                <div className="flex items-start justify-between mb-6">
                  <div className={`w-16 h-16 rounded-2xl bg-${product.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <product.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-white mb-1">{product.price}</div>
                    <div className="text-sm text-standbyte-gray-medium">Configuração base</div>
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-standbyte-blue transition-colors duration-300">
                  {product.title}
                </h3>
                
                <p className="text-standbyte-gray-medium leading-relaxed mb-6">
                  {product.description}
                </p>

                {/* Features */}
                <div className="grid grid-cols-2 gap-3 mb-8">
                  {product.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-standbyte-red rounded-full"></div>
                      <span className="text-sm text-standbyte-gray-medium">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-4">
                  <button className={`flex-1 py-3 px-6 bg-${product.color} text-white font-semibold rounded-xl hover:opacity-90 transition-opacity duration-200`}>
                    Configurar
                  </button>
                  <button className="px-6 py-3 border border-white/30 text-white rounded-xl hover:bg-white/10 transition-colors duration-200">
                    Detalhes
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center space-x-4">
            <a
              href="#contact"
              className="px-8 py-4 bg-standbyte-blue text-white font-semibold rounded-full hover:bg-blue-700 transition-colors"
            >
              Ver Catálogo Completo
            </a>
            <button className="px-8 py-4 border border-white/30 text-white rounded-full hover:bg-white/10 transition-colors duration-200">
              Solicitar Orçamento
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Products;
