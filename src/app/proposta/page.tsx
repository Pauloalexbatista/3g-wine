'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Image from 'next/image';
import { useState } from 'react';
import './page.css';

export default function Proposta() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      <Header />
      
      <main className="proposta-page">
        {/* Hero Section - Dramática */}
        <section className="hero-proposta">
          <div className="hero-overlay"></div>
          <div className="hero-content">
            <div className="hero-badge">Garrafeira Exclusiva</div>
            <h1 className="hero-title">
              Uma Experiência<br />
              <span className="text-gold">Além do Vinho</span>
            </h1>
            <p className="hero-subtitle">
              Descubra a nossa coleção privada de garrafas históricas.<br />
              Cada garrafa conta uma história. Cada gole, uma memória.
            </p>
            <div className="hero-scroll">
              <span>Explore</span>
              <div className="scroll-line"></div>
            </div>
          </div>
        </section>

        {/* Coleção Privada */}
        <section className="colecao-section">
          <div className="container">
            <div className="section-header">
              <span className="section-tag">A NossaJOIA</span>
              <h2 className="section-title">Coleção Privada</h2>
              <div className="divider-gold"></div>
              <p className="section-desc">
                Sélections raras de quintas míticas,guardadas em condições perfeitas.<br />
                Para quem procura o extraordinário.
              </p>
            </div>

            <div className="garrafas-grid">
              <div className="garrafa-card card-1">
                <div className="garrafa-image">
                  <Image 
                    src="/images/products/grande-reserva-2015.png" 
                    alt="Grande Reserva 2015" 
                    width={120} 
                    height={350}
                  />
                </div>
                <div className="garrafa-info">
                  <span className="garrafa-ano">2015</span>
                  <h3>Grande Reserva</h3>
                  <p>Douro • Tinto</p>
                  <span className="garrafa-preco">€85,00</span>
                </div>
              </div>

              <div className="garrafa-card card-2">
                <div className="garrafa-image">
                  <Image 
                    src="/images/products/douro-2018.png" 
                    alt="Reserva do Douro 2018" 
                    width={120} 
                    height={350}
                  />
                </div>
                <div className="garrafa-info">
                  <span className="garrafa-ano">2018</span>
                  <h3>Reserva do Douro</h3>
                  <p>Douro • Tinto</p>
                  <span className="garrafa-preco">€45,00</span>
                </div>
              </div>

              <div className="garrafa-card card-3 featured">
                <div className="featured-tag">Raro</div>
                <div className="garrafa-image">
                  <Image 
                    src="/images/products/alentejo-2019.png" 
                    alt="Quinta do Alentejo 2019" 
                    width={120} 
                    height={350}
                  />
                </div>
                <div className="garrafa-info">
                  <span className="garrafa-ano">2019</span>
                  <h3>Quinta do Alentejo</h3>
                  <p>Alentejo • Branco</p>
                  <span className="garrafa-preco">€38,00</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Experiência Exclusiva */}
        <section className="experiencia-section">
          <div className="experiencia-grid">
            <div className="experiencia-visual">
              <div className="visual-frame">
                <div className="visual-placeholder">
                  <div className="icon-wine">🍷</div>
                </div>
              </div>
            </div>
            <div className="experiencia-content">
              <span className="section-tag">O DIFERENCIAL</span>
              <h2>A Experiência<br /><span className="text-gold brand-3gwine">3GWINE</span></h2>
              <div className="divider-gold" style={{margin: '1.5rem 0', width: '60px'}}></div>
              
              <div className="features-list">
                <div className="feature-item">
                  <div className="feature-number">01</div>
                  <div className="feature-text">
                    <h4>Curação Personalizada</h4>
                    <p>Um sommelier dedicado cria selections exclusivas para o seu gosto.</p>
                  </div>
                </div>
                <div className="feature-item">
                  <div className="feature-number">02</div>
                  <div className="feature-text">
                    <h4>Envelhecimento Controlado</h4>
                    <p>Armazenagem profissional com temperatura e humidade ideais.</p>
                  </div>
                </div>
                <div className="feature-item">
                  <div className="feature-number">03</div>
                  <div className="feature-text">
                    <h4>Eventos Privados</h4>
                    <p>Degustações exclusivas em ambiente intimista para membros.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Clube Exclusivo */}
        <section className="clube-section">
          <div className="clube-bg"></div>
          <div className="container">
            <div className="clube-content">
              <span className="section-tag text-white">MEMBRO EXCLUSIVO</span>
              <h2 className="text-white">Entre para o<br /><span className="text-gold brand-3gwine">Clube 3GWINE</span></h2>
              <p className="clube-desc">
                Tenha acesso a lançamentos exclusivos, preços especiais e eventos privado.
              </p>
              
              {!submitted ? (
                <form className="clube-form" onSubmit={handleSubmit}>
                  <input 
                    type="email" 
                    placeholder="O seu email para convite" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="clube-input"
                    required
                  />
                  <button type="submit" className="btn btn-gold">
                    Solicitar Convite
                  </button>
                </form>
              ) : (
                <div className="success-message">
                  <div className="success-icon">✓</div>
                  <p>Obrigado. Entraremos em contacto em breve.</p>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
