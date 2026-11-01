import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { query } from '@/lib/db';

export async function GET() {
    try {
        const result = await query(
            'SELECT id, name, email, subject, message, created_at FROM contact_messages ORDER BY created_at DESC'
        );
        return NextResponse.json({ success: true, messages: result.rows });
    } catch (error: any) {
        console.error('Erro ao listar contactos:', error);
        return NextResponse.json(
            { success: false, error: 'Erro ao obter mensagens de contacto.' },
            { status: 500 }
        );
    }
}

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

export async function DELETE(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json(
                { success: false, error: 'ID da mensagem é obrigatório.' },
                { status: 400 }
            );
        }

        await query('DELETE FROM contact_messages WHERE id = $1', [id]);
        return NextResponse.json({ success: true, message: 'Mensagem removida com sucesso.' });
    } catch (error: any) {
        console.error('Erro ao remover mensagem:', error);
        return NextResponse.json(
            { success: false, error: 'Erro ao remover mensagem.' },
            { status: 500 }
        );
    }
}
