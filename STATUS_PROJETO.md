# Ponto de Situação - 3GWINE

Este ficheiro serve como "memória" e ponto de partida para novos agentes/conversas continuarem o desenvolvimento do projeto 3GWINE sem perder o contexto.

## 🎯 Resumo do Projeto
A **3GWINE** é uma Garrafeira Original que nasceu em Outubro de 2016 dentro de uma Barbearia, 3GBARBEARIA. Foi o primeiro projeto deste género criado em Portugal, nascendo de uma paixão vínica do proprietário Mário Medeiros.
- **Stack Tecnológico:** Next.js 14+ (App Router), React, Tailwind CSS, Framer Motion, Supabase.
- **Design System:** Tema premium e escuro. Cores principais: Preto/Cinzento escuro (fundos), Dourado (#D4AF37, #F3E5AB) para destaques. O nome deve ser sempre grafado como **3GWINE** (tudo junto, maiúsculas, mesma altura).

## ✅ O que já está feito (Atualizado 14 de Abril 2026)
1. **Configuração Base:** Next.js configurado com Tailwind e Supabase.
2. **Autenticação:** Integração com Supabase Auth configurada.
3. **Branding & Identidade:**
   - **Normalização Global:** Criada a classe CSS `.brand-3gwine` para garantir que o **3GWINE** é apresentado com a fonte correta e o número "3" perfeitamente alinhado em todas as páginas (Hero, Login, Cabeçalho, Rodapé).
   - **Página inicial:** Hero section corrigida visualmente.
4. **Página Vinho Virtual (`/vinho-virtual`):**
   - Implementadas animações premium com Framer Motion (*scroll-reveal*).
   - Adicionado efeito de brilho dourado (*gold shimmer*) no botão de compra.
   - Refinamento de layout e tipografia para um aspeto mais luxuoso.
5. **Integração Supabase:**
   - **Newsletter:** Funcional e ligada ao Supabase.
   - **Contactos:** Formulário de contactos ligado à nova tabela `contact_messages` no Supabase, com feedback de sucesso/erro.
6. **Sobre Nós:** Hero section simplificada, removendo o título redundante e dando destaque à frase "Garrafeira Exclusiva desde o início".
7. **Admin Panel:** Corrigido bug de "uncontrolled input" na gestão de produtos (Destaque da Semana).
8. **Segurança:** Criado script `fix_security_warnings.sql` para endurecimento das políticas RLS no Supabase.

## 🚧 Próximos Passos
1. **Gestão de Encomendas e Pagamentos:** Integração com o **IFTHENPAY** para pagamentos reais.
2. **Loja:** Revisão do design dos cards de produto na página da loja.
3. **Dashboard:** Melhorar a visualização das mensagens recebidas e subscritores para o admin.

## 🛠️ Instruções para o Novo Agente
1. **Lê o código antes de alterar.** Usa o `view_file` para perceberes como os ficheiros (especialmente o `globals.css` e o `tailwind.config.ts`) estão estruturados.
2. **Mantém a coerência estética.** Qualquer novo componente deve seguir o padrão de fundo escuro, texto claro e detalhes dourados. Usa componentes Framer Motion (`<motion.div>`) para animações de entrada ou hover, mantendo-as subtis e elegantes.
3. **Não apagues código que funciona** para tentar reescrever de raiz a não ser que o utilizador pede expressamente.

---
**Última atualização:** 14 de Abril de 2026
