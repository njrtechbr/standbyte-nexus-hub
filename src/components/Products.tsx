
import { Monitor, Smartphone, Laptop, Database } from "lucide-react";

const Products = () => {
  const products = [
    {
      icon: Monitor,
      title: "Workstations IA",
      description: "Estações de trabalho com processamento de IA e GPUs de última geração.",
      price: "A partir de R$ 12.500",
      features: ["RTX 4090", "Intel i9", "64GB RAM", "SSD 2TB"]
    },
    {
      icon: Laptop,
      title: "Notebooks Profissionais",
      description: "Performance extrema para trabalho e criação de conteúdo profissional.",
      price: "A partir de R$ 8.200",
      features: ["RTX 4080", "AMD Ryzen 9", "32GB RAM", "240Hz Display"]
    },
    {
      icon: Database,
      title: "Servidores Empresariais",
      description: "Infraestrutura empresarial com alta disponibilidade e performance.",
      price: "A partir de R$ 45.500",
      features: ["Xeon Platinum", "512GB ECC", "NVMe Storage", "Redundância Total"]
    },
    {
      icon: Smartphone,
      title: "Dispositivos IoT",
      description: "Ecossistema completo de dispositivos conectados e inteligentes.",
      price: "A partir de R$ 2.800",
      features: ["5G Ready", "IA Embarcada", "Edge Computing", "Conectividade"]
    },
  ];

  return (
    <section id="products" className="py-24 bg-standbyte-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-standbyte-blue mb-6">
            Nossos Produtos
          </h2>
          <p className="text-xl text-standbyte-mid leading-relaxed">
            Equipamentos de última geração com tecnologia de ponta, 
            projetados para superar os limites da performance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {products.map((product, index) => (
            <div
              key={index}
              className="border border-standbyte-mid/20 rounded-2xl bg-standbyte-light overflow-hidden hover:shadow-lg hover:border-standbyte-blue/30"
            >
              {/* Product Header */}
              <div className="p-8 bg-standbyte-blue">
                <div className="flex items-start justify-between text-standbyte-white mb-4">
                  <div className="w-16 h-16 bg-standbyte-white/20 rounded-xl flex items-center justify-center">
                    <product.icon className="w-8 h-8" />
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold">{product.price}</div>
                    <div className="text-standbyte-white/80 text-sm">Configuração base</div>
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-standbyte-white mb-3">
                  {product.title}
                </h3>
                
                <p className="text-standbyte-white/80 leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Product Content */}
              <div className="p-8 bg-standbyte-white">
                {/* Features */}
                <div className="grid grid-cols-2 gap-3 mb-8">
                  {product.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-standbyte-red rounded-full"></div>
                      <span className="text-sm text-standbyte-dark">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-4">
                  <button className="flex-1 py-3 px-6 bg-standbyte-blue text-standbyte-white font-semibold rounded-lg hover:bg-blue-800">
                    Configurar
                  </button>
                  <button className="px-6 py-3 border-2 border-standbyte-blue text-standbyte-blue rounded-lg hover:bg-standbyte-blue hover:text-standbyte-white">
                    Detalhes
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#contact"
              className="inline-flex items-center px-8 py-4 bg-standbyte-blue text-standbyte-white font-semibold rounded-lg hover:bg-blue-800"
            >
              Ver Catálogo Completo
            </a>
            <button className="px-8 py-4 border-2 border-standbyte-blue text-standbyte-blue rounded-lg hover:bg-standbyte-blue hover:text-standbyte-white">
              Solicitar Orçamento
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Products;
