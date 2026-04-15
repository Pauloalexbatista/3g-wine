'use client';

import { motion } from 'framer-motion';
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
        name: "Virtual Tinto 2021",
        type: "Tinto",
        price: 22.50,
        image: "/images/loja/vinho virtual.jpg",
        description: "Virtual é um vinho que nasceu à mesa num almoço de amigos que têm em comum a mesma paixão Vínica em plena Quinta da Pedra Alta. Uma edição limitada de 1256 garrafas que celebra o convívio e a amizade.",
    };

    const handleAddToCart = () => {
        addToCart(wine);
        alert("Vinho adicionado ao carrinho!");
    };

    const fadeIn = {
        initial: { opacity: 0, y: 30 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.8, ease: "easeOut" as const }
    };

    const stagger = {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { staggerChildren: 0.2 }
    };

    return (
        <>
            <Header />
            <div className="virtual-page">
                <main className="virtual-main">
                    <div className="container">
                        <div className="virtual-hero">
                            {/* Vídeo do Vinho na Esquerda */}
                            <motion.div 
                                className="virtual-video-side"
                                initial={{ opacity: 0, x: -50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 1, ease: "easeOut" }}
                            >
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
                                        <motion.h1 
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.5, duration: 1 }}
                                        >
                                            Virtual
                                        </motion.h1>
                                        <motion.p
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ delay: 1, duration: 1 }}
                                        >
                                            A Essência do Douro
                                        </motion.p>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Conteúdo Técnico e Narrativa */}
                            <motion.div 
                                className="virtual-content"
                                initial={{ opacity: 0, x: 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 1, ease: "easeOut" }}
                            >
                                <div className="rating-badge">
                                    <span>★ 92 PONTOS</span>
                                    <small>(PORTUGAL PROVA)</small>
                                </div>

                                <h1 className="virtual-title">
                                    Virtual <br />
                                    <span>Tinto 2021</span>
                                </h1>

                                <div className="virtual-story">
                                    <p>
                                        &ldquo;Virtual&rdquo; Vinho de convívio e amizade. <br />
                                        Um vinho que nasceu à mesa num almoço de amigos que partilham a mesma paixão vínica.
                                    </p>
                                </div>

                                <div className="tech-sheet">
                                    <div className="tech-grid">
                                        {[
                                            { label: "Região", value: "Douro DOC" },
                                            { label: "Castas", value: "Vinhas Velhas 45 anos" },
                                            { label: "Álcool", value: "14.5%" },
                                            { label: "Estágio", value: "18 Meses Carvalho" }
                                        ].map((item, i) => (
                                            <motion.div 
                                                key={i} 
                                                className="tech-item"
                                                initial={{ opacity: 0, y: 10 }}
                                                whileInView={{ opacity: 1, y: 0 }}
                                                viewport={{ once: true }}
                                                transition={{ delay: i * 0.1 + 0.5 }}
                                            >
                                                <span className="tech-label">{item.label}</span>
                                                <span className="tech-value">{item.value}</span>
                                            </motion.div>
                                        ))}
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
                            </motion.div>
                        </div>


                        <motion.section 
                            className="history-section"
                            {...fadeIn}
                        >
                            <div className="history-content">
                                <motion.h2 {...fadeIn}>A História do "Virtual"</motion.h2>
                                <motion.p {...fadeIn}>
                                    Virtual é um vinho que nasceu à mesa num almoço de amigos que têm em comum a mesma paixão Vínica em plena Quinta da Pedra Alta. 
                                    João Pires, enólogo na referida Quinta, sugeriu aos dois amigos Mário&rsquo;s que fizessem um vinho&hellip; convite aceite, 
                                    arranjamos uma vinha velha perto da região de Favaios que o João recuperou, e mais alguns pequenos talhões de Touriga Nacional, 
                                    Tinta Roriz e Touriga Franca.
                                </motion.p>
                                
                                <motion.p {...fadeIn}>
                                    Toda a enologia ficou a cargo do João com 18 meses de barrica usada em lotes. A intervenção dos Mário&rsquo;s é feita aquando 
                                    da saída do vinho das barricas com o Blend feito a gosto dos mesmos. Estagiou mais um ano em garrafa na cave com uma 
                                    produção de 1256 garrafas.
                                </motion.p>

                                <motion.p {...fadeIn}>
                                    É um vinho único, exclusivo, elegante e com um enorme potencial gastronómico que visa celebrar o convívio e amizade!! 
                                    O rótulo conta a história do vinho&hellip; o João com as uvas na mão a propor o vinho, a linha do tempo com os dois m_m de 
                                    Mário&amp;Mário e os Mário&rsquo;s junto às barricas a fazerem a mistura do vinho!!
                                </motion.p>

                                <motion.div 
                                    className="consumption-advice"
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 1 }}
                                >
                                    <h3>Conselhos de Consumo</h3>
                                    <p>
                                        Deve ser consumido durante a refeição com uma temperatura um pouco mais baixa e respirar 45m antes. 
                                        Esperamos que vos dê tanto gosto a beber como nos deu a fazer!!
                                    </p>
                                </motion.div>
                            </div>
                        </motion.section>
                    </div>
                </main>
            </div>
            <Footer />
        </>
    );
}
