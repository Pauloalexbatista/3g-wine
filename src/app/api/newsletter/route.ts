import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { query } from '@/lib/db';

export async function GET() {
    try {
        const result = await query(
            'SELECT id, email, created_at FROM newsletter_subscribers ORDER BY created_at DESC'
        );
        return NextResponse.json({ success: true, subscribers: result.rows });
    } catch (error: any) {
        console.error('Erro ao listar subscritores:', error);
        return NextResponse.json(
            { success: false, error: 'Erro ao obter subscritores.' },
            { status: 500 }
        );
    }
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { email } = body;

        if (!email || !email.includes('@')) {
            return NextResponse.json(
                { success: false, error: 'Email inválido.' },
                { status: 400 }
            );
        }

        await query(
            'INSERT INTO newsletter_subscribers (email) VALUES ($1) ON CONFLICT (email) DO NOTHING',
            [email.trim().toLowerCase()]
        );

        return NextResponse.json({ success: true, message: 'Subscrição efetuada com sucesso!' });
    } catch (error: any) {
        console.error('Erro na subscrição newsletter:', error);
        return NextResponse.json(
            { success: false, error: 'Erro ao registar email.' },
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
                { success: false, error: 'ID do subscritor é obrigatório.' },
                { status: 400 }
            );
        }

        await query('DELETE FROM newsletter_subscribers WHERE id = $1', [id]);
        return NextResponse.json({ success: true, message: 'Subscritor removido com sucesso.' });
    } catch (error: any) {
        console.error('Erro ao remover subscritor:', error);
        return NextResponse.json(
            { success: false, error: 'Erro ao remover subscritor.' },
            { status: 500 }
        );
    }
}
