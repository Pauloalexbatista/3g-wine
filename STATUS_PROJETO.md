# Ponto de SituaÃ§Ã£o - 3GWINE

Este ficheiro serve como "memÃ³ria" e ponto de partida para novos agentes/conversas continuarem o desenvolvimento do projeto 3GWINE sem perder o contexto.

## ðŸŽ¯ Resumo do Projeto
A **3GWINE** Ã© uma Garrafeira Original que nasceu em Outubro de 2016 dentro de uma Barbearia, 3GBARBEARIA. Foi o primeiro projeto deste gÃ©nero criado em Portugal, nascendo de uma paixÃ£o vÃ­nica do proprietÃ¡rio MÃ¡rio Medeiros.
- **Stack TecnolÃ³gico:** Next.js 14+ (App Router), React, Tailwind CSS, Framer Motion, Supabase.
- **Design System:** Tema premium e escuro. Cores principais: Preto/Cinzento escuro (fundos), Dourado (#D4AF37, #F3E5AB) para destaques. O nome deve ser sempre grafado como **3GWINE** (tudo junto, maiÃºsculas, mesma altura).

## âœ… O que jÃ¡ estÃ¡ feito (Atualizado 14 de Abril 2026)
1. **ConfiguraÃ§Ã£o Base:** Next.js configurado com Tailwind e Supabase.
2. **AutenticaÃ§Ã£o:** IntegraÃ§Ã£o com Supabase Auth configurada.
3. **Branding & Identidade:**
   - **NormalizaÃ§Ã£o Global:** Criada a classe CSS `.brand-3gwine` para garantir que o **3GWINE** Ã© apresentado com a fonte correta e o nÃºmero "3" perfeitamente alinhado em todas as pÃ¡ginas (Hero, Login, CabeÃ§alho, RodapÃ©).
   - **PÃ¡gina inicial:** Hero section corrigida visualmente.
4. **PÃ¡gina Vinho Virtual (`/vinho-virtual`):**
   - Implementadas animaÃ§Ãµes premium com Framer Motion (*scroll-reveal*).
   - Adicionado efeito de brilho dourado (*gold shimmer*) no botÃ£o de compra.
   - Refinamento de layout e tipografia para um aspeto mais luxuoso.
5. **IntegraÃ§Ã£o Supabase:**
   - **Newsletter:** Funcional e ligada ao Supabase.
   - **Contactos:** FormulÃ¡rio de contactos ligado Ã  nova tabela `contact_messages` no Supabase, com feedback de sucesso/erro.
6. **Sobre NÃ³s:** Hero section simplificada, removendo o tÃ­tulo redundante e dando destaque Ã  frase "Garrafeira Exclusiva desde o inÃ­cio".
7. **Admin Panel:** Corrigido bug de "uncontrolled input" na gestÃ£o de produtos (Destaque da Semana).
8. **SeguranÃ§a:** Criado script `fix_security_warnings.sql` para endurecimento das polÃ­ticas RLS no Supabase.

## ðŸš§ PrÃ³ximos Passos
1. **GestÃ£o de Encomendas e Pagamentos:** IntegraÃ§Ã£o com o **IFTHENPAY** para pagamentos reais.
2. **Loja:** RevisÃ£o do design dos cards de produto na pÃ¡gina da loja.
3. **Dashboard:** Melhorar a visualizaÃ§Ã£o das mensagens recebidas e subscritores para o admin.

## ðŸ› ï¸ InstruÃ§Ãµes para o Novo Agente
1. **LÃª o cÃ³digo antes de alterar.** Usa o `view_file` para perceberes como os ficheiros (especialmente o `globals.css` e o `tailwind.config.ts`) estÃ£o estruturados.
2. **MantÃ©m a coerÃªncia estÃ©tica.** Qualquer novo componente deve seguir o padrÃ£o de fundo escuro, texto claro e detalhes dourados. Usa componentes Framer Motion (`<motion.div>`) para animaÃ§Ãµes de entrada ou hover, mantendo-as subtis e elegantes.
3. **NÃ£o apagues cÃ³digo que funciona** para tentar reescrever de raiz a nÃ£o ser que o utilizador pede expressamente.

---
**Ãšltima atualizaÃ§Ã£o:** 14 de Abril de 2026

