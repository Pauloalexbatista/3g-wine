import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { query } from '@/lib/db';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { name, email, phone, message } = body;

        if (!name || !email || !message) {
            return NextResponse.json(
                { success: false, error: 'Nome, email e mensagem são obrigatórios.' },
                { status: 400 }
            );
        }

        await query(
            `INSERT INTO contact_messages (name, email, subject, message)
             VALUES ($1, $2, $3, $4)`,
            [name, email, phone ? `Telefone: ${phone}` : 'Contacto Site', message]
        );

        return NextResponse.json({ success: true, message: 'Mensagem enviada com sucesso!' });
    } catch (error: any) {
        console.error('Erro ao enviar mensagem:', error);
        return NextResponse.json(
            { success: false, error: 'Erro ao registar mensagem.' },
            { status: 500 }
        );
    }
}
