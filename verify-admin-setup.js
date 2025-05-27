#!/usr/bin/env node

/**
 * Script de Verificação Final do Painel Administrativo
 * Execute após aplicar as migrações no Supabase Cloud
 */

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('🔍 VERIFICAÇÃO FINAL DO PAINEL ADMINISTRATIVO');
console.log('============================================\n');

const checks = [
  {
    id: 'migration',
    title: '✅ Migração aplicada no Supabase Cloud',
    description: 'Executou o SQL no painel do Supabase?',
    required: true
  },
  {
    id: 'admin_user',
    title: '👤 Usuário administrador criado',
    description: 'Atribuiu o papel super_admin a um usuário?',
    required: true
  },
  {
    id: 'env_vars',
    title: '🔧 Variáveis de ambiente configuradas',
    description: 'VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY estão corretos?',
    required: true
  },
  {
    id: 'dependencies',
    title: '📦 Dependências instaladas',
    description: 'Executou npm install (especialmente recharts)?',
    required: true
  },
  {
    id: 'dev_server',
    title: '🚀 Servidor de desenvolvimento rodando',
    description: 'A aplicação está rodando em localhost?',
    required: true
  }
];

async function askQuestion(question) {
  return new Promise(resolve => {
    rl.question(question, answer => {
      resolve(answer.toLowerCase().trim());
    });
  });
}

async function runChecks() {
  console.log('📋 Vamos verificar se tudo está configurado corretamente:\n');
  
  const results = {};
  
  for (const check of checks) {
    console.log(`${check.title}`);
    console.log(`   ${check.description}`);
    
    const answer = await askQuestion('   ✅ Concluído? (s/n): ');
    results[check.id] = answer === 's' || answer === 'sim' || answer === 'y' || answer === 'yes';
    
    if (!results[check.id] && check.required) {
      console.log('   ❌ Este item é obrigatório para o funcionamento do painel.\n');
    } else if (results[check.id]) {
      console.log('   ✅ Concluído!\n');
    } else {
      console.log('   ⚠️  Não concluído (opcional).\n');
    }
  }
  
  return results;
}

async function showResults(results) {
  console.log('\n📊 RESULTADO DA VERIFICAÇÃO');
  console.log('===========================\n');
  
  const completed = Object.values(results).filter(Boolean).length;
  const total = checks.length;
  const requiredCompleted = checks.filter(check => 
    check.required && results[check.id]
  ).length;
  const requiredTotal = checks.filter(check => check.required).length;
  
  console.log(`📈 Progresso Geral: ${completed}/${total} (${Math.round(completed/total*100)}%)`);
  console.log(`🔒 Itens Obrigatórios: ${requiredCompleted}/${requiredTotal}\n`);
  
  if (requiredCompleted === requiredTotal) {
    console.log('🎉 PARABÉNS! Todos os itens obrigatórios foram concluídos!');
    console.log('🚀 Seu painel administrativo está pronto para uso!\n');
    
    console.log('📱 PRÓXIMOS PASSOS:');
    console.log('1. Acesse http://localhost:5173/admin');
    console.log('2. Faça login com o usuário administrador');
    console.log('3. Teste todas as funcionalidades do painel');
    console.log('4. Configure as configurações do sistema conforme necessário\n');
    
    console.log('🛠️ RECURSOS DISPONÍVEIS:');
    console.log('• Dashboard com estatísticas em tempo real');
    console.log('• Gerenciamento completo de produtos');
    console.log('• Controle de pedidos e status');
    console.log('• Gestão de usuários e permissões');
    console.log('• Catálogo de serviços e cotações');
    console.log('• Analytics avançado com gráficos');
    console.log('• Configurações do sistema\n');
    
  } else {
    console.log('⚠️ Alguns itens obrigatórios ainda precisam ser concluídos:');
    checks.forEach(check => {
      if (check.required && !results[check.id]) {
        console.log(`   ❌ ${check.title}`);
      }
    });
    console.log('\n📋 Por favor, complete os itens pendentes antes de prosseguir.\n');
  }
  
  console.log('📄 DOCUMENTAÇÃO ADICIONAL:');
  console.log('• SUPABASE_CLOUD_SETUP.md - Guia de configuração');
  console.log('• ADMIN_PANEL_COMPLETE.md - Documentação completa');
  console.log('• README.md - Instruções gerais do projeto\n');
}

async function main() {
  try {
    const results = await runChecks();
    await showResults(results);
    
    if (Object.values(results).every(Boolean)) {
      console.log('🎯 DICA: Para testar rapidamente, você pode executar:');
      console.log('   npm run test-admin-panel');
      console.log('   (Execute este comando em outro terminal)\n');
    }
    
  } catch (error) {
    console.error('❌ Erro durante a verificação:', error.message);
  } finally {
    rl.close();
  }
}

if (require.main === module) {
  main();
}

module.exports = { runChecks, showResults };
