import { Pool } from 'pg';

// Ligação direta à base de dados PostgreSQL na VPS (sem qualquer dependência de Supabase)
const connectionString = 
    process.env.DATABASE_URL || 
    'postgresql://wine3g_user:H04e5JwxRzXgC7hj29dGNBIP@3gwine-postgres:5432/wine3g_prod';

let pool: Pool | null = null;

export function getDbPool(): Pool {
    if (!pool) {
        pool = new Pool({
            connectionString,
            max: 10,
            idleTimeoutMillis: 30000,
            connectionTimeoutMillis: 5000,
        });

        pool.on('error', (err) => {
            console.error('Erro inesperado no cliente PostgreSQL da VPS:', err);
        });
    }
    return pool;
}

export async function query(text: string, params?: any[]) {
    const p = getDbPool();
    return p.query(text, params);
}
