# Ponto de Situação - 3G-Wine

Este ficheiro serve como "memória" e ponto de partida para novos agentes/conversas continuarem o desenvolvimento do projeto 3G-Wine sem perder o contexto.

## 🎯 Resumo do Projeto
A **3G-Wine** é uma plataforma inovadora que combina uma garrafeira física premium com a Web3 (Vinhos Virtuais/NFTs).
- **Stack Tecnológico:** Next.js 14+ (App Router), React, Tailwind CSS, Framer Motion (para animações), Supabase (Autenticação e Base de Dados), Lucide React (Ícones).
- **Design System:** Tema premium e escuro. Cores principais: Preto/Cinzento escuro (fundos), Dourado (#D4AF37, #F3E5AB, etc.) para destaques, branco/cinzento claro para texto. Uso de "glassmorphism" (fundos semi-transparentes com blur) e animações suaves.

## ✅ O que já está feito (NÃO ESTRAGAR)
1. **Configuração Base:** Next.js configurado com Tailwind e Supabase.
2. **Autenticação:** Integração com Supabase Auth configurada. Páginas `/auth/login` e `/auth/signup` implementadas e a funcionar (com dark/gold theme).
3. **Página Inicial (`/`):** 
   - Hero section com vídeo de fundo e animações.
   - Secção de "A Nossa Seleção" (grid de produtos físicos).
   - Secção "O Futuro do Vinho" (introdução aos Vinhos Virtuais).
   - Secção "Viver a Experiência" (eventos/provas).
4. **Layout Global:**
   - **Header:** Transparente no topo, fica sólido ao fazer scroll. Navegação responsiva. Inclui o componente `UserMenu` atualizado que verifica se o utilizador está logado (mostra o email e botão de logout) ou não (mostra link para login).
   - **Footer:** Componente global com links e informações. Atualizado com logótipo dourado e alinhado.
5. **Página Vinhos Virtuais (`/vinhos-virtuais`):**
   - Página principal da secção Web3 desenhada com um aspeto premium e misterioso.
   - Efeitos 3D/hover nas cartas dos NFTs.
   - Estatísticas da coleção e grid de vinhos digitais disponíveis.
   - Esta página **está com um design excelente** e foi otimizada com um novo layout de vídeo e descrição equilibrados.
6. **Branding e Identidade Visual (Março 2026):**
   - **Logo "3GWINE":** Alinhamento do "3" corrigido globalmente através de CSS (`logo-3`).
   - **Cores Premium:** Restauro total das variáveis de cor Dourado/Burgundy e limpeza de inconsistências.
   - **Header:** Recuperação da transparência escura e desfoque originais para melhor integração visual.
   - **Destaque da Semana:** Interface corrigida (sem sobreposições) e com tipografia amarela para legibilidade máxima.

## 🚧 O que está a ser feito / Próximos Passos

1. **Revisão de Páginas Secundárias:** O utilizador está a rever as outras páginas para garantir consistência com a nova página inicial.
2. **Vinhos Virtuais (`/vinhos-virtuais/[id]`):** A página de detalhe já existe, a tarefa agora consiste em **melhorar as suas formatações e design**.
3. **Gestão de Encomendas e Pagamentos:** O carrinho tem os atalhos preparados. O passo lógico final será integrar com o **IFTHENPAY**, ligando as encomendas ao checkout e ativando callbacks para confirmar pagamentos. Esta funcionalidade será ativamente testada.

## 🛠️ Instruções para o Novo Agente
1. **Lê o código antes de alterar.** Usa o `view_file` para perceberes como os ficheiros (especialmente o `globals.css` e o `tailwind.config.ts`) estão estruturados.
2. **Mantém a coerência estética.** Qualquer novo componente deve seguir o padrão de fundo escuro, texto claro e detalhes dourados. Usa componentes Framer Motion (`<motion.div>`) para animações de entrada ou hover, mantendo-as subtis e elegantes.
3. **Não apagues código que funciona** para tentar reescrever de raiz a não ser que o utilizador pede expressamente.

---
**Última atualização:** 13 de Março de 2026
