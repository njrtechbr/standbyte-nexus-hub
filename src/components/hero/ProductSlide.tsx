
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
      <div className="space-y-8 animate-fade-in">
        {/* Badge */}
        <div className="inline-flex items-center px-5 py-3 rounded-full bg-standbyte-blue/10 border border-standbyte-blue/20 shadow-sm">
          <Star className="w-5 h-5 text-standbyte-blue mr-3 animate-pulse-custom" />
          <span className="text-standbyte-blue text-sm font-bold tracking-wide">PRODUTO EM DESTAQUE</span>
        </div>
        
        {/* Title */}
        <div className="space-y-4">
          <div className="text-standbyte-mid font-bold text-lg">{product.brand}</div>
          <h1 className="text-4xl lg:text-5xl font-black text-standbyte-blue leading-tight">
            {product.name}
          </h1>
          <div className="text-lg text-standbyte-red font-bold">{product.category}</div>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-4 bg-standbyte-white p-4 rounded-lg border border-standbyte-light shadow-sm">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                className={`w-5 h-5 ${
                  i < Math.floor(product.rating) 
                    ? "fill-yellow-400 text-yellow-400" 
                    : "text-standbyte-light"
                }`} 
              />
            ))}
          </div>
          <span className="text-standbyte-dark font-bold text-sm">
            {product.rating} • Bem Avaliado
          </span>
        </div>

        {/* Key Specs */}
        <div className="space-y-3">
          {product.specs.slice(0, 2).map((spec, index) => (
            <div key={index} className="flex items-center gap-4 bg-standbyte-white/80 p-3 rounded-lg border border-standbyte-light/50">
              <CheckCircle className="w-5 h-5 text-standbyte-blue" />
              <span className="text-standbyte-dark font-medium">{spec}</span>
            </div>
          ))}
        </div>

        {/* Price */}
        <div className="bg-standbyte-white p-6 rounded-xl border border-standbyte-light shadow-sm">
          <div className="flex items-center gap-4 mb-3">
            <span className="text-standbyte-mid line-through text-lg">
              {formatPrice(product.originalPrice)}
            </span>
            <span className="bg-standbyte-red text-standbyte-white px-4 py-2 rounded-full text-sm font-black">
              -{product.discount}%
            </span>
          </div>
          <div className="text-4xl lg:text-5xl font-black text-standbyte-blue mb-2">
            {formatPrice(product.salePrice)}
          </div>
          <div className="text-standbyte-mid text-sm">
            ou 12x de {formatPrice(product.salePrice / 12)}
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 pt-4">
          <Button className="bg-standbyte-red hover:bg-standbyte-red/90 text-standbyte-white px-8 py-4 font-bold rounded-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
            <ShoppingCart className="mr-2 w-5 h-5" />
            Comprar Agora
          </Button>
          
          <Button variant="outline" className="border-2 border-standbyte-blue text-standbyte-blue hover:bg-standbyte-blue hover:text-standbyte-white px-8 py-4 font-bold rounded-lg bg-standbyte-white transition-all duration-300">
            <Heart className="mr-2 w-5 h-5" />
            Favoritos
          </Button>
        </div>
      </div>

      {/* Product Image */}
      <div className="relative animate-fade-in-scale">
        <div className="bg-standbyte-white rounded-2xl p-8 border border-standbyte-light shadow-xl">
          {/* Image */}
          <div className="relative h-72 bg-gradient-to-br from-standbyte-light to-standbyte-white rounded-xl overflow-hidden mb-6">
            <img 
              src={product.image} 
              alt={product.name}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute top-4 left-4">
              <span className="bg-standbyte-red text-standbyte-white px-4 py-2 rounded-full text-sm font-black">
                -{product.discount}%
              </span>
            </div>
          </div>

          {/* Features */}
          <div className="grid grid-cols-2 gap-4">
            {[
              { icon: Zap, text: "Alta Performance", color: "standbyte-blue" },
              { icon: Shield, text: "Garantia", color: "standbyte-red" },
              { icon: Star, text: "Bem Avaliado", color: "standbyte-blue" },
              { icon: Target, text: "Oferta Especial", color: "standbyte-red" }
            ].map((feature, index) => (
              <div 
                key={index} 
                className="flex flex-col items-center p-4 rounded-lg bg-standbyte-light/30 border border-standbyte-light text-center hover:bg-standbyte-light/50 transition-all duration-300 hover:scale-105"
              >
                <div className={`w-10 h-10 bg-${feature.color} rounded-lg flex items-center justify-center mb-3`}>
                  <feature.icon className="w-5 h-5 text-standbyte-white" />
                </div>
                <span className="text-standbyte-dark text-sm font-bold">{feature.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductSlide;
