
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";
import ServiceSlide from "./hero/ServiceSlide";
import ProductSlide from "./hero/ProductSlide";

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

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 8000);

    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const currentSlideData = slides[currentSlide];

  return (
    <section id="home" className="relative min-h-screen overflow-hidden bg-gradient-to-br from-standbyte-blue via-blue-800 to-standbyte-blue">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-white to-transparent rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-standbyte-red to-transparent rounded-full blur-3xl transform translate-x-1/2 translate-y-1/2"></div>
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-3 h-3 bg-white/20 rounded-full animate-float"></div>
        <div className="absolute top-40 right-20 w-2 h-2 bg-standbyte-red/30 rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-32 left-20 w-4 h-4 bg-white/15 rounded-full animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-20 right-32 w-2 h-2 bg-standbyte-red/25 rounded-full animate-float" style={{ animationDelay: '3s' }}></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        
        {/* Navigation Controls */}
        <div className="absolute top-1/2 left-4 right-4 flex justify-between items-center z-10 pointer-events-none">
          <button 
            onClick={prevSlide}
            className="group w-12 h-12 bg-white/90 backdrop-blur-sm hover:bg-white rounded-full flex items-center justify-center shadow-xl hover:shadow-2xl transition-all duration-300 pointer-events-auto border border-white/20 hover:scale-110"
          >
            <ChevronLeft className="w-5 h-5 text-standbyte-blue group-hover:text-standbyte-red transition-colors" />
          </button>
          <button 
            onClick={nextSlide}
            className="group w-12 h-12 bg-white/90 backdrop-blur-sm hover:bg-white rounded-full flex items-center justify-center shadow-xl hover:shadow-2xl transition-all duration-300 pointer-events-auto border border-white/20 hover:scale-110"
          >
            <ChevronRight className="w-5 h-5 text-standbyte-blue group-hover:text-standbyte-red transition-colors" />
          </button>
        </div>

        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentSlide 
                  ? 'bg-gradient-to-r from-white to-standbyte-red w-8 shadow-lg' 
                  : 'bg-white/40 backdrop-blur-sm w-2 hover:bg-white/60 hover:w-4'
              }`}
            />
          ))}
        </div>

        {/* Content */}
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[600px] relative z-10">
          
          {/* Service Content */}
          {currentSlideData.type === 'service' && <ServiceSlide />}

          {/* Product Content */}
          {currentSlideData.type === 'product' && typeof currentSlideData.content === 'object' && (
            <ProductSlide product={currentSlideData.content} />
          )}
        </div>
      </div>
    </section>
  );
};

export default Hero;
