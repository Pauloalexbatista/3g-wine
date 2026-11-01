'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import './page.css';

export default function Home() {
  const [weeklyHighlight, setWeeklyHighlight] = useState<any>(null);
  const [featuredProducts, setFeaturedProducts] = useState<any[]>([]);

  useEffect(() => {
    async function loadData() {
      try {
        const [weeklyRes, featuredRes] = await Promise.all([
          fetch('/api/products?weekly=true'),
          fetch('/api/products?featured=true')
        ]);

        const weeklyData = await weeklyRes.json();
        if (weeklyData.success && weeklyData.product) {
          setWeeklyHighlight(weeklyData.product);
        }

        const featuredData = await featuredRes.json();
        if (featuredData.success && featuredData.products) {
          setFeaturedProducts(featuredData.products);
        }
      } catch (err) {
        console.error("Erro ao carregar dados da homepage:", err);
      }
    }
    loadData();
  }, []);

  return (
    <>
      <Header />

      <main className="home-page">
        {/* Nova Hero Section Reestruturada com Fundo Total */}
        <section className="hero-modern-redesign">
          <div className="hero-background">
            <Image
              src="/images/brand/3gwine-barbearia-bg.jpg"
              alt="Garrafeira 3GWINE Barbearia"
              fill
              priority
              style={{ objectFit: 'cover', objectPosition: '28% top' }}
              quality={90}
            />
            <div className="hero-overlay-redesign"></div>
          </div>
          <div className="container hero-grid-redesign">
            {/* Coluna Esquerda: Texto e Botões */}
            <div className="hero-text-side">
              <div className="hero-badge animate-fadeIn">Garrafeira exclusiva</div>
              <h1 className="hero-title animate-fadeIn">
                A Arte de Escolher <br />
                <span className="text-gold brand-3gwine logo-text-hero">3GWINE</span>
              </h1>
              <p className="hero-subtitle animate-fadeIn">
                Vinhos premium seleccionados com paixão para os verdadeiros apreciadores.
              </p>
              <div className="hero-buttons animate-fadeIn">
                <Link href="/loja" className="btn btn-primary">Loja</Link>
                <Link href="/sobre" className="btn btn-outline-white">
                  A Nossa História
                </Link>
              </div>
            </div>

            {/* Coluna Direita: Destaque da Semana */}
            <div className="hero-highlight-side animate-fadeIn">
              <div className="weekly-highlight-box">
                <div className="highlight-label">Destaque da Semana</div>
                <div className="highlight-frame">
                  <div className="highlight-image-container">
                    <Image
                      src={
                        (weeklyHighlight?.weekly_highlight_image && weeklyHighlight.weekly_highlight_image.trim()) 
                        || (weeklyHighlight?.image && weeklyHighlight.image.trim()) 
                        || "/images/products/douro-2018.png"
                      }
                      alt={weeklyHighlight?.name || "Garrafeira 3GWINE"}
                      fill
                      style={{ objectFit: 'contain' }}
                      priority
                    />
                  </div>
                  <div className="highlight-info">
                    <h3>{weeklyHighlight?.name || "Garrafeira 3GWINE"}</h3>
                    <p>{weeklyHighlight?.description ? weeklyHighlight.description.substring(0, 50) + '...' : "Uma seleção de excelência para os paladares mais exigentes."}</p>
                    <Link href="/loja" className="btn-details">Ver Catálogo</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Products Section */}
        <section className="featured-section">
          <div className="container">
            <div className="section-header">
              <h2 className="section-title">Destaques</h2>
              <div className="divider-gold"></div>
              <p className="section-subtitle">
                Os nossos vinhos mais prestigiados e procurados
              </p>
            </div>

            {featuredProducts.length > 0 ? (
              <div className="products-grid">
                {featuredProducts.map((p) => (
                  <div key={p.id} className="product-card">
                    <div className="product-image-wrapper">
                      {p.featured && <div className="product-badge">Destaque</div>}
                      <div className="product-image-placeholder">
                        <Image
                          src={p.image || '/images/products/douro-2018.png'}
                          alt={p.name}
                          fill
                          style={{ objectFit: 'contain', padding: '1rem' }}
                          sizes="(max-width: 768px) 100vw, 33vw"
                        />
                      </div>
                    </div>
                    <div className="product-content">
                      <h3 className="product-name">{p.name}</h3>
                      <p className="product-type">{p.type} {p.year ? `| ${p.year}` : ''}</p>
                      <p className="product-description">{p.description}</p>
                      <div className="product-footer">
                        <span className="product-price">€{Number(p.price).toFixed(2)}</span>
                        <Link href="/loja" className="btn-add-cart" style={{ textDecoration: 'none' }}>
                          Ver na Loja
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: '3.5rem 1rem', backgroundColor: '#fcfcfc', borderRadius: '12px', border: '1px solid #f0f0f0' }}>
                <p style={{ fontSize: '1.15rem', color: '#4b5563', marginBottom: '1rem', fontWeight: 500 }}>
                  🍷 O catálogo oficial está pronto a receber os vinhos selecionados da nossa garrafeira.
                </p>
                <p style={{ fontSize: '0.9rem', color: '#9ca3af', marginBottom: '1.75rem' }}>
                  Explore a nossa história ou visite-nos na Póvoa de Santa Iria.
                </p>
                <Link href="/loja" className="btn btn-secondary">
                  Explorar a Loja
                </Link>
              </div>
            )}

            {featuredProducts.length > 0 && (
              <div className="section-cta">
                <Link href="/loja" className="btn btn-secondary">
                  Ver Toda a Coleção
                </Link>
              </div>
            )}
          </div>
        </section>

        {/* About Preview Section */}
        <section className="about-preview">
          <div className="about-grid">
            <div className="about-image">
              <Image
                src="/images/brand/vineyard-sunset-house.jpg"
                alt="3G Wine Vineyard"
                fill
                style={{ objectFit: 'cover' }}
                quality={100}
              />
              <div className="about-image-overlay"></div>
            </div>

            <div className="about-content">
              <div className="about-badge">A Nossa História</div>
              <h2 className="about-title">
                Paixão pelo Vinho, <br />
                <span className="text-gold">Compromisso com a Excelência</span>
              </h2>
              <div className="divider-gold" style={{ margin: 'var(--spacing-md) 0' }}></div>
              <p className="about-text">
                A <span className="brand-3gwine" style={{ fontSize: '0.9em' }}>3GWINE</span> nasceu em 2016 de uma paixão profunda pelo mundo do vinho.
                Criada dentro da 3GBARBEARIA, foi o primeiro projeto deste género
                em Portugal, focado em oferecer vinhos únicos e diferenciados.
              </p>
              <p className="about-text">
                Com a curadoria de Mário Medeiros, proporcionamos um ambiente
                exclusivo para apaixonados pelo vinho, garantindo qualidade,
                tradição e exclusividade em cada garrafa selecionada.
              </p>
              <Link href="/sobre" className="btn btn-outline">
                Saiba Mais Sobre Nós
              </Link>
            </div>
          </div>
        </section>

        {/* CTA Newsletter Section */}
        <section className="newsletter-cta">
          <div className="container">
            <div className="newsletter-content">
              <div className="newsletter-icon">📧</div>
              <h2 className="newsletter-title">Receba as Nossas Novidades</h2>
              <p className="newsletter-text">
                Subscreva a nossa newsletter e fique a par de lançamentos exclusivos,
                promoções especiais e eventos.
              </p>
              <form 
                className="newsletter-form-main"
                onSubmit={async (e) => {
                  e.preventDefault();
                  const target = e.target as HTMLFormElement;
                  const input = target.querySelector('input') as HTMLInputElement;
                  if (input && input.value) {
                    try {
                      await fetch('/api/newsletter', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ email: input.value })
                      });
                      alert('Obrigado pela sua subscrição!');
                      input.value = '';
                    } catch (err) {
                      console.error(err);
                    }
                  }
                }}
              >
                <input
                  type="email"
                  placeholder="O seu endereço de email"
                  className="newsletter-input-main"
                  required
                />
                <button type="submit" className="btn btn-primary">
                  Subscrever
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
