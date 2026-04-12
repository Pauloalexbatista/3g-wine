# Ponto de Situação - 3GWINE

Este ficheiro serve como "memória" e ponto de partida para novos agentes/conversas continuarem o desenvolvimento do projeto 3GWINE sem perder o contexto.

## 🎯 Resumo do Projeto
A **3GWINE** é uma Garrafeira Original que nasceu em Outubro de 2016 dentro de uma Barbearia, 3GBARBEARIA. Foi o primeiro projeto deste género criado em Portugal, nascendo de uma paixão vínica do proprietário Mário Medeiros.
- **Stack Tecnológico:** Next.js 14+ (App Router), React, Tailwind CSS, Framer Motion, Supabase.
- **Design System:** Tema premium e escuro. Cores principais: Preto/Cinzento escuro (fundos), Dourado (#D4AF37, #F3E5AB) para destaques. O nome deve ser sempre grafado como **3GWINE** (tudo junto, maiúsculas, mesma altura).

## ✅ O que já está feito
1. **Configuração Base:** Next.js configurado com Tailwind e Supabase.
2. **Autenticação:** Integração com Supabase Auth configurada.
3. **Página Inicial (`/`):** 
   - Hero section com vídeo de fundo e destaque da semana.
   - Secção de história atualizada (Barbearia/2016).
4. **Layout Global:**
   - **Header & Footer:** Normalizados com a marca **3GWINE**.
5. **Página Vinho Virtual (`/vinho-virtual`):**
   - Página dedicada ao vinho "Virtual" (um vinho real da marca, não confundir com Web3). Design premium com vídeo e ficha técnica.
6. **Branding (Abril 2026):**
   - **Normalização Total:** Nome corrigido para **3GWINE** globalmente. Removido o desalinhamento do "3".

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
