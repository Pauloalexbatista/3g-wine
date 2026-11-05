# Ponto de Situação - 3GWINE

Este documento serve como memória técnica e ponto de partida para qualquer sessão de desenvolvimento da **3GWINE**.

---

## 🎯 Identidade & Stack Tecnológico
* **Nome Oficial da Marca:** **3GWINE** (Garrafeira Exclusiva)
* **Titular Legal:** Mário Jorge dos Santos Medeiros (Empresário em Nome Individual)
* **NIF:** 223412899 | **CAE:** 47250 (Comércio a Retalho de Bebidas)
* **Morada da Loja Física:** Rua António França Borges N-14 B, 2625-187 Póvoa de Santa Iria
* **Contactos Oficiais:** `3gwine@gmail.com` | `963 908 617` | `21 959 15 22`
* **Domínios em Produção:** `https://3gwine.pt` e `https://www.3gwine.pt`
* **Stack Tecnológico:** Next.js 16 (App Router), React 19, Tailwind CSS, PostgreSQL 16 (Docker VPS Hostinger).
* **Infraestrutura:** VPS Hostinger (`187.7.68.192`) gerida com Coolify + Traefik SSL Let's Encrypt.
* **Volume Persistente de Dados:** `/opt/3gwine/postgres-data` com backups diários às 03:00 em `/opt/3gwine/backups`.

---

## 🔐 Credenciais de Administração
* **URL do Admin:** `https://3gwine.pt/admin`
* **Palavra-passe de Acesso:** `Gemeos-3GWine`
* **Sessão:** Cookie `admin_access` (HttpOnly, Secure, 24 horas).
* **Bloqueio Rápido:** Botão `🔒 Bloquear Admin` no topo do ecrã para fechar sessão de imediato.

---

## ✅ Funcionalidades Concluídas & Ativas em Produção (1 de Novembro de 2026)

### 1. Abertura Pública do Site & Certificado SSL
* O site encontra-se 100% aberto ao público sob HTTPS (`3gwine.pt`).
* O middleware permite acesso público global, reservando a validação de palavra-passe estritamente para as rotas administrativas (`/admin` e `/admin/*`).

### 2. Migração Integral para PostgreSQL Local (Eliminação do Supabase)
* O conector Supabase em cloud foi totalmente descontinuado em prol de uma base de dados local PostgreSQL 16 no VPS.
* Pool nativo implementado em `src/lib/db.ts` comunicando diretamente com o container `3gwine-postgres`.
* Tabelas em produção:
  - `products`: Produtos da garrafeira (com sanitização e tipagem numérica de preços).
  - `orders`: Encomendas de clientes e estados de envio/pagamento.
  - `newsletter_subscribers`: Subscrições da newsletter no rodapé.
  - `contact_messages`: Mensagens e pedidos de apoio de clientes enviados por `/contactos`.
  - `tax_rates`: Tabela de taxas de IVA (13%, 23%, 6%).
* Todos os produtos mock/fictícios foram eliminados do código e da base de dados.

### 3. Painel de Administração Integrado (`/admin`)
* **🍷 Produtos:** Listagem, criação, edição e remoção de produtos, com suporte para destaque da semana e seleção de imagens. Preços blindados com `Number()` contra erros de renderização.
* **📧 Newsletter:** Gestão de subscritores com botão de exportação instantânea para **CSV/Excel** (para envio de campanhas no Brevo/Mailchimp).
* **💬 Contactos:** Gestão de pedidos de contacto recebidos pelo site, com botão direto para responder por email (`mailto:`) e eliminar mensagem.
* **🏷️ Taxas de IVA:** Parametrização e ajuste dinâmico das taxas por tipo de produto.
* **📦 Encomendas:** Gestão de encomendas, filtros de envio e emissão de guias de impressão.

