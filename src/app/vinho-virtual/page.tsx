'use client';

import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useCart } from '@/context/CartContext';
import { Product } from '@/types/cart';
import './page.css';

export default function VinhoVirtualPage() {
    const { addToCart } = useCart();

    const wine: Product = {
        id: 999, // ID único para o Vinho Virtual
        name: "Virtual Tinto 2020",
        type: "Tinto",
        price: 22.50,
        image: "/images/loja/vinho virtual.jpg",
        description: "É um vinho com fruta fresca e cintilante, de bom volume, sem arestas e muito saboroso. Maduro mas sem ser musculado e concentrado, tem matéria e complexidade e, acima de tudo, um frescor delicioso.",
    };

    const handleAddToCart = () => {
        addToCart(wine);
        alert("Vinho adicionado ao carrinho!");
    };
    return (
        <>
            <Header />
            <div className="virtual-page">
                {/* Herói com Vídeo */}

                <main className="virtual-main">
                    <div className="container">
                        <div className="virtual-hero">
                            {/* Vídeo do Vinho na Esquerda */}
                            <div className="virtual-video-side">
                                <div className="video-container-boxed">
                                    <video 
                                        className="hero-video"
                                        autoPlay 
                                        muted 
                                        loop 
                                        playsInline
                                    >
                                        <source src="/images/brand/Video_Virtual.mp4" type="video/mp4" />
                                    </video>
                                    <div className="video-overlay"></div>
                                    <div className="hero-video-text">
                                        <h1>Virtual</h1>
                                        <p>A Essência do Douro</p>
                                    </div>
                                </div>
                            </div>

                            {/* Conteúdo Técnico e Narrativa */}
                            <div className="virtual-content">
                                <div className="rating-badge">
                                    <span>★ 92 PONTOS</span>
                                    <small>(PORTUGAL PROVA)</small>
                                </div>

                                <h1 className="virtual-title">
                                    Virtual <br />
                                    <span>Tinto 2020</span>
                                </h1>

                                <div className="virtual-story">
                                    <p>
                                        "É um vinho com fruta fresca e cintilante, de bom volume, sem arestas e muito saboroso.
                                        Maduro mas sem ser musculado e concentrado, tem matéria e complexidade e, acima de tudo,
                                        um frescor delicioso, diferente de acidez pura e que só se consegue em altitude."
                                    </p>
                                </div>

                                <div className="tech-sheet">
                                    <div className="tech-grid">
                                        <div className="tech-item">
                                            <span className="tech-label">Região</span>
                                            <span className="tech-value">Douro DOC</span>
                                        </div>
                                        <div className="tech-item">
                                            <span className="tech-label">Castas</span>
                                            <span className="tech-value">Touriga Nacional, Franca, Tinta Roriz</span>
                                        </div>
                                        <div className="tech-item">
                                            <span className="tech-label">Álcool</span>
                                            <span className="tech-value">14.5%</span>
                                        </div>
                                        <div className="tech-item">
                                            <span className="tech-label">Estágio</span>
                                            <span className="tech-value">18 Meses Carvalho</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="purchase-section">
                                    <div className="price-container">
                                        <div className="price-tag">€22,50</div>
                                        <p className="iva-text">IVA incluído</p>
                                    </div>
                                    
                                    <button className="buy-button" onClick={handleAddToCart}>
                                        Adicionar ao Carrinho
                                    </button>
                                </div>
                            </div>
                        </div>


                        <section className="history-section">
                            <div className="history-content">
                                <h2>A Herança do Terroir</h2>
                                <p>
                                    O Virtual Tinto 2020 nasceu da vontade da 3GWine em expressar o Douro de forma mais leve e elegante.
                                    Proveniente de vinhas situadas em Favaios, a altitude elevada confere a este vinho uma frescura
                                    invulgar na região, permitindo que a fruta brilhe sem o peso excessivo da madeira ou de extrações profundas.
                                    É uma interpretação moderna de um terroir clássico.
                                </p>
                            </div>
                        </section>
                    </div>
                </main>
            </div>
            <Footer />
        </>
    );
}
