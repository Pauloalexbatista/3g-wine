'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AccessPage() {
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const res = await fetch('/api/verify-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ password }),
            });

            if (res.ok) {
                router.push('/');
                router.refresh();
            } else {
                setError('Palavra-passe incorrecta.');
            }
        } catch (err) {
            setError('Ocorreu um erro. Tente novamente.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <main style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
            fontFamily: 'system-ui, -apple-system, sans-serif',
            backgroundColor: '#000',
            color: '#fff'
        }}>
            <div style={{
                padding: '2rem',
                textAlign: 'center',
                border: '1px solid #333',
                borderRadius: '8px',
                backgroundColor: '#111'
            }}>
                <h1 style={{ marginBottom: '1.5rem', fontWeight: 'bold', color: '#ffffff' }}>Página de teste</h1>
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Introduza a palavra-passe"
                        style={{
                            padding: '0.75rem',
                            borderRadius: '4px',
                            border: '1px solid #444',
                            backgroundColor: '#222',
                            color: '#fff',
                            fontSize: '1rem',
                            outline: 'none'
                        }}
                        required
                        autoFocus
                    />
                    <button
                        type="submit"
                        disabled={loading}
                        style={{
                            padding: '0.75rem',
                            borderRadius: '4px',
                            border: 'none',
                            backgroundColor: '#fff',
                            color: '#000',
                            fontSize: '1rem',
                            fontWeight: 'bold',
                            cursor: loading ? 'not-allowed' : 'pointer',
                            transition: 'opacity 0.2s'
                        }}
                    >
                        {loading ? 'A verificar...' : 'Entrar'}
                    </button>
                    {error && <p style={{ color: '#ff4444', fontSize: '0.9rem', marginTop: '0.5rem' }}>{error}</p>}
                </form>
            </div>
        </main>
    );
}
