// src/pages/Orcamento.tsx
import React, { useState, useEffect } from 'react'; // Adicionado useEffect
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"; // Para lista de serviços
import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { createQuote } from '@/admin/services/quoteService'; // Ajuste o caminho
import { getServices as getPublishedServices } from '@/admin/services/serviceService'; // Para buscar serviços
import type { Service } from '@/admin/types/serviceTypes'; // Para tipar serviços
import { Loader2, Send, CheckCircle, AlertTriangle } from 'lucide-react';
// import { usePageContent } from '@/hooks/usePageContent';

// Schema de validação com Zod
const quoteFormSchema = z.object({
  name: z.string().min(2, { message: "Nome deve ter pelo menos 2 caracteres." }),
  email: z.string().email({ message: "Email inválido." }),
  phone: z.string().optional().nullable(),
  service_interest: z.string().optional().nullable(), // Pode ser o ID ou nome do serviço
  message: z.string().min(10, { message: "Mensagem deve ter pelo menos 10 caracteres." }),
});

type QuoteFormValues = z.infer<typeof quoteFormSchema>;

const Orcamento = () => {
  // const { pageData, loading: pageLoading, error: pageError } = usePageContent("orcamento"); // Para SEO dinâmico
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [services, setServices] = useState<Service[]>([]);

  const { register, handleSubmit, reset, control, setValue, formState: { errors, isSubmitting } } = useForm<QuoteFormValues>({ // Adicionado setValue
    resolver: zodResolver(quoteFormSchema),
    defaultValues: { name: '', email: '', phone: '', service_interest: '', message: '' }
  });
  
  useEffect(() => {
    // Carregar serviços publicados para o dropdown
    const fetchServicesForDropdown = async () => {
      try {
        const data = await getPublishedServices(); // Assumindo que getServices busca todos
        setServices(data.filter(s => s.is_published)); // Filtrar publicados aqui
      } catch (error) {
        console.error("Erro ao buscar serviços para o formulário:", error);
        // Não bloquear o formulário por isso, o campo pode ser digitado manualmente
      }
    };
    fetchServicesForDropdown();
  }, []);


  const onSubmit = async (data: QuoteFormValues) => {
    setFormStatus('submitting');
    setSubmitError(null);
    try {
      await createQuote(data);
      setFormStatus('success');
      reset();
    } catch (err: any) {
      setFormStatus('error');
      setSubmitError(err.message || "Ocorreu um erro ao enviar sua solicitação. Tente novamente.");
      console.error("Erro ao enviar solicitação de orçamento:", err);
    }
  };

  const pageTitle = "Solicitar Orçamento - StandByte";
  const pageDescription = "Solicite um orçamento detalhado para nossos produtos e serviços. Nossa equipe está pronta para atender você.";

  return (
    <div className="min-h-screen bg-neutralWhite">
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
      </Helmet>
      <Header />

      <main className="py-12 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-primaryBlue">Solicitar um Orçamento</h1>
            <p className="mt-4 text-lg text-neutralMid max-w-xl mx-auto">
              Descreva sua necessidade e receba uma proposta personalizada da nossa equipe de especialistas.
            </p>
          </div>

          <div className="max-w-2xl mx-auto bg-neutralLight p-8 md:p-10 rounded-lg shadow-xl">
            {formStatus === 'success' ? (
              <div className="text-center py-10">
                <CheckCircle className="mx-auto h-16 w-16 text-green-500 mb-4" />
                <h2 className="text-2xl font-semibold text-neutralDark mb-2">Solicitação Enviada!</h2>
                <p className="text-neutralMid">Obrigado por solicitar um orçamento. Entraremos em contato em breve com sua proposta.</p>
                <Button onClick={() => setFormStatus('idle')} className="mt-6 bg-primaryBlue text-neutralWhite hover:bg-opacity-90">
                  Solicitar Novo Orçamento
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div>
                  <Label htmlFor="name" className={errors.name ? 'text-destructive' : 'text-neutralDark'}>Nome Completo / Empresa</Label>
                  <Input id="name" {...register('name')} placeholder="Seu nome ou nome da empresa" className={`mt-1 ${errors.name ? 'border-destructive' : ''}`} />
                  {errors.name && <p className="text-sm text-destructive mt-1">{errors.name.message}</p>}
                </div>

                <div>
                  <Label htmlFor="email" className={errors.email ? 'text-destructive' : 'text-neutralDark'}>Email de Contato</Label>
                  <Input id="email" type="email" {...register('email')} placeholder="seu.email@empresa.com" className={`mt-1 ${errors.email ? 'border-destructive' : ''}`} />
                  {errors.email && <p className="text-sm text-destructive mt-1">{errors.email.message}</p>}
                </div>

                <div>
                  <Label htmlFor="phone" className="text-neutralDark">Telefone / WhatsApp (Opcional)</Label>
                  <Input id="phone" {...register('phone')} placeholder="(XX) XXXXX-XXXX" className="mt-1" />
                </div>
                
                <div>
                  <Label htmlFor="service_interest" className="text-neutralDark">Serviço de Interesse (Opcional)</Label>
                  <Select 
                    onValueChange={(value) => setValue('service_interest', value === 'none' ? '' : value)} // Permite desmarcar ou usa o valor
                    // defaultValue={''} // Default value for Select is handled by react-hook-form's defaultValues
                  >
                    <SelectTrigger id="service_interest" className="mt-1">
                      <SelectValue placeholder="Selecione um serviço (opcional)" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">Nenhum específico / Outro</SelectItem>
                      {services.map(service => (
                        <SelectItem key={service.id} value={service.name}> {/* Pode enviar o nome ou o ID */}
                          {service.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                   {/* Ou um Input simples se não quiser carregar serviços:
                   <Input id="service_interest" {...register('service_interest')} placeholder="Ex: Cabeamento Estruturado, CFTV" className="mt-1" />
                   */}
                </div>

                <div>
                  <Label htmlFor="message" className={errors.message ? 'text-destructive' : 'text-neutralDark'}>Descreva sua Necessidade</Label>
                  <Textarea id="message" {...register('message')} rows={6} placeholder="Forneça detalhes sobre o projeto, quantidades, local, ou qualquer informação relevante..." className={`mt-1 ${errors.message ? 'border-destructive' : ''}`} />
                  {errors.message && <p className="text-sm text-destructive mt-1">{errors.message.message}</p>}
                </div>
                
                {formStatus === 'error' && submitError && (
                    <div className="p-3 rounded-md bg-destructive/15 text-destructive text-sm flex items-center gap-2">
                        <AlertTriangle className="h-5 w-5 flex-shrink-0"/>
                        <p>{submitError}</p>
                    </div>
                )}

                <div>
                  <Button type="submit" className="w-full bg-primaryBlue hover:bg-opacity-90 text-neutralWhite py-3 text-base" disabled={isSubmitting}>
                    {isSubmitting ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <Send className="mr-2 h-5 w-5" />}
                    {isSubmitting ? 'Enviando Solicitação...' : 'Enviar Solicitação de Orçamento'}
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Orcamento;
