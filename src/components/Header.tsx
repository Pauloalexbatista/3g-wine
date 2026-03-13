'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useCart } from '@/context/CartContext';
import UserMenu from '@/components/UserMenu';
import './Header.css';

export default function Header() {
    const { cartCount } = useCart();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { href: '/vinho-virtual', label: 'VINHO VIRTUAL' },
        { href: '/loja', label: 'A Nossa Seleção' },
        { href: '/sobre', label: 'Sobre Nós' },
        { href: '/contactos', label: 'Contactos' },
    ];

    return (
        <header className={`header ${isScrolled ? 'header-scrolled' : ''}`}>
            <div className="container">
                <div className="header-content">
                    {/* Logo */}
                    <Link href="/" className="header-logo">
                        <div className="logo-container">
                            <span className="logo-text"><span className="logo-3">3</span>GWINE</span>
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="nav-desktop">
                        {navLinks.map((link) => (
                            <Link key={link.href} href={link.href} className="nav-link">
                                {link.label}
                            </Link>
                        ))}
                    </nav>

                    {/* Actions Group */}
                    <div className="header-actions">
                        {/* User Menu */}
                        <UserMenu />

                        {/* Cart Button */}
                        <Link href="/carrinho" className="cart-button">
                            <svg
                                className="cart-icon"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                                />
                            </svg>
                            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
                        </Link>

                        {/* Mobile Menu Toggle */}
                        <button
                            className="mobile-menu-toggle"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            aria-label="Toggle menu"
                        >
                            <span className={`hamburger ${isMobileMenuOpen ? 'open' : ''}`}>
                                <span></span>
                                <span></span>
                                <span></span>
                            </span>
                        </button>
                    </div>
                </div>

                {/* Mobile Navigation */}
                <nav className={`nav-mobile ${isMobileMenuOpen ? 'open' : ''}`}>
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className="nav-link-mobile"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            {link.label}
                        </Link>
                    ))}
                </nav>
            </div>
        </header>
    );
}
