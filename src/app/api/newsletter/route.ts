import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { query } from '@/lib/db';

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
