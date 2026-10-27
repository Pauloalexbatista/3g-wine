# Ponto de Situação - 3GWINE

Este ficheiro serve como "memória" e ponto de partida para o desenvolvimento do projeto 3GWINE.

## 🎯 Resumo do Projeto
A **3GWINE** é uma Garrafeira Original que nasceu em Outubro de 2016 dentro de uma Barbearia, 3GBARBEARIA. Foi o primeiro projeto deste género criado em Portugal, nascendo de uma paixão vínica do proprietário Mário Medeiros.
- **Stack Tecnológico:** Next.js 16+ (App Router), React, Tailwind CSS, Framer Motion, Supabase / PostgreSQL.
- **Design System:** Tema premium e escuro. Cores principais: Preto/Cinzento escuro (fundos), Dourado (#D4AF37, #F3E5AB) para destaques. O nome deve ser sempre grafado como **3GWINE** (tudo junto, maiúsculas, mesma altura).
- **Servidor & Infraestrutura:** VPS Hostinger (`187.7.68.192`) gerida com Coolify + Traefik SSL Let's Encrypt para `3gwine.pt` e `www.3gwine.pt`.

## ✅ O que já está feito (Atualizado 27 de Outubro 2026)
1. **Domínio Oficial & SSL Let's Encrypt:**
   - Domínio `3gwine.pt` e `www.3gwine.pt` 100% seguros com certificado oficial Let's Encrypt ativo (renovação automática).
2. **Fotografia Original da Loja / Barbearia:**
   - Adicionada a imagem de alta resolução da barbearia original no Hero da página inicial com enquadramento `objectPosition: 'center top'`, destacando o quadro do barbeiro e fundador, a adega de madeira e o ambiente autêntico.
3. **Integração IFTHENPAY (Multibanco & MB WAY) 100% Pronta:**
   - **Biblioteca do Serviço ([src/lib/ifthenpay.ts](file:///c:/Users/paulo/.gemini/antigravity/playground/core-omega/PRJT_3GWine/src/lib/ifthenpay.ts)):** Suporte total a geração de referências Multibanco e push notifications MB WAY, com modo de simulação (sandbox) ativado até o cliente introduzir as credenciais reais no `.env`.
   - **Endpoint de Checkout (`POST /api/checkout`):** Valida carrinho, impostos (IVA) e portes, insere a encomenda na base de dados e gera a referência Multibanco ou pedido MB WAY.
   - **Webhook Callback (`/api/payments/ifthenpay-callback`):** Endpoint GET e POST protegido com chave anti-phishing para confirmação automática em tempo real assim que o cliente paga.
   - **Endpoint de Estado (`/api/payments/status`):** Consulta automática e simulação em ambiente de testes.
   - **Interface do Carrinho ([src/app/carrinho/page.tsx](file:///c:/Users/paulo/.gemini/antigravity/playground/core-omega/PRJT_3GWine/src/app/carrinho/page.tsx)):**
     - Seleção elegante entre MB WAY e Multibanco;
     - Campo de NIF opcional para fatura;
     - Campo de telemóvel para MB WAY;
     - Modal de pagamento premium com contagem decrescente (MB WAY) e botão "Copiar Referência" (Multibanco);
     - Botão de simulação rápida para demonstração imediata ao cliente.
   - **Base de Dados (`orders`):**
     - Colunas adicionadas: `payment_status`, `payment_method`, `payment_entity`, `payment_reference`, `payment_request_id`, `payment_details`, `paid_at`, `customer_nif`.
   - **Painel de Administração ([src/app/admin/encomendas/page.tsx](file:///c:/Users/paulo/.gemini/antigravity/playground/core-omega/PRJT_3GWine/src/app/admin/encomendas/page.tsx)):**
     - Visualização de estado de pagamento (PAGO / PENDENTE);
     - Filtros por estado de envio e estado de pagamento;
     - NIF do cliente visível na tabela e na guia de impressão.

## 🔜 Próximos Passos
1. **Registo na IFTHENPAY:** Criar a conta com o Sr. Mário Medeiros e preencher as 4 chaves no `.env`.
2. **Produtos da Loja:** Importar catálogo de garrafas através do ficheiro `produtos_template_3gwine.csv`.
3. **Página de Produto Individual:** Criar rota de detalhe `/loja/[id]` se pretendido.

---
**Última atualização:** 27 de Outubro de 2026
