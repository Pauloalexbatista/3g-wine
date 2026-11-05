import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { password, checkOnly, logout } = body;

        // Se for pedido de logout, limpar a sessão de admin
        if (logout) {
            const response = NextResponse.json({ success: true });
            response.cookies.set('admin_access', '', { maxAge: 0, path: '/' });
            response.cookies.set('site_access', '', { maxAge: 0, path: '/' });
            return response;
        }

        // Verificar se tem sessão ativa de admin
        if (checkOnly) {
            const hasAdminAccess = request.cookies.get('admin_access')?.value === 'granted';
            if (hasAdminAccess) {
                return NextResponse.json({ success: true });
            }
            return NextResponse.json({ success: false }, { status: 401 });
        }

        const adminPassword = process.env.ADMIN_PASSWORD;

        // Validação estrita da palavra-passe de admin via variável de ambiente
        if (adminPassword && password === adminPassword) {
            const response = NextResponse.json({ success: true });
            // Cookie de sessão de administração (24 horas)
            response.cookies.set('admin_access', 'granted', {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'lax',
                maxAge: 60 * 60 * 24, // 24 horas
                path: '/',
            });
            // Limpa o cookie antigo do site para não misturar sessões
            response.cookies.set('site_access', '', { maxAge: 0, path: '/' });
            return response;
        }

        return NextResponse.json(
            { success: false, error: 'Palavra-passe incorreta.' },
            { status: 401 }
        );
    } catch {
        return NextResponse.json(
            { success: false, error: 'Erro no pedido.' },
            { status: 400 }
        );
    }
}
