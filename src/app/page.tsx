'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { RedWaxSeal } from '@/components/BrandSeal';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import './page.css';

export default function Home() {
  const [weeklyHighlight, setWeeklyHighlight] = useState<any>(null);
  const [featuredProducts, setFeaturedProducts] = useState<any[]>([]);
  const [cartaProducts, setCartaProducts] = useState<any[]>([]);

  useEffect(() => {
    async function loadData() {
      try {
        const [weeklyRes, featuredRes, allRes] = await Promise.all([
          fetch('/api/products?weekly=true'),
          fetch('/api/products?featured=true'),
          fetch('/api/products')
        ]);

        const weeklyData = await weeklyRes.json();
        if (weeklyData.success && weeklyData.product) {
          setWeeklyHighlight(weeklyData.product);
        }

        const featuredData = await featuredRes.json();
        if (featuredData.success && featuredData.products) {
          setFeaturedProducts(featuredData.products);
        }

        const allData = await allRes.json();
        if (allData.success && allData.products) {
          setCartaProducts(allData.products.slice(0, 6));
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
              src="/images/brand/3gwine-hero-bg.jpg"
              alt="Garrafeira 3GWINE"
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

            {/* Coluna Direita: Destaque da Semana como Rótulo Recortado + Selo de Lacre */}
            <div className="hero-highlight-side animate-fadeIn">
              <div className="weekly-highlight-box">
                <div className="weekly-wax-seal-wrapper" title="Selo de Garantia 3GWINE">
                  <RedWaxSeal className="weekly-wax-seal" />
                </div>
                <div className="highlight-frame diecut-label double-brown-frame">
                  <div className="highlight-label-classic">Reserva da Semana · Edição Numerada</div>
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
                    <p>{weeklyHighlight?.description ? weeklyHighlight.description.substring(0, 65) + '...' : "Uma seleção de excelência para os paladares mais exigentes."}</p>
                    {weeklyHighlight?.price && (
                      <div className="highlight-price">€{Number(weeklyHighlight.price).toFixed(2)}</div>
                    )}
                    <Link href="/loja" className="btn btn-primary highlight-cta-btn">Ver na Carta</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Products Section (Pergaminho Creme - 1 linha de 3 a 4 cartões + Carta de Vinhos) */}
        <section className="featured-section parchment-bg">
          <div className="container">
            <div className="section-header">
              <div className="section-eyebrow">Coleção de Cave</div>
              <h2 className="section-title">Rótulos em Destaque</h2>
              <div className="ornate-divider">
                <span>❦</span>
              </div>
              <p className="section-subtitle">
                Os nossos vinhos mais prestigiados e procurados em rótulos selecionados
              </p>
            </div>

            {featuredProducts.length > 0 ? (
              <div className="products-grid-single-row">
                {featuredProducts.slice(0, 4).map((p) => (
                  <div key={p.id} className="product-card-wrapper">
                    <div className="product-card diecut-label double-brown-frame">
                      <div className="product-label-top">
                        <span>{p.region || 'Portugal'}</span>
                        {p.featured && <span className="product-badge-classic">Destaque</span>}
                      </div>
                      <div className="product-image-wrapper">
                        <div className="product-image-placeholder">
                          <Image
                            src={p.image || '/images/products/douro-2018.png'}
                            alt={p.name}
                            fill
                            style={{ objectFit: 'contain', padding: '0.75rem' }}
                            sizes="(max-width: 768px) 100vw, 25vw"
                          />
                        </div>
                      </div>
                      <div className="product-content">
                        <h3 className="product-name">{p.name}</h3>
                        <p className="product-type">{p.type} {p.year ? `· ${p.year}` : ''}</p>
                        <p className="product-description">{p.description}</p>
                        <div className="product-footer">
                          <span className="product-price">€{Number(p.price).toFixed(2)}</span>
                          <Link href="/loja" className="btn-add-cart-classic">
                            Ver Rótulo
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="empty-featured-classic double-brown-frame">
                <p>🍷 O catálogo oficial está pronto a receber os vinhos selecionados da nossa garrafeira.</p>
                <Link href="/loja" className="btn btn-primary">
                  Explorar a Carta de Vinhos
                </Link>
              </div>
            )}

            {/* Prévia da Carta de Vinhos Antiga */}
            {cartaProducts.length > 0 && (
              <div className="carta-preview-box double-brown-frame">
                <div className="carta-wax-seal-wrapper">
                  <RedWaxSeal className="carta-wax-seal" />
                </div>
                <div className="carta-preview-header">
                  <div className="carta-eyebrow">Garrafeira <span className="brand-3gwine">3GWINE</span> · Edição Clássica</div>
                  <h3 className="carta-title">Carta de Vinhos da Casa</h3>
                </div>
                <div className="carta-preview-grid">
                  {cartaProducts.map((item) => (
                    <Link href="/loja" key={item.id} className="carta-preview-item">
                      <div className="carta-item-row">
                        <span className="carta-item-name">{item.name}</span>
                        <span className="carta-dotted-leader"></span>
                        <span className="carta-item-price">€{Number(item.price).toFixed(2)}</span>
                      </div>
                      <div className="carta-item-meta">
                        {item.type} {item.year ? `· Colheita ${item.year}` : ''} {item.region ? `· ${item.region}` : ''}
                      </div>
                    </Link>
                  ))}
                </div>
                <div className="section-cta">
                  <Link href="/loja" className="btn btn-primary">
                    Abrir Carta de Vinhos Completa
                  </Link>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* About Preview Section (Cave Escura + Foto da Loja do Mário) */}
        <section className="about-preview">
          <div className="about-grid">
            <div className="about-image double-gold-frame">
              <Image
                src="/images/brand/3gwine-hero-bg.jpg"
                alt="Garrafeira Física 3GWINE"
                fill
                style={{ objectFit: 'contain', objectPosition: 'center' }}
                quality={95}
              />
            </div>

            <div className="about-content">
              <div className="about-badge">A Nossa História</div>
              <h2 className="about-title">
                Paixão pelo Vinho, <br />
                <span className="text-gold">Compromisso com a Excelência</span>
              </h2>
              <div className="divider-gold" style={{ margin: 'var(--spacing-md) 0' }}></div>
              <p className="about-text">
                A <span className="brand-3gwine" style={{ fontSize: '0.9em' }}>3GWINE</span> nasceu em 2016 de uma paixão profunda pelo mundo do vinho,
                focada em oferecer vinhos únicos e diferenciados que não se encontram nos circuitos comerciais habituais.
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
