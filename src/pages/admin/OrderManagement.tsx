import { useState, useEffect } from 'react'
import { admin } from '../../lib/supabase'
import { useAdmin } from '../../contexts/AdminContext'
import { Button } from '../../components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table'
import { Badge } from '../../components/ui/badge'
import { Input } from '../../components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../../components/ui/dialog'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../../components/ui/dropdown-menu'
import { toast } from '../../components/ui/use-toast'
import { Loader2, Search, MoreHorizontal, Eye, Edit, RefreshCw, Package, User, Calendar } from 'lucide-react'

const statusColors = {
  pending: 'secondary',
  processing: 'default',
  shipped: 'outline',
  delivered: 'default',
  cancelled: 'destructive'
}

const statusLabels = {
  pending: 'Pendente',
  processing: 'Processando',
  shipped: 'Enviado',
  delivered: 'Entregue',
  cancelled: 'Cancelado'
}

export function OrderManagement() {
  const { hasPermission } = useAdmin()
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [selectedOrder, setSelectedOrder] = useState(null)
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false)
  const [actionLoading, setActionLoading] = useState(false)

  const canManageOrders = hasPermission('manage_orders')

  const loadOrders = async (page = 1) => {
    setLoading(true)
    try {
      const status = statusFilter !== 'all' ? statusFilter : null
      const { data, totalPages } = await admin.orders.getAll(page, 20, status)
      setOrders(data)
      setTotalPages(totalPages)
    } catch (error) {
      console.error('Error loading orders:', error)
      toast({
        title: 'Erro',
        description: 'Erro ao carregar pedidos',
        variant: 'destructive'
      })
    } finally {
      setLoading(false)
    }
  }

  const handleStatusUpdate = async (orderId, newStatus) => {
    setActionLoading(true)
    try {
      const { data, error } = await admin.orders.updateStatus(orderId, newStatus)
      
      if (data) {
        toast({
          title: 'Sucesso',
          description: 'Status do pedido atualizado com sucesso'
        })
        loadOrders(currentPage)
        if (selectedOrder?.id === orderId) {
          setSelectedOrder({ ...selectedOrder, status: newStatus })
        }
      } else {
        throw new Error(error?.message || 'Erro ao atualizar status')
      }
    } catch (error) {
      console.error('Error updating order status:', error)
      toast({
        title: 'Erro',
        description: error.message || 'Erro ao atualizar status do pedido',
        variant: 'destructive'
      })
    } finally {
      setActionLoading(false)
    }
  }

  const handleViewOrder = (order) => {
    setSelectedOrder(order)
    setIsDetailDialogOpen(true)
  }

  useEffect(() => {
    if (canManageOrders) {
      loadOrders()
    }
  }, [canManageOrders])

  useEffect(() => {
    if (canManageOrders) {
      loadOrders(currentPage)
    }
  }, [currentPage, statusFilter])

  const filteredOrders = orders.filter(order => {
    if (!searchTerm) return true
    
    const searchLower = searchTerm.toLowerCase()
    return (
      order.id?.toString().includes(searchLower) ||
      order.customers?.full_name?.toLowerCase().includes(searchLower) ||
      order.customers?.email?.toLowerCase().includes(searchLower)
    )
  })

  if (!canManageOrders) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-muted-foreground">Você não tem permissão para gerenciar pedidos</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Gerenciamento de Pedidos</h1>
          <p className="text-muted-foreground">
            Gerencie e acompanhe pedidos dos clientes
          </p>
        </div>
        <Button onClick={() => loadOrders(currentPage)} disabled={loading} variant="outline">
          <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
          Atualizar
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Filtros</CardTitle>
          <CardDescription>
            Filtre e pesquise pedidos
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Pesquisar por ID, cliente ou email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filtrar por status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os status</SelectItem>
                <SelectItem value="pending">Pendente</SelectItem>
                <SelectItem value="processing">Processando</SelectItem>
                <SelectItem value="shipped">Enviado</SelectItem>
                <SelectItem value="delivered">Entregue</SelectItem>
                <SelectItem value="cancelled">Cancelado</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Pedidos ({filteredOrders.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center h-32">
              <Loader2 className="h-8 w-8 animate-spin" />
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID do Pedido</TableHead>
                  <TableHead>Cliente</TableHead>
                  <TableHead>Data</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Items</TableHead>
                  <TableHead className="w-[100px]">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium">
                      #{order.id.toString().padStart(6, '0')}
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{order.customers?.full_name || 'Sem nome'}</p>
                        <p className="text-sm text-muted-foreground">{order.customers?.email}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        {new Date(order.created_at).toLocaleDateString('pt-BR')}
                      </div>
                    </TableCell>
                    <TableCell>
                      <p className="font-medium">R$ {order.total_amount?.toFixed(2)}</p>
                    </TableCell>
                    <TableCell>
                      <Badge variant={statusColors[order.status]}>
                        {statusLabels[order.status]}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Package className="h-4 w-4" />
                        {order.order_items?.length || 0} item(s)
                      </div>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleViewOrder(order)}>
                            <Eye className="mr-2 h-4 w-4" />
                            Ver Detalhes
                          </DropdownMenuItem>
                          {order.status === 'pending' && (
                            <DropdownMenuItem 
                              onClick={() => handleStatusUpdate(order.id, 'processing')}
                              disabled={actionLoading}
                            >
                              <Edit className="mr-2 h-4 w-4" />
                              Processar
                            </DropdownMenuItem>
                          )}
                          {order.status === 'processing' && (
                            <DropdownMenuItem 
                              onClick={() => handleStatusUpdate(order.id, 'shipped')}
                              disabled={actionLoading}
                            >
                              <Edit className="mr-2 h-4 w-4" />
                              Marcar como Enviado
                            </DropdownMenuItem>
                          )}
                          {order.status === 'shipped' && (
                            <DropdownMenuItem 
                              onClick={() => handleStatusUpdate(order.id, 'delivered')}
                              disabled={actionLoading}
                            >
                              <Edit className="mr-2 h-4 w-4" />
                              Marcar como Entregue
                            </DropdownMenuItem>
                          )}
                          {['pending', 'processing'].includes(order.status) && (
                            <DropdownMenuItem 
                              onClick={() => handleStatusUpdate(order.id, 'cancelled')}
                              disabled={actionLoading}
                            >
                              <Edit className="mr-2 h-4 w-4" />
                              Cancelar
                            </DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Order Detail Dialog */}
      {selectedOrder && (
        <Dialog open={isDetailDialogOpen} onOpenChange={setIsDetailDialogOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                Detalhes do Pedido #{selectedOrder.id.toString().padStart(6, '0')}
              </DialogTitle>
              <DialogDescription>
                Informações completas do pedido
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Informações do Cliente</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      <span>{selectedOrder.customers?.full_name || 'Sem nome'}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{selectedOrder.customers?.email}</p>
                    {selectedOrder.customers?.phone && (
                      <p className="text-sm text-muted-foreground">{selectedOrder.customers?.phone}</p>
                    )}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Informações do Pedido</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex justify-between">
                      <span>Status:</span>
                      <Badge variant={statusColors[selectedOrder.status]}>
                        {statusLabels[selectedOrder.status]}
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Data:</span>
                      <span>{new Date(selectedOrder.created_at).toLocaleDateString('pt-BR')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Total:</span>
                      <span className="font-medium">R$ {selectedOrder.total_amount?.toFixed(2)}</span>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Items do Pedido</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {selectedOrder.order_items?.map((item, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-muted rounded">
                        <div className="flex items-center gap-3">
                          {item.products?.image_url ? (
                            <img
                              src={item.products.image_url}
                              alt={item.products.name}
                              className="w-12 h-12 rounded object-cover"
                            />
                          ) : (
                            <div className="w-12 h-12 bg-gray-200 rounded flex items-center justify-center">
                              <Package className="h-6 w-6 text-gray-400" />
                            </div>
                          )}
                          <div>
                            <p className="font-medium">{item.products?.name}</p>
                            <p className="text-sm text-muted-foreground">
                              Qtd: {item.quantity} x R$ {item.unit_price?.toFixed(2)}
                            </p>
                          </div>
                        </div>
                        <p className="font-medium">R$ {(item.quantity * item.unit_price)?.toFixed(2)}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {selectedOrder.shipping_address && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Endereço de Entrega</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <pre className="text-sm whitespace-pre-wrap">{selectedOrder.shipping_address}</pre>
                  </CardContent>
                </Card>
              )}
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2">
          <Button
            variant="outline"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            Anterior
          </Button>
          <span className="text-sm text-muted-foreground">
            Página {currentPage} de {totalPages}
          </span>
          <Button
            variant="outline"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            Próxima
          </Button>
        </div>
      )}
    </div>
  )
}
