
import { useState } from "react";
import { ShoppingCart, Heart, Star, Filter, Grid3X3, List, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Link } from "react-router-dom";
import HeaderWithAuth from "@/components/HeaderWithAuth";
import Footer from "@/components/Footer";
import { products } from "@/data/products";

const Produtos = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedCategory, setSelectedCategory] = useState('Todos');

  const categories = [
    "Todos", "Notebooks", "PCs Gamers", "Placas de Vídeo", 
    "Processadores", "Monitores", "Armazenamento", "Periféricos"
  ];

  const formatPrice = (price: number) => {
    return price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  const filteredProducts = selectedCategory === 'Todos' 
    ? products 
    : products.filter(product => product.category === selectedCategory);
  return (
    <div className="min-h-screen bg-standbyte-white">
      <HeaderWithAuth />
      
      <main className="pt-8">
        {/* Page Header */}
        <div className="bg-standbyte-light py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl lg:text-5xl font-bold text-standbyte-blue mb-4">
                Produtos de Informática
              </h1>
              <p className="text-xl text-standbyte-mid max-w-3xl mx-auto">
                Encontre os melhores produtos de tecnologia com qualidade garantida e preços competitivos
              </p>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Filters and Controls */}
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-8">
            {/* Categories */}
            <div className="flex flex-wrap gap-3">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-2 rounded-full font-medium transition-colors ${
                    category === selectedCategory 
                      ? "bg-standbyte-blue text-standbyte-white" 
                      : "bg-standbyte-light text-standbyte-dark hover:bg-standbyte-blue hover:text-standbyte-white"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* View Controls */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded ${viewMode === 'grid' ? 'bg-standbyte-blue text-standbyte-white' : 'text-standbyte-mid'}`}
                >
                  <Grid3X3 className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded ${viewMode === 'list' ? 'bg-standbyte-blue text-standbyte-white' : 'text-standbyte-mid'}`}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>

              <button className="flex items-center gap-2 px-4 py-2 border border-standbyte-light rounded-lg text-standbyte-dark hover:border-standbyte-blue">
                <Filter className="w-4 h-4" />
                Filtros
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Products Grid */}
          <div className={`grid gap-8 mb-12 ${
            viewMode === 'grid' 
              ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
              : 'grid-cols-1'
          }`}>
            {filteredProducts.map((product) => (
              <Card key={product.id} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-standbyte-light">
                <CardHeader className="p-0 relative overflow-hidden">
                  <Link to={`/produto/${product.slug}`}>
                    <div className="relative h-48 bg-standbyte-light">
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      
                      {product.isOnSale && (
                        <span className="absolute top-3 left-3 bg-standbyte-red text-standbyte-white px-3 py-1 text-sm font-bold rounded">
                          -{product.discount}%
                        </span>
                      )}

                      <button className="absolute top-3 right-3 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors">
                        <Heart className="w-4 h-4 text-standbyte-mid hover:text-standbyte-red" />
                      </button>
                    </div>
                  </Link>
                </CardHeader>

                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-standbyte-mid font-medium">{product.brand}</span>
                    <span className="text-xs bg-standbyte-light text-standbyte-dark px-2 py-1 rounded">
                      {product.category}
                    </span>
                  </div>

                  <Link to={`/produto/${product.slug}`}>
                    <h3 className="text-lg font-bold text-standbyte-dark mb-3 line-clamp-2 hover:text-standbyte-blue transition-colors">
                      {product.name}
                    </h3>
                  </Link>

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

                  <div className="flex gap-3">
                    <Button className="flex-1 bg-standbyte-blue hover:bg-blue-800 text-standbyte-white">
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      Comprar
                    </Button>
                    <Link to={`/produto/${product.slug}`}>
                      <Button variant="outline" className="border-standbyte-blue text-standbyte-blue hover:bg-standbyte-blue hover:text-standbyte-white">
                        Ver Mais
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Load More */}
          <div className="text-center">
            <Button 
              size="lg" 
              className="bg-standbyte-red hover:bg-red-700 text-standbyte-white px-12 py-4"
            >
              Carregar Mais Produtos
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Produtos;
