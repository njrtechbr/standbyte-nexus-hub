
import { ArrowRight, CheckCircle, Star, Zap, Target, FileCheck, Award, Shield, ShoppingCart, Heart, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const featuredProducts = [
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

  const slides = [
    {
      type: 'service',
      content: 'certification'
    },
    ...featuredProducts.map(product => ({
      type: 'product',
      content: product
    }))
  ];

  // Auto-rotate slides
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 8000); // 8 segundos por slide

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
    <section id="home" className="pt-16 py-24 bg-standbyte-white relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation Controls */}
        <div className="absolute top-1/2 left-4 right-4 flex justify-between items-center z-10 pointer-events-none">
          <button 
            onClick={prevSlide}
            className="w-12 h-12 bg-standbyte-white/90 hover:bg-standbyte-white rounded-full flex items-center justify-center shadow-lg transition-all pointer-events-auto"
          >
            <ChevronLeft className="w-6 h-6 text-standbyte-blue" />
          </button>
          <button 
            onClick={nextSlide}
            className="w-12 h-12 bg-standbyte-white/90 hover:bg-standbyte-white rounded-full flex items-center justify-center shadow-lg transition-all pointer-events-auto"
          >
            <ChevronRight className="w-6 h-6 text-standbyte-blue" />
          </button>
        </div>

        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentSlide 
                  ? 'bg-standbyte-red w-8' 
                  : 'bg-standbyte-light hover:bg-standbyte-mid'
              }`}
            />
          ))}
        </div>

        {/* Content */}
        <div className="grid lg:grid-cols-2 gap-16 items-center min-h-[600px]">
          
          {/* Certification Content */}
          {currentSlideData.type === 'service' && (
            <>
              {/* Content Section */}
              <div className="space-y-8 animate-fade-in">
                {/* Badge de Novidade */}
                <div className="inline-flex items-center px-4 py-2 rounded-full bg-standbyte-red/10 border border-standbyte-red/20">
                  <Star className="w-4 h-4 text-standbyte-red mr-2" />
                  <span className="text-standbyte-red text-sm font-semibold">EXCLUSIVO E INÉDITO NA REGIÃO</span>
                </div>
                
                {/* Main Title */}
                <div className="space-y-4">
                  <h1 className="text-4xl lg:text-5xl font-bold text-standbyte-blue leading-tight">
                    Maximize o Desempenho e a Confiabilidade da Sua Rede
                  </h1>
                  <h2 className="text-3xl lg:text-4xl font-bold text-standbyte-red leading-tight">
                    Certificação Profissional Fluke DSX2-8000
                  </h2>
                </div>
                
                {/* Description */}
                <p className="text-lg text-standbyte-dark leading-relaxed">
                  <strong>Garanta a máxima performance, segurança e confiabilidade para sua infraestrutura de rede!</strong> 
                  Utilizamos o <span className="text-standbyte-blue font-semibold">Fluke DSX2-8000 CableAnalyzer™</span>, 
                  o padrão ouro mundial em testes de precisão para cabeamento estruturado.
                </p>

                {/* Key Benefits */}
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-standbyte-red mt-1 flex-shrink-0" />
                    <span className="text-standbyte-dark">Certificação completa Cat5e, Cat6, Cat6A, Cat7, Cat7A, Cat8 e fibra óptica</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-standbyte-red mt-1 flex-shrink-0" />
                    <span className="text-standbyte-dark">Conformidade total com normas internacionais TIA e ISO/IEC</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-standbyte-red mt-1 flex-shrink-0" />
                    <span className="text-standbyte-dark">Relatórios técnicos detalhados para auditorias e validação</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <a 
                    href="#services" 
                    className="inline-flex items-center justify-center px-8 py-4 bg-standbyte-red text-standbyte-white font-semibold rounded-lg hover:bg-red-700 transition-colors"
                  >
                    Solicitar Certificação
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </a>
                  
                  <button className="inline-flex items-center justify-center px-8 py-4 border-2 border-standbyte-blue text-standbyte-blue font-semibold rounded-lg hover:bg-standbyte-blue hover:text-standbyte-white transition-colors">
                    <FileCheck className="mr-2 w-5 h-5" />
                    Saiba Mais
                  </button>
                </div>
              </div>

              {/* Visual Section */}
              <div className="relative animate-fade-in">
                <div className="bg-standbyte-light rounded-2xl p-8 border border-standbyte-mid/20">
                  {/* Fluke Certification Highlight */}
                  <div className="bg-gradient-to-r from-standbyte-blue to-blue-800 p-6 rounded-xl mb-6">
                    <div className="flex items-center space-x-3 mb-3">
                      <Award className="w-6 h-6 text-standbyte-white" />
                      <span className="text-standbyte-white font-bold text-lg">Fluke DSX2-8000</span>
                    </div>
                    <div className="text-standbyte-white/90 text-sm mb-3">CableAnalyzer™ - Padrão Ouro Mundial</div>
                    <div className="flex items-center space-x-2">
                      <Star className="w-4 h-4 text-yellow-400" />
                      <span className="text-standbyte-white text-sm font-semibold">EXCLUSIVO NA REGIÃO</span>
                    </div>
                  </div>
                  
                  {/* Service Tags */}
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { icon: Award, text: "Fluke DSX2-8000", color: "bg-standbyte-blue" },
                      { icon: Shield, text: "Normas TIA/ISO", color: "bg-standbyte-red" },
                      { icon: Zap, text: "Até 40+ Gbps", color: "bg-standbyte-blue" },
                      { icon: Target, text: "Precisão Total", color: "bg-standbyte-red" }
                    ].map((service, index) => (
                      <div 
                        key={index} 
                        className="flex flex-col items-center p-3 rounded-lg bg-standbyte-white border border-standbyte-mid/20 text-center"
                      >
                        <div className={`w-8 h-8 ${service.color} rounded-lg flex items-center justify-center mb-2`}>
                          <service.icon className="w-4 h-4 text-standbyte-white" />
                        </div>
                        <span className="text-standbyte-dark text-xs font-medium">{service.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Product Content */}
          {currentSlideData.type === 'product' && (
            <>
              {/* Product Info Section */}
              <div className="space-y-8 animate-fade-in">
                {/* Product Badge */}
                <div className="inline-flex items-center px-4 py-2 rounded-full bg-standbyte-blue/10 border border-standbyte-blue/20">
                  <Star className="w-4 h-4 text-standbyte-blue mr-2" />
                  <span className="text-standbyte-blue text-sm font-semibold">PRODUTO EM DESTAQUE</span>
                </div>
                
                {/* Product Title */}
                <div className="space-y-4">
                  <div className="text-standbyte-mid font-medium">{currentSlideData.content.brand}</div>
                  <h1 className="text-4xl lg:text-5xl font-bold text-standbyte-blue leading-tight">
                    {currentSlideData.content.name}
                  </h1>
                  <div className="text-lg text-standbyte-red font-semibold">
                    {currentSlideData.content.category}
                  </div>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-3">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-5 h-5 ${
                          i < Math.floor(currentSlideData.content.rating) 
                            ? "fill-yellow-400 text-yellow-400" 
                            : "text-standbyte-light"
                        }`} 
                      />
                    ))}
                  </div>
                  <span className="text-standbyte-dark font-medium">
                    {currentSlideData.content.rating} • Avaliação dos clientes
                  </span>
                </div>

                {/* Specs */}
                <div className="space-y-3">
                  <h3 className="text-standbyte-dark font-bold text-lg">Especificações:</h3>
                  <div className="space-y-2">
                    {currentSlideData.content.specs.map((spec, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-standbyte-blue flex-shrink-0" />
                        <span className="text-standbyte-dark">{spec}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Price */}
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <span className="text-standbyte-mid line-through text-lg">
                      {formatPrice(currentSlideData.content.originalPrice)}
                    </span>
                    <span className="bg-standbyte-red text-standbyte-white px-3 py-1 rounded-full text-sm font-bold">
                      -{currentSlideData.content.discount}%
                    </span>
                  </div>
                  <div className="text-4xl lg:text-5xl font-bold text-standbyte-blue">
                    {formatPrice(currentSlideData.content.salePrice)}
                  </div>
                  <div className="text-standbyte-mid">
                    ou 12x de {formatPrice(currentSlideData.content.salePrice / 12)} sem juros
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button className="bg-standbyte-red hover:bg-red-700 text-standbyte-white px-8 py-4 text-lg">
                    <ShoppingCart className="mr-2 w-5 h-5" />
                    Comprar Agora
                  </Button>
                  
                  <Button variant="outline" className="border-2 border-standbyte-blue text-standbyte-blue hover:bg-standbyte-blue hover:text-standbyte-white px-8 py-4 text-lg">
                    <Heart className="mr-2 w-5 h-5" />
                    Adicionar aos Favoritos
                  </Button>
                </div>
              </div>

              {/* Product Image Section */}
              <div className="relative animate-fade-in">
                <div className="bg-standbyte-light rounded-2xl p-8 border border-standbyte-mid/20">
                  {/* Product Image */}
                  <div className="relative h-96 bg-standbyte-white rounded-xl overflow-hidden mb-6">
                    <img 
                      src={currentSlideData.content.image} 
                      alt={currentSlideData.content.name}
                      className="w-full h-full object-cover"
                    />
                    {/* Discount Badge */}
                    <div className="absolute top-4 left-4">
                      <span className="bg-standbyte-red text-standbyte-white px-3 py-1 rounded-full text-sm font-bold">
                        -{currentSlideData.content.discount}%
                      </span>
                    </div>
                  </div>

                  {/* Product Features */}
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { icon: Zap, text: "Alta Performance", color: "bg-standbyte-blue" },
                      { icon: Shield, text: "Garantia", color: "bg-standbyte-red" },
                      { icon: Star, text: "Bem Avaliado", color: "bg-standbyte-blue" },
                      { icon: Target, text: "Oferta Especial", color: "bg-standbyte-red" }
                    ].map((feature, index) => (
                      <div 
                        key={index} 
                        className="flex flex-col items-center p-3 rounded-lg bg-standbyte-white border border-standbyte-mid/20 text-center"
                      >
                        <div className={`w-8 h-8 ${feature.color} rounded-lg flex items-center justify-center mb-2`}>
                          <feature.icon className="w-4 h-4 text-standbyte-white" />
                        </div>
                        <span className="text-standbyte-dark text-xs font-medium">{feature.text}</span>
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
