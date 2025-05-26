
import { Star, CheckCircle, ShoppingCart, Heart, Zap, Shield, Target } from "lucide-react";
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

interface ProductSlideProps {
  product: Product;
}

const ProductSlide = ({ product }: ProductSlideProps) => {
  const formatPrice = (price: number) => {
    return price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  return (
    <>
      {/* Product Info */}
      <div className="space-y-6 animate-fade-in">
        {/* Badge */}
        <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-standbyte-blue/10 to-blue-100/50 border border-standbyte-blue/20">
          <Star className="w-4 h-4 text-standbyte-blue mr-2 animate-pulse-custom" />
          <span className="text-standbyte-blue text-sm font-bold">PRODUTO EM DESTAQUE</span>
        </div>
        
        {/* Title */}
        <div className="space-y-3">
          <div className="text-standbyte-mid font-bold">{product.brand}</div>
          <h1 className="text-4xl lg:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-standbyte-blue to-blue-700 leading-tight">
            {product.name}
          </h1>
          <div className="text-lg text-standbyte-red font-bold">{product.category}</div>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-3 bg-white/60 backdrop-blur-sm p-3 rounded-lg border border-white/30">
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
          <span className="text-standbyte-dark font-bold text-sm">
            {product.rating} • Avaliação dos clientes
          </span>
        </div>

        {/* Key Specs */}
        <div className="space-y-2">
          {product.specs.slice(0, 2).map((spec, index) => (
            <div key={index} className="flex items-center gap-3 bg-white/40 backdrop-blur-sm p-2 rounded-lg">
              <CheckCircle className="w-4 h-4 text-standbyte-blue" />
              <span className="text-standbyte-dark text-sm font-medium">{spec}</span>
            </div>
          ))}
        </div>

        {/* Price */}
        <div className="bg-white/60 backdrop-blur-sm p-4 rounded-xl border border-white/30">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-standbyte-mid line-through text-lg">
              {formatPrice(product.originalPrice)}
            </span>
            <span className="bg-gradient-to-r from-standbyte-red to-red-600 text-white px-3 py-1 rounded-full text-sm font-black">
              -{product.discount}%
            </span>
          </div>
          <div className="text-3xl lg:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-standbyte-blue to-blue-700">
            {formatPrice(product.salePrice)}
          </div>
          <div className="text-standbyte-mid text-sm">
            ou 12x de {formatPrice(product.salePrice / 12)}
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Button className="bg-gradient-to-r from-standbyte-red to-red-600 hover:from-red-600 hover:to-red-700 text-white px-6 py-3 font-bold rounded-lg shadow-lg">
            <ShoppingCart className="mr-2 w-4 h-4" />
            Comprar Agora
          </Button>
          
          <Button variant="outline" className="border-2 border-standbyte-blue text-standbyte-blue hover:bg-standbyte-blue hover:text-white px-6 py-3 font-bold rounded-lg bg-white/80">
            <Heart className="mr-2 w-4 h-4" />
            Favoritos
          </Button>
        </div>
      </div>

      {/* Product Image */}
      <div className="relative animate-fade-in-scale">
        <div className="bg-white/40 backdrop-blur-sm rounded-2xl p-6 border border-white/30 shadow-xl">
          {/* Image */}
          <div className="relative h-64 bg-gradient-to-br from-white to-gray-50 rounded-xl overflow-hidden mb-4">
            <img 
              src={product.image} 
              alt={product.name}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute top-3 left-3">
              <span className="bg-gradient-to-r from-standbyte-red to-red-600 text-white px-3 py-1 rounded-full text-sm font-black">
                -{product.discount}%
              </span>
            </div>
          </div>

          {/* Features */}
          <div className="grid grid-cols-2 gap-3">
            {[
              { icon: Zap, text: "Alta Performance", color: "from-standbyte-blue to-blue-700" },
              { icon: Shield, text: "Garantia", color: "from-standbyte-red to-red-600" },
              { icon: Star, text: "Bem Avaliado", color: "from-standbyte-blue to-blue-700" },
              { icon: Target, text: "Oferta Especial", color: "from-standbyte-red to-red-600" }
            ].map((feature, index) => (
              <div 
                key={index} 
                className="flex flex-col items-center p-3 rounded-lg bg-white/60 backdrop-blur-sm border border-white/30 text-center hover:bg-white/80 transition-all duration-300"
              >
                <div className={`w-8 h-8 bg-gradient-to-r ${feature.color} rounded-lg flex items-center justify-center mb-2`}>
                  <feature.icon className="w-4 h-4 text-white" />
                </div>
                <span className="text-standbyte-dark text-xs font-bold">{feature.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductSlide;
