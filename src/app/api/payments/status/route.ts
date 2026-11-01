import { NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { checkMbwayStatus } from '@/lib/ifthenpay';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const orderId = searchParams.get('orderId');

  if (!orderId) {
    return NextResponse.json({ error: 'orderId obrigatório' }, { status: 400 });
  }

  try {
    const res = await query(
      'SELECT id, payment_status, payment_method, payment_request_id, paid_at FROM orders WHERE id = $1',
      [orderId]
    );

    const order = res.rows[0];
    if (!order) {
      return NextResponse.json({ error: 'Encomenda não encontrada' }, { status: 404 });
    }

    // Se já está pago, retorna logo
    if (order.payment_status === 'pago') {
      return NextResponse.json({ status: 'pago', paid: true, paidAt: order.paid_at });
    }

    // Se for MB WAY e tiver requestId e não for sandbox simulado
    if (order.payment_method === 'mbway' && order.payment_request_id && !order.payment_request_id.startsWith('sbx-')) {
      const liveStatus = await checkMbwayStatus(order.payment_request_id);

      if (liveStatus.status === 'paid') {
        await query(
          'UPDATE orders SET payment_status = $1, paid_at = NOW() WHERE id = $2',
          ['pago', orderId]
        );

        return NextResponse.json({ status: 'pago', paid: true });
      }

      if (liveStatus.status === 'rejected' || liveStatus.status === 'expired') {
        await query(
          'UPDATE orders SET payment_status = $1 WHERE id = $2',
          [liveStatus.status, orderId]
        );

        return NextResponse.json({ status: liveStatus.status, paid: false, message: liveStatus.message });
      }
    }

    return NextResponse.json({ status: order.payment_status, paid: false });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// Endpoint para simulação de pagamento em modo Sandbox/Demonstração
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { orderId } = body;

    if (!orderId) {
      return NextResponse.json({ error: 'orderId obrigatório' }, { status: 400 });
    }

    await query(
      'UPDATE orders SET payment_status = $1, paid_at = NOW() WHERE id = $2',
      ['pago', orderId]
    );

    return NextResponse.json({ success: true, message: 'Pagamento simulado com sucesso!' });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
