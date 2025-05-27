
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ShoppingCart, Heart, Star, Truck, Shield, ArrowLeft, Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import HeaderWithAuth from "@/components/HeaderWithAuth";
import Footer from "@/components/Footer";
import { getProductBySlug } from "@/data/products";

const ProdutoIndividual = () => {
  const { slug } = useParams<{ slug: string }>();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const product = slug ? getProductBySlug(slug) : null;
  if (!product) {
    return (
      <div className="min-h-screen bg-standbyte-white">
        <HeaderWithAuth />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h1 className="text-3xl font-bold text-standbyte-dark mb-4">Produto não encontrado</h1>
          <Link to="/produtos" className="text-standbyte-blue hover:underline">
            Voltar para produtos
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const formatPrice = (price: number) => {
    return price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  const handleQuantityChange = (type: 'increase' | 'decrease') => {
    if (type === 'increase') {
      setQuantity(prev => prev + 1);
    } else if (type === 'decrease' && quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };
  return (
    <div className="min-h-screen bg-standbyte-white">
      <HeaderWithAuth />
      
      <main className="pt-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 mb-8 text-sm">
            <Link to="/" className="text-standbyte-mid hover:text-standbyte-blue">Home</Link>
            <span className="text-standbyte-mid">/</span>
            <Link to="/produtos" className="text-standbyte-mid hover:text-standbyte-blue">Produtos</Link>
            <span className="text-standbyte-mid">/</span>
            <span className="text-standbyte-dark">{product.name}</span>
          </div>

          {/* Back Button */}
          <Link 
            to="/produtos" 
            className="inline-flex items-center gap-2 text-standbyte-blue hover:text-blue-700 mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar para Produtos
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Product Images */}
            <div className="space-y-4">
              <div className="aspect-square bg-standbyte-light rounded-lg overflow-hidden">
                <img 
                  src={product.gallery[selectedImage]} 
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {product.gallery.length > 1 && (
                <div className="flex gap-3">
                  {product.gallery.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`w-20 h-20 rounded-lg overflow-hidden border-2 ${
                        selectedImage === index ? 'border-standbyte-blue' : 'border-standbyte-light'
                      }`}
                    >
                      <img 
                        src={image} 
                        alt={`${product.name} ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-standbyte-mid">{product.brand}</span>
                  <span className="text-xs bg-standbyte-light text-standbyte-dark px-2 py-1 rounded">
                    {product.category}
                  </span>
                </div>
                <h1 className="text-3xl font-bold text-standbyte-dark mb-4">
                  {product.name}
                </h1>

                {/* Rating */}
                <div className="flex items-center gap-3 mb-4">
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
                  <span className="text-standbyte-mid">
                    {product.rating} ({product.reviews} avaliações)
                  </span>
                </div>
              </div>

              {/* Price */}
              <div className="border-t border-standbyte-light pt-6">
                {product.isOnSale && (
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-lg text-standbyte-mid line-through">
                      {formatPrice(product.originalPrice)}
                    </span>
                    <span className="bg-standbyte-red text-standbyte-white px-2 py-1 text-sm font-bold rounded">
                      -{product.discount}%
                    </span>
                  </div>
                )}
                <div className="text-4xl font-bold text-standbyte-blue mb-2">
                  {formatPrice(product.salePrice)}
                </div>
                <div className="text-standbyte-mid">
                  ou 12x de {formatPrice(product.salePrice / 12)} sem juros
                </div>
              </div>

              {/* Quantity and Add to Cart */}
              <div className="border-t border-standbyte-light pt-6">
                <div className="flex items-center gap-4 mb-6">
                  <span className="font-medium text-standbyte-dark">Quantidade:</span>
                  <div className="flex items-center border border-standbyte-light rounded-lg">
                    <button 
                      onClick={() => handleQuantityChange('decrease')}
                      className="p-2 hover:bg-standbyte-light"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="px-4 py-2 font-medium">{quantity}</span>
                    <button 
                      onClick={() => handleQuantityChange('increase')}
                      className="p-2 hover:bg-standbyte-light"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button 
                    size="lg" 
                    className="flex-1 bg-standbyte-blue hover:bg-blue-800 text-standbyte-white"
                  >
                    <ShoppingCart className="w-5 h-5 mr-2" />
                    Adicionar ao Carrinho
                  </Button>
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="border-standbyte-blue text-standbyte-blue hover:bg-standbyte-blue hover:text-standbyte-white"
                  >
                    <Heart className="w-5 h-5" />
                  </Button>
                </div>
              </div>

              {/* Benefits */}
              <div className="border-t border-standbyte-light pt-6">
                <div className="grid grid-cols-1 gap-3">
                  {product.isFreeShipping && (
                    <div className="flex items-center gap-3">
                      <Truck className="w-5 h-5 text-green-600" />
                      <span className="text-standbyte-dark">Frete Grátis</span>
                    </div>
                  )}
                  <div className="flex items-center gap-3">
                    <Shield className="w-5 h-5 text-standbyte-blue" />
                    <span className="text-standbyte-dark">Garantia de {product.warranty}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Product Details */}
          <div className="mt-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Description */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-standbyte-dark mb-4">Descrição</h3>
                  <p className="text-standbyte-mid leading-relaxed">{product.description}</p>
                </CardContent>
              </Card>

              {/* Specifications */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-standbyte-dark mb-4">Especificações</h3>
                  <div className="space-y-3">
                    {Object.entries(product.fullSpecs).map(([key, value], index) => (
                      <div key={index} className="flex justify-between border-b border-standbyte-light pb-2">
                        <span className="font-medium text-standbyte-dark capitalize">
                          {key.replace(/([A-Z])/g, ' $1').trim()}:
                        </span>
                        <span className="text-standbyte-mid text-right">{value}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProdutoIndividual;
