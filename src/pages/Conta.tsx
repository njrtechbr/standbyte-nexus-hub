
import { useState } from "react";
import { User, Package, Heart, Settings, LogOut, Edit } from "lucide-react";
import HeaderWithAuth from "@/components/HeaderWithAuth";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

const Conta = () => {
  const [activeTab, setActiveTab] = useState('perfil');
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    nome: 'João Silva',
    email: 'joao.silva@email.com',
    telefone: '(11) 99999-9999',
    empresa: 'Tech Solutions Ltda'
  });

  const orders = [
    {
      id: '#001234',
      date: '15/12/2024',
      status: 'Entregue',
      total: 2499.99,
      items: 2
    },
    {
      id: '#001233',
      date: '08/12/2024',
      status: 'Em Transporte',
      total: 899.99,
      items: 1
    }
  ];

  const favorites = [
    {
      id: 1,
      name: 'Notebook Dell Inspiron 15',
      price: 2499.99,
      image: '/placeholder.svg'
    },
    {
      id: 2,
      name: 'Mouse Logitech MX Master 3',
      price: 299.99,
      image: '/placeholder.svg'
    }
  ];

  const tabs = [
    { id: 'perfil', label: 'Meu Perfil', icon: User },
    { id: 'pedidos', label: 'Meus Pedidos', icon: Package },
    { id: 'favoritos', label: 'Favoritos', icon: Heart },
    { id: 'configuracoes', label: 'Configurações', icon: Settings },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Entregue': return 'bg-green-100 text-green-800';
      case 'Em Transporte': return 'bg-blue-100 text-blue-800';
      case 'Processando': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };
  return (
    <div className="min-h-screen bg-standbyte-light">
      <HeaderWithAuth />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center space-x-3 mb-8">
          <User className="w-8 h-8 text-standbyte-blue" />
          <h1 className="text-3xl font-bold text-standbyte-blue">Minha Conta</h1>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Menu lateral */}
          <div className="lg:col-span-1">
            <div className="bg-standbyte-white rounded-lg border border-standbyte-mid/20 p-6">
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-standbyte-blue rounded-full flex items-center justify-center mx-auto mb-3">
                  <User className="w-10 h-10 text-standbyte-white" />
                </div>
                <h3 className="font-semibold text-standbyte-dark">{userData.nome}</h3>
                <p className="text-sm text-standbyte-mid">{userData.email}</p>
              </div>

              <nav className="space-y-2">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                        activeTab === tab.id
                          ? 'bg-standbyte-blue text-standbyte-white'
                          : 'text-standbyte-dark hover:bg-standbyte-light'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
                
                <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left text-standbyte-red hover:bg-red-50 transition-colors">
                  <LogOut className="w-5 h-5" />
                  <span>Sair</span>
                </button>
              </nav>
            </div>
          </div>

          {/* Conteúdo principal */}
          <div className="lg:col-span-3">
            <div className="bg-standbyte-white rounded-lg border border-standbyte-mid/20 p-8">
              
              {/* Perfil */}
              {activeTab === 'perfil' && (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-standbyte-dark">Meu Perfil</h2>
                    <Button
                      onClick={() => setIsEditing(!isEditing)}
                      variant="outline"
                      className="border-standbyte-blue text-standbyte-blue hover:bg-standbyte-light"
                    >
                      <Edit className="w-4 h-4 mr-2" />
                      {isEditing ? 'Cancelar' : 'Editar'}
                    </Button>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="nome" className="text-standbyte-dark">Nome Completo</Label>
                      <Input
                        id="nome"
                        value={userData.nome}
                        disabled={!isEditing}
                        className="border-standbyte-mid"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email" className="text-standbyte-dark">E-mail</Label>
                      <Input
                        id="email"
                        value={userData.email}
                        disabled={!isEditing}
                        className="border-standbyte-mid"
                      />
                    </div>
                    <div>
                      <Label htmlFor="telefone" className="text-standbyte-dark">Telefone</Label>
                      <Input
                        id="telefone"
                        value={userData.telefone}
                        disabled={!isEditing}
                        className="border-standbyte-mid"
                      />
                    </div>
                    <div>
                      <Label htmlFor="empresa" className="text-standbyte-dark">Empresa</Label>
                      <Input
                        id="empresa"
                        value={userData.empresa}
                        disabled={!isEditing}
                        className="border-standbyte-mid"
                      />
                    </div>
                  </div>

                  {isEditing && (
                    <div className="mt-6">
                      <Button className="bg-standbyte-blue hover:bg-blue-800">
                        Salvar Alterações
                      </Button>
                    </div>
                  )}
                </div>
              )}

              {/* Pedidos */}
              {activeTab === 'pedidos' && (
                <div>
                  <h2 className="text-2xl font-bold text-standbyte-dark mb-6">Meus Pedidos</h2>
                  
                  <div className="space-y-4">
                    {orders.map((order) => (
                      <div key={order.id} className="border border-standbyte-mid/20 rounded-lg p-6">
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <h3 className="font-semibold text-standbyte-dark">Pedido {order.id}</h3>
                            <p className="text-sm text-standbyte-mid">Data: {order.date}</p>
                          </div>
                          <Badge className={getStatusColor(order.status)}>
                            {order.status}
                          </Badge>
                        </div>
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="text-sm text-standbyte-mid">{order.items} item(s)</p>
                            <p className="font-semibold text-standbyte-blue">
                              R$ {order.total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                            </p>
                          </div>
                          <Button variant="outline" size="sm" className="border-standbyte-blue text-standbyte-blue">
                            Ver Detalhes
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Favoritos */}
              {activeTab === 'favoritos' && (
                <div>
                  <h2 className="text-2xl font-bold text-standbyte-dark mb-6">Meus Favoritos</h2>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    {favorites.map((item) => (
                      <div key={item.id} className="border border-standbyte-mid/20 rounded-lg p-6">
                        <div className="flex items-center space-x-4">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-16 h-16 object-cover rounded-lg bg-standbyte-light"
                          />
                          <div className="flex-1">
                            <h3 className="font-semibold text-standbyte-dark">{item.name}</h3>
                            <p className="text-standbyte-blue font-bold">
                              R$ {item.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                            </p>
                          </div>
                          <Button size="sm" className="bg-standbyte-red hover:bg-red-700">
                            Comprar
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Configurações */}
              {activeTab === 'configuracoes' && (
                <div>
                  <h2 className="text-2xl font-bold text-standbyte-dark mb-6">Configurações</h2>
                  
                  <div className="space-y-6">
                    <div className="border border-standbyte-mid/20 rounded-lg p-6">
                      <h3 className="font-semibold text-standbyte-dark mb-4">Notificações</h3>
                      <div className="space-y-3">
                        <label className="flex items-center space-x-3">
                          <input type="checkbox" defaultChecked className="rounded border-standbyte-mid" />
                          <span className="text-standbyte-mid">Receber ofertas por e-mail</span>
                        </label>
                        <label className="flex items-center space-x-3">
                          <input type="checkbox" defaultChecked className="rounded border-standbyte-mid" />
                          <span className="text-standbyte-mid">Notificações de pedidos</span>
                        </label>
                      </div>
                    </div>

                    <div className="border border-standbyte-mid/20 rounded-lg p-6">
                      <h3 className="font-semibold text-standbyte-dark mb-4">Segurança</h3>
                      <Button variant="outline" className="border-standbyte-blue text-standbyte-blue">
                        Alterar Senha
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Conta;
