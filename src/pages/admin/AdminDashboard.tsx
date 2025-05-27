import { useEffect, useState } from 'react'
import { useAdmin } from '../../contexts/AdminContext'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card'
import { Badge } from '../../components/ui/badge'
import { Button } from '../../components/ui/button'
import { Loader2, Users, ShoppingCart, Package, DollarSign, TrendingUp, TrendingDown, RefreshCw } from 'lucide-react'

const StatCard = ({ title, value, description, icon: Icon, trend, trendValue }) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {description && (
          <p className="text-xs text-muted-foreground">{description}</p>
        )}
        {trend && trendValue && (
          <div className="flex items-center gap-1 mt-2">
            {trend === 'up' ? (
              <TrendingUp className="h-3 w-3 text-green-600" />
            ) : (
              <TrendingDown className="h-3 w-3 text-red-600" />
            )}
            <span className={`text-xs ${trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
              {trendValue}% em relação ao mês anterior
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export function AdminDashboard() {
  const { dashboardStats, loading, refreshStats } = useAdmin()
  const [refreshing, setRefreshing] = useState(false)

  const handleRefresh = async () => {
    setRefreshing(true)
    await refreshStats()
    setRefreshing(false)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  const stats = dashboardStats || {
    totalUsers: 0,
    totalOrders: 0,
    totalProducts: 0,
    totalRevenue: 0
  }

  return (
    <div className="flex-1 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Visão geral dos dados do seu negócio
          </p>
        </div>
        <Button 
          onClick={handleRefresh} 
          disabled={refreshing}
          variant="outline"
        >
          <RefreshCw className={`h-4 w-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
          Atualizar
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total de Usuários"
          value={stats.totalUsers.toLocaleString()}
          description="Usuários registrados"
          icon={Users}
          trend="up"
          trendValue={12}
        />
        <StatCard
          title="Total de Pedidos"
          value={stats.totalOrders.toLocaleString()}
          description="Pedidos realizados"
          icon={ShoppingCart}
          trend="up"
          trendValue={8}
        />        <StatCard
          title="Total de Produtos"
          value={stats.totalProducts.toLocaleString()}
          description="Produtos no catálogo"
          icon={Package}
          trend={undefined}
          trendValue={undefined}
        />
        <StatCard
          title="Receita Total"
          value={`R$ ${stats.totalRevenue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`}
          description="Receita acumulada"
          icon={DollarSign}
          trend="up"
          trendValue={15}
        />
      </div>

      {/* Quick Actions */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Ações Rápidas</CardTitle>
            <CardDescription>
              Acesso rápido às principais funcionalidades
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button className="w-full" variant="outline" asChild>
              <a href="/admin/products/new">Adicionar Produto</a>
            </Button>
            <Button className="w-full" variant="outline" asChild>
              <a href="/admin/services/new">Adicionar Serviço</a>
            </Button>
            <Button className="w-full" variant="outline" asChild>
              <a href="/admin/orders">Ver Pedidos</a>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Pedidos Recentes</CardTitle>
            <CardDescription>
              Últimos pedidos realizados
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-2 bg-muted rounded">
                <div>
                  <p className="text-sm font-medium">#001</p>
                  <p className="text-xs text-muted-foreground">João Silva</p>
                </div>
                <Badge variant="secondary">Pendente</Badge>
              </div>
              <div className="flex items-center justify-between p-2 bg-muted rounded">
                <div>
                  <p className="text-sm font-medium">#002</p>
                  <p className="text-xs text-muted-foreground">Maria Santos</p>
                </div>
                <Badge variant="default">Processando</Badge>
              </div>
              <div className="flex items-center justify-between p-2 bg-muted rounded">
                <div>
                  <p className="text-sm font-medium">#003</p>
                  <p className="text-xs text-muted-foreground">Pedro Costa</p>
                </div>
                <Badge variant="outline">Entregue</Badge>
              </div>
            </div>
            <Button className="w-full mt-4" variant="outline" asChild>
              <a href="/admin/orders">Ver Todos</a>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Orçamentos Pendentes</CardTitle>
            <CardDescription>
              Orçamentos aguardando resposta
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-2 bg-muted rounded">
                <div>
                  <p className="text-sm font-medium">Instalação de Rede</p>
                  <p className="text-xs text-muted-foreground">Ana Paula</p>
                </div>
                <Badge variant="secondary">Novo</Badge>
              </div>
              <div className="flex items-center justify-between p-2 bg-muted rounded">
                <div>
                  <p className="text-sm font-medium">Suporte Técnico</p>
                  <p className="text-xs text-muted-foreground">Carlos Lima</p>
                </div>
                <Badge variant="secondary">Novo</Badge>
              </div>
              <div className="flex items-center justify-between p-2 bg-muted rounded">
                <div>
                  <p className="text-sm font-medium">Consultoria TI</p>
                  <p className="text-xs text-muted-foreground">Lucia Fernandes</p>
                </div>
                <Badge variant="default">Em análise</Badge>
              </div>
            </div>
            <Button className="w-full mt-4" variant="outline" asChild>
              <a href="/admin/quotes">Ver Todos</a>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
