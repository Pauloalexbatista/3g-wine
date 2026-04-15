-- SCRIPT DE SEGURANÇA SUPABASE - 3GWINE
-- Execute este script no SQL Editor do seu projeto Supabase para resolver avisos de segurança.

---------------------------------------------------------
-- 1. TABELA: products
---------------------------------------------------------
-- Ativar RLS
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- Remover políticas antigas para evitar conflitos
DROP POLICY IF EXISTS "Public Read Access" ON public.products;
DROP POLICY IF EXISTS "Public Write Access" ON public.products;
DROP POLICY IF EXISTS "Public Update Access" ON public.products;
DROP POLICY IF EXISTS "Public Delete Access" ON public.products;

-- Política: Qualquer pessoa pode ver os produtos
CREATE POLICY "Permitir leitura pública" 
ON public.products FOR SELECT 
TO public 
USING (true);

-- Política: Apenas utilizadores AUTENTICADOS (Admin) podem alterar dados
CREATE POLICY "Permitir gestão apenas a admins" 
ON public.products FOR ALL 
TO authenticated 
USING (true) 
WITH CHECK (true);

---------------------------------------------------------
-- 2. TABELA: newsletter_subscribers
---------------------------------------------------------
-- Ativar RLS
ALTER TABLE public.newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- Remover políticas antigas
DROP POLICY IF EXISTS "Permitir inserção de novos subscritores" ON public.newsletter_subscribers;
DROP POLICY IF EXISTS "Permitir leitura a utilizadores autenticados" ON public.newsletter_subscribers;

-- Política: Qualquer pessoa pode subscrever (inserir)
CREATE POLICY "Permitir subscrição pública" 
ON public.newsletter_subscribers FOR INSERT 
TO public 
WITH CHECK (true);

-- Política: Apenas utilizadores AUTENTICADOS podem ver a lista
CREATE POLICY "Permitir leitura apenas a admins" 
ON public.newsletter_subscribers FOR SELECT 
TO authenticated 
USING (true);

---------------------------------------------------------
-- 3. TABELA: contact_messages
---------------------------------------------------------
-- Ativar RLS
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

-- Remover políticas antigas (se existirem)
DROP POLICY IF EXISTS "Permitir envio de mensagens" ON public.contact_messages;
DROP POLICY IF EXISTS "Permitir leitura de mensagens a admins" ON public.contact_messages;

-- Política: Qualquer pessoa pode enviar mensagens (inserir)
CREATE POLICY "Permitir envio público de mensagens" 
ON public.contact_messages FOR INSERT 
TO public 
WITH CHECK (true);

-- Política: Apenas utilizadores AUTENTICADOS podem ler as mensagens
CREATE POLICY "Permitir leitura de mensagens apenas a admins" 
ON public.contact_messages FOR SELECT 
TO authenticated 
USING (true);

---------------------------------------------------------
-- 4. PERMISSÕES DE ROLE (GRANT)
---------------------------------------------------------
GRANT ALL ON TABLE public.products TO authenticated;
GRANT SELECT ON TABLE public.products TO anon;

GRANT INSERT ON TABLE public.newsletter_subscribers TO anon, authenticated;
GRANT SELECT ON TABLE public.newsletter_subscribers TO authenticated;

GRANT INSERT ON TABLE public.contact_messages TO anon, authenticated;
GRANT SELECT ON TABLE public.contact_messages TO authenticated;

-- MENSAGEM: Script executado com sucesso!
