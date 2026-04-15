'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import './page.css';

export default function Home() {
  const [weeklyHighlight, setWeeklyHighlight] = useState<any>(null);

  useEffect(() => {
    async function fetchWeeklyHighlight() {
      try {
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .eq('is_weekly_highlight', true)
          .maybeSingle();

        if (data) setWeeklyHighlight(data);
      } catch (err) {
        console.error("Erro ao carregar destaque:", err);
      }
    }
    fetchWeeklyHighlight();
  }, []);

  return (
    <>
      <Header />

      <main className="home-page">
        {/* Nova Hero Section Reestruturada com Fundo Total */}
        <section className="hero-modern-redesign">
          <div className="hero-background">
            <Image
              src="/images/brand/quinta-hero-bg.png"
              alt="Rustic Vineyard Background"
              fill
              priority
              style={{ objectFit: 'cover' }}
              quality={100}
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
                <Link href="/loja" className="btn btn-primary">
                  A Nossa Seleção
                </Link>
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
                      src={weeklyHighlight?.weekly_highlight_image || weeklyHighlight?.image || "/images/products/douro-2018.png"}
                      alt={weeklyHighlight?.name || "Destaque da Semana"}
                      fill
                      style={{ objectFit: 'contain' }}
                      priority
                    />
                  </div>
                  <div className="highlight-info">
                    <h3>{weeklyHighlight?.name || "Vinho Premium"}</h3>
                    <p>{weeklyHighlight?.description ? weeklyHighlight.description.substring(0, 50) + '...' : "Um clássico reinterpretado para os paladares mais exigentes."}</p>
                    <Link href="/loja" className="btn-details">Ver Detalhes</Link>
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

            <div className="products-grid">
              {/* Product 1 */}
              <div className="product-card">
                <div className="product-image-wrapper">
                  <div className="product-badge">Novo</div>
                  <div className="product-image-placeholder">
                    <Image
                      src="/images/products/douro-2018.png"
                      alt="Reserva do Douro 2018"
                      fill
                      style={{ objectFit: 'contain', padding: '1rem' }}
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                </div>
                <div className="product-content">
                  <h3 className="product-name">Reserva do Douro 2018</h3>
                  <p className="product-type">Vinho Tinto</p>
                  <p className="product-description">
                    Um vinho robusto com notas de frutas maduras e carvalho
                  </p>
                  <div className="product-footer">
                    <span className="product-price">€45,00</span>
                    <button className="btn-add-cart">Adicionar</button>
                  </div>
                </div>
              </div>

              {/* Product 2 */}
              <div className="product-card">
                <div className="product-image-wrapper">
                  <div className="product-badge badge-exclusive">Exclusivo</div>
                  <div className="product-image-placeholder">
                    <Image
                      src="/images/products/alentejo-2019.png"
                      alt="Quinta do Alentejo 2019"
                      fill
                      style={{ objectFit: 'contain', padding: '1rem' }}
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                </div>
                <div className="product-content">
                  <h3 className="product-name">Quinta do Alentejo 2019</h3>
                  <p className="product-type">Vinho Branco</p>
                  <p className="product-description">
                    Elegante e fresco, com aromas a citrinos e flores brancas
                  </p>
                  <div className="product-footer">
                    <span className="product-price">€38,00</span>
                    <button className="btn-add-cart">Adicionar</button>
                  </div>
                </div>
              </div>

              {/* Product 3 */}
              <div className="product-card">
                <div className="product-image-wrapper">
                  <div className="product-badge">Premium</div>
                  <div className="product-image-placeholder">
                    <Image
                      src="/images/products/grande-reserva-2015.png"
                      alt="Grande Reserva 2015"
                      fill
                      style={{ objectFit: 'contain', padding: '1rem' }}
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                </div>
                <div className="product-content">
                  <h3 className="product-name">Grande Reserva 2015</h3>
                  <p className="product-type">Vinho Tinto</p>
                  <p className="product-description">
                    Complexo e elegante, ideal para ocasiões especiais
                  </p>
                  <div className="product-footer">
                    <span className="product-price">€85,00</span>
                    <button className="btn-add-cart">Adicionar</button>
                  </div>
                </div>
              </div>
            </div>

            <div className="section-cta">
              <Link href="/loja" className="btn btn-secondary">
                Ver Toda a Coleção
              </Link>
            </div>
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
              <form className="newsletter-form-main">
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
