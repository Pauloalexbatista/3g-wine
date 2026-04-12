import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Image from 'next/image';
import './page.css';

export default function SobrePage() {
    return (
        <>
            <Header />

            <main className="sobre-page">
                <section className="sobre-hero">
                    <div className="sobre-hero-image">
                        <Image
                            src="/images/brand/tasting-room-vineyard.jpg"
                            alt="3G Wine Tasting Room"
                            fill
                            style={{ objectFit: 'cover' }}
                            priority
                        />
                        <div className="sobre-hero-overlay"></div>
                    </div>
                    <div className="container">
                        <div className="sobre-hero-content">
                            <div className="sobre-badge">A Nossa História</div>
                            <h1 className="sobre-title">
                                3GWINE
                            </h1>
                            <div className="divider-gold"></div>
                            <p className="sobre-tagline">Garrafeira Exclusiva desde o início</p>
                        </div>
                    </div>
                </section>

                {/* Story Section */}
                <section className="story-section">
                    <div className="container">
                        <div className="story-grid">
                            <div className="story-content">
                                <h2 className="section-title">Nossa Paixão pelo Vinho</h2>
                                <div className="divider-gold" style={{ margin: 'var(--spacing-md) 0' }}></div>

                                <p className="story-text">
                                    <strong>3GWINE</strong> É uma Garrafeira Original que nasceu em Outubro de 2016 dentro de uma Barbearia, <strong>3GBARBEARIA</strong>. Foi aliás o primeiro projecto deste género criado em Portugal.
                                </p>

                                <p className="story-text">
                                    Nasceu de uma paixão vínica do proprietário Mário Medeiros e é esse ambiente que proporcionamos a quem nos procura com uma vasta seleção de vinhos únicos e diferenciados para apaixonados pelo néctar do Deus Baco.
                                </p>
                            </div>

                            <div className="story-image">
                                <Image
                                    src="/images/brand/vineyard-sunset-house.jpg"
                                    alt="Vineyard at Sunset"
                                    fill
                                    style={{ objectFit: 'cover' }}
                                />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Values Section */}
                <section className="values-section">
                    <div className="container">
                        <h2 className="section-title text-center">Os Nossos Valores</h2>
                        <div className="divider-gold"></div>

                        <div className="values-grid">
                            <div className="value-card">
                                <div className="value-icon gold-icon">
                                    <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <circle cx="12" cy="8" r="7" />
                                        <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
                                    </svg>
                                </div>
                                <h3 className="value-title">Qualidade</h3>
                                <p className="value-description">
                                    Selecionamos apenas os melhores vinhos, com rigorosos padrões de qualidade
                                    e autenticidade garantida.
                                </p>
                            </div>

                            <div className="value-card">
                                <div className="value-icon gold-icon">
                                    <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                                        <path d="M9 12l2 2 4-4" />
                                    </svg>
                                </div>
                                <h3 className="value-title">Confiança</h3>
                                <p className="value-description">
                                    Relações transparentes com produtores e clientes, baseadas em honestidade
                                    e respeito mútuo.
                                </p>
                            </div>

                            <div className="value-card">
                                <div className="value-icon gold-icon">
                                    <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M6 3h12l4 6-10 13L2 9z" />
                                        <path d="M11 3l-4 6 7 13" />
                                        <path d="M13 3l4 6-7 13" />
                                        <path d="M2 9h20" />
                                    </svg>
                                </div>
                                <h3 className="value-title">Exclusividade</h3>
                                <p className="value-description">
                                    Acesso a vinhos raros e edições limitadas que não encontra facilmente
                                    no mercado.
                                </p>
                            </div>

                            <div className="value-card">
                                <div className="value-icon gold-icon">
                                    <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                                        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                                    </svg>
                                </div>
                                <h3 className="value-title">Conhecimento</h3>
                                <p className="value-description">
                                    Partilhamos a nossa expertise para ajudá-lo a escolher o vinho perfeito
                                    para cada ocasião.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Cellar Section */}
                <section className="cellar-section">
                    <div className="cellar-grid">
                        <div className="cellar-content">
                            <h2 className="section-title">Nossa Adega</h2>
                            <div className="divider-gold" style={{ margin: 'var(--spacing-md) 0' }}></div>

                            <p className="cellar-text">
                                A nossa adega é um santuário dedicado à preservação e envelhecimento de vinhos
                                excecionais. Com condições controladas de temperatura e humidade, garantimos
                                que cada garrafa atinge o seu pleno potencial.
                            </p>

                            <p className="cellar-text">
                                Das caves tradicionais de Portugal aos vinhedos internacionais mais prestigiados,
                                trazemos para si uma seleção que reflete tradição, inovação e excelência.
                            </p>

                            <div className="cellar-stats">
                                <div className="stat-item">
                                    <div className="stat-number">500+</div>
                                    <div className="stat-label">Referências</div>
                                </div>
                                <div className="stat-item">
                                    <div className="stat-number">50+</div>
                                    <div className="stat-label">Produtores</div>
                                </div>
                                <div className="stat-item">
                                    <div className="stat-number">15+</div>
                                    <div className="stat-label">Regiões</div>
                                </div>
                            </div>
                        </div>

                        <div className="cellar-image">
                            <Image
                                src="/images/loja/Adega_Virtual.jpg"
                                alt="Adega Virtual 3G Wine"
                                fill
                                style={{ objectFit: 'contain' }}
                            />
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="cta-section">
                    <div className="container">
                        <div className="cta-content">
                            <h2 className="cta-title">Explore a Nossa Seleção</h2>
                            <p className="cta-text">
                                Descubra vinhos exclusivos e deixe-se surpreender pela qualidade
                                da nossa curadoria de excelência.
                            </p>
                            <a href="/loja" className="btn btn-primary">
                                Ver Todos os Vinhos
                            </a>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </>
    );
}
