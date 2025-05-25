
import { ArrowRight, CheckCircle, Star, Zap, Target, FileCheck, Award, Shield, ShoppingCart, Heart, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

interface Product {
  id: number;
  name: string;
  brand: string;
  image: string;
  originalPrice: number;
  salePrice: number;
  discount: number;
  rating: number;
  specs: string[];
  category: string;
}

interface SlideData {
  type: 'service' | 'product';
  content: string | Product;
}

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const featuredProducts: Product[] = [
    {
      id: 1,
      name: "Notebook Gamer Legion 5i",
      brand: "Lenovo",
      image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=800&h=600&fit=crop",
      originalPrice: 8999.99,
      salePrice: 7499.99,
      discount: 17,
      rating: 4.8,
      specs: ["Intel i7-12700H", "RTX 4060 8GB", "16GB DDR5", "512GB SSD"],
      category: "Notebooks"
    },
    {
      id: 2,
      name: "Placa de Vídeo RTX 4070",
      brand: "ASUS",
      image: "https://images.unsplash.com/photo-1591488320449-011701bb6704?w=800&h=600&fit=crop",
      originalPrice: 3299.99,
      salePrice: 2899.99,
      discount: 12,
      rating: 4.9,
      specs: ["12GB GDDR6X", "DLSS 3.0", "Ray Tracing", "Dual Fan"],
      category: "Placas de Vídeo"
    },
    {
      id: 3,
      name: "PC Gamer Completo RGB",
      brand: "Standbyte",
      image: "https://images.unsplash.com/photo-1587831990711-23ca6441447b?w=800&h=600&fit=crop",
      originalPrice: 4999.99,
      salePrice: 4299.99,
      discount: 14,
      rating: 4.9,
      specs: ["AMD Ryzen 7 5700X", "RTX 4060 Ti", "32GB DDR4", "1TB NVMe"],
      category: "PCs Gamers"
    }
  ];

  const slides: SlideData[] = [
    {
      type: 'service',
      content: 'certification'
    },
    ...featuredProducts.map(product => ({
      type: 'product' as const,
      content: product
    }))
  ];

  // Auto-rotate slides
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 8000);

    return () => clearInterval(timer);
  }, [slides.length]);

  const formatPrice = (price: number) => {
    return price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const currentSlideData = slides[currentSlide];

  return (
    <section id="home" className="relative min-h-screen overflow-hidden bg-gradient-to-br from-standbyte-white via-blue-50/30 to-red-50/20">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-standbyte-blue to-transparent rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-standbyte-red to-transparent rounded-full blur-3xl transform translate-x-1/2 translate-y-1/2"></div>
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-3 h-3 bg-standbyte-blue/20 rounded-full animate-float"></div>
        <div className="absolute top-40 right-20 w-2 h-2 bg-standbyte-red/30 rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-32 left-20 w-4 h-4 bg-standbyte-blue/15 rounded-full animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-20 right-32 w-2 h-2 bg-standbyte-red/25 rounded-full animate-float" style={{ animationDelay: '3s' }}></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        
        {/* Navigation Controls */}
        <div className="absolute top-1/2 left-4 right-4 flex justify-between items-center z-10 pointer-events-none">
          <button 
            onClick={prevSlide}
            className="group w-14 h-14 bg-white/80 backdrop-blur-sm hover:bg-white rounded-full flex items-center justify-center shadow-xl hover:shadow-2xl transition-all duration-300 pointer-events-auto border border-white/20 hover:scale-110"
          >
            <ChevronLeft className="w-6 h-6 text-standbyte-blue group-hover:text-standbyte-red transition-colors" />
          </button>
          <button 
            onClick={nextSlide}
            className="group w-14 h-14 bg-white/80 backdrop-blur-sm hover:bg-white rounded-full flex items-center justify-center shadow-xl hover:shadow-2xl transition-all duration-300 pointer-events-auto border border-white/20 hover:scale-110"
          >
            <ChevronRight className="w-6 h-6 text-standbyte-blue group-hover:text-standbyte-red transition-colors" />
          </button>
        </div>

        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-10">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-3 rounded-full transition-all duration-300 ${
                index === currentSlide 
                  ? 'bg-gradient-to-r from-standbyte-blue to-standbyte-red w-10 shadow-lg' 
                  : 'bg-white/40 backdrop-blur-sm w-3 hover:bg-white/60 hover:w-6'
              }`}
            />
          ))}
        </div>

        {/* Content */}
        <div className="grid lg:grid-cols-2 gap-16 items-center min-h-[700px] relative z-10">
          
          {/* Certification Content */}
          {currentSlideData.type === 'service' && (
            <>
              {/* Content Section */}
              <div className="space-y-8 animate-fade-in">
                {/* Badge de Novidade */}
                <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-standbyte-red/10 to-red-100/50 border border-standbyte-red/20 backdrop-blur-sm">
                  <Star className="w-5 h-5 text-standbyte-red mr-3 animate-pulse-custom" />
                  <span className="text-standbyte-red text-sm font-bold tracking-wide">EXCLUSIVO E INÉDITO NA REGIÃO</span>
                </div>
                
                {/* Main Title */}
                <div className="space-y-6">
                  <h1 className="text-5xl lg:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-standbyte-blue via-blue-700 to-standbyte-blue leading-tight animate-slide-in-left">
                    Maximize o Desempenho
                  </h1>
                  <h2 className="text-4xl lg:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-standbyte-red via-red-600 to-standbyte-red leading-tight animate-slide-in-right">
                    Certificação Fluke DSX2-8000
                  </h2>
                </div>
                
                {/* Description */}
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-red-500/5 rounded-2xl blur-xl"></div>
                  <p className="relative text-lg text-standbyte-dark leading-relaxed bg-white/60 backdrop-blur-sm p-6 rounded-2xl border border-white/30 shadow-lg">
                    <strong className="text-standbyte-blue">Garanta a máxima performance, segurança e confiabilidade para sua infraestrutura de rede!</strong> 
                    Utilizamos o <span className="text-standbyte-red font-bold">Fluke DSX2-8000 CableAnalyzer™</span>, 
                    o padrão ouro mundial em testes de precisão para cabeamento estruturado.
                  </p>
                </div>

                {/* Key Benefits */}
                <div className="space-y-4">
                  {[
                    "Certificação completa Cat5e, Cat6, Cat6A, Cat7, Cat7A, Cat8 e fibra óptica",
                    "Conformidade total com normas internacionais TIA e ISO/IEC", 
                    "Relatórios técnicos detalhados para auditorias e validação"
                  ].map((benefit, index) => (
                    <div key={index} className="flex items-start space-x-4 group">
                      <div className="w-6 h-6 bg-gradient-to-r from-standbyte-red to-red-600 rounded-full flex items-center justify-center mt-1 group-hover:scale-110 transition-transform">
                        <CheckCircle className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-standbyte-dark font-medium group-hover:text-standbyte-blue transition-colors">{benefit}</span>
                    </div>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <a 
                    href="#services" 
                    className="group inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-standbyte-red to-red-600 text-white font-bold rounded-xl hover:from-red-600 hover:to-red-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
                  >
                    Solicitar Certificação
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </a>
                  
                  <button className="group inline-flex items-center justify-center px-8 py-4 bg-white/80 backdrop-blur-sm border-2 border-standbyte-blue text-standbyte-blue font-bold rounded-xl hover:bg-standbyte-blue hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105">
                    <FileCheck className="mr-2 w-5 h-5 group-hover:scale-110 transition-transform" />
                    Saiba Mais
                  </button>
                </div>
              </div>

              {/* Visual Section */}
              <div className="relative animate-fade-in-scale">
                <div className="relative bg-white/40 backdrop-blur-sm rounded-3xl p-8 border border-white/30 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105">
                  {/* Glow Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-standbyte-blue/20 to-standbyte-red/20 rounded-3xl blur-xl opacity-50"></div>
                  
                  {/* Fluke Certification Highlight */}
                  <div className="relative bg-gradient-to-r from-standbyte-blue via-blue-700 to-standbyte-blue p-6 rounded-2xl mb-6 shadow-lg">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                        <Award className="w-5 h-5 text-white" />
                      </div>
                      <span className="text-white font-black text-xl">Fluke DSX2-8000</span>
                    </div>
                    <div className="text-white/90 text-sm mb-3 font-medium">CableAnalyzer™ - Padrão Ouro Mundial</div>
                    <div className="flex items-center space-x-2">
                      <Star className="w-4 h-4 text-yellow-400 animate-pulse" />
                      <span className="text-white text-sm font-bold">EXCLUSIVO NA REGIÃO</span>
                    </div>
                  </div>
                  
                  {/* Service Tags */}
                  <div className="relative grid grid-cols-2 gap-4">
                    {[
                      { icon: Award, text: "Fluke DSX2-8000", color: "from-standbyte-blue to-blue-700" },
                      { icon: Shield, text: "Normas TIA/ISO", color: "from-standbyte-red to-red-600" },
                      { icon: Zap, text: "Até 40+ Gbps", color: "from-standbyte-blue to-blue-700" },
                      { icon: Target, text: "Precisão Total", color: "from-standbyte-red to-red-600" }
                    ].map((service, index) => (
                      <div 
                        key={index} 
                        className="group flex flex-col items-center p-4 rounded-xl bg-white/60 backdrop-blur-sm border border-white/30 text-center hover:bg-white/80 transition-all duration-300 hover:scale-105 hover:shadow-lg"
                      >
                        <div className={`w-10 h-10 bg-gradient-to-r ${service.color} rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform shadow-lg`}>
                          <service.icon className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-standbyte-dark text-sm font-bold group-hover:text-standbyte-blue transition-colors">{service.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Product Content */}
          {currentSlideData.type === 'product' && typeof currentSlideData.content === 'object' && (
            <>
              {/* Product Info Section */}
              <div className="space-y-8 animate-fade-in">
                {/* Product Badge */}
                <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-standbyte-blue/10 to-blue-100/50 border border-standbyte-blue/20 backdrop-blur-sm">
                  <Star className="w-5 h-5 text-standbyte-blue mr-3 animate-pulse-custom" />
                  <span className="text-standbyte-blue text-sm font-bold tracking-wide">PRODUTO EM DESTAQUE</span>
                </div>
                
                {/* Product Title */}
                <div className="space-y-4">
                  <div className="text-standbyte-mid font-bold text-lg">{currentSlideData.content.brand}</div>
                  <h1 className="text-5xl lg:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-standbyte-blue via-blue-700 to-standbyte-blue leading-tight animate-slide-in-left">
                    {currentSlideData.content.name}
                  </h1>
                  <div className="text-xl text-transparent bg-clip-text bg-gradient-to-r from-standbyte-red to-red-600 font-bold">
                    {currentSlideData.content.category}
                  </div>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-4 bg-white/60 backdrop-blur-sm p-4 rounded-xl border border-white/30">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-6 h-6 ${
                          i < Math.floor(currentSlideData.content.rating) 
                            ? "fill-yellow-400 text-yellow-400" 
                            : "text-standbyte-light"
                        }`} 
                      />
                    ))}
                  </div>
                  <span className="text-standbyte-dark font-bold text-lg">
                    {currentSlideData.content.rating} • Avaliação dos clientes
                  </span>
                </div>

                {/* Specs */}
                <div className="space-y-4">
                  <h3 className="text-standbyte-dark font-black text-xl">Especificações:</h3>
                  <div className="space-y-3">
                    {currentSlideData.content.specs.map((spec, index) => (
                      <div key={index} className="group flex items-center gap-4 bg-white/40 backdrop-blur-sm p-3 rounded-lg border border-white/30 hover:bg-white/60 transition-all">
                        <div className="w-6 h-6 bg-gradient-to-r from-standbyte-blue to-blue-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                          <CheckCircle className="w-4 h-4 text-white" />
                        </div>
                        <span className="text-standbyte-dark font-medium group-hover:text-standbyte-blue transition-colors">{spec}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Price */}
                <div className="space-y-3 bg-white/60 backdrop-blur-sm p-6 rounded-2xl border border-white/30">
                  <div className="flex items-center gap-4">
                    <span className="text-standbyte-mid line-through text-xl font-medium">
                      {formatPrice(currentSlideData.content.originalPrice)}
                    </span>
                    <span className="bg-gradient-to-r from-standbyte-red to-red-600 text-white px-4 py-2 rounded-full text-sm font-black shadow-lg">
                      -{currentSlideData.content.discount}%
                    </span>
                  </div>
                  <div className="text-5xl lg:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-standbyte-blue to-blue-700">
                    {formatPrice(currentSlideData.content.salePrice)}
                  </div>
                  <div className="text-standbyte-mid font-medium text-lg">
                    ou 12x de {formatPrice(currentSlideData.content.salePrice / 12)} sem juros
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <Button className="group bg-gradient-to-r from-standbyte-red to-red-600 hover:from-red-600 hover:to-red-700 text-white px-8 py-4 text-lg font-bold rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
                    <ShoppingCart className="mr-2 w-5 h-5 group-hover:scale-110 transition-transform" />
                    Comprar Agora
                  </Button>
                  
                  <Button variant="outline" className="group border-2 border-standbyte-blue text-standbyte-blue hover:bg-standbyte-blue hover:text-white px-8 py-4 text-lg font-bold rounded-xl bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
                    <Heart className="mr-2 w-5 h-5 group-hover:scale-110 transition-transform" />
                    Adicionar aos Favoritos
                  </Button>
                </div>
              </div>

              {/* Product Image Section */}
              <div className="relative animate-fade-in-scale">
                <div className="relative bg-white/40 backdrop-blur-sm rounded-3xl p-8 border border-white/30 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105">
                  {/* Glow Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-standbyte-blue/20 to-standbyte-red/20 rounded-3xl blur-xl opacity-50"></div>
                  
                  {/* Product Image */}
                  <div className="relative h-96 bg-gradient-to-br from-white to-gray-50 rounded-2xl overflow-hidden mb-6 shadow-lg group">
                    <img 
                      src={currentSlideData.content.image} 
                      alt={currentSlideData.content.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    {/* Discount Badge */}
                    <div className="absolute top-4 left-4">
                      <span className="bg-gradient-to-r from-standbyte-red to-red-600 text-white px-4 py-2 rounded-full text-sm font-black shadow-lg">
                        -{currentSlideData.content.discount}%
                      </span>
                    </div>
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </div>

                  {/* Product Features */}
                  <div className="relative grid grid-cols-2 gap-4">
                    {[
                      { icon: Zap, text: "Alta Performance", color: "from-standbyte-blue to-blue-700" },
                      { icon: Shield, text: "Garantia", color: "from-standbyte-red to-red-600" },
                      { icon: Star, text: "Bem Avaliado", color: "from-standbyte-blue to-blue-700" },
                      { icon: Target, text: "Oferta Especial", color: "from-standbyte-red to-red-600" }
                    ].map((feature, index) => (
                      <div 
                        key={index} 
                        className="group flex flex-col items-center p-4 rounded-xl bg-white/60 backdrop-blur-sm border border-white/30 text-center hover:bg-white/80 transition-all duration-300 hover:scale-105 hover:shadow-lg"
                      >
                        <div className={`w-10 h-10 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform shadow-lg`}>
                          <feature.icon className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-standbyte-dark text-sm font-bold group-hover:text-standbyte-blue transition-colors">{feature.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default Hero;
