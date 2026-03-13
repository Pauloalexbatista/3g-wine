'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useCart } from '@/context/CartContext';
import { supabase } from '@/lib/supabase';
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

export default function LojaPage() {
    const { addToCart } = useCart();
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedType, setSelectedType] = useState<string>('Todos');
    const [priceRange, setPriceRange] = useState<string>('Todos');
    const [sortBy, setSortBy] = useState<string>('featured');
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);


    const types = ['Todos', 'Tinto', 'Branco', 'Rosé', 'Espumante', 'Outros'];
    const priceRanges = ['Todos', '0-30€', '30-50€', '50-100€', '100+€'];

    useEffect(() => {
        fetchProducts();
    }, []);

    async function fetchProducts() {
        try {
            setLoading(true);
            const { data, error } = await supabase
                .from('products')
                .select('*');

            if (error) throw error;
            if (data) setProducts(data);
        } catch (error) {
            console.error('Erro ao carregar produtos:', error);
        } finally {
            setLoading(false);
        }
    }

    // Filter products
    let filteredProducts = [...products];

    if (selectedType !== 'Todos') {
        filteredProducts = filteredProducts.filter(p => p.type === selectedType);
    }

    if (priceRange !== 'Todos') {
        filteredProducts = filteredProducts.filter(p => {
            if (priceRange === '0-30€') return p.price <= 30;
            if (priceRange === '30-50€') return p.price > 30 && p.price <= 50;
            if (priceRange === '50-100€') return p.price > 50 && p.price <= 100;
            if (priceRange === '100+€') return p.price > 100;
            return true;
        });
    }

    // Sort products
    if (sortBy === 'price-asc') {
        filteredProducts.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
        filteredProducts.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'name') {
        filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === 'featured') {
        // Sort by id for now as proxy for default, or if we had a featured column we could use it
        // The mock data had featured boolean, let's assume Supabase has it or we sort by ID
        filteredProducts.sort((a, b) => (b.featured === a.featured ? 0 : b.featured ? 1 : -1));
    }

    return (
        <>
            <Header />

            <main className="loja-page">
                {/* Filters Section */}

                {/* Filters Section */}
                <section className="filters-section">
                    <div className="container">
                        <div className="filters-bar">
                            {/* Type Filter */}
                            <div className="filter-group type-filter-group">
                                <div className="filter-header-inline">
                                    <label className="filter-label">Tipo</label>
                                    <div className="results-count-inline">
                                        {loading ? 'Carregando...' : `${filteredProducts.length} ${filteredProducts.length === 1 ? 'produto encontrado' : 'produtos encontrados'}`}
                                    </div>
                                </div>
                                <div className="filter-buttons">
                                    {types.map(type => (
                                        <button
                                            key={type}
                                            className={`filter-btn ${selectedType === type ? 'active' : ''}`}
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

                {/* Products Grid */}
                <section className="products-section">
                    <div className="container">
                        {loading ? (
                            <div className="flex justify-center items-center py-20">
                                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                            </div>
                        ) : (
                            <div className="products-grid">
                                {filteredProducts.map(product => (
                                    <div key={product.id} className="product-card" onClick={() => setSelectedProduct(product)}>

                                        <div className="product-image-wrapper">
                                            {product.featured && (
                                                <div className="product-badge">Destaque</div>
                                            )}
                                            <div className="product-image-placeholder">
                                                <Image
                                                    src={product.image || '/images/products/douro-2018.png'}
                                                    alt={product.name}
                                                    fill
                                                    style={{ objectFit: 'contain', padding: '1rem' }}
                                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                                />
                                            </div>
                                        </div>

                                        <div className="product-content">
                                            <div className="product-header">
                                                <h3 className="product-name">{product.name}</h3>
                                                <span className="product-type">{product.type}</span>
                                            </div>

                                            <div className="product-meta">
                                                <span className="product-region">📍 {product.region || 'Portugal'}</span>
                                                <span className="product-year">🗓️ {product.year}</span>
                                            </div>

                                            <p className="product-description">{product.description}</p>

                                            <div className="product-footer">
                                                <span className="product-price">€{product.price.toFixed(2)}</span>
                                                <button
                                                    className="btn-add-cart"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        addToCart(product);
                                                        // alert removed for smoother UX or replace with toast later
                                                    }}

                                                >
                                                    <svg className="cart-icon-btn" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                                    </svg>
                                                    Adicionar
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {filteredProducts.length === 0 && (
                            <div className="no-results">
                                <div className="no-results-icon">🔍</div>
                                <h3>Nenhum produto encontrado</h3>
                                <p>Tente ajustar os seus filtros</p>
                            </div>
                        )}
                    </div>
                </section>
            </main>

            {selectedProduct && (
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
                                    <span className="product-year">🗓️ {selectedProduct.year}</span>
                                </div>

                                <p className="modal-description">{selectedProduct.description}</p>

                                <div className="modal-footer">
                                    <span className="product-price" style={{ fontSize: '2rem' }}>€{selectedProduct.price.toFixed(2)}</span>
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
            )}


            <Footer />
        </>
    );
}
