import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    const { password } = await request.json();

    if (password === '3GWINE') {
        const response = NextResponse.json({ success: true });

        // Configura um cookie que expira em 30 dias
        response.cookies.set('site_access', 'granted', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 60 * 60 * 24 * 30, // 30 dias
            path: '/',
        });

        return response;
    }

    return NextResponse.json({ success: false }, { status: 401 });
}
