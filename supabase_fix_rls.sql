-- Execute este script no SQL Editor do Supabase para corrigir o erro 403 na Newsletter

-- Habilitar RLS se ainda não estiver habilitado
ALTER TABLE public.newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- Remover políticas existentes para evitar conflitos (opcional, mas recomendado para limpeza)
DROP POLICY IF EXISTS "Permitir inserção anónima na newsletter" ON public.newsletter_subscribers;
DROP POLICY IF EXISTS "Permitir leitura apenas por admins" ON public.newsletter_subscribers;

-- Criar política para permitir que QUALQUER UM (incluindo anónimos) subscreva a newsletter
CREATE POLICY "Permitir inserção de novos subscritores"
ON public.newsletter_subscribers
FOR INSERT
TO public
WITH CHECK (true);

-- Criar política para que apenas utilizadores autenticados (admins) possam ver a lista
CREATE POLICY "Permitir leitura a utilizadores autenticados"
ON public.newsletter_subscribers
FOR SELECT
TO authenticated
USING (true);

-- Garantir que a tabela tem as permissões corretas nível de role
GRANT INSERT ON TABLE public.newsletter_subscribers TO anon, authenticated;
GRANT SELECT ON TABLE public.newsletter_subscribers TO authenticated;
