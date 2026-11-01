import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { updateSession } from '@/utils/supabase/middleware';

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Se alguém tentar aceder à rota antiga /acesso, redirecionar para a página principal
    if (pathname === '/acesso') {
        const url = request.nextUrl.clone();
        url.pathname = '/';
        return NextResponse.redirect(url);
    }

    // 1. Atualizar a sessão e verificar proteção de rotas restritas (ex: /admin)
    const supabaseResponse = await updateSession(request);
    
    // Se o middleware retornou um redirecionamento (ex: para /auth/login), usá-lo
    if (supabaseResponse.headers.get('location')) {
        return supabaseResponse;
    }

    return supabaseResponse;
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
