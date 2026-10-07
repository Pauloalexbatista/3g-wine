# 🍷 SERVIDOR & INFRAESTRUTURA - 3GWINE

> **LEITURA OBRIGATÓRIA PARA QUALQUER AGENTE OU DESENVOLVEDOR ANTES DE INICIAR QUALQUER TRABALHO DE INFRAESTRUTURA OU DEPLOY.**

Este documento consolida toda a especificação, arquitetura, segurança, base de dados e instruções de acesso ao servidor de produção do projeto **3GWINE**.

---

## 1. Especificações Técnicas da VPS

* **Fornecedor:** Hostinger Cloud VPS
* **Hostname:** `srv2041596.hstgr.cloud`
* **IP Público:** `187.7.68.192`
* **Sistema Operativo:** Ubuntu 24.04 LTS (Kernel Linux 6.8)
* **Processador:** 2 vCPU
* **Memória RAM:** 8.0 GB RAM
* **SWAP:** 4.0 GB configurado (`/swapfile`, `vm.swappiness = 10`)
* **Armazenamento:** 100 GB NVMe / SSD (~93 GB disponíveis)
* **Repositório GitHub:** `https://github.com/Pauloalexbatista/3g-wine.git` (Branch: `main`)

---

## 2. Domínio Oficial & DNS

* **Domínio Principal:** `3gwine.pt`
* **Subdomínio:** `www.3gwine.pt`
* **Gestor de DNS:** Hostinger Gerenciador DNS
* **Nameservers:** `ns1.dns-parking.com` e `ns2.dns-parking.com`
* **Estado Atual:** `Requested` (em ativação e propagação no registo)
* **Apontamentos DNS Configurados / Alvo:**
  * Tipo `A` (`@`) $\rightarrow$ `187.7.68.192`
  * Tipo `A` (`www`) $\rightarrow$ `187.7.68.192`
* **Certificado SSL:** Emissão automática gratuita via Let's Encrypt gerida pelo Traefik Proxy do Coolify assim que o domínio estiver propagado.

---

## 3. Acesso SSH & Segurança (Hardening Concluído)

Acesso restrito e protegido de acordo com as melhores práticas de cibersegurança:

* **Porta SSH:** `22`
* **Autenticação:** **Exclusivamente por Chave SSH** (`PubkeyAuthentication yes`)
  * `PasswordAuthentication no`: Tentativas de login por palavra-passe são rejeitadas de imediato para prevenir ataques de força bruta.
  * `PermitRootLogin without-password`: Acesso root estritamente permitido apenas através de chaves SSH previamente autorizadas.

### Chaves SSH Autorizadas no Servidor:
1. `admin@3gwine` — Chave dedicada do Administrador (`~/.ssh/id_ed25519_3gwine` na máquina de desenvolvimento local).
2. `coolify` — Chave interna de automação gerida pela plataforma Coolify para orquestração de containers e deploys.

### Como Aceder (Máquina Local de Desenvolvimento):
O atalho SSH já se encontra parametrizado no ficheiro `~/.ssh/config` local:
```powershell
ssh 3gwine
```
*(Não requer passwords nem indicação manual do caminho da chave).*

---

## 4. Firewall (UFW)

A firewall nativa do Ubuntu (`ufw`) está **ativa** com política restritiva padrão:
* **Default Incoming:** `DENY` (Bloqueia qualquer entrada não expressamente autorizada)
* **Default Outgoing:** `ALLOW`

### Portas Abertas & Propósito:
| Porta / Protocolo | Serviço | Descrição |
| :--- | :--- | :--- |
| `22/tcp` | SSH | Administração remota segura via chave pública |
| `80/tcp` | HTTP | Tráfego web padrão (redirecionado para HTTPS pelo proxy) |
| `443/tcp` | HTTPS | Tráfego web seguro com certificados SSL (Traefik) |
| `8000/tcp` | Coolify UI | Painel Web de administração da plataforma Coolify |
| `6001/tcp` | Coolify Events | WebSockets de eventos da plataforma |
| `6002/tcp` | Coolify Terminal | Terminal interativo e logs em tempo real |

> ⚠️ **Aviso de Segurança:** Portas de base de dados (ex: `5432` PostgreSQL, `6379` Redis) **NUNCA** devem ser abertas diretamente na Firewall externa. O acesso às bases de dados deve ser efetuado exclusivamente dentro da rede interna do Docker ou via túnel SSH.

---

## 5. Plataforma de Gestão: Coolify & Docker

