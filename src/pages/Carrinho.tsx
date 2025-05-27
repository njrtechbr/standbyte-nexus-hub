
import { useState } from "react";
import { Minus, Plus, Trash2, ShoppingCart } from "lucide-react";
import HeaderWithAuth from "@/components/HeaderWithAuth";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";

const Carrinho = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Notebook Dell Inspiron 15",
      price: 2499.99,
      quantity: 1,
      image: "/placeholder.svg"
    },
    {
      id: 2,
      name: "Mouse Logitech MX Master 3",
      price: 299.99,
      quantity: 2,
      image: "/placeholder.svg"
    }
  ]);

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    setCartItems(items =>
      items.map(item =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (id: number) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  return (
    <div className="min-h-screen bg-standbyte-light">
      <HeaderWithAuth />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center space-x-3 mb-8">
          <ShoppingCart className="w-8 h-8 text-standbyte-blue" />
          <h1 className="text-3xl font-bold text-standbyte-blue">Meu Carrinho</h1>
        </div>

        {cartItems.length === 0 ? (
          <div className="text-center py-16">
            <ShoppingCart className="w-24 h-24 text-standbyte-mid mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-standbyte-dark mb-2">Seu carrinho está vazio</h2>
            <p className="text-standbyte-mid mb-6">Adicione produtos para continuar</p>
            <Button className="bg-standbyte-blue hover:bg-blue-800">
              Continuar Comprando
            </Button>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Lista de produtos */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <div key={item.id} className="bg-standbyte-white p-6 rounded-lg border border-standbyte-mid/20">
                  <div className="flex items-center space-x-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-lg bg-standbyte-light"
                    />
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-standbyte-dark">{item.name}</h3>
                      <p className="text-standbyte-blue font-bold text-xl">
                        R$ {item.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-2 rounded-lg border border-standbyte-mid hover:bg-standbyte-light"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-12 text-center font-semibold">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-2 rounded-lg border border-standbyte-mid hover:bg-standbyte-light"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="p-2 text-standbyte-red hover:bg-red-50 rounded-lg"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Resumo do pedido */}
            <div className="bg-standbyte-white p-6 rounded-lg border border-standbyte-mid/20 h-fit">
              <h2 className="text-xl font-bold text-standbyte-dark mb-6">Resumo do Pedido</h2>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-standbyte-mid">Subtotal</span>
                  <span className="font-semibold">R$ {total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-standbyte-mid">Frete</span>
                  <span className="font-semibold text-green-600">Grátis</span>
                </div>
                <div className="border-t border-standbyte-light pt-3">
                  <div className="flex justify-between">
                    <span className="text-lg font-bold text-standbyte-dark">Total</span>
                    <span className="text-lg font-bold text-standbyte-blue">
                      R$ {total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </span>
                  </div>
                </div>
              </div>

              <Button className="w-full bg-standbyte-red hover:bg-red-700 text-standbyte-white font-semibold py-3">
                Finalizar Compra
              </Button>
              
              <Button variant="outline" className="w-full mt-3 border-standbyte-blue text-standbyte-blue hover:bg-standbyte-light">
                Continuar Comprando
              </Button>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Carrinho;
