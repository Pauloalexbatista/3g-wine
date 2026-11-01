# Ponto de Situação - 3GWINE

Este ficheiro serve como "memória" e ponto de partida para o desenvolvimento do projeto 3GWINE.

## 🎯 Resumo do Projeto
A **3GWINE** é uma Garrafeira Original que nasceu em Outubro de 2016 dentro de uma Barbearia, 3GBARBEARIA. Foi o primeiro projeto deste género criado em Portugal, nascendo de uma paixão vínica do proprietário Mário Medeiros.
- **Stack Tecnológico:** Next.js 16+ (App Router), React, Tailwind CSS, Framer Motion, PostgreSQL 16 (VPS Hostinger).
- **Design System:** Tema premium e escuro. Cores principais: Preto/Cinzento escuro (fundos), Dourado (#D4AF37, #F3E5AB) para destaques. O nome deve ser sempre grafado como **3GWINE** (tudo junto, maiúsculas, mesma altura).
- **Servidor & Infraestrutura:** VPS Hostinger (`187.7.68.192`) gerida com Coolify + Traefik SSL Let's Encrypt para `3gwine.pt` e `www.3gwine.pt`.

## ✅ O que já está feito (Atualizado 1 de Novembro 2026)
1. **Abertura Pública do Site Oficial (`3gwine.pt` e `www.3gwine.pt`):**
   - Removida a barreira global de palavra-passe (`/acesso`) do middleware. O website passa a estar 100% público, com certificado oficial SSL Let's Encrypt ativo.
2. **Pagamentos Online em Modo "Ativação Bancária" no Carrinho:**
   - Adicionado aviso sofisticado no checkout informando os clientes de que o catálogo está aberto para exploração, enquanto os pagamentos automáticos (MB / MB WAY) aguardam a validação final da conta bancária na IFTHENPAY.
   - Fornecido contacto direto da garrafeira/barbearia para encomendas manuais imediatas.
3. **Hero Section Aperfeiçoada:**
   - Enquadramento da imagem de fundo deslocado para a esquerda (`objectPosition: '28% top'`), dando visibilidade ao retrato histórico do barbeiro fundador e à garrafeira original.
   - Janela do "Destaque da Semana" alinhada e fixada harmoniosamente mais à direita (`margin-left: auto`).
4. **Credenciais e Robustez do Painel de Administração (`/admin`):**
   - Conta de Administrador: **Email:** `3gwine@gmail.com` (ou `admin@3gwine.pt`) | **Password:** `3GWINE`.
   - Sistema de autenticação blindado para permitir login direto e seguro de Administrador mesmo sem dependência de serviços externos.
5. **Garantia de Persistência da Base de Dados & Backups:**
   - Base de dados PostgreSQL 16 Alpine (`3gwine-postgres`) a correr de forma independente em `/opt/3gwine/postgres-data`.
   - Backups automáticos diários comprimidos às 03:00 da manhã (`/opt/3gwine/backups`) com histórico de 30 dias verificado e ativo. Deploys do código nunca tocam nos dados.
6. **Integração IFTHENPAY (Multibanco & MB WAY) 100% Pronta:**
   - Conta criada ontem pelo cliente; aguarda-se validação comercial e receção das 4 chaves para colocação no `.env`.

## 🔜 Próximos Passos
1. **Ativação Final IFTHENPAY:** Inserir as 4 chaves comerciais assim que a IFTHENPAY confirmar a conta e passar `IFTHENPAY_SANDBOX=false`.
2. **Catálogo de Produtos:** Garantir a persistência direta via PostgreSQL local na VPS e carregar o catálogo de garrafas através do `produtos_template_3gwine.csv`.
3. **Página de Produto Individual:** Criar rota de detalhe `/loja/[id]` se pretendido.

---
**Última atualização:** 1 de Novembro de 2026
