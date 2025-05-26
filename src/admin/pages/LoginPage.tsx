// src/admin/pages/LoginPage.tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabaseClient'; // Ajuste o caminho se necessário
import { useAuthStore } from '@/store/authStore'; // Ajuste o caminho se necessário
import { Button } from '@/components/ui/button'; // Ajuste o caminho se necessário
import { Input } from '@/components/ui/input'; // Ajuste o caminho se necessário
import { Label } from '@/components/ui/label'; // Ajuste o caminho se necessário
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'; // Ajuste o caminho se necessário
// import { useToast } from "@/components/ui/use-toast"; // Se for usar toast

export default function LoginPage() {
  const navigate = useNavigate();
  const setUser = useAuthStore((state) => state.setUser);
  // const { toast } = useToast(); // Se for usar toast

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) {
        throw authError;
      }

      if (data.user) {
        setUser(data.user);
        // Idealmente, verificar se é admin aqui antes de setar isAdmin no store
        // useAuthStore.getState().setIsAdmin(true); // Simplificado por enquanto
        // toast({ title: "Login bem-sucedido!" });
        navigate('/admin/dashboard'); // Crie esta rota depois
      } else {
        // Caso inesperado
        throw new Error('Usuário não encontrado após o login.');
      }
    } catch (err: any) {
      setError(err.message || 'Ocorreu um erro ao tentar fazer login.');
      // toast({ title: "Erro no Login", description: err.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-neutralLight">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center text-primaryBlue">Admin Login</CardTitle>
          <CardDescription className="text-center text-neutralMid">
            Acesse o painel de administração
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" >Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="text-neutralDark"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" >Senha</Label>
              <Input
                id="password"
                type="password"
                placeholder="Sua senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="text-neutralDark"
              />
            </div>
            {error && <p className="text-sm text-destructive">{error}</p>}
            <Button type="submit" className="w-full bg-primaryBlue hover:bg-opacity-90 text-primary-foreground" disabled={loading}>
              {loading ? 'Entrando...' : 'Entrar'}
            </Button>
          </form>
        </CardContent>
        {/* <CardFooter>
          {/* Pode adicionar links como "Esqueci minha senha" aqui no futuro }
        </CardFooter> */}
      </Card>
    </div>
  );
}
