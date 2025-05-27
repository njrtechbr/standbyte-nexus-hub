
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
    <>      {/* Product Info */}
      <div className="space-y-6 animate-fade-in">
        {/* Badge */}
        <div className="inline-flex items-center px-4 py-2 rounded-full bg-standbyte-blue/10 border border-standbyte-blue/20 shadow-sm">
          <Star className="w-4 h-4 text-standbyte-blue mr-2 animate-pulse-custom" />
          <span className="text-standbyte-blue text-xs font-bold tracking-wide">PRODUTO EM DESTAQUE</span>
        </div>
        
        {/* Title */}
        <div className="space-y-3">
          <div className="text-standbyte-mid font-bold text-base">{product.brand}</div>
          <h1 className="text-2xl lg:text-3xl font-black text-standbyte-blue leading-tight">
            {product.name}
          </h1>
          <div className="text-base text-standbyte-red font-bold">{product.category}</div>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-3 bg-standbyte-white p-3 rounded-lg border border-standbyte-light shadow-sm">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i}                className={`w-4 h-4 ${
                  i < Math.floor(product.rating) 
                    ? "fill-yellow-400 text-yellow-400" 
                    : "text-standbyte-light"
                }`} 
              />
            ))}
          </div>
          <span className="text-standbyte-dark font-bold text-xs">
            {product.rating} • Bem Avaliado
          </span>
        </div>

        {/* Key Specs */}
        <div className="space-y-2">
          {product.specs.slice(0, 2).map((spec, index) => (
            <div key={index} className="flex items-center gap-3 bg-standbyte-white/80 p-2 rounded-lg border border-standbyte-light/50">
              <CheckCircle className="w-4 h-4 text-standbyte-blue" />
              <span className="text-standbyte-dark text-sm font-medium">{spec}</span>
            </div>
          ))}
        </div>

        {/* Price */}
        <div className="bg-standbyte-white p-4 rounded-xl border border-standbyte-light shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-standbyte-mid line-through text-base">
              {formatPrice(product.originalPrice)}
            </span>
            <span className="bg-standbyte-red text-standbyte-white px-3 py-1 rounded-full text-xs font-black">
              -{product.discount}%            </span>
          </div>
          <div className="text-2xl lg:text-3xl font-black text-standbyte-blue mb-1">
            {formatPrice(product.salePrice)}
          </div>
          <div className="text-standbyte-mid text-xs">
            ou 12x de {formatPrice(product.salePrice / 12)}
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <Button className="bg-standbyte-red hover:bg-standbyte-red/90 text-standbyte-white px-6 py-3 font-bold rounded-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 text-sm">
            <ShoppingCart className="mr-2 w-4 h-4" />
            Comprar Agora
          </Button>
          
          <Button variant="outline" className="border-2 border-standbyte-blue text-standbyte-blue hover:bg-standbyte-blue hover:text-standbyte-white px-6 py-3 font-bold rounded-lg bg-standbyte-white transition-all duration-300 text-sm">
            <Heart className="mr-2 w-4 h-4" />
            Favoritos
          </Button>
        </div>
      </div>      {/* Product Image */}
      <div className="relative animate-fade-in-scale">
        <div className="bg-standbyte-white rounded-xl p-6 border border-standbyte-light shadow-xl">
          {/* Image */}
          <div className="relative h-48 bg-gradient-to-br from-standbyte-light to-standbyte-white rounded-lg overflow-hidden mb-4">
            <img 
              src={product.image} 
              alt={product.name}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute top-3 left-3">
              <span className="bg-standbyte-red text-standbyte-white px-3 py-1 rounded-full text-xs font-black">
                -{product.discount}%
              </span>
            </div>
          </div>

          {/* Features */}
          <div className="grid grid-cols-2 gap-3">
            {[
              { icon: Zap, text: "Alta Performance", color: "standbyte-blue" },
              { icon: Shield, text: "Garantia", color: "standbyte-red" },
              { icon: Star, text: "Bem Avaliado", color: "standbyte-blue" },
              { icon: Target, text: "Oferta Especial", color: "standbyte-red" }
            ].map((feature, index) => (
              <div 
                key={index} 
                className="flex flex-col items-center p-3 rounded-lg bg-standbyte-light/30 border border-standbyte-light text-center hover:bg-standbyte-light/50 transition-all duration-300 hover:scale-105"              >
                <div className={`w-8 h-8 bg-${feature.color} rounded-lg flex items-center justify-center mb-2`}>
                  <feature.icon className="w-4 h-4 text-standbyte-white" />
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
