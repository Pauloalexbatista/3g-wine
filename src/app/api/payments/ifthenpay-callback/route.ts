import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

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
    if (id) {
      await query(
        'UPDATE orders SET payment_status = $1, paid_at = NOW() WHERE id = $2',
        ['pago', id]
      );
    } else if (referencia) {
      const cleanRef = referencia.replace(/\s+/g, '');
      await query(
        'UPDATE orders SET payment_status = $1, paid_at = NOW() WHERE payment_reference = $2 OR payment_reference = $3',
        ['pago', referencia, cleanRef]
      );
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
    const body = await req.json();
    return handleCallback({
      chave: body.chave,
      entidade: body.entidade,
      referencia: body.referencia,
      valor: body.valor,
      id: body.id,
    });
  } catch {
    return new NextResponse('Bad Request', { status: 400 });
  }
}
