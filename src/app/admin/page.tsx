'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import Image from 'next/image';
import Link from 'next/link';

interface Product {
    id: number;
    name: string;
    type: string;
    region: string;
    year: number;
    price: number;
    description: string;
    featured: boolean;
    image: string;
    is_weekly_highlight?: boolean;
    weekly_highlight_image?: string;
}

export default function AdminPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [view, setView] = useState<'list' | 'form'>('list');
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null); // null = checking, false = prompt, true = access
    const [password, setPassword] = useState('');
    const [authError, setAuthError] = useState('');
    const [isAuthenticating, setIsAuthenticating] = useState(false);

    // Image Selection State
    const [availableImages, setAvailableImages] = useState<string[]>([]);
    const [showImageSelector, setShowImageSelector] = useState(false);

    // Form State
    const [formData, setFormData] = useState<Partial<Product>>({
        name: '',
        type: 'Tinto',
        region: '',
        year: new Date().getFullYear(),
        price: 0,
        description: '',
        featured: false,
        image: '',
        is_weekly_highlight: false,
        weekly_highlight_image: ''
    });

    useEffect(() => {
        checkAuth();
        fetchProducts();
        fetchImages();
    }, []);

    async function checkAuth() {
        try {
            // No frontend, apenas verificamos se conseguimos ler algo restrito ou se temos o cookie (simulado via API)
            // Para simplicidade total, vamos bater num endpoint que verifica o cookie
            const res = await fetch('/api/verify-password', {
                method: 'POST',
                body: JSON.stringify({ checkOnly: true })
            });
            if (res.ok) {
                setIsAuthenticated(true);
            } else {
                setIsAuthenticated(false);
            }
        } catch (error) {
            setIsAuthenticated(false);
        }
    }

    async function handleLogin(e: React.FormEvent) {
        e.preventDefault();
        setIsAuthenticating(true);
        setAuthError('');

        try {
            const res = await fetch('/api/verify-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ password })
            });

            if (res.ok) {
                setIsAuthenticated(true);
            } else {
                const data = await res.json();
                setAuthError(data.error || 'Password incorreta');
            }
        } catch (error) {
            setAuthError('Erro ao verificar a password.');
        } finally {
            setIsAuthenticating(false);
        }
    }

    async function fetchProducts() {
        try {
            setLoading(true);
            const { data, error } = await supabase
                .from('products')
                .select('*')
                .order('id', { ascending: true });

            if (error) throw error;
            if (data) setProducts(data);
        } catch (error) {
            console.error('Erro ao buscar produtos:', error);
            alert('Erro ao carregar produtos do Supabase');
        } finally {
            setLoading(false);
        }
    }

    async function fetchImages() {
        try {
            const response = await fetch('/api/images');
            const data = await response.json();
            if (data.images) {
                setAvailableImages(data.images);
            }
        } catch (error) {
            console.error('Erro ao buscar imagens:', error);
        }
    }

    async function handleDelete(id: number) {
        if (!confirm('Tem a certeza que deseja apagar este produto?')) return;

        try {
            const { error } = await supabase
                .from('products')
                .delete()
                .eq('id', id);

            if (error) throw error;

            setProducts(products.filter(p => p.id !== id));
            alert('Produto removido com sucesso!');
        } catch (error) {
            console.error('Erro ao apagar:', error);
            alert('Erro ao apagar produto.');
        }
    }

    function handleEdit(product: Product) {
        setEditingProduct(product);
        setFormData(product);
        setView('form');
        // Refresh images when opening form
        fetchImages();
    }

    function handleCreate() {
        setEditingProduct(null);
        setFormData({
            name: '',
            type: 'Tinto',
            region: '',
            year: new Date().getFullYear(),
            price: 0,
            description: '',
            featured: false,
            image: ''
        });
        setView('form');
        // Refresh images when opening form
        fetchImages();
    }

    function handleSelectImage(imagePath: string) {
        setFormData({ ...formData, image: imagePath });
        setShowImageSelector(false);
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        // Validate Image
        if (!formData.image) {
            alert('Por favor selecione uma imagem.');
            return;
        }

        try {
            if (editingProduct) {
                // Update
                const { error } = await supabase
                    .from('products')
                    .update(formData)
                    .eq('id', editingProduct.id);

                if (error) throw error;
                alert('Produto atualizado com sucesso!');
            } else {
                // Create
                const { error } = await supabase
                    .from('products')
                    .insert([formData]);

                if (error) throw error;
                alert('Produto criado com sucesso!');
            }

            fetchProducts();
            setView('list');
        } catch (error) {
            console.error('Erro ao salvar:', error);
            alert('Erro ao salvar produto.');
        }
    }

    // Styles for the admin page
    const styles = {
        pageContainer: {
            padding: '2rem 1rem',
            maxWidth: '1200px',
            margin: '0 auto',
        },
        card: {
            backgroundColor: 'var(--color-light)',
            borderRadius: 'var(--radius-lg)',
            boxShadow: 'var(--shadow-md)',
            padding: '2rem',
            border: '1px solid var(--color-gray-200)',
        },
        header: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '2rem',
        },
        table: {
            width: '100%',
            borderCollapse: 'collapse' as const,
        },
        th: {
            textAlign: 'left' as const,
            padding: '1rem',
            borderBottom: '2px solid var(--color-gray-200)',
            color: 'var(--color-gray-700)',
            fontWeight: 600,
            fontSize: 'var(--text-sm)',
            textTransform: 'uppercase' as const,
            letterSpacing: '0.05em',
        },
        td: {
            padding: '1rem',
            borderBottom: '1px solid var(--color-gray-200)',
            verticalAlign: 'middle',
        },
        imageContainer: {
            position: 'relative' as const,
            width: '60px',
            height: '60px',
            backgroundColor: '#f3f4f6',
            borderRadius: '4px',
            overflow: 'hidden',
        },
        formGrid: {
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '1.5rem',
            marginBottom: '1.5rem',
        },
        formGroup: {
            marginBottom: '1rem',
        },
        label: {
            display: 'block',
            marginBottom: '0.5rem',
            fontSize: 'var(--text-sm)',
            fontWeight: 500,
            color: 'var(--color-gray-700)',
        },
        modalOverlay: {
            position: 'fixed' as const,
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 50,
        },
        modalContent: {
            backgroundColor: 'white',
            padding: '2rem',
            borderRadius: '8px',
            maxWidth: '800px',
            width: '90%',
            maxHeight: '80vh',
            overflowY: 'auto' as const,
        },
        imageGrid: {
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))',
            gap: '1rem',
            marginTop: '1rem',
        }
    };

    // Helper to safely get image source
    const getSafeImageSrc = (src: string | undefined) => {
        if (!src) return '/images/products/douro-2018.png'; // Fallback
        if (src.startsWith('/') || src.startsWith('http')) return src;
        return `/images/loja/${src}`; // Assume local if simplistic
    };

    // Filter State
    const [filterType, setFilterType] = useState('Todos');
    const types = ['Todos', 'Tinto', 'Branco', 'Rosé', 'Espumante', 'Outros'];

    // Filtered Products
    const filteredProducts = products.filter(product => {
        if (filterType === 'Todos') return true;
        return product.type === filterType;
    });


    // Style for the authentication prompt
    const authStyles = {
        overlay: {
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#0a0a0a',
            padding: '2rem'
        },
        card: {
            maxWidth: '400px',
            width: '100%',
            backgroundColor: '#1a1a1a',
            padding: '3rem',
            borderRadius: '12px',
            border: '1px solid #333',
            textAlign: 'center' as const,
            boxShadow: '0 20px 40px rgba(0,0,0,0.5)'
        }
    };

    if (isAuthenticated === null) {
        return (
            <div style={authStyles.overlay}>
                <div style={{ color: 'var(--color-primary)', fontSize: '1.2rem' }}>A verificar acesso...</div>
            </div>
        );
    }

    if (!isAuthenticated) {
        return (
            <div style={authStyles.overlay}>
                <div style={authStyles.card}>
                    <div style={{ marginBottom: '2rem' }}>
                        <span style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#fff', letterSpacing: '4px' }}>
                            <span style={{ color: 'var(--color-primary)' }}>3</span>GWINE
                        </span>
                    </div>
                    
                    <h2 style={{ color: 'var(--color-primary)', marginBottom: '1.5rem', fontFamily: 'Marcellus, serif' }}>Portal do Administrador</h2>
                    <p style={{ color: '#888', marginBottom: '2rem', fontSize: '0.9rem' }}>
                        Introduza a chave de acesso para gerir a garrafeira.
                    </p>

                    <form onSubmit={handleLogin}>
                        <input
                            type="password"
                            placeholder="Password de Acesso"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            style={{
                                width: '100%',
                                padding: '12px',
                                backgroundColor: '#222',
                                border: '1px solid #444',
                                borderRadius: '6px',
                                color: '#fff',
                                marginBottom: '1.5rem',
                                textAlign: 'center',
                                outline: 'none'
                            }}
                            autoFocus
                        />
                        {authError && <p style={{ color: '#ef4444', fontSize: '0.85rem', marginBottom: '1.5rem' }}>{authError}</p>}
                        
                        <button 
                            type="submit" 
                            disabled={isAuthenticating}
                            style={{
                                width: '100%',
                                padding: '14px',
                                backgroundColor: 'var(--color-primary)',
                                color: '#000',
                                fontWeight: 'bold',
                                border: 'none',
                                borderRadius: '6px',
                                cursor: isAuthenticating ? 'wait' : 'pointer',
                                transition: 'transform 0.2s'
                            }}
                        >
                            {isAuthenticating ? 'A entrar...' : 'Entrar na Garrafeira'}
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    if (view === 'form') {
        return (
            <div style={styles.pageContainer}>
                <button
                    onClick={() => setView('list')}
                    style={{
                        marginBottom: '1.5rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        color: 'var(--color-gray-700)',
                        cursor: 'pointer'
                    }}
                >
                    ← Voltar à Lista
                </button>

                <h1 className="text-3xl" style={{ marginBottom: '2rem', color: 'var(--color-primary)' }}>
                    {editingProduct ? 'Editar Produto' : 'Novo Produto'}
                </h1>

                <div style={styles.card}>
                    <form onSubmit={handleSubmit}>
                        <div style={styles.formGrid}>
                            <div style={styles.formGroup}>
                                <label style={styles.label}>Nome</label>
                                <input
                                    type="text"
                                    required
                                    className="input"
                                    value={formData.name}
                                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                                />
                            </div>
                            <div style={styles.formGroup}>
                                <label style={styles.label}>Tipo</label>
                                <select
                                    className="input"
                                    value={formData.type}
                                    onChange={e => setFormData({ ...formData, type: e.target.value })}
                                >
                                    <option>Tinto</option>
                                    <option>Branco</option>
                                    <option>Rosé</option>
                                    <option>Espumante</option>
                                    <option>Outros</option>
                                </select>
                            </div>
                        </div>

                        <div style={styles.formGrid}>
                            <div style={styles.formGroup}>
                                <label style={styles.label}>Região</label>
                                <input
                                    type="text"
                                    className="input"
                                    value={formData.region}
                                    onChange={e => setFormData({ ...formData, region: e.target.value })}
                                />
                            </div>
                            <div style={styles.formGroup}>
                                <label style={styles.label}>Ano</label>
                                <input
                                    type="number"
                                    className="input"
                                    value={formData.year}
                                    onChange={e => setFormData({ ...formData, year: parseInt(e.target.value) })}
                                />
                            </div>
                        </div>

                        <div style={styles.formGroup}>
                            <label style={styles.label}>Preço (€)</label>
                            <input
                                type="number"
                                step="0.01"
                                required
                                className="input"
                                value={formData.price}
                                onChange={e => setFormData({ ...formData, price: parseFloat(e.target.value) })}
                            />
                        </div>

                        <div style={styles.formGroup}>
                            <label style={styles.label}>Descrição</label>
                            <textarea
                                className="input textarea"
                                rows={3}
                                value={formData.description}
                                onChange={e => setFormData({ ...formData, description: e.target.value })}
                            />
                        </div>

                        <div style={styles.formGroup}>
                            <label style={styles.label}>Imagem do Produto</label>
                            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                                <input
                                    type="text"
                                    readOnly
                                    className="input"
                                    value={formData.image}
                                    placeholder="Nenhuma imagem selecionada"
                                    style={{ flex: 1, backgroundColor: '#f9fafb' }}
                                />
                                <button
                                    type="button"
                                    className="btn btn-outline"
                                    onClick={() => setShowImageSelector(true)}
                                >
                                    Selecionar Imagem
                                </button>
                            </div>
                            {formData.image && (
                                <div style={{ marginTop: '1rem', width: '100px', height: '100px', position: 'relative', border: '1px solid #ddd', borderRadius: '4px' }}>
                                    <Image
                                        src={getSafeImageSrc(formData.image)}
                                        alt="Preview"
                                        fill
                                        style={{ objectFit: 'contain' }}
                                    />
                                </div>
                            )}
                            <p style={{ fontSize: '0.75rem', color: '#6b7280', marginTop: '0.5rem' }}>
                                Apenas imagens na pasta <code>public/images/loja</code>
                            </p>
                        </div>

                        <div style={{ display: 'flex', gap: '2rem', marginBottom: '2rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <input
                                    type="checkbox"
                                    id="featured"
                                    style={{ width: '1rem', height: '1rem', marginRight: '0.5rem' }}
                                    checked={formData.featured}
                                    onChange={e => setFormData({ ...formData, featured: e.target.checked })}
                                />
                                <label htmlFor="featured" style={{ fontSize: '0.875rem', color: 'var(--color-dark)' }}>
                                    Destacar na Loja
                                </label>
                            </div>

                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <input
                                    type="checkbox"
                                    id="is_weekly_highlight"
                                    style={{ width: '1rem', height: '1rem', marginRight: '0.5rem' }}
                                    checked={formData.is_weekly_highlight}
                                    onChange={e => setFormData({ ...formData, is_weekly_highlight: e.target.checked })}
                                />
                                <label htmlFor="is_weekly_highlight" style={{ fontSize: '0.875rem', color: 'var(--color-dark)', fontWeight: 'bold' }}>
                                    Destaque da Semana (Página Principal)
                                </label>
                            </div>
                        </div>

                        {formData.is_weekly_highlight && (
                            <div style={styles.formGroup}>
                                <label style={styles.label}>Fotografia de Destaque (Fundo Transparente Recomendado)</label>
                                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                                    <input
                                        type="text"
                                        readOnly
                                        className="input"
                                        value={formData.weekly_highlight_image}
                                        placeholder="Selecione a foto especial de destaque"
                                        style={{ flex: 1, backgroundColor: '#fdfaea' }}
                                    />
                                    <button
                                        type="button"
                                        className="btn btn-outline"
                                        onClick={() => setShowImageSelector(true)} // Reutiliza o selector
                                    >
                                        Escolher Foto
                                    </button>
                                </div>
                            </div>
                        )}

                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
                            <button
                                type="button"
                                onClick={() => setView('list')}
                                className="btn btn-outline"
                            >
                                Cancelar
                            </button>
                            <button
                                type="submit"
                                className="btn btn-primary"
                            >
                                Salvar Produto
                            </button>
                        </div>
                    </form>

                    {/* Image Selector Modal */}
                    {showImageSelector && (
                        <div style={styles.modalOverlay} onClick={() => setShowImageSelector(false)}>
                            <div style={styles.modalContent} onClick={e => e.stopPropagation()}>
                                <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1rem' }}>Selecionar Imagem</h3>
                                <div style={{ fontSize: '0.875rem', color: '#555', marginBottom: '1rem' }}>
                                    Estas são as imagens encontradas na pasta <code>public/images/loja</code>.
                                </div>

                                {availableImages.length === 0 ? (
                                    <p>Nenhuma imagem encontrada nesta pasta.</p>
                                ) : (
                                    <div style={styles.imageGrid}>
                                        {availableImages.map((img, idx) => (
                                            <div
                                                key={idx}
                                                onClick={() => handleSelectImage(img)}
                                                style={{
                                                    cursor: 'pointer',
                                                    border: formData.image === img ? '2px solid var(--color-primary)' : '1px solid #eee',
                                                    borderRadius: '4px',
                                                    overflow: 'hidden',
                                                    aspectRatio: '1',
                                                    position: 'relative'
                                                }}
                                            >
                                                <Image
                                                    src={img}
                                                    alt="choice"
                                                    fill
                                                    style={{ objectFit: 'cover' }}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                )}

                                <div style={{ marginTop: '2rem', textAlign: 'right' }}>
                                    <button
                                        className="btn btn-outline"
                                        onClick={() => setShowImageSelector(false)}
                                    >
                                        Fechar
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        );
    }

    return (
        <div style={styles.pageContainer}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <div style={{ display: 'flex', gap: '2rem', alignItems: 'baseline' }}>
                    <h1 className="text-3xl" style={{ color: 'var(--color-primary)' }}>Admin - Produtos</h1>
                    <Link href="/admin/encomendas" style={{ fontSize: '1.1rem', color: '#666', textDecoration: 'none', fontWeight: 500 }}>
                        📦 Gestão de Encomendas
                    </Link>
                </div>
                <Link href="/loja" className="btn btn-outline">
                    Voltar à Loja
                </Link>
            </div>

            <div style={styles.card}>
                <div style={styles.header}>
                    <h2 className="text-xl">Produtos na Loja</h2>

                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                        <select
                            className="input"
                            style={{ padding: '0.5rem', width: 'auto' }}
                            value={filterType}
                            onChange={(e) => setFilterType(e.target.value)}
                        >
                            {types.map(type => (
                                <option key={type} value={type}>{type}</option>
                            ))}
                        </select>
                        <button
                            onClick={handleCreate}
                            className="btn btn-primary"
                        >
                            + Adicionar Novo
                        </button>
                    </div>
                </div>

                {loading ? (
                    <div className="text-center" style={{ padding: '3rem 0' }}>
                        <div className="animate-spin" style={{
                            width: '3rem', height: '3rem',
                            border: '3px solid var(--color-gray-200)',
                            borderTopColor: 'var(--color-primary)',
                            borderRadius: '50%',
                            margin: '0 auto'
                        }}></div>
                        <p style={{ marginTop: '1rem', color: 'var(--color-gray-500)' }}>A carregar produtos...</p>
                    </div>
                ) : filteredProducts.length === 0 ? (
                    <div className="text-center" style={{ padding: '3rem 0', backgroundColor: 'var(--color-gray-50)', borderRadius: 'var(--radius-lg)' }}>
                        <p style={{ color: 'var(--color-gray-500)' }}>Nenhum produto encontrado.</p>
                        {filterType !== 'Todos' && (
                            <p style={{ fontSize: '0.875rem', marginTop: '0.5rem' }}>Tente mudar o filtro ou adicionar um novo produto.</p>
                        )}
                        <button onClick={handleCreate} style={{ marginTop: '1rem', color: 'var(--color-primary)', textDecoration: 'underline' }}>
                            Criar produto
                        </button>
                    </div>
                ) : (
                    <div style={{ overflowX: 'auto' }}>
                        <table style={styles.table}>
                            <thead>
                                <tr>
                                    <th style={styles.th}>Imagem</th>
                                    <th style={styles.th}>Nome</th>
                                    <th style={styles.th}>Preço</th>
                                    <th style={{ ...styles.th, textAlign: 'right' }}>Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredProducts.map((product) => (
                                    <tr key={product.id}>
                                        <td style={styles.td}>
                                            <div style={styles.imageContainer}>
                                                <Image
                                                    src={getSafeImageSrc(product.image)}
                                                    alt={product.name}
                                                    fill
                                                    style={{ objectFit: 'contain', padding: '0.25rem' }}
                                                />
                                            </div>
                                        </td>
                                        <td style={styles.td}>
                                            <div style={{ fontWeight: 600 }}>{product.name}</div>
                                            <div style={{ fontSize: '0.8rem', color: 'var(--color-secondary)', textTransform: 'uppercase' }}>{product.type}</div>
                                        </td>
                                        <td style={styles.td}>€{product.price}</td>
                                        <td style={{ ...styles.td, textAlign: 'right' }}>
                                            <button
                                                onClick={() => handleEdit(product)}
                                                style={{ color: '#4f46e5', fontWeight: 500, marginRight: '1rem' }}
                                            >
                                                Editar
                                            </button>
                                            <button
                                                onClick={() => handleDelete(product.id)}
                                                style={{ color: '#ef4444', fontWeight: 500 }}
                                            >
                                                Apagar
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}
