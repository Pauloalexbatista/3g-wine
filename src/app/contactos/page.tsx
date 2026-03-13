'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import './page.css';

export default function ContactosPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: '',
    });

    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // TODO: Connect to API
        console.log('Form submitted:', formData);
        setSubmitted(true);
        setTimeout(() => {
            setSubmitted(false);
            setFormData({ name: '', email: '', phone: '', message: '' });
        }, 3000);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <>
            <Header />

            <main className="contactos-page">
                {/* Hero Section */}
                <section className="contactos-hero">
                    <div className="container">
                        <h1 className="contactos-title">Entre em Contacto</h1>
                        <div className="divider-gold"></div>
                        <p className="contactos-subtitle">
                            Estamos aqui para ajudá-lo a encontrar o vinho perfeito
                        </p>
                    </div>
                </section>

                {/* Contact Grid */}
                <section className="contact-section">
                    <div className="container">
                        <div className="contact-grid">
                            {/* Contact Form */}
                            <div className="contact-form-wrapper">
                                <h2 className="form-title">Envie-nos uma Mensagem</h2>
                                <p className="form-description">
                                    Preencha o formulário abaixo e entraremos em contacto consigo brevemente.
                                </p>

                                {submitted && (
                                    <div className="success-message">
                                        <span className="success-icon">✓</span>
                                        Mensagem enviada com sucesso! Entraremos em contacto em breve.
                                    </div>
                                )}

                                <form onSubmit={handleSubmit} className="contact-form">
                                    <div className="form-group">
                                        <label htmlFor="name" className="form-label">Nome *</label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            className="input"
                                            required
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="email" className="form-label">Email *</label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            className="input"
                                            required
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="phone" className="form-label">Telefone</label>
                                        <input
                                            type="tel"
                                            id="phone"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            className="input"
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="message" className="form-label">Mensagem *</label>
                                        <textarea
                                            id="message"
                                            name="message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            className="input textarea"
                                            rows={6}
                                            required
                                        ></textarea>
                                    </div>

                                    <button type="submit" className="btn btn-primary btn-submit">
                                        Enviar Mensagem
                                    </button>
                                </form>
                            </div>

                            {/* Contact Info */}
                            <div className="contact-info-wrapper">
                                <h2 className="info-title">Informações de Contacto</h2>

                                <div className="info-cards">
                                    <div className="info-card">
                                        <div className="info-icon">📍</div>
                                        <div className="info-content">
                                            <h3 className="info-card-title">Localização</h3>
                                            <p className="info-card-text">
                                                Rua António França Borges N-14 B<br />
                                                2625-187 Póvoa de Santa Iria
                                            </p>
                                        </div>
                                    </div>

                                    <div className="info-card">
                                        <div className="info-icon">📞</div>
                                        <div className="info-content">
                                            <h3 className="info-card-title">Telefones</h3>
                                            <p className="info-card-text">
                                                <a href="tel:963908617">963 908 617</a> | <a href="tel:219591522">21 959 15 22</a>
                                            </p>
                                        </div>
                                    </div>

                                    <div className="info-card">
                                        <div className="info-icon">📧</div>
                                        <div className="info-content">
                                            <h3 className="info-card-title">Email</h3>
                                            <p className="info-card-text">
                                                <a href="mailto:3gwine@gmail.com">3gwine@gmail.com</a>
                                            </p>
                                        </div>
                                    </div>

                                    <div className="info-card">
                                        <div className="info-icon">🕐</div>
                                        <div className="info-content">
                                            <h3 className="info-card-title">Horário</h3>
                                            <p className="info-card-text">
                                                Seg-Sex: 9:30h - 13h | 15h - 19h<br />
                                                Sáb: 9h - 13h
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Social Links */}
                                <div className="social-section">
                                    <h3 className="social-title">Siga-nos</h3>
                                    <div className="social-links-contact">
                                        <a href="https://facebook.com/3gwine" target="_blank" rel="noopener noreferrer" className="social-link-contact" aria-label="Facebook">
                                            <svg fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
                                        </a>
                                        <a href="https://instagram.com/3gwine" target="_blank" rel="noopener noreferrer" className="social-link-contact" aria-label="Instagram">
                                            <svg fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg>
                                        </a>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Map Section */}
                <section className="map-section">
                    <div className="map-container">
                        <iframe
                            src="https://maps.google.com/maps?width=100%25&height=450&hl=en&q=Rua%20Ant%C3%B3nio%20Fran%C3%A7a%20Borges%20N-14%20B%202625-187%20P%C3%B3voa%20de%20Santa%20Iria+(3G%20Wine)&t=&z=16&ie=UTF8&iwloc=B&output=embed"
                            width="100%"
                            height="450"
                            className="map-iframe"
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="3G Wine Location"
                        ></iframe>
                    </div>
                </section>
            </main>

            <Footer />
        </>
    );
}
