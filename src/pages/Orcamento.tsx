
import { useState } from "react";
import { Send, Calculator, CheckCircle, Clock, Award, Users } from "lucide-react";
import HeaderWithAuth from "@/components/HeaderWithAuth";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const Orcamento = () => {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    empresa: '',
    servico: '',
    urgencia: '',
    orcamento: '',
    detalhes: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Orçamento solicitado:', formData);
    // Aqui seria feita a integração com backend
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const servicos = [
    "Cabeamento Estruturado",
    "Fibra Óptica", 
    "Projeto de Rede",
    "Câmeras de Segurança (CFTV)",
    "Projeto Elétrico",
    "Infraestrutura de TI",
    "Painéis Solares",
    "Nobreaks",
    "Backup de Dados",
    "E-mail Corporativo",
    "Consultoria em TI",
    "Suporte Especializado"
  ];
  return (
    <div className="min-h-screen bg-standbyte-light">
      <HeaderWithAuth />
      
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-standbyte-blue mb-4">
            Solicitar Orçamento
          </h1>
          <p className="text-lg text-standbyte-mid max-w-2xl mx-auto">
            Preencha o formulário abaixo e receba um orçamento personalizado para suas necessidades de tecnologia.
          </p>
        </div>

        {/* Benefits Section */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          {[
            { icon: CheckCircle, title: "Orçamento Gratuito", desc: "Análise sem custo" },
            { icon: Clock, title: "Resposta Rápida", desc: "Em até 24 horas" },
            { icon: Award, title: "Profissionais Certificados", desc: "Equipe qualificada" },
            { icon: Users, title: "Atendimento Personalizado", desc: "Soluções sob medida" }
          ].map((benefit, index) => (
            <div key={index} className="bg-standbyte-white p-6 rounded-lg border border-standbyte-mid/20 text-center">
              <div className="w-12 h-12 bg-standbyte-blue rounded-lg flex items-center justify-center mx-auto mb-4">
                <benefit.icon className="w-6 h-6 text-standbyte-white" />
              </div>
              <h3 className="font-bold text-standbyte-dark mb-2">{benefit.title}</h3>
              <p className="text-sm text-standbyte-mid">{benefit.desc}</p>
            </div>
          ))}
        </div>

        {/* Form Section */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-standbyte-white p-8 rounded-lg border border-standbyte-mid/20 shadow-lg">
            <div className="flex items-center mb-6">
              <Calculator className="w-8 h-8 text-standbyte-red mr-3" />
              <h2 className="text-2xl font-bold text-standbyte-blue">
                Formulário de Orçamento
              </h2>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Dados Pessoais */}
              <div>
                <h3 className="text-lg font-semibold text-standbyte-dark mb-4 border-l-4 border-standbyte-red pl-3">
                  Dados Pessoais
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="nome" className="text-standbyte-dark">Nome Completo *</Label>
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
                  <div>
                    <Label htmlFor="telefone" className="text-standbyte-dark">Telefone *</Label>
                    <Input
                      id="telefone"
                      name="telefone"
                      value={formData.telefone}
                      onChange={handleChange}
                      required
                      placeholder="(11) 99999-9999"
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
                      placeholder="Nome da sua empresa"
                      className="border-standbyte-mid focus:border-standbyte-blue"
                    />
                  </div>
                </div>
              </div>

              {/* Detalhes do Serviço */}
              <div>
                <h3 className="text-lg font-semibold text-standbyte-dark mb-4 border-l-4 border-standbyte-red pl-3">
                  Detalhes do Serviço
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
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
                      {servicos.map((servico) => (
                        <option key={servico} value={servico}>{servico}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <Label htmlFor="urgencia" className="text-standbyte-dark">Urgência *</Label>
                    <select
                      id="urgencia"
                      name="urgencia"
                      value={formData.urgencia}
                      onChange={handleChange}
                      required
                      className="w-full h-10 px-3 py-2 border border-standbyte-mid rounded-md focus:border-standbyte-blue focus:outline-none"
                    >
                      <option value="">Selecione a urgência</option>
                      <option value="baixa">Baixa - Até 30 dias</option>
                      <option value="media">Média - Até 15 dias</option>
                      <option value="alta">Alta - Até 7 dias</option>
                      <option value="urgente">Urgente - Até 3 dias</option>
                    </select>
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="orcamento" className="text-standbyte-dark">Orçamento Estimado</Label>
                    <select
                      id="orcamento"
                      name="orcamento"
                      value={formData.orcamento}
                      onChange={handleChange}
                      className="w-full h-10 px-3 py-2 border border-standbyte-mid rounded-md focus:border-standbyte-blue focus:outline-none"
                    >
                      <option value="">Selecione uma faixa de orçamento</option>
                      <option value="ate-5k">Até R$ 5.000</option>
                      <option value="5k-15k">R$ 5.000 - R$ 15.000</option>
                      <option value="15k-30k">R$ 15.000 - R$ 30.000</option>
                      <option value="30k-50k">R$ 30.000 - R$ 50.000</option>
                      <option value="acima-50k">Acima de R$ 50.000</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Detalhes Adicionais */}
              <div>
                <h3 className="text-lg font-semibold text-standbyte-dark mb-4 border-l-4 border-standbyte-red pl-3">
                  Detalhes Adicionais
                </h3>
                <div>
                  <Label htmlFor="detalhes" className="text-standbyte-dark">Descrição Detalhada do Projeto *</Label>
                  <Textarea
                    id="detalhes"
                    name="detalhes"
                    value={formData.detalhes}
                    onChange={handleChange}
                    required
                    rows={6}
                    placeholder="Descreva detalhadamente suas necessidades, tamanho do ambiente, quantidade de pontos de rede, especificações técnicas, etc."
                    className="border-standbyte-mid focus:border-standbyte-blue"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="bg-standbyte-light p-6 rounded-lg border-l-4 border-standbyte-red">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <h4 className="font-semibold text-standbyte-dark">Pronto para solicitar seu orçamento?</h4>
                    <p className="text-sm text-standbyte-mid">
                      Nossa equipe entrará em contato em até 24 horas úteis.
                    </p>
                  </div>
                  <Button 
                    type="submit" 
                    className="bg-standbyte-red hover:bg-red-700 text-standbyte-white font-semibold py-3 px-8 whitespace-nowrap"
                  >
                    <Send className="w-5 h-5 mr-2" />
                    Solicitar Orçamento
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-12 text-center">
          <div className="bg-standbyte-blue text-standbyte-white p-6 rounded-lg max-w-2xl mx-auto">
            <h3 className="text-xl font-bold mb-3">Dúvidas? Fale Conosco</h3>
            <p className="mb-4">
              Precisa de esclarecimentos antes de solicitar o orçamento?
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <p className="text-standbyte-white/90">📞 (11) 3456-7890</p>
              <p className="text-standbyte-white/90">📧 orcamentos@standbyte.com.br</p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Orcamento;
