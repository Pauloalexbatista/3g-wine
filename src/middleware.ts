import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const accessCookie = request.cookies.get('site_access');
    const { pathname } = request.nextUrl;

    // Permitir acesso à página de login, à API de verificação e a ficheiros estáticos/públicos
    if (
        pathname === '/acesso' ||
        pathname.startsWith('/api/verify-password') ||
        pathname.includes('.') || // Ficheiros com extensão (imagens, favicon, etc)
        pathname.startsWith('/_next') // Pasta interna do Next.js
    ) {
        return NextResponse.next();
    }

    // Redirecionar para a página de acesso se não houver cookie
    if (!accessCookie || accessCookie.value !== 'granted') {
        const url = request.nextUrl.clone();
        url.pathname = '/acesso';
        return NextResponse.redirect(url);
    }

    return NextResponse.next();
}

// Configurar o matcher para aplicar o middleware a todas as rotas
export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
};
