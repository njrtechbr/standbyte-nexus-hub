// src/admin/pages/pages/PageContentFormPage.tsx
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm, Controller, useFieldArray } from 'react-hook-form'; // Adicionado useFieldArray
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
// import { Checkbox } from '@/components/ui/checkbox'; // Pode não ser usado aqui
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'; // Para tipo de seção
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { ArrowLeft, Save, Loader2, AlertTriangle, PlusCircle, Trash2 } from 'lucide-react';
import { getPageContentById, updatePageContent } from '@/admin/services/pageContentService'; // Ajustado
import type { PageContent, ContentSection } from '@/admin/types/pageContentTypes'; // Ajustado
// import { useToast } from '@/components/ui/use-toast';

// Schema Zod para ContentSection
const contentSectionSchema = z.object({
  id: z.string().optional(), // UUID ou identificador frontend
  type: z.string().min(1, { message: "Tipo da seção é obrigatório." }),
  title: z.string().optional().nullable(),
  text_content: z.string().optional().nullable(),
  image_url: z.string().url({ message: "URL de imagem inválida" }).optional().or(z.literal('')).nullable(),
  image_alt_text: z.string().optional().nullable(),
  cta_text: z.string().optional().nullable(),
  cta_link: z.string().url({ message: "URL de CTA inválida" }).optional().or(z.literal('')).nullable(),
  items: z.array(z.object({ question: z.string(), answer: z.string() })).optional().nullable(), // Para FAQ
});

// Schema Zod para PageContent
const pageContentFormSchema = z.object({
  page_identifier: z.string(), // Read-only no form
  title: z.string().optional().nullable(),
  meta_title: z.string().max(60, { message: "Meta Título deve ter no máximo 60 caracteres." }).optional().nullable(),
  meta_description: z.string().max(160, { message: "Meta Descrição deve ter no máximo 160 caracteres." }).optional().nullable(),
  meta_keywords: z.string().optional().nullable(),
  structured_data: z.string().optional().nullable(), // Para JSON em texto
  content_sections: z.array(contentSectionSchema).optional().nullable(),
});

export type PageContentFormValues = z.infer<typeof pageContentFormSchema>;

const SECTION_TYPES = [
  { value: 'hero', label: 'Hero Banner' },
  { value: 'textWithImage', label: 'Texto com Imagem' },
  { value: 'faq', label: 'FAQ (Perguntas Frequentes)' },
  { value: 'cta_banner', label: 'Banner de Chamada para Ação' },
  { value: 'generic_text', label: 'Bloco de Texto Genérico' },
  // Adicionar outros tipos conforme necessário
];


