import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { query } from '@/lib/db';

export async function GET() {
    try {
        const res = await query('SELECT * FROM orders ORDER BY created_at DESC');
        return NextResponse.json({ success: true, orders: res.rows });
    } catch (error: any) {
        console.error('Erro ao buscar encomendas da BD:', error);
        return NextResponse.json(
            { success: false, error: 'Erro ao carregar encomendas.' },
            { status: 500 }
        );
    }
}

export async function PATCH(request: NextRequest) {
    try {
        const body = await request.json();
        const { id, status, payment_status } = body;

        if (!id) {
            return NextResponse.json(
                { success: false, error: 'ID da encomenda é obrigatório.' },
                { status: 400 }
            );
        }

        const updates: string[] = [];
        const values: any[] = [];
        let index = 1;

        if (status !== undefined) {
            updates.push(`status = $${index++}`);
            values.push(status);
        }

        if (payment_status !== undefined) {
            updates.push(`payment_status = $${index++}`);
            values.push(payment_status);
            if (payment_status === 'pago') {
                updates.push(`paid_at = NOW()`);
            }
        }

        if (updates.length === 0) {
            return NextResponse.json(
                { success: false, error: 'Nenhum campo para atualizar.' },
                { status: 400 }
            );
        }

        values.push(id);
        const q = `UPDATE orders SET ${updates.join(', ')} WHERE id = $${index} RETURNING *`;
        const res = await query(q, values);

        return NextResponse.json({ success: true, order: res.rows[0] });
    } catch (error: any) {
        console.error('Erro ao atualizar encomenda:', error);
        return NextResponse.json(
            { success: false, error: 'Erro ao atualizar encomenda.' },
            { status: 500 }
        );
    }
}
