'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { RedWaxSeal } from '@/components/BrandSeal';
import { useCart } from '@/context/CartContext';
// Base de Dados PostgreSQL local da VPS
import { calculateProductTax } from '@/utils/tax';
import './page.css';

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
}

function LojaContent() {
    const searchParams = useSearchParams();
    const { addToCart } = useCart();
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedType, setSelectedType] = useState<string>('Todos');
    const [priceRange, setPriceRange] = useState<string>('Todos');
    const [sortBy, setSortBy] = useState<string>('featured');
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

    const types = ['Todos', 'Tinto', 'Branco', 'Rosé', 'Espumante', 'Cave', 'Azeite', 'Licores / Destilados', 'Outros'];
    const priceRanges = ['Todos', '0-30€', '30-50€', '50-100€', '100+€'];

    useEffect(() => {
        fetchProducts();
    }, []);

    useEffect(() => {
        const tipoParam = searchParams.get('tipo');
        if (tipoParam) {
            const matched = types.find(t => t.toLowerCase() === tipoParam.toLowerCase());
            if (matched) {
                setSelectedType(matched);
            }
        }
    }, [searchParams]);

    async function fetchProducts() {
        try {
            setLoading(true);
            const res = await fetch('/api/products');
            const data = await res.json();
            if (data.success && data.products) {
                setProducts(data.products);
            }
        } catch (error) {
            console.error('Erro ao carregar produtos:', error);
        } finally {
            setLoading(false);
        }
    }

    // Filter products
    let filteredProducts = [...products];

    if (selectedType !== 'Todos') {
        const selLower = selectedType.toLowerCase();
        if (selLower === 'cave') {
            filteredProducts = filteredProducts.filter(p => {
                const pType = (p.type || '').toLowerCase();
                const pName = (p.name || '').toLowerCase();
                const pDesc = (p.description || '').toLowerCase();
                return (
                    pType === 'cave' ||
                    (p as any).is_cave === true ||
                    pName.includes('cave') ||
                    pDesc.includes('cave')
                );
            });
        } else if (selLower === 'azeite') {
            filteredProducts = filteredProducts.filter(p => {
                const pType = (p.type || '').toLowerCase();
                const pName = (p.name || '').toLowerCase();
                return pType.includes('azeite') || pName.includes('azeite');
            });
        } else if (selLower.includes('licor') || selLower.includes('destilad')) {
            filteredProducts = filteredProducts.filter(p => {
                const pType = (p.type || '').toLowerCase();
                const pName = (p.name || '').toLowerCase();
                return (
                    pType.includes('licor') || pType.includes('destilad') || pType.includes('spirit') ||
                    pName.includes('licor') || pName.includes('destilad')
                );
            });
        } else {
            filteredProducts = filteredProducts.filter(p => (p.type || '').toLowerCase() === selLower);
        }
    }

    if (priceRange !== 'Todos') {
        filteredProducts = filteredProducts.filter(p => {
            const price = Number(p.price) || 0;
            if (priceRange === '0-30€') return price <= 30;
            if (priceRange === '30-50€') return price > 30 && price <= 50;
            if (priceRange === '50-100€') return price > 50 && price <= 100;
            if (priceRange === '100+€') return price > 100;
            return true;
        });
    }

    // Sort products
    if (sortBy === 'price-asc') {
        filteredProducts.sort((a, b) => (Number(a.price) || 0) - (Number(b.price) || 0));
    } else if (sortBy === 'price-desc') {
        filteredProducts.sort((a, b) => (Number(b.price) || 0) - (Number(a.price) || 0));
    } else if (sortBy === 'name') {
        filteredProducts.sort((a, b) => (a.name || '').localeCompare(b.name || ''));
    } else if (sortBy === 'featured') {
        filteredProducts.sort((a, b) => (b.featured === a.featured ? 0 : b.featured ? 1 : -1));
    }

    // Agrupar produtos por família para a Carta de Vinhos
    const familyOrder = ['Tinto', 'Branco', 'Rosé', 'Espumante', 'Cave', 'Azeite', 'Licores / Destilados', 'Outros'];
    const groupedByFamily = filteredProducts.reduce<Record<string, Product[]>>((acc, product) => {
        const family = (product.type && product.type.trim()) || 'Outros';
        if (!acc[family]) acc[family] = [];
        acc[family].push(product);
        return acc;
    }, {});

    const sortedFamilies = Object.keys(groupedByFamily).sort((a, b) => {
        const idxA = familyOrder.findIndex(f => f.toLowerCase() === a.toLowerCase());
        const idxB = familyOrder.findIndex(f => f.toLowerCase() === b.toLowerCase());
        if (idxA !== -1 && idxB !== -1) return idxA - idxB;
        if (idxA !== -1) return -1;
        if (idxB !== -1) return 1;
        return a.localeCompare(b);
    });

    return (
        <>
            <Header />

            <main className="loja-page parchment-bg">
                {/* Cabeçalho Clássico da Carta */}
                <section className="loja-hero-classic">
                    <div className="container">
                        <div className="loja-eyebrow">Garrafeira <span className="brand-3gwine">3GWINE</span></div>
                        <h1 className="loja-title-classic">Carta de Vinhos &amp; Seleções</h1>
                        <p className="loja-subtitle-classic">
                            Selecione qualquer referência na carta para abrir o rótulo completo, fotografia da garrafa e notas de prova.
                        </p>
                    </div>
                </section>

                {/* Filters Section */}
                <section className="filters-section">
                    <div className="container">
                        <div className="filters-bar">
                            {/* Type Filter */}
                            <div className="filter-group type-filter-group">
                                <div className="filter-header-inline">
                                    <label className="filter-label">Família</label>
                                    <div className="results-count-inline">
                                        {loading ? 'A carregar carta...' : filteredProducts.length + (filteredProducts.length === 1 ? ' referência na carta' : ' referências na carta')}
                                    </div>
                                </div>
                                <div className="filter-buttons">
                                    {types.map(type => (
                                        <button
                                            key={type}
                                            className={'filter-btn ' + (selectedType === type ? 'active' : '')}
                                            onClick={() => setSelectedType(type)}
                                        >
                                            {type}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Price Filter */}
                            <div className="filter-group">
                                <div className="filter-header-inline">
                                    <label className="filter-label">Preço</label>
                                </div>
                                <select
                                    className="filter-select"
                                    value={priceRange}
                                    onChange={(e) => setPriceRange(e.target.value)}
                                >
                                    {priceRanges.map(range => (
                                        <option key={range} value={range}>{range}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Sort */}
                            <div className="filter-group">
                                <div className="filter-header-inline">
                                    <label className="filter-label">Ordenar por</label>
                                </div>
                                <select
                                    className="filter-select"
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                >
                                    <option value="featured">Destaques</option>
                                    <option value="price-asc">Preço: Menor - Maior</option>
                                    <option value="price-desc">Preço: Maior - Menor</option>
                                    <option value="name">Nome A-Z</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Carta de Vinhos por Famílias */}
                <section className="products-section">
                    <div className="container">
                        {loading ? (
                            <div className="flex justify-center items-center py-20">
                                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                            </div>
                        ) : filteredProducts.length > 0 ? (
                            <div className="carta-ledger double-brown-frame">
                                <div className="carta-ledger-seal" title="Selo Oficial 3GWINE">
                                    <RedWaxSeal className="carta-ledger-seal-svg" />
                                </div>
                                <div className="carta-ledger-header">
                                    <div className="carta-ledger-eyebrow">Garrafeira Exclusiva · Póvoa de Santa Iria</div>
                                    <h2 className="carta-ledger-title">Carta Oficial</h2>
                                    <div className="carta-ledger-ornament">❦</div>
                                </div>

                                <div className="carta-families-list">
                                    {sortedFamilies.map((family) => (
                                        <div key={family} className="carta-family-block">
                                            <div className="carta-family-heading">
                                                <h3>{family}</h3>
                                                <span className="carta-family-count">
                                                    {groupedByFamily[family].length} {groupedByFamily[family].length === 1 ? 'referência' : 'referências'}
                                                </span>
                                            </div>

                                            <div className="carta-items-grid">
                                                {groupedByFamily[family].map((product) => {
                                                    const tax = calculateProductTax(product.price, product.type);
                                                    return (
                                                        <div
                                                            key={product.id}
                                                            className="carta-row"
                                                            onClick={() => setSelectedProduct(product)}
                                                            role="button"
                                                            tabIndex={0}
                                                            onKeyDown={(e) => {
                                                                if (e.key === 'Enter' || e.key === ' ') {
                                                                    e.preventDefault();
                                                                    setSelectedProduct(product);
                                                                }
                                                            }}
                                                        >
                                                            <div className="carta-row-main">
                                                                <span className="carta-row-name">
                                                                    {product.name}
                                                                    {product.featured && (
                                                                        <span className="carta-row-badge">Destaque</span>
                                                                    )}
                                                                </span>
                                                                <span className="carta-row-dots"></span>
                                                                <span className="carta-row-price">{tax.formattedFinal}</span>
                                                                <button
                                                                    type="button"
                                                                    className="carta-row-add"
                                                                    title="Adicionar ao carrinho"
                                                                    onClick={(e) => {
                                                                        e.stopPropagation();
                                                                        addToCart(product);
                                                                    }}
                                                                >
                                                                    +
                                                                </button>
                                                            </div>
                                                            <div className="carta-row-sub">
                                                                <span>
                                                                    {product.region || 'Portugal'}
                                                                    {product.year ? ` · ${product.year}` : ''}
                                                                    {product.description ? ` — ${product.description.substring(0, 75)}${product.description.length > 75 ? '...' : ''}` : ''}
                                                                </span>
                                                                <span className="carta-row-hint">Ver rótulo →</span>
                                                            </div>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <div className="no-results double-brown-frame">
                                <div className="no-results-icon">🍷</div>
                                <h3>Nenhuma referência encontrada</h3>
                                <p>Tente ajustar os seus filtros na carta</p>
                            </div>
                        )}
                    </div>
                </section>
            </main>

            {selectedProduct && (() => {
                const tax = calculateProductTax(selectedProduct.price, selectedProduct.type);
                return (
                    <div className="modal-overlay" onClick={() => setSelectedProduct(null)}>
                        <div className="modal-content" onClick={e => e.stopPropagation()}>
                            <button className="modal-close-btn" onClick={() => setSelectedProduct(null)}>
                                &times;
                            </button>
                            <div className="modal-body">
                                <div className="modal-image-container">
                                    <Image
                                        src={selectedProduct.image || '/images/products/douro-2018.png'}
                                        alt={selectedProduct.name}
                                        fill
                                        style={{ objectFit: 'contain', padding: '2rem' }}
                                        sizes="(max-width: 768px) 100vw, 50vw"
                                    />
                                </div>
                                <div className="modal-info">
                                    <div className="modal-header">
                                        <h2>{selectedProduct.name}</h2>
                                        <span className="product-type">{selectedProduct.type}</span>
                                    </div>

                                    <div className="product-meta" style={{ marginBottom: '1.5rem' }}>
                                        <span className="product-region">📍 {selectedProduct.region || 'Portugal'}</span>
                                        <span className="product-year">📅 {selectedProduct.year}</span>
                                    </div>

                                    <p className="modal-description">{selectedProduct.description}</p>

                                    <div className="modal-footer">
                                        <div className="modal-price-container">
                                            <div className="product-final-price" style={{ fontSize: '1.8rem' }}>
                                                {tax.formattedFinal} <span className="tax-badge-inc">IVA incluído</span>
                                            </div>
                                            <div className="product-tax-detail" style={{ fontSize: '0.85rem' }}>
                                                {tax.formattedBase} sem IVA · (+{tax.taxPercent}% IVA: {tax.formattedTax})
                                            </div>
                                        </div>
                                        <button
                                            className="btn-add-cart"
                                            onClick={() => {
                                                addToCart(selectedProduct);
                                                setSelectedProduct(null);
                                            }}
                                        >
                                            <svg className="cart-icon-btn" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                            </svg>
                                            Adicionar ao Carrinho
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })()}

            <Footer />
        </>
    );
}

export default function LojaPage() {
    return (
        <Suspense fallback={
            <div className="flex justify-center items-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
        }>
            <LojaContent />
        </Suspense>
    );
}