export default function PageContentFormPage() {
  const navigate = useNavigate();
  const { pageId } = useParams<{ pageId: string }>(); // Usando ID da tabela
  // const { toast } = useToast();

  const [loadingPage, setLoadingPage] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [pageIdentifierDisplay, setPageIdentifierDisplay] = useState<string>('');


  const { register, handleSubmit, control, reset, watch, setValue, formState: { errors, isSubmitting } } = useForm<PageContentFormValues>({
    resolver: zodResolver(pageContentFormSchema),
    defaultValues: {
      page_identifier: '', title: null, meta_title: null, meta_description: null,
      meta_keywords: null, structured_data: null, content_sections: [],
    }
  });

  const { fields, append, remove } = useFieldArray({ // Removido 'update' pois não é usado diretamente aqui
    control,
    name: "content_sections",
  });

  useEffect(() => {
    if (pageId) {
      setLoadingPage(true);
      setLoadError(null);
      getPageContentById(pageId)
        .then(page => {
          if (page) {
            setPageIdentifierDisplay(page.page_identifier); // Para exibir o identificador
            const formData = {
              ...page,
              structured_data: page.structured_data ? JSON.stringify(page.structured_data, null, 2) : '',
              content_sections: page.content_sections || [],
            };
            reset(formData as PageContentFormValues); // Cast para garantir compatibilidade
          } else {
            setLoadError('Conteúdo da página não encontrado.');
          }
        })
        .catch(err => setLoadError(err.message || 'Erro ao carregar conteúdo da página.'))
        .finally(() => setLoadingPage(false));
    }
  }, [pageId, reset]);

  const onSubmit = async (formData: PageContentFormValues) => {
    if (!pageId) return;

    let structuredDataToSave = null;
    if (formData.structured_data) {
      try {
        structuredDataToSave = JSON.parse(formData.structured_data);
      } catch (e) {
        alert("Erro: Dados Estruturados (JSON-LD) não é um JSON válido.");
        return;
      }
    }
    
    // Assegurar que 'items' em seções FAQ seja um array de objetos
    const processedSections = formData.content_sections?.map(section => {
        if (section.type === 'faq' && typeof section.items === 'string') {
            try {
                return { ...section, items: JSON.parse(section.items) };
            } catch (e) {
                // Se o JSON for inválido, manter como string para o usuário corrigir, ou lançar erro
                // Para este exemplo, vamos manter como string e esperar que a validação Zod pegue se for malformado
                // Ou melhor, tentar converter e se falhar, pode-se adicionar um erro específico
                console.warn("JSON inválido para itens da FAQ na seção:", section.title, e);
                // Poderia adicionar um erro ao form aqui: setError(`content_sections.${index}.items`, { type: 'custom', message: 'JSON inválido'});
                return section; // Devolve a seção como está se o parse falhar
            }
        }
        return section;
    });

    const dataToUpdate = {
        ...formData,
        structured_data: structuredDataToSave,
        content_sections: processedSections || [], // Usar seções processadas
    };
    delete (dataToUpdate as any).page_identifier;


    try {
      await updatePageContent(pageId, dataToUpdate);
      alert("Conteúdo da página atualizado com sucesso!");
      navigate('/admin/pages-content');
    } catch (err: any) {
      console.error("Erro ao salvar conteúdo da página:", err);
      alert(`Erro ao salvar: ${err.message}`);
    }
  };
  
  // UI de Loading e Erro (similar)
  if (loadingPage) { return ( <div className="flex justify-center items-center h-64"><Loader2 className="h-16 w-16 animate-spin text-primaryBlue" /><p className="ml-4 text-lg text-neutralDark">Carregando dados da página...</p></div>); }
  if (loadError) { return ( <div className="p-4 rounded-md bg-destructive/10 text-destructive flex flex-col items-center justify-center h-64"><AlertTriangle className="h-12 w-12 mb-4" /><h2 className="text-xl font-semibold mb-2">Erro ao Carregar Página</h2><p>{loadError}</p><Button variant="outline" onClick={() => navigate('/admin/pages-content')} className="mt-4">Voltar para Lista</Button></div>); }


  return (
    <div className="p-2 md:p-4">
      <Button variant="outline" onClick={() => navigate('/admin/pages-content')} className="mb-6">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Voltar para Lista de Páginas
      </Button>

      <Card className="shadow-lg max-w-5xl mx-auto">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-primaryBlue">
            Editar Conteúdo da Página: <span className="text-neutralDark font-mono">{pageIdentifierDisplay || pageId}</span>
          </CardTitle>
          <CardDescription>Modifique os campos de SEO e as seções de conteúdo abaixo.</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent className="space-y-6">
            {/* Campos de SEO e Título Principal */}
            <fieldset className="border p-4 rounded-md">
              <legend className="text-lg font-semibold text-primaryBlue px-2">Informações Globais e SEO</legend>
              <div className="mt-2 space-y-4">
                <div>
                  <Label htmlFor="title" className="text-neutralDark">Título Principal da Página (H1 ou interno)</Label>
                  <Input id="title" {...register('title')} />
                </div>
                <div>
                  <Label htmlFor="meta_title" className={errors.meta_title ? 'text-destructive' : 'text-neutralDark'}>Meta Título (SEO)</Label>
                  <Input id="meta_title" {...register('meta_title')} className={errors.meta_title ? 'border-destructive' : ''}/>
                  {errors.meta_title && <p className="text-sm text-destructive mt-1">{errors.meta_title.message}</p>}
                </div>
                <div>
                  <Label htmlFor="meta_description" className={errors.meta_description ? 'text-destructive' : 'text-neutralDark'}>Meta Descrição (SEO)</Label>
                  <Textarea id="meta_description" {...register('meta_description')} rows={3} className={errors.meta_description ? 'border-destructive' : ''}/>
                  {errors.meta_description && <p className="text-sm text-destructive mt-1">{errors.meta_description.message}</p>}
                </div>
                <div>
                  <Label htmlFor="meta_keywords" className="text-neutralDark">Palavras-chave (SEO, separadas por vírgula)</Label>
                  <Input id="meta_keywords" {...register('meta_keywords')} />
                </div>
                <div>
                  <Label htmlFor="structured_data" className="text-neutralDark">Dados Estruturados (JSON-LD para Schema.org)</Label>
                  <Textarea id="structured_data" {...register('structured_data')} rows={7} placeholder='Cole aqui o JSON-LD...' />
                  <p className="text-xs text-neutralMid mt-1">Deve ser um JSON válido.</p>
                </div>
              </div>
            </fieldset>

            {/* Seções de Conteúdo */}
            <fieldset className="border p-4 rounded-md">
              <legend className="text-lg font-semibold text-primaryBlue px-2">Seções de Conteúdo da Página</legend>
              <div className="space-y-4 mt-2">
                {fields.map((field, index) => (
                  <Card key={field.id} className="p-4 bg-neutralLight/30">
                    <CardHeader className="p-0 pb-2 flex flex-row justify-between items-center">
                        <CardTitle className="text-md">Seção #{index + 1}</CardTitle>
                        <Button type="button" variant="ghost" size="sm" onClick={() => remove(index)} className="text-destructive hover:text-destructive-foreground hover:bg-destructive">
                            <Trash2 className="w-4 h-4 mr-1" /> Remover Seção
                        </Button>
                    </CardHeader>
                    <CardContent className="p-0 grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor={`content_sections.${index}.type`} className="text-neutralDark">Tipo da Seção</Label>
                        <Controller
                            name={`content_sections.${index}.type`}
                            control={control}
                            render={({ field: controllerField }) => (
                                <Select onValueChange={controllerField.onChange} defaultValue={controllerField.value}>
                                    <SelectTrigger id={`content_sections.${index}.type`}> <SelectValue placeholder="Selecione o tipo" /> </SelectTrigger>
                                    <SelectContent>
                                        {SECTION_TYPES.map(type => <SelectItem key={type.value} value={type.value}>{type.label}</SelectItem>)}
                                        <SelectItem value="custom_type">Outro (Customizado)</SelectItem>
                                    </SelectContent>
                                </Select>
                            )}
                        />
                      </div>
                      <div>
                        <Label htmlFor={`content_sections.${index}.title`} className="text-neutralDark">Título da Seção</Label>
                        <Input id={`content_sections.${index}.title`} {...register(`content_sections.${index}.title`)} />
                      </div>
                      <div className="md:col-span-2">
                        <Label htmlFor={`content_sections.${index}.text_content`} className="text-neutralDark">Conteúdo em Texto</Label>
                        <Textarea id={`content_sections.${index}.text_content`} {...register(`content_sections.${index}.text_content`)} rows={4}/>
                      </div>
                      <div>
                        <Label htmlFor={`content_sections.${index}.image_url`} className="text-neutralDark">URL da Imagem</Label>
                        <Input id={`content_sections.${index}.image_url`} {...register(`content_sections.${index}.image_url`)} />
                      </div>
                      <div>
                        <Label htmlFor={`content_sections.${index}.image_alt_text`} className="text-neutralDark">ALT da Imagem</Label>
                        <Input id={`content_sections.${index}.image_alt_text`} {...register(`content_sections.${index}.image_alt_text`)} />
                      </div>
                       <div>
                        <Label htmlFor={`content_sections.${index}.cta_text`} className="text-neutralDark">Texto do Botão (CTA)</Label>
                        <Input id={`content_sections.${index}.cta_text`} {...register(`content_sections.${index}.cta_text`)} />
                      </div>
                      <div>
                        <Label htmlFor={`content_sections.${index}.cta_link`} className="text-neutralDark">Link do Botão (CTA)</Label>
                        <Input id={`content_sections.${index}.cta_link`} {...register(`content_sections.${index}.cta_link`)} />
                      </div>
                      {watch(`content_sections.${index}.type`) === 'faq' && (
                        <div className="md:col-span-2 space-y-3">
                            <h4 className="text-sm font-medium text-neutralDark">Itens da FAQ (JSON Array)</h4>
                            <Textarea 
                                placeholder='[{"question": "Pergunta 1?", "answer": "Resposta 1."}, {"question": "Pergunta 2?", "answer": "Resposta 2."}]' 
                                rows={4} 
                                {...register(`content_sections.${index}.items` as any)} // Cast para simplificar
                                onChange={(e) => {
                                    // Não tentar fazer parse aqui, Zod vai lidar com isso no submit
                                    // Apenas registrar o valor como string
                                    setValue(`content_sections.${index}.items`, e.target.value as any);
                                }}
                                // O valor default é tratado pelo react-hook-form e Zod schema (array de objetos)
                                // Para exibição inicial, se for string, mostrar como está, se for array, stringify
                                defaultValue={
                                    Array.isArray(watch(`content_sections.${index}.items`)) ?
                                    JSON.stringify(watch(`content_sections.${index}.items`), null, 2) :
                                    watch(`content_sections.${index}.items`) || ''
                                }
                            />
                            <p className="text-xs text-neutralMid mt-1">Insira um array JSON. Ex: [{"question":"P1","answer":"R1"}]</p>
                            {errors.content_sections?.[index]?.items?.message && (
                                <p className="text-sm text-destructive mt-1">
                                    {errors.content_sections[index]?.items?.message}
                                </p>
                            )}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
                <Button type="button" variant="outline" onClick={() => append({ type: '', title: '', text_content: '', image_url: '', image_alt_text: '', cta_text: '', cta_link: '', items: [] })}>
                  <PlusCircle className="w-4 h-4 mr-2" /> Adicionar Nova Seção
                </Button>
              </div>
            </fieldset>
          </CardContent>
          <CardFooter className="flex justify-end gap-4 pt-8">
            <Button type="button" variant="outline" onClick={() => navigate('/admin/pages-content')} disabled={isSubmitting}>
              Cancelar
            </Button>
            <Button type="submit" className="bg-primaryBlue hover:bg-opacity-90 text-primary-foreground" disabled={isSubmitting || loadingPage}>
              {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
              Salvar Alterações
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