### 4. Conformidade Legal & RGPD (Decreto-Lei n.º 24/2014 & UE 2016/679) - Requisitos IFTHENPAY
* **Identificação Legal no Rodapé e Páginas Dedicadas:** Exibição clara e transparente do titular Mário Jorge dos Santos Medeiros, NIF 223412899, CAE 47250 e morada do estabelecimento comercial na Póvoa de Santa Iria.
* **Páginas Dedicadas e Rotas Canónicas Criadas:**
  - `/termos` (e `/termos-e-condicoes`): Termos e Condições Gerais de Venda com identificação completa (art. 4.º, 1-a do DL 24/2014), idade legal (18 anos - DL 106/2015), métodos de pagamento IFTHENPAY, prazos de entrega e direito de livre resolução.
  - `/envios-e-devolucoes`: Prazos detalhados para Continente (24h-72h) e Ilhas (3-8d), portes (€12.50 / Grátis ≥ €150), levantamento em loja física gratuito (24h), acondicionamento anti-choque e verificação na entrega.
  - `/privacidade` (e `/politica-de-privacidade`): Política de Privacidade RGPD (Regulamento UE 2016/679 e Lei 58/2019), direitos ARCO com contacto `3gwine@gmail.com` e autoridade CNPD.
  - `/ral` (e `/livro-reclamacoes`): Entidades de Resolução Alternativa de Litígios (CACCL Lisboa, CNIACC e ODR) e acesso direto ao Livro de Reclamações Eletrónico.
* **Direito de Livre Resolução (Artigo 10.º do DL 24/2014):**
  - Informação legal completa sobre o prazo de 14 dias sem justificação.
  - Disponibilização do **Modelo Legal de Formulário de Livre Resolução** pronto a preencher.
* **Livro de Reclamações Eletrónico:**
  - Banner oficial e link direto no rodapé e nas páginas legais para `https://www.livroreclamacoes.pt`.
* **Checkout Transparente e Ativo no Carrinho (`/carrinho`):**
  - Processo de compra reativado com simulação/sandbox IFTHENPAY totalmente operacional (Multibanco e MB WAY).
  - Checkbox obrigatória de confirmação dos Termos e Condições, Envios, Privacidade e maioridade legal (18 anos).

### 5. Marca 100% Exclusiva 3GWINE
* Eliminadas todas as menções anteriores a "3GBARBEARIA" de todo o website, formulários, rodapé, textos da história e carrinho de compras.
* Opção de entrega atualizada para: `Levantamento na Garrafeira (Loja Física)`.
* Cores dos títulos ("A Nossa História" e "Transparência & Identificação Legal") ajustadas para amarelo dourado de alto contraste.

### 6. Saneamento de Segurança & Resolução do Alerta GitGuardian (5 de Novembro de 2026)
* **Remoção de Credenciais Hardcoded:**
  - `src/lib/db.ts`: Eliminada a string de fallback com a URI e password do PostgreSQL. A ligação agora lê estritamente `process.env.DATABASE_URL`.
  - `src/app/api/verify-password/route.ts`: Eliminada a palavra-passe hardcoded. A verificação agora lê estritamente `process.env.ADMIN_PASSWORD`.
  - `src/components/AuthForm.tsx`: Eliminadas todas as palavras-passe e validações em texto claro do código do cliente, delegando a verificação na totalidade para a API de backend.
* **Ambiente de Produção Blindado (Coolify na VPS):**
  - Variáveis `DATABASE_URL` e `ADMIN_PASSWORD` injetadas de forma encriptada na base de dados de orquestração do Coolify e no ficheiro `.env` da aplicação.
* **Modelo de Configuração (`.env.example`):**
  - Criado ficheiro de exemplo com placeholders sem exposição de segredos reais.

---

## 🔜 Próximos Passos
1. **Reanálise e Ativação Final IFTHENPAY:**
   - Efetuar deploy para produção (`git commit` e push para Coolify na VPS Hostinger).
   - Responder ao email da IFTHENPAY indicando os URLs das páginas de conformidade implementadas.
   - Assim que as chaves de produção forem fornecidas pela entidade bancária, preencher no ficheiro `.env` do VPS:
     * `IFTHENPAY_MB_KEY`
     * `IFTHENPAY_ENTIDADE`
     * `IFTHENPAY_SUBENTIDADE`
     * `IFTHENPAY_MBWAY_KEY`
     * Alterar `IFTHENPAY_SANDBOX=false`
2. **Inserção do Catálogo Real:**
   - O cliente já pode aceder ao Admin (`https://3gwine.pt/admin`) com a sua password de administração e começar a inserir as referências reais da garrafeira.
3. **Resolução no Painel GitGuardian / GitHub:**
   - No alerta recebido por email ou no GitHub / GitGuardian dashboard, marcar o incidente como resolvido (*Remediated / Resolved*).

---
**Data da Última Atualização:** 5 de Novembro de 2026 (Saneamento Completo de Credenciais e Blindagem por Variáveis de Ambiente)
