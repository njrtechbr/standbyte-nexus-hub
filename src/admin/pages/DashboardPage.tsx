// src/admin/pages/DashboardPage.tsx
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'; // Ajuste o caminho
import { ShoppingBag, Wrench, FileText, Users, ArrowUpRight, DollarSign, Activity } from 'lucide-react'; // Adicionei mais ícones

interface DashboardCardProps {
  title: string;
  value: string;
  description: string;
  icon: React.ElementType;
  trend?: string; // Ex: "+5.2% desde o mês passado"
  trendColor?: string; // Ex: "text-green-500" ou "text-red-500"
}

const DashboardCard: React.FC<DashboardCardProps> = ({ title, value, description, icon: Icon, trend, trendColor }) => {
  return (
    <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-neutralDark">{title}</CardTitle>
        <Icon className="h-5 w-5 text-neutralMid" />
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold text-primaryBlue">{value}</div>
        <p className="text-xs text-neutralMid pt-1">{description}</p>
        {trend && (
          <div className="flex items-center text-xs mt-2">
            <span className={`mr-1 ${trendColor || 'text-gray-500'}`}>{trend}</span>
            {/* <span className="text-gray-500">desde o mês passado</span> */}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default function DashboardPage() {
  const mockDashboardData = [
    {
      title: "Produtos Cadastrados",
      value: "75",
      description: "Total de produtos ativos e inativos",
      icon: ShoppingBag,
      trend: "+2 desde ontem",
      trendColor: "text-green-600"
    },
    {
      title: "Serviços Oferecidos",
      value: "12",
      description: "Serviços disponíveis para clientes",
      icon: Wrench,
    },
    {
      title: "Solicitações de Orçamento",
      value: "5",
      description: "Orçamentos pendentes de resposta",
      icon: FileText,
      trend: "1 novo hoje",
      trendColor: "text-blue-600"
    },
    {
      title: "Visitantes Online",
      value: "23",
      description: "Usuários ativos no site (simulado)",
      icon: Users,
    },
    // Adicione mais cards se desejar
    // {
    //   title: "Receita Mensal (Estimada)",
    //   value: "R$ 12.580",
    //   description: "Baseado nas vendas recentes",
    //   icon: DollarSign,
    //   trend: "+15% vs Mês Anterior",
    //   trendColor: "text-green-600"
    // },
    // {
    //   title: "Taxa de Conversão",
    //   value: "3.2%",
    //   description: "Visitantes que realizaram compra",
    //   icon: Activity,
    // }
  ];

  return (
    <div className="p-2 md:p-4"> {/* Padding adicionado aqui ao invés de no AdminLayout para a main */}
      <h1 className="text-3xl font-bold text-primaryBlue mb-6">Dashboard</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {mockDashboardData.map((data) => (
          <DashboardCard
            key={data.title}
            title={data.title}
            value={data.value}
            description={data.description}
            icon={data.icon}
            trend={data.trend}
            trendColor={data.trendColor}
          />
        ))}
      </div>
      {/* Outras seções do dashboard podem vir aqui, como gráficos ou tabelas de atividades recentes */}
      {/* Exemplo:
      <div className="mt-8">
        <Card>
          <CardHeader>
            <CardTitle>Atividade Recente</CardTitle>
            <CardDescription>Últimas ações realizadas no sistema</CardDescription>
          </CardHeader>
          <CardContent>
             {/* Placeholder para um gráfico ou lista }
            <div className="h-64 bg-gray-100 rounded flex items-center justify-center">
              <p className="text-gray-400">Gráfico de Atividade (placeholder)</p>
            </div>
          </CardContent>
        </Card>
      </div>
      */}
    </div>
  );
}
