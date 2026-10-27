import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
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

    // 1. Inserir encomenda inicial na base de dados
    const orderPayload = {
      customer_name,
      customer_address: delivery_method === 'pickup' ? 'Levantamento em Loja' : customer_address,
      customer_zipcode: delivery_method === 'pickup' ? '-' : customer_zipcode,
      customer_city: delivery_method === 'pickup' ? '-' : customer_city,
      customer_phone,
      customer_nif: customer_nif || null,
      delivery_method,
      shipping_cost: Number(shipping_cost) || 0,
      items,
      subtotal: Number(subtotal) || 0,
      iva_breakdown: iva_breakdown || {},
      iva: Number(iva) || 0,
      total: Number(total) || 0,
      status: 'por enviar',
      payment_method,
      payment_status: 'pendente',
    };

    const { data: newOrder, error: insertError } = await supabase
      .from('orders')
      .insert([orderPayload])
      .select()
      .single();

    if (insertError) {
      console.error('Erro ao guardar encomenda:', insertError);
      return NextResponse.json({ error: 'Erro ao guardar encomenda na base de dados' }, { status: 500 });
    }

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
      await supabase
        .from('orders')
        .update({
          payment_entity: mbResult.entity,
          payment_reference: mbResult.reference,
          payment_details: mbResult,
        })
        .eq('id', orderId);

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

      await supabase
        .from('orders')
        .update({
          payment_request_id: mbwayResult.requestId,
          payment_details: mbwayResult,
        })
        .eq('id', orderId);

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
