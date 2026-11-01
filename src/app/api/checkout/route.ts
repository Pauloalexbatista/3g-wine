import { NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { generateMultibanco, requestMbway } from '@/lib/ifthenpay';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      customer_name,
      customer_address,
      customer_zipcode,
      customer_city,
      customer_phone,
      customer_nif,
      delivery_method,
      payment_method,
      mbway_phone,
      items,
      subtotal,
      shipping_cost,
      iva_breakdown,
      iva,
      total,
    } = body;

    if (!items || items.length === 0) {
      return NextResponse.json({ error: 'Carrinho vazio' }, { status: 400 });
    }

    if (!customer_name || !customer_phone) {
      return NextResponse.json({ error: 'Dados de cliente incompletos' }, { status: 400 });
    }

    // 1. Inserir encomenda inicial na base de dados PostgreSQL
    const addr = delivery_method === 'pickup' ? 'Levantamento em Loja' : customer_address;
    const zip = delivery_method === 'pickup' ? '-' : customer_zipcode;
    const city = delivery_method === 'pickup' ? '-' : customer_city;

    const res = await query(
      `INSERT INTO orders (
        customer_name, customer_address, customer_zipcode, customer_city,
        customer_phone, customer_nif, delivery_method, shipping_cost,
        items, subtotal, iva_breakdown, iva, total, status,
        payment_method, payment_status
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)
      RETURNING *`,
      [
        customer_name,
        addr,
        zip,
        city,
        customer_phone,
        customer_nif || null,
        delivery_method,
        Number(shipping_cost) || 0,
        JSON.stringify(items),
        Number(subtotal) || 0,
        JSON.stringify(iva_breakdown || {}),
        Number(iva) || 0,
        Number(total) || 0,
        'por enviar',
        payment_method,
        'pendente'
      ]
    );

    const newOrder = res.rows[0];
    const orderId = newOrder.id;

    // 2. Processar de acordo com o método escolhido
    if (payment_method === 'multibanco') {
      const mbResult = await generateMultibanco({
        orderId,
        amount: Number(total),
        description: `3GWINE Encomenda #${orderId}`,
      });

      if (!mbResult.success) {
        return NextResponse.json({
          error: mbResult.error || 'Falha ao gerar dados Multibanco',
        }, { status: 502 });
      }

      // Atualizar a encomenda com a entidade e referência
      await query(
        `UPDATE orders SET 
          payment_entity = $1,
          payment_reference = $2,
          payment_details = $3
        WHERE id = $4`,
        [mbResult.entity, mbResult.reference, JSON.stringify(mbResult), orderId]
      );

      return NextResponse.json({
        success: true,
        orderId,
        paymentMethod: 'multibanco',
        data: {
          entity: mbResult.entity,
          reference: mbResult.reference,
          amount: mbResult.amount,
          expiryDate: mbResult.expiryDate,
        },
      });
    }

    if (payment_method === 'mbway') {
      const phoneToUse = mbway_phone || customer_phone;
      const mbwayResult = await requestMbway({
        orderId,
        amount: Number(total),
        mobileNumber: phoneToUse,
        description: `3GWINE #${orderId}`,
      });

      if (!mbwayResult.success) {
        return NextResponse.json({
          error: mbwayResult.error || 'Falha ao enviar notificação MB WAY',
        }, { status: 502 });
      }

      await query(
        `UPDATE orders SET 
          payment_request_id = $1,
          payment_details = $2
        WHERE id = $3`,
        [mbwayResult.requestId, JSON.stringify(mbwayResult), orderId]
      );

      return NextResponse.json({
        success: true,
        orderId,
        paymentMethod: 'mbway',
        data: {
          requestId: mbwayResult.requestId,
          phone: phoneToUse,
          amount: Number(total),
          message: mbwayResult.message,
        },
      });
    }

    return NextResponse.json({ error: 'Método de pagamento não suportado' }, { status: 400 });
  } catch (err: any) {
    console.error('Erro no checkout:', err);
    return NextResponse.json({ error: err.message || 'Erro interno no servidor' }, { status: 500 });
  }
}
