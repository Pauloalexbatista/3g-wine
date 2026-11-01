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

### 4. Conformidade Legal & RGPD (Decreto-Lei n.º 24/2014 & UE 2016/679)
* **Identificação Legal no Rodapé e Sobre Nós:** Exibição clara e transparente do titular Mário Jorge dos Santos Medeiros, NIF 223412899, CAE 47250 e morada do estabelecimento comercial.
* **Links Legais Obrigatórios:**
  - Link direto para o **Livro de Reclamações Eletrónico** (`https://www.livroreclamacoes.pt`).
  - Menção à entidade de **Resolução Alternativa de Litígios (RAL)**: Centro de Arbitragem de Conflitos de Consumo de Lisboa (CACCL).
* **Consentimento RGPD:**
  - Checkbox de consentimento obrigatória no formulário `/contactos`.
  - Aviso legal na subscrição da newsletter no rodapé.
* **Modal de Termos & Privacidade:**
  - Reestruturado em cartões elegantes verticais sequenciais (1 a 6) de alto contraste com títulos em amarelo dourado (`#FFD700`).

### 5. Marca 100% Exclusiva 3GWINE
* Eliminadas todas as menções anteriores a "3GBARBEARIA" de todo o website, formulários, rodapé, textos da história e carrinho de compras.
* Opção de entrega atualizada para: `Levantamento na Garrafeira (Loja Física)`.
* Cores dos títulos ("A Nossa História" e "Transparência & Identificação Legal") ajustadas para amarelo dourado de alto contraste.

---

## 🔜 Próximos Passos
1. **Ativação Final IFTHENPAY:**
   - Aguardar a conclusão do processo de validação comercial da conta pelo IFTHENPAY.
   - Assim que as chaves forem fornecidas pela entidade bancária, preencher no ficheiro `.env` do VPS:
     * `IFTHENPAY_MB_KEY`
     * `IFTHENPAY_ENTIDADE`
     * `IFTHENPAY_SUBENTIDADE`
     * `IFTHENPAY_MBWAY_KEY`
     * Alterar `IFTHENPAY_SANDBOX=false`
2. **Inserção do Catálogo Real:**
   - O cliente já pode aceder ao Admin (`https://3gwine.pt/admin`) com a password `Gemeos-3GWine` e começar a inserir as referências reais da garrafeira.

---
**Data da Última Atualização:** 1 de Novembro de 2026 (Deploy `6a71d06` ativo em produção)
