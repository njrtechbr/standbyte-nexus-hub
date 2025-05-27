import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, Plus, Edit2, Trash2, Eye, RefreshCw, Send, FileText, DollarSign } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/lib/supabase';

interface Quote {
  id: string;
  user_id: string;
  service_id: string | null;
  name: string;
  email: string;
  phone: string | null;
  company: string | null;
  project_title: string;
  project_description: string;
  requirements: Record<string, any> | null;
  budget_range: string | null;
  timeline: string | null;
  status: 'pending' | 'reviewing' | 'quoted' | 'accepted' | 'rejected' | 'expired';
  quoted_amount: number | null;
  quote_details: Record<string, any> | null;
  quoted_at: string | null;
  expires_at: string | null;
  created_at: string;
  updated_at: string;
  service?: {
    name: string;
    category: string;
  };
  user?: {
    email: string;
    full_name: string;
  };
}

const QuoteManagement: React.FC = () => {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [editingQuote, setEditingQuote] = useState<Quote | null>(null);
  const [viewingQuote, setViewingQuote] = useState<Quote | null>(null);
  const [quotingQuote, setQuotingQuote] = useState<Quote | null>(null);
  const [quoteFormData, setQuoteFormData] = useState({
    quoted_amount: '',
    quote_details: '',
    expires_at: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const { toast } = useToast();

  const statusOptions = [
    'pending',
    'reviewing',
    'quoted',
    'accepted',
    'rejected',
    'expired'
  ];

  const statusColors = {
    pending: 'default',
    reviewing: 'secondary',
    quoted: 'outline',
    accepted: 'default',
    rejected: 'destructive',
    expired: 'secondary'
  } as const;

  useEffect(() => {
    fetchQuotes();
  }, []);

  const fetchQuotes = async () => {
    try {
      setLoading(true);
      const data = await supabase.admin.getQuotes();
      setQuotes(data);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to fetch quotes',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateQuoteStatus = async (quoteId: string, status: string) => {
    try {
      await supabase.admin.updateQuoteStatus(quoteId, status);
      
      toast({
        title: 'Success',
        description: 'Quote status updated successfully'
      });
      
      fetchQuotes();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update quote status',
        variant: 'destructive'
      });
    }
  };

  const handleSubmitQuote = async () => {
    if (!quotingQuote) return;

    try {
      setSubmitting(true);
      
      const quoteData = {
        quoted_amount: parseFloat(quoteFormData.quoted_amount),
        quote_details: quoteFormData.quote_details ? JSON.parse(quoteFormData.quote_details) : null,
        expires_at: quoteFormData.expires_at || null,
        status: 'quoted'
      };

      await supabase.admin.updateQuote(quotingQuote.id, quoteData);
      
      toast({
        title: 'Success',
        description: 'Quote submitted successfully'
      });
      
      setQuotingQuote(null);
      resetQuoteForm();
      fetchQuotes();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to submit quote',
        variant: 'destructive'
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteQuote = async (quote: Quote) => {
    try {
      await supabase.admin.deleteQuote(quote.id);
      
      toast({
        title: 'Success',
        description: 'Quote deleted successfully'
      });
      
      fetchQuotes();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete quote',
        variant: 'destructive'
      });
    }
  };

  const resetQuoteForm = () => {
    setQuoteFormData({
      quoted_amount: '',
      quote_details: '',
      expires_at: ''
    });
  };

  const openQuoteDialog = (quote: Quote) => {
    setQuotingQuote(quote);
    setQuoteFormData({
      quoted_amount: quote.quoted_amount?.toString() || '',
      quote_details: quote.quote_details ? JSON.stringify(quote.quote_details, null, 2) : '',
      expires_at: quote.expires_at ? new Date(quote.expires_at).toISOString().split('T')[0] : ''
    });
  };

  const filteredQuotes = quotes.filter(quote => {
    const matchesSearch = quote.project_title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         quote.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         quote.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (quote.company && quote.company.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesStatus = statusFilter === 'all' || quote.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Quote Management</h1>
        <Button onClick={fetchQuotes} variant="outline" size="sm">
          <RefreshCw className="w-4 h-4 mr-2" />
          Refresh
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search quotes..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                {statusOptions.map((status) => (
                  <SelectItem key={status} value={status}>
                    {status.toUpperCase()}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Quote Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <FileText className="h-4 w-4 text-muted-foreground" />
              <div className="ml-2">
                <p className="text-sm font-medium leading-none">Total Quotes</p>
                <p className="text-2xl font-bold">{quotes.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <Eye className="h-4 w-4 text-blue-600" />
              <div className="ml-2">
                <p className="text-sm font-medium leading-none">Pending</p>
                <p className="text-2xl font-bold">{quotes.filter(q => q.status === 'pending').length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <Send className="h-4 w-4 text-green-600" />
              <div className="ml-2">
                <p className="text-sm font-medium leading-none">Quoted</p>
                <p className="text-2xl font-bold">{quotes.filter(q => q.status === 'quoted').length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <DollarSign className="h-4 w-4 text-green-600" />
              <div className="ml-2">
                <p className="text-sm font-medium leading-none">Accepted</p>
                <p className="text-2xl font-bold">{quotes.filter(q => q.status === 'accepted').length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quotes Table */}
      <Card>
        <CardHeader>
          <CardTitle>Quote Requests ({filteredQuotes.length})</CardTitle>
          <CardDescription>
            Manage customer quote requests
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center py-8">
              <RefreshCw className="w-6 h-6 animate-spin" />
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Project</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Service</TableHead>
                  <TableHead>Budget Range</TableHead>
                  <TableHead>Quoted Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredQuotes.map((quote) => (
                  <TableRow key={quote.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{quote.project_title}</div>
                        <div className="text-sm text-gray-500 truncate max-w-xs">
                          {quote.project_description}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{quote.name}</div>
                        <div className="text-sm text-gray-500">{quote.email}</div>
                        {quote.company && (
                          <div className="text-sm text-gray-500">{quote.company}</div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      {quote.service ? (
                        <Badge variant="outline">
                          {quote.service.name}
                        </Badge>
                      ) : (
                        <span className="text-gray-400">Custom</span>
                      )}
                    </TableCell>
                    <TableCell>
                      {quote.budget_range || 'Not specified'}
                    </TableCell>
                    <TableCell>
                      {quote.quoted_amount ? formatCurrency(quote.quoted_amount) : '-'}
                    </TableCell>
                    <TableCell>
                      <Select
                        value={quote.status}
                        onValueChange={(value) => handleUpdateQuoteStatus(quote.id, value)}
                      >
                        <SelectTrigger className="w-32">
                          <Badge variant={statusColors[quote.status]}>
                            {quote.status.toUpperCase()}
                          </Badge>
                        </SelectTrigger>
                        <SelectContent>
                          {statusOptions.map((status) => (
                            <SelectItem key={status} value={status}>
                              {status.toUpperCase()}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell>{formatDate(quote.created_at)}</TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => setViewingQuote(quote)}
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        {(quote.status === 'pending' || quote.status === 'reviewing' || quote.status === 'quoted') && (
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => openQuoteDialog(quote)}
                          >
                            <DollarSign className="w-4 h-4" />
                          </Button>
                        )}
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button size="sm" variant="ghost">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Delete Quote</AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you sure you want to delete this quote request? This action cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleDeleteQuote(quote)}
                                className="bg-red-600 hover:bg-red-700"
                              >
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Quote Dialog */}
      <Dialog open={!!quotingQuote} onOpenChange={() => setQuotingQuote(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Submit Quote</DialogTitle>
            <DialogDescription>
              Provide quote details for: {quotingQuote?.project_title}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={(e) => { e.preventDefault(); handleSubmitQuote(); }} className="space-y-4">
            <div>
              <Label htmlFor="quoted_amount">Quoted Amount *</Label>
              <Input
                id="quoted_amount"
                type="number"
                step="0.01"
                value={quoteFormData.quoted_amount}
                onChange={(e) => setQuoteFormData({ ...quoteFormData, quoted_amount: e.target.value })}
                required
              />
            </div>

            <div>
              <Label htmlFor="expires_at">Quote Expiry Date</Label>
              <Input
                id="expires_at"
                type="date"
                value={quoteFormData.expires_at}
                onChange={(e) => setQuoteFormData({ ...quoteFormData, expires_at: e.target.value })}
              />
            </div>

            <div>
              <Label htmlFor="quote_details">Quote Details (JSON)</Label>
              <Textarea
                id="quote_details"
                value={quoteFormData.quote_details}
                onChange={(e) => setQuoteFormData({ ...quoteFormData, quote_details: e.target.value })}
                placeholder='{"breakdown": [{"item": "Development", "amount": 5000}], "notes": "Payment terms: 50% upfront"}'
                rows={6}
              />
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setQuotingQuote(null)}>
                Cancel
              </Button>
              <Button type="submit" disabled={submitting}>
                {submitting ? 'Submitting...' : 'Submit Quote'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* View Quote Dialog */}
      <Dialog open={!!viewingQuote} onOpenChange={() => setViewingQuote(null)}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{viewingQuote?.project_title}</DialogTitle>
            <DialogDescription>Quote Request Details</DialogDescription>
          </DialogHeader>
          {viewingQuote && (
            <Tabs defaultValue="details" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="requirements">Requirements</TabsTrigger>
                <TabsTrigger value="quote">Quote</TabsTrigger>
              </TabsList>
              
              <TabsContent value="details" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium">Customer Name</Label>
                    <p className="text-sm text-gray-600 mt-1">{viewingQuote.name}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Email</Label>
                    <p className="text-sm text-gray-600 mt-1">{viewingQuote.email}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Phone</Label>
                    <p className="text-sm text-gray-600 mt-1">{viewingQuote.phone || 'Not provided'}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Company</Label>
                    <p className="text-sm text-gray-600 mt-1">{viewingQuote.company || 'Not provided'}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Budget Range</Label>
                    <p className="text-sm text-gray-600 mt-1">{viewingQuote.budget_range || 'Not specified'}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Timeline</Label>
                    <p className="text-sm text-gray-600 mt-1">{viewingQuote.timeline || 'Not specified'}</p>
                  </div>
                </div>
                <div>
                  <Label className="text-sm font-medium">Project Description</Label>
                  <p className="text-sm text-gray-600 mt-1">{viewingQuote.project_description}</p>
                </div>
              </TabsContent>
              
              <TabsContent value="requirements" className="space-y-4">
                {viewingQuote.requirements ? (
                  <pre className="text-sm text-gray-600 bg-gray-50 p-3 rounded border overflow-auto">
                    {JSON.stringify(viewingQuote.requirements, null, 2)}
                  </pre>
                ) : (
                  <p className="text-sm text-gray-500">No specific requirements provided</p>
                )}
              </TabsContent>
              
              <TabsContent value="quote" className="space-y-4">
                {viewingQuote.status === 'quoted' || viewingQuote.quoted_amount ? (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label className="text-sm font-medium">Quoted Amount</Label>
                        <p className="text-lg font-semibold text-green-600 mt-1">
                          {viewingQuote.quoted_amount ? formatCurrency(viewingQuote.quoted_amount) : 'Not quoted'}
                        </p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium">Quote Date</Label>
                        <p className="text-sm text-gray-600 mt-1">
                          {viewingQuote.quoted_at ? formatDate(viewingQuote.quoted_at) : 'Not quoted'}
                        </p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium">Expires At</Label>
                        <p className="text-sm text-gray-600 mt-1">
                          {viewingQuote.expires_at ? formatDate(viewingQuote.expires_at) : 'No expiry'}
                        </p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium">Status</Label>
                        <Badge variant={statusColors[viewingQuote.status]} className="mt-1">
                          {viewingQuote.status.toUpperCase()}
                        </Badge>
                      </div>
                    </div>
                    {viewingQuote.quote_details && (
                      <div>
                        <Label className="text-sm font-medium">Quote Details</Label>
                        <pre className="text-sm text-gray-600 mt-1 bg-gray-50 p-3 rounded border overflow-auto">
                          {JSON.stringify(viewingQuote.quote_details, null, 2)}
                        </pre>
                      </div>
                    )}
                  </div>
                ) : (
                  <p className="text-sm text-gray-500">Quote not yet provided</p>
                )}
              </TabsContent>
            </Tabs>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setViewingQuote(null)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default QuoteManagement;
