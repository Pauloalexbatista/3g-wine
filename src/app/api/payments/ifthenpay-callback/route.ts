import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

async function handleCallback(params: {
  chave?: string | null;
  entidade?: string | null;
  referencia?: string | null;
  valor?: string | null;
  id?: string | null;
}) {
  const { chave, entidade, referencia, valor, id } = params;

  const expectedKey = process.env.IFTHENPAY_ANTI_PHISHING_KEY;

  // Validação da chave anti-phishing
  if (expectedKey && chave !== expectedKey) {
    console.warn('[IFTHENPAY CALLBACK] Chave anti-phishing inválida:', chave);
    return new NextResponse('Unauthorized: Invalid Anti-Phishing Key', { status: 401 });
  }

  if (!id && !referencia) {
    return new NextResponse('Missing order id or reference', { status: 400 });
  }

  try {
    let query = supabase.from('orders').update({
      payment_status: 'pago',
      paid_at: new Date().toISOString(),
    });

    if (id) {
      query = query.eq('id', id);
    } else if (referencia) {
      // Normalizar referência (sem espaços)
      const cleanRef = referencia.replace(/\s+/g, '');
      query = query.or(`payment_reference.eq.${referencia},payment_reference.eq.${cleanRef}`);
    }

    const { error } = await query;

    if (error) {
      console.error('[IFTHENPAY CALLBACK] Erro ao atualizar encomenda:', error);
      return new NextResponse('Database Error', { status: 500 });
    }

    console.log(`[IFTHENPAY CALLBACK] Pagamento confirmado com sucesso para Encomenda ID=${id}, Ref=${referencia}, Valor=${valor}`);
    return new NextResponse('OK', { status: 200 });
  } catch (err: any) {
    console.error('[IFTHENPAY CALLBACK] Erro de processamento:', err);
    return new NextResponse('Server Error', { status: 500 });
  }
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  return handleCallback({
    chave: searchParams.get('chave'),
    entidade: searchParams.get('entidade'),
    referencia: searchParams.get('referencia'),
    valor: searchParams.get('valor'),
    id: searchParams.get('id'),
  });
}

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const { searchParams } = new URL(req.url);

    return handleCallback({
      chave: body.chave || searchParams.get('chave'),
      entidade: body.entidade || searchParams.get('entidade'),
      referencia: body.referencia || searchParams.get('referencia'),
      valor: body.valor || searchParams.get('valor'),
      id: body.id || searchParams.get('id'),
    });
  } catch (err) {
    return new NextResponse('Invalid Request Body', { status: 400 });
  }
}
