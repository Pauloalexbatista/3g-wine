import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const SITE_PASSWORD = '3GWINE';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { password, checkOnly } = body;

        // Verificar se apenas queremos validar a sessão existente
        if (checkOnly) {
            const hasAccess = request.cookies.get('site_access')?.value === 'granted';
            if (hasAccess) {
                return NextResponse.json({ success: true });
            }
            return NextResponse.json({ success: false }, { status: 401 });
        }

        if (password === SITE_PASSWORD) {
            const response = NextResponse.json({ success: true });
            // Cookie válido por 7 dias, só acessível pelo servidor (HttpOnly)
            response.cookies.set('site_access', 'granted', {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'lax',
                maxAge: 60 * 60 * 24 * 7, // 7 dias
                path: '/',
            });
            return response;
        }

        return NextResponse.json(
            { success: false, error: 'Password incorreta.' },
            { status: 401 }
        );
    } catch {
        return NextResponse.json(
            { success: false, error: 'Erro no pedido.' },
            { status: 400 }
        );
    }
}
