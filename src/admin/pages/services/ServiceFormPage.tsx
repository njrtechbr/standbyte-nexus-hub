// src/admin/pages/services/ServiceFormPage.tsx
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import slugify from 'slugify';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { ArrowLeft, Save, Loader2, AlertTriangle } from 'lucide-react';
import { createService, getServiceById, updateService } from '@/admin/services/serviceService'; // Ajustado
import type { Service } from '@/admin/types/serviceTypes'; // Ajustado
// import { useToast } from '@/components/ui/use-toast';

// Schema de validação com Zod para Serviços
const serviceFormSchema = z.object({
  name: z.string().min(3, { message: "Nome do serviço deve ter pelo menos 3 caracteres." }),
  slug: z.string().min(3, { message: "Slug deve ter pelo menos 3 caracteres." }),
  description: z.string().optional().nullable(),
  // Adicionar campos específicos de serviço aqui se necessário
  // duration: z.string().optional().nullable(),
  category: z.string().optional().nullable(),
  is_published: z.boolean().default(false),
  image_url: z.string().url({ message: "URL da imagem inválida." }).optional().or(z.literal('')).nullable(),
  image_alt_text: z.string().optional().nullable(),
  meta_title: z.string().max(60, { message: "Meta Título deve ter no máximo 60 caracteres." }).optional().nullable(),
  meta_description: z.string().max(160, { message: "Meta Descrição deve ter no máximo 160 caracteres." }).optional().nullable(),
  meta_keywords: z.string().optional().nullable(),
  structured_data: z.string().optional().nullable(), // Para JSON em texto por enquanto
});

export type ServiceFormValues = z.infer<typeof serviceFormSchema>;

