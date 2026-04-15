'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './page.module.css';

export default function AccessPage() {
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const res = await fetch('/api/verify-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ password }),
            });

            if (res.ok) {
                router.push('/');
            } else {
                setError('Acesso negado. Password incorrecta.');
            }
        } catch (err) {
            setError('Erro ao verificar password.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.wrapper}>
            <div className={styles.content}>
                <h1 className="brand-3gwine text-4xl mb-6">3GWINE</h1>
                <p className={styles.subtitle}>Curadoria de Vinhos Premium</p>
                
                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.inputWrapper}>
                        <input
                            type="password"
                            placeholder="PALAVRA-PASSE"
                            value={password}
                            onChange={(e) => setPassword(e.target.value.toUpperCase())}
                            className={`${styles.input} ${error ? styles.inputError : ''}`}
                            disabled={loading}
                            autoFocus
                        />
                        {error && <p className={styles.error}>{error}</p>}
                    </div>
                </form>
            </div>
            
            <footer className={styles.footer}>
                &copy; 2024 <span className="brand-3gwine">3GWINE</span>. Todos os direitos reservados.
            </footer>
        </div>
    );
}
