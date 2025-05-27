#!/usr/bin/env node

/**
 * Standbyte Admin Panel Setup Guide
 * 
 * This script helps you complete the admin panel configuration
 * for your Supabase cloud instance.
 */

console.log(`
╔══════════════════════════════════════════════════════════════╗
║                 🚀 STANDBYTE ADMIN PANEL SETUP               ║
╚══════════════════════════════════════════════════════════════╝

O painel administrativo está quase pronto! Siga estes passos:

📋 CHECKLIST DE CONFIGURAÇÃO:

┌──────────────────────────────────────────────────────────────┐
│ 1️⃣  APLICAR MIGRAÇÃO NO SUPABASE                              │
└──────────────────────────────────────────────────────────────┘

1. Acesse: https://supabase.com/dashboard
2. Vá para seu projeto → SQL Editor
3. Execute o conteúdo do arquivo:
   📁 supabase/migrations/20250526203000_add_services_and_quotes.sql

┌──────────────────────────────────────────────────────────────┐
│ 2️⃣  CRIAR USUÁRIO ADMINISTRADOR                               │
└──────────────────────────────────────────────────────────────┘

Após aplicar a migração:

1. Registre-se no site normalmente
2. Copie seu User ID do painel do Supabase (Authentication → Users)
3. Execute este SQL no SQL Editor:

   INSERT INTO user_roles (user_id, role_id) 
   SELECT 'SEU-USER-ID-AQUI', id 
   FROM admin_roles 
   WHERE name = 'super_admin';

┌──────────────────────────────────────────────────────────────┐
│ 3️⃣  VERIFICAR CONFIGURAÇÃO                                    │
└──────────────────────────────────────────────────────────────┘

Execute o teste:
   node test-admin-panel.js

┌──────────────────────────────────────────────────────────────┐
│ 4️⃣  INICIAR O SERVIDOR                                        │
└──────────────────────────────────────────────────────────────┘

   npm run dev

┌──────────────────────────────────────────────────────────────┐
│ 5️⃣  ACESSAR O PAINEL ADMIN                                    │
└──────────────────────────────────────────────────────────────┘

1. Faça login no site
2. Navegue para: http://localhost:5173/admin
3. Você verá o painel completo com todas as funcionalidades!

╔══════════════════════════════════════════════════════════════╗
║                     ✨ FUNCIONALIDADES                        ║
╚══════════════════════════════════════════════════════════════╝

✅ Dashboard com métricas
✅ Gerenciamento de usuários
✅ Gerenciamento de produtos
✅ Gerenciamento de pedidos
✅ Gerenciamento de serviços ⭐ NOVO
✅ Gerenciamento de orçamentos ⭐ NOVO
✅ Analytics e relatórios ⭐ NOVO
✅ Configurações do sistema ⭐ NOVO
✅ Controle de permissões
✅ Interface responsiva

╔══════════════════════════════════════════════════════════════╗
║                      🎯 PRÓXIMOS PASSOS                       ║
╚══════════════════════════════════════════════════════════════╝

Após configurar o admin:

1. 📧 Configure SMTP nas configurações do sistema
2. 🎨 Personalize aparência e cores
3. 💼 Adicione produtos e serviços
4. 📊 Monitore métricas no dashboard
5. 🔐 Crie usuários admin adicionais conforme necessário

═══════════════════════════════════════════════════════════════
Para suporte: contato@standbyte.com
Documentation: Veja ADMIN_PANEL_COMPLETE.md
═══════════════════════════════════════════════════════════════
`);

// Check if dependencies are installed
const fs = require('fs');
const path = require('path');

try {
  const packageJson = JSON.parse(fs.readFileSync(path.join(__dirname, 'package.json'), 'utf8'));
  
  console.log(`\n📦 DEPENDÊNCIAS VERIFICADAS:`);
  console.log(`   React: ${packageJson.dependencies?.react || 'não encontrado'}`);
  console.log(`   TypeScript: ${packageJson.devDependencies?.typescript || 'não encontrado'}`);
  console.log(`   Supabase: ${packageJson.dependencies?.['@supabase/supabase-js'] || 'não encontrado'}`);
  console.log(`   Recharts: ${packageJson.dependencies?.recharts || 'não encontrado'}`);
  
  if (!packageJson.dependencies?.recharts) {
    console.log(`\n⚠️  Execute: npm install recharts`);
  }
  
} catch (error) {
  console.log(`\n⚠️  Não foi possível verificar as dependências`);
}

console.log(`\n🎉 O painel administrativo está completo e pronto para uso!`);
