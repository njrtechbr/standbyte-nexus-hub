// src/pages/Contato.tsx
import React, { useState } from 'react'; // Adicionado useState
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { createContactMessage } from '@/admin/services/contactMessageService'; // Ajuste o caminho
import { Loader2, Send, CheckCircle, AlertTriangle } from 'lucide-react';
// import { usePageContent } from '@/hooks/usePageContent'; // Para buscar SEO dinâmico no futuro

// Schema de validação com Zod
const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Nome deve ter pelo menos 2 caracteres." }),
  email: z.string().email({ message: "Email inválido." }),
  phone: z.string().optional().nullable(),
  subject: z.string().optional().nullable(),
  message: z.string().min(10, { message: "Mensagem deve ter pelo menos 10 caracteres." }),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

const Contato = () => {
  // const { pageData, loading: pageLoading, error: pageError } = usePageContent("contato"); // Para SEO dinâmico
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [submitError, setSubmitError] = useState<string | null>(null);

  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: { name: '', email: '', phone: '', subject: '', message: '' }
  });

  const onSubmit = async (data: ContactFormValues) => {
    setFormStatus('submitting');
    setSubmitError(null);
    try {
      await createContactMessage(data);
      setFormStatus('success');
      reset(); // Limpa o formulário
    } catch (err: any) {
      setFormStatus('error');
      setSubmitError(err.message || "Ocorreu um erro ao enviar sua mensagem. Tente novamente.");
      console.error("Erro ao enviar mensagem de contato:", err);
    }
  };

  // SEO - usar pageData se disponível, senão fallback
  // const pageTitle = pageData?.meta_title || pageData?.title || "Contato - StandByte";
  // const pageDescription = pageData?.meta_description || "Entre em contato conosco para dúvidas, sugestões ou orçamentos.";
  const pageTitle = "Contato - StandByte";
  const pageDescription = "Entre em contato conosco para dúvidas, sugestões ou orçamentos.";


  return (
    <div className="min-h-screen bg-neutralWhite">
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        {/* Adicionar canonical, etc. */}
      </Helmet>
      <Header />

      <main className="py-12 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-primaryBlue">Entre em Contato</h1>
            <p className="mt-4 text-lg text-neutralMid max-w-xl mx-auto">
              Estamos aqui para ajudar. Preencha o formulário abaixo ou utilize nossos outros canais de comunicação.
            </p>
          </div>

          <div className="max-w-2xl mx-auto bg-neutralLight p-8 md:p-10 rounded-lg shadow-xl">
            {formStatus === 'success' ? (
              <div className="text-center py-10">
                <CheckCircle className="mx-auto h-16 w-16 text-green-500 mb-4" />
                <h2 className="text-2xl font-semibold text-neutralDark mb-2">Mensagem Enviada!</h2>
                <p className="text-neutralMid">Obrigado por entrar em contato. Responderemos em breve.</p>
                <Button onClick={() => setFormStatus('idle')} className="mt-6 bg-primaryBlue text-neutralWhite hover:bg-opacity-90">
                  Enviar Nova Mensagem
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div>
                  <Label htmlFor="name" className={errors.name ? 'text-destructive' : 'text-neutralDark'}>Nome Completo</Label>
                  <Input id="name" {...register('name')} placeholder="Seu nome" className={`mt-1 ${errors.name ? 'border-destructive' : ''}`} />
                  {errors.name && <p className="text-sm text-destructive mt-1">{errors.name.message}</p>}
                </div>

                <div>
                  <Label htmlFor="email" className={errors.email ? 'text-destructive' : 'text-neutralDark'}>Email</Label>
                  <Input id="email" type="email" {...register('email')} placeholder="seu@email.com" className={`mt-1 ${errors.email ? 'border-destructive' : ''}`} />
                  {errors.email && <p className="text-sm text-destructive mt-1">{errors.email.message}</p>}
                </div>

                <div>
                  <Label htmlFor="phone" className="text-neutralDark">Telefone (Opcional)</Label>
                  <Input id="phone" {...register('phone')} placeholder="(XX) XXXXX-XXXX" className="mt-1" />
                </div>

                <div>
                  <Label htmlFor="subject" className="text-neutralDark">Assunto (Opcional)</Label>
                  <Input id="subject" {...register('subject')} placeholder="Sobre o que você gostaria de falar?" className="mt-1" />
                </div>

                <div>
                  <Label htmlFor="message" className={errors.message ? 'text-destructive' : 'text-neutralDark'}>Sua Mensagem</Label>
                  <Textarea id="message" {...register('message')} rows={5} placeholder="Digite sua mensagem aqui..." className={`mt-1 ${errors.message ? 'border-destructive' : ''}`} />
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
                    {isSubmitting ? 'Enviando...' : 'Enviar Mensagem'}
                  </Button>
                </div>
              </form>
            )}
          </div>
          
          {/* Informações de contato adicionais podem vir de pageData.content_sections no futuro */}
          <div className="mt-16 text-center">
            <h3 className="text-2xl font-semibold text-primaryBlue mb-4">Outras Formas de Contato</h3>
            <p className="text-neutralMid">Email: contato@standbyte.com.br</p>
            <p className="text-neutralMid">Telefone: (XX) XXXX-XXXX</p>
            {/* Adicionar endereço, redes sociais, etc. */}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Contato;