export default function ServiceFormPage() {
  const navigate = useNavigate();
  const { serviceId } = useParams<{ serviceId: string }>();
  const isEditMode = Boolean(serviceId);
  // const { toast } = useToast();

  const [loadingService, setLoadingService] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);

  const { register, handleSubmit, control, watch, setValue, reset, formState: { errors, isSubmitting } } = useForm<ServiceFormValues>({
    resolver: zodResolver(serviceFormSchema),
    defaultValues: {
      name: '', slug: '', description: null, category: null,
      is_published: false, image_url: null, image_alt_text: null,
      meta_title: null, meta_description: null, meta_keywords: null,
      structured_data: null,
    }
  });

  useEffect(() => {
    if (isEditMode && serviceId) {
      setLoadingService(true);
      setLoadError(null);
      getServiceById(serviceId)
        .then(service => {
          if (service) {
            const formData = Object.fromEntries(
                Object.entries(service).map(([key, value]) => [key, value === null ? '' : value])
            ) as unknown as ServiceFormValues;
            reset(formData);
          } else {
            setLoadError('Serviço não encontrado.');
            // toast({ title: "Erro", description: "Serviço não encontrado.", variant: "destructive" });
          }
        })
        .catch(err => {
            setLoadError(err.message || 'Erro ao carregar dados do serviço.');
            // toast({ title: "Erro", description: err.message || 'Erro ao carregar dados do serviço.', variant: "destructive" });
        })
        .finally(() => setLoadingService(false));
    }
  }, [serviceId, isEditMode, reset /*, toast*/]);

  const watchedName = watch('name');
  const currentSlug = watch('slug'); // Observe o slug atual

  useEffect(() => {
    if (watchedName && !isEditMode) {
        // Gera o slug apenas se não estiver em modo de edição
        const generatedSlug = slugify(watchedName, { lower: true, strict: true, remove: /[*+~.()'"!:@]/g });
        
        // Verifica se o slug atual é diferente do que seria gerado a partir do nome atual
        // Isso tenta inferir se o usuário alterou o slug manualmente.
        // Uma abordagem mais robusta seria ter um estado `slugManuallyChanged`.
        const slugFromCurrentName = slugify(watchedName || '', { lower: true, strict: true, remove: /[*+~.()'"!:@]/g });
        if (currentSlug === slugFromCurrentName || !currentSlug) {
             setValue('slug', generatedSlug);
        }
    }
  }, [watchedName, setValue, isEditMode, currentSlug]);


  const onSubmit = async (formData: ServiceFormValues) => {
    const dataToSave = Object.fromEntries(
        Object.entries(formData).map(([key, value]) => [key, value === '' ? null : value])
    ) as ServiceFormValues;

    try {
      if (isEditMode && serviceId) {
        await updateService(serviceId, dataToSave);
        // toast({ title: "Sucesso", description: "Serviço atualizado com sucesso!" });
        alert("Serviço atualizado com sucesso! (Simulado)");
      } else {
        await createService(dataToSave as Omit<Service, 'id' | 'created_at'>);
        // toast({ title: "Sucesso", description: "Serviço criado com sucesso!" });
        alert("Serviço criado com sucesso! (Simulado)");
      }
      navigate('/admin/services');
    } catch (err: any) {
      console.error("Erro ao salvar serviço:", err);
      alert(`Erro ao salvar: ${err.message || "Não foi possível salvar o serviço."}`);
      // toast({ title: "Erro ao Salvar", description: err.message || "Não foi possível salvar o serviço.", variant: "destructive" });
    }
  };
  
  if (loadingService) {
    return ( <div className="flex justify-center items-center h-64"><Loader2 className="h-16 w-16 animate-spin text-primaryBlue" /><p className="ml-4 text-lg text-neutralDark">Carregando dados do serviço...</p></div>);
  }
  if (loadError) {
    return ( <div className="p-4 rounded-md bg-destructive/10 text-destructive flex flex-col items-center justify-center h-64"><AlertTriangle className="h-12 w-12 mb-4" /><h2 className="text-xl font-semibold mb-2">Erro ao Carregar Serviço</h2><p>{loadError}</p><Button variant="outline" onClick={() => navigate('/admin/services')} className="mt-4">Voltar para Lista</Button></div>);
  }

  return (
    <div className="p-2 md:p-4">
      <Button variant="outline" onClick={() => navigate('/admin/services')} className="mb-6">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Voltar para Lista de Serviços
      </Button>

      <Card className="shadow-lg max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-primaryBlue">
            {isEditMode ? 'Editar Serviço' : 'Adicionar Novo Serviço'}
          </CardTitle>
          <CardDescription>
            {isEditMode ? `Editando serviço: ${watch('name') || ''}` : 'Preencha os campos abaixo para cadastrar um novo serviço.'}
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent className="space-y-6">
            {/* Informações Básicas */}
            <fieldset className="border p-4 rounded-md">
              <legend className="text-lg font-semibold text-primaryBlue px-2">Informações Básicas</legend>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                <div>
                  <Label htmlFor="name" className={errors.name ? 'text-destructive' : 'text-neutralDark'}>Nome do Serviço</Label>
                  <Input id="name" {...register('name')} className={errors.name ? 'border-destructive' : ''} />
                  {errors.name && <p className="text-sm text-destructive mt-1">{errors.name.message}</p>}
                </div>
                <div>
                  <Label htmlFor="slug" className={errors.slug ? 'text-destructive' : 'text-neutralDark'}>Slug (URL)</Label>
                  <Input id="slug" {...register('slug')} className={errors.slug ? 'border-destructive' : ''} />
                  {errors.slug && <p className="text-sm text-destructive mt-1">{errors.slug.message}</p>}
                </div>
              </div>
              <div className="mt-4">
                <Label htmlFor="description" className="text-neutralDark">Descrição Completa do Serviço</Label>
                <Textarea id="description" {...register('description')} rows={5} />
                <p className="text-xs text-neutralMid mt-1">Considere um botão "Gerar com IA" aqui no futuro.</p>
              </div>
            </fieldset>

            {/* Categoria e Detalhes Específicos (se houver) */}
            <fieldset className="border p-4 rounded-md">
              <legend className="text-lg font-semibold text-primaryBlue px-2">Detalhes Adicionais</legend>
              <div className="mt-2">
                <Label htmlFor="category" className="text-neutralDark">Categoria do Serviço</Label>
                <Input id="category" {...register('category')} />
                {/* Exemplo:
                <Label htmlFor="duration" className="text-neutralDark">Duração Estimada</Label>
                <Input id="duration" {...register('duration')} /> */}
              </div>
            </fieldset>
            
            {/* Imagem */}
            <fieldset className="border p-4 rounded-md">
              <legend className="text-lg font-semibold text-primaryBlue px-2">Mídia</legend>
              <div className="mt-2">
                <Label htmlFor="image_url" className={errors.image_url ? 'text-destructive' : 'text-neutralDark'}>URL da Imagem Principal</Label>
                <Input id="image_url" {...register('image_url')} placeholder="https://exemplo.com/imagem.jpg" className={errors.image_url ? 'border-destructive' : ''} />
                {errors.image_url && <p className="text-sm text-destructive mt-1">{errors.image_url.message}</p>}
                <p className="text-xs text-neutralMid mt-1">Futuramente: Upload para Supabase Storage.</p>
              </div>
              <div className="mt-4">
                <Label htmlFor="image_alt_text" className="text-neutralDark">Texto Alternativo da Imagem (ALT)</Label>
                <Input id="image_alt_text" {...register('image_alt_text')} placeholder="Descrição da imagem para acessibilidade e SEO" />
              </div>
            </fieldset>

            {/* Publicação */}
            <fieldset className="border p-4 rounded-md">
              <legend className="text-lg font-semibold text-primaryBlue px-2">Status de Publicação</legend>
              <div className="flex items-center space-x-2 mt-2">
                <Controller
                    name="is_published"
                    control={control}
                    render={({ field }) => ( <Checkbox id="is_published" checked={field.value} onCheckedChange={field.onChange} /> )}
                />
                <Label htmlFor="is_published" className="text-neutralDark cursor-pointer">Publicar serviço?</Label>
              </div>
            </fieldset>

            {/* SEO */}
            <fieldset className="border p-4 rounded-md">
              <legend className="text-lg font-semibold text-primaryBlue px-2">Otimização para Buscas (SEO)</legend>
              <div className="space-y-4 mt-2">
                <div>
                  <Label htmlFor="meta_title" className={errors.meta_title ? 'text-destructive' : 'text-neutralDark'}>Meta Título</Label>
                  <Input id="meta_title" {...register('meta_title')} className={errors.meta_title ? 'border-destructive' : ''} />
                  {errors.meta_title && <p className="text-sm text-destructive mt-1">{errors.meta_title.message}</p>}
                </div>
                <div>
                  <Label htmlFor="meta_description" className={errors.meta_description ? 'text-destructive' : 'text-neutralDark'}>Meta Descrição</Label>
                  <Textarea id="meta_description" {...register('meta_description')} rows={3} className={errors.meta_description ? 'border-destructive' : ''} />
                  {errors.meta_description && <p className="text-sm text-destructive mt-1">{errors.meta_description.message}</p>}
                </div>
                <div>
                  <Label htmlFor="meta_keywords" className="text-neutralDark">Palavras-chave</Label>
                  <Input id="meta_keywords" {...register('meta_keywords')} placeholder="ex: serviço, consultoria, desenvolvimento" />
                </div>
              </div>
            </fieldset>
            
            {/* Dados Estruturados (JSON) */}
            <fieldset className="border p-4 rounded-md">
              <legend className="text-lg font-semibold text-primaryBlue px-2">Dados Estruturados (Avançado)</legend>
              <div className="mt-2">
                <Label htmlFor="structured_data" className="text-neutralDark">Dados Estruturados (JSON-LD para Schema.org)</Label>
                <Textarea id="structured_data" {...register('structured_data')} rows={5} placeholder='Ex: { "@context": "https://schema.org/", "@type": "Service", "name": "Nome do Serviço" ... }' />
                 <p className="text-xs text-neutralMid mt-1">Insira um objeto JSON-LD válido.</p>
              </div>
            </fieldset>

          </CardContent>
          <CardFooter className="flex justify-end gap-4 pt-8">
            <Button type="button" variant="outline" onClick={() => navigate('/admin/services')} disabled={isSubmitting}>
              Cancelar
            </Button>
            <Button type="submit" className="bg-primaryBlue hover:bg-opacity-90 text-primary-foreground" disabled={isSubmitting || loadingService}>
              {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
              {isSubmitting ? 'Salvando...' : (isEditMode ? 'Salvar Alterações' : 'Salvar Serviço')}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
