
import { Monitor, Smartphone, Laptop, HardDrive } from "lucide-react";

const Products = () => {
  const products = [
    {
      icon: Monitor,
      title: "Computadores Desktop",
      description: "Equipamentos de alta performance para empresas e uso profissional.",
      price: "A partir de R$ 2.500",
      image: "bg-gradient-to-br from-blue-400 to-blue-600",
    },
    {
      icon: Laptop,
      title: "Notebooks Corporativos",
      description: "Mobilidade e produtividade em equipamentos robustos e confiáveis.",
      price: "A partir de R$ 3.200",
      image: "bg-gradient-to-br from-purple-400 to-purple-600",
    },
    {
      icon: HardDrive,
      title: "Servidores",
      description: "Infraestrutura de TI escalável para empresas de todos os portes.",
      price: "A partir de R$ 8.500",
      image: "bg-gradient-to-br from-green-400 to-green-600",
    },
    {
      icon: Smartphone,
      title: "Dispositivos Móveis",
      description: "Tablets e smartphones para comunicação empresarial eficiente.",
      price: "A partir de R$ 1.800",
      image: "bg-gradient-to-br from-orange-400 to-orange-600",
    },
  ];

  return (
    <section id="products" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Produtos em Destaque
          </h2>
          <p className="text-xl text-gray-600">
            Equipamentos de última geração com garantia estendida e suporte técnico especializado.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 animate-fade-in hover-scale"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className={`h-48 ${product.image} flex items-center justify-center`}>
                <product.icon className="w-16 h-16 text-white" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {product.title}
                </h3>
                <p className="text-gray-600 mb-4">
                  {product.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-blue-600">
                    {product.price}
                  </span>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300">
                    Ver Mais
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <a
            href="#contact"
            className="inline-flex items-center px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-300"
          >
            Ver Todos os Produtos
          </a>
        </div>
      </div>
    </section>
  );
};

export default Products;
