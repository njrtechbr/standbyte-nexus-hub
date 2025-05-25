
import { ShoppingCart, Heart, Star, Zap, Shield, Truck, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const Products = () => {
  const featuredProducts = [
    {
      id: 1,
      name: "Notebook Gamer Legion 5i",
      brand: "Lenovo",
      image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=400&h=300&fit=crop",
      originalPrice: 8999.99,
      salePrice: 7499.99,
      discount: 17,
      rating: 4.8,
      reviews: 234,
      specs: ["Intel i7-12700H", "RTX 4060 8GB", "16GB DDR5", "512GB SSD", "15.6'' 144Hz"],
      category: "Notebooks",
      isOnSale: true,
      isFreeShipping: true
    },
    {
      id: 2,
      name: "Placa de Vídeo RTX 4070",
      brand: "ASUS",
      image: "https://images.unsplash.com/photo-1591488320449-011701bb6704?w=400&h=300&fit=crop",
      originalPrice: 3299.99,
      salePrice: 2899.99,
      discount: 12,
      rating: 4.9,
      reviews: 189,
      specs: ["12GB GDDR6X", "DLSS 3.0", "Ray Tracing", "Dual Fan", "PCI-E 4.0"],
      category: "Placas de Vídeo",
      isOnSale: true,
      isFreeShipping: true
    },
    {
      id: 3,
      name: "Monitor Gamer Ultrawide",
      brand: "Samsung",
      image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400&h=300&fit=crop",
      originalPrice: 1899.99,
      salePrice: 1599.99,
      discount: 16,
      rating: 4.7,
      reviews: 156,
      specs: ["34'' UWQHD", "144Hz", "1ms", "HDR10", "FreeSync Premium"],
      category: "Monitores",
      isOnSale: true,
      isFreeShipping: false
    },
    {
      id: 4,
      name: "PC Gamer Completo RGB",
      brand: "Standbyte",
      image: "https://images.unsplash.com/photo-1587831990711-23ca6441447b?w=400&h=300&fit=crop",
      originalPrice: 4999.99,
      salePrice: 4299.99,
      discount: 14,
      rating: 4.9,
      reviews: 89,
      specs: ["AMD Ryzen 7 5700X", "RTX 4060 Ti", "32GB DDR4", "1TB NVMe", "RGB Premium"],
      category: "PCs Gamers",
      isOnSale: true,
      isFreeShipping: true
    },
    {
      id: 5,
      name: "Processador Intel i9-13900K",
      brand: "Intel",
      image: "https://images.unsplash.com/photo-1555617981-dac3880eac6e?w=400&h=300&fit=crop",
      originalPrice: 2599.99,
      salePrice: 2299.99,
      discount: 12,
      rating: 4.8,
      reviews: 267,
      specs: ["24 Cores", "32 Threads", "5.8GHz Boost", "LGA1700", "125W TDP"],
      category: "Processadores",
      isOnSale: true,
      isFreeShipping: true
    },
    {
      id: 6,
      name: "SSD NVMe 2TB PCIe 4.0",
      brand: "Kingston",
      image: "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=400&h=300&fit=crop",
      originalPrice: 899.99,
      salePrice: 749.99,
      discount: 17,
      rating: 4.6,
      reviews: 445,
      specs: ["2TB Capacidade", "7000MB/s Leitura", "PCIe 4.0", "5 Anos Garantia", "TLC NAND"],
      category: "Armazenamento",
      isOnSale: true,
      isFreeShipping: false
    }
  ];

  const categories = [
    "Todos", "Notebooks", "PCs Gamers", "Placas de Vídeo", 
    "Processadores", "Monitores", "Armazenamento", "Periféricos"
  ];

  const formatPrice = (price: number) => {
    return price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  return (
    <section id="products" className="py-16 bg-standbyte-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl lg:text-5xl font-bold text-standbyte-blue mb-4">
            Produtos de Informática
          </h2>
          <p className="text-xl text-standbyte-mid max-w-3xl mx-auto">
            As melhores ofertas em tecnologia com qualidade garantida e entrega rápida
          </p>
        </div>

        {/* Categories Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              className={`px-6 py-2 rounded-full font-medium transition-colors ${
                category === "Todos" 
                  ? "bg-standbyte-blue text-standbyte-white" 
                  : "bg-standbyte-light text-standbyte-dark hover:bg-standbyte-blue hover:text-standbyte-white"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {featuredProducts.map((product) => (
            <Card key={product.id} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-standbyte-light">
              <CardHeader className="p-0 relative overflow-hidden">
                {/* Product Image */}
                <div className="relative h-48 bg-standbyte-light">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  
                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex flex-col gap-2">
                    {product.isOnSale && (
                      <span className="bg-standbyte-red text-standbyte-white px-2 py-1 text-xs font-bold rounded">
                        -{product.discount}%
                      </span>
                    )}
                    {product.isFreeShipping && (
                      <span className="bg-green-500 text-white px-2 py-1 text-xs font-bold rounded flex items-center gap-1">
                        <Truck className="w-3 h-3" />
                        FRETE GRÁTIS
                      </span>
                    )}
                  </div>

                  {/* Wishlist */}
                  <button className="absolute top-3 right-3 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors">
                    <Heart className="w-4 h-4 text-standbyte-mid hover:text-standbyte-red" />
                  </button>
                </div>
              </CardHeader>

              <CardContent className="p-6">
                {/* Brand & Category */}
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-standbyte-mid font-medium">{product.brand}</span>
                  <span className="text-xs bg-standbyte-light text-standbyte-dark px-2 py-1 rounded">
                    {product.category}
                  </span>
                </div>

                {/* Product Name */}
                <h3 className="text-lg font-bold text-standbyte-dark mb-3 line-clamp-2">
                  {product.name}
                </h3>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-4 h-4 ${
                          i < Math.floor(product.rating) 
                            ? "fill-yellow-400 text-yellow-400" 
                            : "text-standbyte-light"
                        }`} 
                      />
                    ))}
                  </div>
                  <span className="text-sm text-standbyte-mid">
                    {product.rating} ({product.reviews})
                  </span>
                </div>

                {/* Specs */}
                <div className="mb-4">
                  <ul className="text-sm text-standbyte-dark space-y-1">
                    {product.specs.slice(0, 3).map((spec, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <div className="w-1 h-1 bg-standbyte-blue rounded-full"></div>
                        {spec}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Price */}
                <div className="mb-4">
                  {product.isOnSale && (
                    <div className="text-sm text-standbyte-mid line-through mb-1">
                      {formatPrice(product.originalPrice)}
                    </div>
                  )}
                  <div className="text-2xl font-bold text-standbyte-blue">
                    {formatPrice(product.salePrice)}
                  </div>
                  <div className="text-sm text-standbyte-mid">
                    ou 12x de {formatPrice(product.salePrice / 12)} sem juros
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                  <Button className="flex-1 bg-standbyte-blue hover:bg-blue-800 text-standbyte-white">
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Comprar
                  </Button>
                  <Button variant="outline" className="border-standbyte-blue text-standbyte-blue hover:bg-standbyte-blue hover:text-standbyte-white">
                    Ver Mais
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Features Banner */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          {[
            { icon: Truck, title: "Frete Grátis", desc: "Acima de R$ 299" },
            { icon: CreditCard, title: "12x sem Juros", desc: "No cartão de crédito" },
            { icon: Shield, title: "Compra Garantida", desc: "Proteção total" },
            { icon: Zap, title: "Entrega Expressa", desc: "Em até 24h*" }
          ].map((feature, index) => (
            <div key={index} className="flex items-center gap-4 p-4 bg-standbyte-light rounded-lg">
              <div className="w-12 h-12 bg-standbyte-blue rounded-lg flex items-center justify-center">
                <feature.icon className="w-6 h-6 text-standbyte-white" />
              </div>
              <div>
                <div className="font-semibold text-standbyte-dark">{feature.title}</div>
                <div className="text-sm text-standbyte-mid">{feature.desc}</div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button 
            size="lg" 
            className="bg-standbyte-red hover:bg-red-700 text-standbyte-white px-8 py-4"
          >
            Ver Todos os Produtos
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Products;
