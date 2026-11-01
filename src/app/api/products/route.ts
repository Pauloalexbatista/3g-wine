import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { query } from '@/lib/db';

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const featured = searchParams.get('featured');
        const weekly = searchParams.get('weekly');

        if (weekly === 'true') {
            const res = await query(
                'SELECT * FROM products WHERE is_weekly_highlight = TRUE LIMIT 1'
            );
            return NextResponse.json({ success: true, product: res.rows[0] || null });
        }

        if (featured === 'true') {
            const res = await query(
                'SELECT * FROM products WHERE featured = TRUE ORDER BY id ASC'
            );
            return NextResponse.json({ success: true, products: res.rows });
        }

        const res = await query('SELECT * FROM products ORDER BY id ASC');
        return NextResponse.json({ success: true, products: res.rows });
    } catch (error: any) {
        console.error('Erro ao buscar produtos da BD local:', error);
        return NextResponse.json(
            { success: false, error: 'Erro ao carregar produtos da base de dados.' },
            { status: 500 }
        );
    }
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const {
            name,
            type,
            region,
            year,
            price,
            description,
            featured,
            image,
            is_weekly_highlight,
            weekly_highlight_image
        } = body;

        if (!name || price === undefined || price === null) {
            return NextResponse.json(
                { success: false, error: 'Nome e Preço são obrigatórios.' },
                { status: 400 }
            );
        }

        // Se for destaque da semana, desmarcar anteriores
        if (is_weekly_highlight) {
            await query('UPDATE products SET is_weekly_highlight = FALSE');
        }

        const res = await query(
            `INSERT INTO products (
                name, type, region, year, price, description, 
                featured, image, is_weekly_highlight, weekly_highlight_image
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
            RETURNING *`,
            [
                name,
                type || 'Tinto',
                region || '',
                year || new Date().getFullYear(),
                price,
                description || '',
                featured || false,
                image || '/images/products/douro-2018.png',
                is_weekly_highlight || false,
                weekly_highlight_image || ''
            ]
        );

        return NextResponse.json({ success: true, product: res.rows[0] });
    } catch (error: any) {
        console.error('Erro ao criar produto:', error);
        return NextResponse.json(
            { success: false, error: 'Erro ao salvar produto na base de dados.' },
            { status: 500 }
        );
    }
}

export async function PUT(request: NextRequest) {
    try {
        const body = await request.json();
        const {
            id,
            name,
            type,
            region,
            year,
            price,
            description,
            featured,
            image,
            is_weekly_highlight,
            weekly_highlight_image
        } = body;

        if (!id) {
            return NextResponse.json(
                { success: false, error: 'ID do produto é obrigatório.' },
                { status: 400 }
            );
        }

        if (is_weekly_highlight) {
            await query('UPDATE products SET is_weekly_highlight = FALSE WHERE id != $1', [id]);
        }

        const res = await query(
            `UPDATE products SET 
                name = $1,
                type = $2,
                region = $3,
                year = $4,
                price = $5,
                description = $6,
                featured = $7,
                image = $8,
                is_weekly_highlight = $9,
                weekly_highlight_image = $10
            WHERE id = $11
            RETURNING *`,
            [
                name,
                type,
                region,
                year,
                price,
                description,
                featured,
                image,
                is_weekly_highlight,
                weekly_highlight_image,
                id
            ]
        );

        if (res.rowCount === 0) {
            return NextResponse.json(
                { success: false, error: 'Produto não encontrado.' },
                { status: 404 }
            );
        }

        return NextResponse.json({ success: true, product: res.rows[0] });
    } catch (error: any) {
        console.error('Erro ao atualizar produto:', error);
        return NextResponse.json(
            { success: false, error: 'Erro ao atualizar produto na base de dados.' },
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
                { success: false, error: 'ID do produto é obrigatório.' },
                { status: 400 }
            );
        }

        const res = await query('DELETE FROM products WHERE id = $1 RETURNING id', [id]);

        if (res.rowCount === 0) {
            return NextResponse.json(
                { success: false, error: 'Produto não encontrado.' },
                { status: 404 }
            );
        }

        return NextResponse.json({ success: true, id: res.rows[0].id });
    } catch (error: any) {
        console.error('Erro ao apagar produto:', error);
        return NextResponse.json(
            { success: false, error: 'Erro ao apagar produto da base de dados.' },
            { status: 500 }
        );
    }
}
