import { Pool } from 'pg';

// Ligação direta à base de dados PostgreSQL através de variável de ambiente segura
const connectionString = process.env.DATABASE_URL;

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
