'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import './Footer.css';

export default function Footer() {
    const currentYear = new Date().getFullYear();
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [message, setMessage] = useState('');
    const [showLegalModal, setShowLegalModal] = useState(false);

    const handleSubscribe = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');
        setMessage('');

        try {
            const res = await fetch('/api/newsletter', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email })
            });

            const data = await res.json();
            if (!res.ok || !data.success) {
                throw new Error(data.error || 'Erro ao subscrever.');
            }

            setStatus('success');
            setMessage('Obrigado por subscrever!');
            setEmail('');
        } catch (error: any) {
            console.error('Newsletter error:', error);
            setStatus('error');
            setMessage(error.message || 'Erro ao subscrever. Tente novamente.');
        }
    };

    const quickLinks = [
        { href: '/', label: 'Início' },
        { href: '/loja', label: 'Loja de Vinhos' },
        { href: '/sobre', label: 'Sobre Nós' },
        { href: '/contactos', label: 'Contactos' },
        { href: '/carrinho', label: 'Carrinho' },
        { href: '/admin', label: 'Administração' },
    ];

    const legalLinks = [
        { href: '/termos', label: 'Termos e Condições' },
        { href: '/envios-e-devolucoes', label: 'Prazos de Entrega & Devoluções' },
        { href: '/privacidade', label: 'Política de Privacidade (RGPD)' },
        { href: '/ral', label: 'Resolução de Litígios (RAL)' },
    ];

    const socialLinks = [
        {
            name: 'Facebook',
            href: 'https://facebook.com/3gwine',
            icon: (
                <svg fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
            )
        },
        {
            name: 'Instagram',
            href: 'https://instagram.com/3gwine',
            icon: (
                <svg fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg>
            )
        },
    ];

    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-grid">
                    {/* 1. Logótipo e Identificação Legal Titular */}
                    <div className="footer-section">
                        <div className="footer-logo">
                            <span className="logo-text brand-3gwine">3GWINE</span>
                        </div>
                        <p className="footer-tagline">Garrafeira exclusiva</p>
                        <p className="footer-description">
                            Vinhos premium selecionados com paixão e dedicação para os verdadeiros apreciadores.
                        </p>
                        <div style={{ marginTop: '0.85rem', fontSize: '0.8rem', color: '#9ca3af', lineHeight: '1.45', background: 'rgba(255,255,255,0.03)', padding: '0.75rem', borderRadius: '6px', border: '1px solid rgba(212,175,55,0.2)' }}>
                            <strong style={{ color: '#FFD700' }}>Titular Legal (DL 24/2014):</strong><br />
                            Mário Jorge dos Santos Medeiros (ENI)<br />
                            <strong>NIF:</strong> 223412899 | <strong>CAE:</strong> 47250<br />
                            <strong>Estabelecimento:</strong> Rua António França Borges N-14 B, 2625-187 Póvoa de Santa Iria
                        </div>
                    </div>

                    {/* 2. Informação Legal Obrigatória */}
                    <div className="footer-section">
                        <h4 className="footer-title">Informação Legal</h4>
                        <ul className="footer-links">
                            {legalLinks.map((link) => (
                                <li key={link.href}>
                                    <Link href={link.href} className="footer-link">
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                            <li>
                                <a 
                                    href="https://www.livroreclamacoes.pt" 
                                    target="_blank" 
                                    rel="noopener noreferrer" 
                                    className="footer-link"
                                    style={{ color: '#FFD700', fontWeight: 600 }}
                                >
                                    Livro de Reclamações ↗
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* 3. Onde Estamos & Contactos Oficiais */}
                    <div className="footer-section">
                        <h4 className="footer-title">Onde Estamos & Contacto</h4>
                        <ul className="footer-info">
                            <li>
                                <span className="info-icon">📍</span>
                                <div>
                                    <strong style={{ color: '#D4AF37' }}>Garrafeira 3GWINE</strong><br />
                                    Rua António França Borges N-14 B<br />
                                    2625-187 Póvoa de Santa Iria
                                    <div style={{ marginTop: '0.5rem' }}>
                                        <a
                                            href="https://www.google.com/maps/dir/?api=1&destination=Rua+Ant%C3%B3nio+Fran%C3%A7a+Borges+N-14+B+2625-187+P%C3%B3voa+de+Santa+Iria"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            style={{
                                                display: 'inline-flex',
                                                alignItems: 'center',
                                                gap: '6px',
                                                padding: '4px 10px',
                                                backgroundColor: 'rgba(212, 175, 55, 0.15)',
                                                border: '1px solid #D4AF37',
                                                borderRadius: '6px',
                                                color: '#FFD700',
                                                fontSize: '0.72rem',
                                                fontWeight: 700,
                                                textDecoration: 'none'
                                            }}
                                        >
                                            🗺️ Google Maps
                                        </a>
                                    </div>
                                </div>
                            </li>
                            <li style={{ marginTop: '0.35rem' }}>
                                <span className="info-icon">📧</span>
                                <div>
                                    <a href="mailto:3gwine@gmail.com" style={{ color: '#e5e7eb', textDecoration: 'none' }}>3gwine@gmail.com</a>
                                </div>
                            </li>
                            <li>
                                <span className="info-icon">📞</span>
                                <div>
                                    <a href="tel:+351963908617" style={{ color: '#e5e7eb', textDecoration: 'none' }}>963 908 617</a> | <a href="tel:+351219591522" style={{ color: '#e5e7eb', textDecoration: 'none' }}>21 959 15 22</a>
                                </div>
                            </li>
                        </ul>
                    </div>

                    {/* 4. Newsletter e Selo Livro de Reclamações */}
                    <div className="footer-section">
                        <h4 className="footer-title">Newsletter</h4>
                        <p className="footer-newsletter-text">
                            Receba as nossas novidades de colheitas e ofertas exclusivas.
                        </p>
                        <form className="newsletter-form" onSubmit={handleSubscribe}>
                            <input
                                type="email"
                                placeholder="O seu email"
                                className="newsletter-input"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                disabled={status === 'loading' || status === 'success'}
                            />
                            <button
                                type="submit"
                                className="newsletter-button"
                                disabled={status === 'loading' || status === 'success'}
                            >
                                {status === 'loading' ? '...' : status === 'success' ? '✓' : 'Subscrever'}
                            </button>
                        </form>
                        <p style={{ fontSize: '0.72rem', color: '#888', marginTop: '0.4rem', lineHeight: '1.3' }}>
                            Ao subscrever, concorda com a nossa <Link href="/privacidade" style={{ color: '#FFD700', textDecoration: 'underline' }}>Política de Privacidade</Link>.
                        </p>
                        {message && (
                            <p style={{
                                marginTop: '0.5rem',
                                fontSize: '0.875rem',
                                color: status === 'error' ? '#f87171' : '#4ade80'
                            }}>
                                {message}
                            </p>
                        )}

                        {/* Banner Oficial Livro de Reclamações */}
                        <div style={{ marginTop: '1.25rem' }}>
                            <a
                                href="https://www.livroreclamacoes.pt"
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{ display: 'inline-block', transition: 'transform 0.2s' }}
                                title="Livro de Reclamações Eletrónico"
                            >
                                <Image
                                    src="/images/livro-reclamacoes.svg"
                                    alt="Livro de Reclamações Eletrónico"
                                    width={150}
                                    height={38}
                                />
                            </a>
                        </div>
                    </div>
                </div>

                <div className="footer-divider"></div>

                <div className="footer-bottom">
                    <div className="footer-social">
                        {socialLinks.map((social) => (
                            <a
                                key={social.name}
                                href={social.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="social-link"
                                aria-label={social.name}
                            >
                                {social.icon}
                            </a>
                        ))}
                    </div>

                    <p className="copyright">
                        © {currentYear} <span className="brand-3gwine" style={{ fontSize: '1em' }}>3GWINE</span>. Todos os direitos reservados.
                    </p>

                    <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center' }}>
                        <Link href="/termos" style={{ color: '#bbb', fontSize: '0.78rem', textDecoration: 'none' }}>
                            Termos & Condições
                        </Link>
                        <span style={{ color: '#555' }}>|</span>
                        <Link href="/envios-e-devolucoes" style={{ color: '#bbb', fontSize: '0.78rem', textDecoration: 'none' }}>
                            Envios & Devoluções
                        </Link>
                        <span style={{ color: '#555' }}>|</span>
                        <Link href="/privacidade" style={{ color: '#bbb', fontSize: '0.78rem', textDecoration: 'none' }}>
                            Privacidade (RGPD)
                        </Link>
                        <span style={{ color: '#555' }}>|</span>
                        <Link href="/ral" style={{ color: '#bbb', fontSize: '0.78rem', textDecoration: 'none' }}>
                            RAL & Arbitragem
                        </Link>
                        <span style={{ color: '#555' }}>|</span>
                        <button 
                            onClick={() => setShowLegalModal(true)} 
                            className="legal-modal-trigger"
                            style={{ margin: 0, padding: 0 }}
                            title="Abrir síntese legal em modal"
                        >
                            Resumo Legal
                        </button>
                    </div>
                </div>
            </div>

            {/* Modal de Consulta Rápida com Informação Legal Completa */}
            {showLegalModal && (
                <div className="legal-modal-overlay" onClick={() => setShowLegalModal(false)}>
                    <div className="legal-modal-content" onClick={(e) => e.stopPropagation()}>
                        <button className="modal-close" onClick={() => setShowLegalModal(false)}>✕</button>
                        
                        <div className="modal-body">
                            <h2 style={{ color: '#FFD700', fontSize: '1.85rem', textAlign: 'center', marginBottom: '1.5rem', fontFamily: 'var(--font-logo)' }}>
                                Conformidade Legal e Transparência Comercial
                            </h2>
                            
                            <section>
                                <h3>1. Identificação da Entidade Titular (Art. 4.º, 1-a DL 24/2014)</h3>
                                <p>
                                    <strong>Titular Legal:</strong> Mário Jorge dos Santos Medeiros (Empresário em Nome Individual)<br />
                                    <strong>Nome Comercial:</strong> 3GWINE<br />
                                    <strong>NIF:</strong> 223412899 | <strong>CAE:</strong> 47250 (Comércio a Retalho de Bebidas)<br />
                                    <strong>Estabelecimento Físico:</strong> Rua António França Borges N-14 B, 2625-187 Póvoa de Santa Iria, Portugal<br />
                                    <strong>Contactos Oficiais:</strong> 3gwine@gmail.com | (+351) 963 908 617 | (+351) 21 959 15 22
                                </p>
                            </section>

                            <section>
                                <h3>2. Idade Legal (Decreto-Lei n.º 106/2015)</h3>
                                <p>A venda e consumo de bebidas alcoólicas é expressamente proibida a menores de 18 anos. Ao efetuar qualquer encomenda o cliente declara ter atingido a maioridade legal.</p>
                            </section>

                            <section>
                                <h3>3. Prazos e Condições de Entrega</h3>
                                <p>
                                    • <strong>Portugal Continental:</strong> 24h a 72h úteis via transportadora em caixas reforçadas anti-choque. Custo de €12.50 (Portes Grátis para encomendas ≥ €150.00).<br />
                                    • <strong>Regiões Autónomas (Madeira e Açores):</strong> 3 a 8 dias úteis.<br />
                                    • <strong>Levantamento na Garrafeira (Loja Física):</strong> Disponível em 24h úteis na Rua António França Borges N-14 B, Póvoa de Santa Iria (100% Gratuito).
                                </p>
                            </section>

                            <section>
                                <h3>4. Direito de Livre Resolução (Artigo 10.º do DL 24/2014)</h3>
                                <p>
                                    O consumidor tem o direito de resolver livremente o contrato no prazo de <strong>14 dias seguidos</strong> a contar da receção dos produtos, sem custos e sem necessidade de justificação, mediante comunicação por escrito para <em>3gwine@gmail.com</em>. Os produtos devem ser devolvidos intactos, fechados e com os selos fiscais inviolados (conforme exceções do art. 17.º do DL 24/2014). Reembolso integral garantido em 14 dias.
                                </p>
                            </section>

                            <section>
                                <h3>5. Meios de Pagamento Certificados (IFTHENPAY)</h3>
                                <p>Os pagamentos são processados com total segurança através da entidade certificada pelo Banco de Portugal <strong>IFTHENPAY</strong> (Multibanco e MB WAY).</p>
                            </section>

                            <section>
                                <h3>6. Centro de Arbitragem e RAL (Lei n.º 144/2015)</h3>
                                <p>
                                    Em caso de litígio de consumo, o consumidor pode recorrer ao <strong>Centro de Arbitragem de Conflitos de Consumo de Lisboa (CACCL)</strong> (<em>www.centroarbitragemlisboa.pt</em> - Tel: 218 807 030) ou ao <strong>CNIACC</strong> (<em>www.cniacc.pt</em>).
                                </p>
                            </section>

                            <section>
                                <h3>7. Livro de Reclamações Eletrónico</h3>
                                <p>
                                    Dispomos de Livro de Reclamações Eletrónico oficial disponível em: <strong><a href="https://www.livroreclamacoes.pt" target="_blank" rel="noopener noreferrer" style={{ color: '#FFD700' }}>www.livroreclamacoes.pt</a></strong>.
                                </p>
                            </section>

                            <section>
                                <h3>8. Proteção de Dados Pessoais (RGPD)</h3>
                                <p>
                                    Tratamento de dados em estrita conformidade com o Regulamento UE 2016/679 e Lei 58/2019. Exercício de direitos (acesso, retificação, apagamento) através do email <strong>3gwine@gmail.com</strong>. Autoridade de controlo: CNPD (<em>www.cnpd.pt</em>).
                                </p>
                            </section>
                            
                            <p className="modal-footer-text">
                                Para a versão detalhada integral, consulte as nossas páginas de <Link href="/termos" style={{ color: '#FFD700', textDecoration: 'underline' }}>Termos e Condições</Link>, <Link href="/envios-e-devolucoes" style={{ color: '#FFD700', textDecoration: 'underline' }}>Envios</Link> e <Link href="/privacidade" style={{ color: '#FFD700', textDecoration: 'underline' }}>Privacidade</Link>.
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </footer>
    );
}
