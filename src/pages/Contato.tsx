
import { useState } from "react";
import { Phone, Mail, MapPin, Clock, Send } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const Contato = () => {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    empresa: '',
    servico: '',
    mensagem: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Formulário enviado:', formData);
    // Aqui seria feita a integração com backend
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="min-h-screen bg-standbyte-light">
      <Header />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-standbyte-blue mb-4">Contato & Orçamentos</h1>
          <p className="text-lg text-standbyte-mid max-w-2xl mx-auto">
            Entre em contato conosco para solicitar orçamentos ou esclarecer dúvidas. 
            Nossa equipe está pronta para atender você!
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {/* Informações de contato */}
          <div className="space-y-6">
            <div className="bg-standbyte-white p-6 rounded-lg border border-standbyte-mid/20">
              <div className="flex items-center space-x-3 mb-4">
                <Phone className="w-6 h-6 text-standbyte-red" />
                <h3 className="text-lg font-semibold text-standbyte-dark">Telefone</h3>
              </div>
              <p className="text-standbyte-mid">(11) 3456-7890</p>
              <p className="text-standbyte-mid">(11) 99999-9999</p>
            </div>

            <div className="bg-standbyte-white p-6 rounded-lg border border-standbyte-mid/20">
              <div className="flex items-center space-x-3 mb-4">
                <Mail className="w-6 h-6 text-standbyte-red" />
                <h3 className="text-lg font-semibold text-standbyte-dark">E-mail</h3>
              </div>
              <p className="text-standbyte-mid">contato@standbyte.com.br</p>
              <p className="text-standbyte-mid">vendas@standbyte.com.br</p>
            </div>

            <div className="bg-standbyte-white p-6 rounded-lg border border-standbyte-mid/20">
              <div className="flex items-center space-x-3 mb-4">
                <MapPin className="w-6 h-6 text-standbyte-red" />
                <h3 className="text-lg font-semibold text-standbyte-dark">Endereço</h3>
              </div>
              <p className="text-standbyte-mid">Av. Paulista, 1000</p>
              <p className="text-standbyte-mid">São Paulo - SP</p>
              <p className="text-standbyte-mid">CEP: 01310-100</p>
            </div>

            <div className="bg-standbyte-white p-6 rounded-lg border border-standbyte-mid/20">
              <div className="flex items-center space-x-3 mb-4">
                <Clock className="w-6 h-6 text-standbyte-red" />
                <h3 className="text-lg font-semibold text-standbyte-dark">Horário</h3>
              </div>
              <p className="text-standbyte-mid">Segunda a Sexta: 8h às 18h</p>
              <p className="text-standbyte-mid">Sábado: 9h às 14h</p>
            </div>
          </div>

          {/* Formulário de contato */}
          <div className="lg:col-span-2">
            <div className="bg-standbyte-white p-8 rounded-lg border border-standbyte-mid/20">
              <h2 className="text-2xl font-bold text-standbyte-blue mb-6">Solicitar Orçamento</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="nome" className="text-standbyte-dark">Nome *</Label>
                    <Input
                      id="nome"
                      name="nome"
                      value={formData.nome}
                      onChange={handleChange}
                      required
                      className="border-standbyte-mid focus:border-standbyte-blue"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-standbyte-dark">E-mail *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="border-standbyte-mid focus:border-standbyte-blue"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="telefone" className="text-standbyte-dark">Telefone *</Label>
                    <Input
                      id="telefone"
                      name="telefone"
                      value={formData.telefone}
                      onChange={handleChange}
                      required
                      className="border-standbyte-mid focus:border-standbyte-blue"
                    />
                  </div>
                  <div>
                    <Label htmlFor="empresa" className="text-standbyte-dark">Empresa</Label>
                    <Input
                      id="empresa"
                      name="empresa"
                      value={formData.empresa}
                      onChange={handleChange}
                      className="border-standbyte-mid focus:border-standbyte-blue"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="servico" className="text-standbyte-dark">Tipo de Serviço *</Label>
                  <select
                    id="servico"
                    name="servico"
                    value={formData.servico}
                    onChange={handleChange}
                    required
                    className="w-full h-10 px-3 py-2 border border-standbyte-mid rounded-md focus:border-standbyte-blue focus:outline-none"
                  >
                    <option value="">Selecione um serviço</option>
                    <option value="infraestrutura">Infraestrutura de TI</option>
                    <option value="seguranca">Segurança Digital</option>
                    <option value="consultoria">Consultoria Técnica</option>
                    <option value="suporte">Suporte Especializado</option>
                    <option value="cloud">Cloud Computing</option>
                    <option value="produtos">Venda de Produtos</option>
                  </select>
                </div>

                <div>
                  <Label htmlFor="mensagem" className="text-standbyte-dark">Mensagem *</Label>
                  <Textarea
                    id="mensagem"
                    name="mensagem"
                    value={formData.mensagem}
                    onChange={handleChange}
                    required
                    rows={5}
                    placeholder="Descreva suas necessidades e como podemos ajudá-lo..."
                    className="border-standbyte-mid focus:border-standbyte-blue"
                  />
                </div>

                <Button 
                  type="submit" 
                  className="bg-standbyte-red hover:bg-red-700 text-standbyte-white font-semibold py-3 px-8"
                >
                  <Send className="w-5 h-5 mr-2" />
                  Enviar Solicitação
                </Button>
              </form>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Contato;
