import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const { password } = await request.json();
        const providedPassword = password?.trim().toUpperCase();
        const correctPassword = '3GWINE';

        console.log(`[DEBUG] Tentativa de acesso. Password: "${providedPassword}"`);

        if (providedPassword === correctPassword) {
            const response = NextResponse.json({ success: true });

            console.log(`[DEBUG] Password correta. Definindo cookie site_access...`);

            // Configura um cookie que expira em 30 dias
            // Removido 'secure' true para funcionar em HTTP (testenet.site ainda não tem SSL)
            response.cookies.set('site_access', 'granted', {
                httpOnly: true,
                secure: false,
                sameSite: 'lax',
                maxAge: 60 * 60 * 24 * 30, // 30 dias
                path: '/',
            });

            return response;
        }

        console.log(`[DEBUG] Password incorreta: "${providedPassword}"`);
        return NextResponse.json({ success: false }, { status: 401 });
    } catch (error) {
        console.error(`[ERROR] Erro na verificação:`, error);
        return NextResponse.json({ success: false }, { status: 500 });
    }
}