O servidor possui o ecossistema **Docker Engine** e a plataforma **Coolify** pré-configurados:

* **Painel Coolify:** `http://187.7.68.192:8000` (ou domínio associado)
* **Conta de Administrador:** `3gwine@gmail.com`
* **Proxy Reverso Integrado:** Traefik Proxy (`coolify-proxy`) gerindo certificados SSL Let's Encrypt de forma automática.
* **Componentes Ativos:**
  * `coolify` (Núcleo de orquestração)
  * `coolify-proxy` (Traefik)
  * `coolify-db` (PostgreSQL interno do Coolify)
  * `coolify-redis` (Fila e cache do Coolify)
  * `coolify-sentinel` (Monitorização de saúde do servidor)

---

## 6. Base de Dados PostgreSQL Independente (VPS)

A base de dados de produção do **3GWINE** encontra-se ativa e a correr diretamente na VPS, garantindo total independência, dados 100% locais e funcionamento 24/7 sem suspensões:

* **Motor:** PostgreSQL 16 Alpine (`3gwine-postgres`)
* **Base de Dados:** `wine3g_prod`
* **Utilizador:** `wine3g_user`
* **Porta Interna / Localhost:** `127.0.0.1:5432` (isolada da internet)
* **Rede Docker Privada:** `wine3g-network`
* **Volume Persistente:** `/opt/3gwine/postgres-data`
* **Ficheiros & Init SQL:** `/opt/3gwine/init-db/init.sql`

### Tabelas Ativas em Produção:
1. `products` — Catálogo de vinhos e garrafeira (Reserva do Douro, Quinta do Alentejo, etc.)
2. `tax_rates` — Taxas de IVA (Tinto 13%, Branco 13%, Rosé 13%, Espumante 13%, Azeite 6%, etc.)
3. `newsletter_subscribers` — Contactos inscritos na newsletter
4. `contact_messages` — Mensagens submetidas através do formulário de contactos
5. `orders` — Encomendas efetuadas, métodos de entrega e estado de pagamento

---

## 7. Registo de Operações Efetuadas (Changelog)

| Data | Tarefa Realizada | Detalhes |
| :--- | :--- | :--- |
| **07/10/2026** | **Chave SSH Dedicada** | Gerada `id_ed25519_3gwine` e configurado `~/.ssh/config` (`ssh 3gwine`). |
| **07/10/2026** | **Hardening SSH** | Desativado login por password (`PasswordAuthentication no`) e restrito root. |
| **07/10/2026** | **Memória SWAP** | Criado ficheiro de 4 GB (`/swapfile`) com persistência em `/etc/fstab` e `swappiness = 10`. |
| **07/10/2026** | **Firewall (UFW)** | UFW ativado com bloqueio default e portas 22, 80, 443, 8000, 6001, 6002 abertas. |
| **07/10/2026** | **PostgreSQL 16 Ativo** | Subido container `3gwine-postgres` na rede `wine3g-network` com volume persistente. |
| **07/10/2026** | **Importação de Schema** | Criadas tabelas `products`, `tax_rates`, `newsletter_subscribers`, `contact_messages`, `orders` com dados mock. |
| **07/10/2026** | **DNS Vinculado** | Domínio `3gwine.pt` adicionado no Gerenciador DNS da Hostinger (estado: *Requested*). |

---

## 8. Comandos Rápidos de Diagnóstico & Operação

```bash
# Ligar à VPS
ssh 3gwine

# Verificar recursos (CPU, RAM, Swap)
free -h
df -h /
uptime

# Ver estado de todos os containers
docker ps --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"

# Testar/Consultar Base de Dados PostgreSQL
docker exec -it 3gwine-postgres psql -U wine3g_user -d wine3g_prod -c "\dt"

# Verificar estado da Firewall
ufw status verbose

# Ver logs de um container específico
docker logs -f <nome-do-container>
```

---

## 9. Regras Mandatórias para Agentes de IA e Desenvolvedores

1. **NUNCA ativar login por password no SSH** (`PasswordAuthentication yes`).
2. **NUNCA expor serviços de base de dados ou Redis à Internet pública.**
3. **NUNCA fazer alterações de rede/firewall ou sshd sem testar uma segunda sessão SSH simultânea.**
4. **Respeitar a separação de chaves:** A chave `id_ed25519_3gwine` pertence exclusivamente ao projeto 3GWine e nunca deve ser partilhada ou misturada com servidores pessoais.
5. **Todas as aplicações web devem passar pelo Traefik (`coolify-proxy`)** para herdar HTTPS automático com TLS 1.3.
