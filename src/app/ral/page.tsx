import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import Image from 'next/image';
import '../termos/legal.css';

export const metadata = {
    title: 'Resolução Alternativa de Litígios (RAL) e Livro de Reclamações | 3GWINE',
    description: 'Entidades de Resolução Alternativa de Litígios de Consumo (Lei n.º 144/2015) e Livro de Reclamações Eletrónico da garrafeira 3GWINE.',
};

export default function RalPage() {
    return (
        <>
            <Header />

            <main className="legal-page">
                <section className="legal-hero">
                    <h1 className="legal-hero-title">Resolução de Litígios (RAL) e Reclamações</h1>
                    <p className="legal-hero-subtitle">
                        Informação ao consumidor nos termos da Lei n.º 144/2015, de 8 de setembro, e do Decreto-Lei n.º 74/2017, de 21 de junho.
                    </p>

                    <nav className="legal-nav-tabs" aria-label="Navegação Legal">
                        <Link href="/termos" className="legal-tab-btn">Termos e Condições</Link>
                        <Link href="/envios-e-devolucoes" className="legal-tab-btn">Envios & Devoluções</Link>
                        <Link href="/privacidade" className="legal-tab-btn">Privacidade (RGPD)</Link>
                        <Link href="/ral" className="legal-tab-btn active">Resolução de Litígios (RAL)</Link>
                    </nav>
                </section>

                <div className="legal-container">

                    {/* RAL CONFORME LEI 144/2015 */}
                    <article className="legal-card">
                        <h2>1. Resolução Alternativa de Litígios de Consumo (RAL)</h2>
                        <p>
                            Em cumprimento do disposto no artigo 18.º da Lei n.º 144/2015, de 8 de setembro, informa-se que em caso de litígio decorrente da aquisição de produtos através do website <strong>www.3gwine.pt</strong>, o consumidor pode recorrer a uma das Entidades de Resolução Alternativa de Litígios de Consumo autorizadas pela Direção-Geral do Consumidor (DGC).
                        </p>

                        <div className="legal-highlight-box">
                            <h3 style={{ marginTop: 0, color: '#FFD700' }}>
                                Entidade RAL da Área Metropolitana de Lisboa (Área da Sede da 3GWINE):
                            </h3>
                            <p style={{ margin: 0 }}>
                                <strong>Centro de Arbitragem de Conflitos de Consumo de Lisboa (CACCL)</strong><br />
                                Morada: Rua dos Douradores, 116, 2.º, 1100-207 Lisboa<br />
                                Telefone: (+351) 218 807 030<br />
                                Email: <a href="mailto:juridico@centroarbitragemlisboa.pt" style={{ color: '#FFD700' }}>juridico@centroarbitragemlisboa.pt</a> / <a href="mailto:director@centroarbitragemlisboa.pt" style={{ color: '#FFD700' }}>director@centroarbitragemlisboa.pt</a><br />
                                Website: <a href="http://www.centroarbitragemlisboa.pt" target="_blank" rel="noopener noreferrer" style={{ color: '#FFD700', textDecoration: 'underline' }}>www.centroarbitragemlisboa.pt</a>
                            </p>
                        </div>

                        <h3>Entidade de Âmbito Nacional:</h3>
                        <p>
                            <strong>CNIACC - Centro Nacional de Informação e Arbitragem de Conflitos de Consumo</strong><br />
                            Morada: Faculdade de Direito da Universidade Nova de Lisboa - Campus de Campolide, 1099-032 Lisboa<br />
                            Telefone: (+351) 211 958 571<br />
                            Email: <a href="mailto:cniacc@unl.pt" style={{ color: '#FFD700' }}>cniacc@unl.pt</a><br />
                            Website: <a href="https://www.cniacc.pt" target="_blank" rel="noopener noreferrer" style={{ color: '#FFD700', textDecoration: 'underline' }}>www.cniacc.pt</a>
                        </p>

                        <h3>Plataforma Europeia de Resolução de Litígios em Linha (ODR):</h3>
                        <p>
                            Para consumidores residentes noutros Estados-Membros da União Europeia que celebrem contratos de compra online, a Comissão Europeia disponibiliza a plataforma oficial ODR:
                            <br />
                            <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener noreferrer" style={{ color: '#FFD700', textDecoration: 'underline' }}>
                                https://ec.europa.eu/consumers/odr/
                            </a>
                        </p>

                        <p>
                            Para consultar a lista completa e atualizada de todas as entidades RAL disponíveis em território português, visite o Portal do Consumidor: <a href="https://www.consumidor.gov.pt" target="_blank" rel="noopener noreferrer" style={{ color: '#FFD700' }}>www.consumidor.gov.pt</a>.
                        </p>
                    </article>

                    {/* LIVRO DE RECLAMAÇÕES ELETRÓNICO */}
                    <article className="legal-card">
                        <h2>2. Livro de Reclamações Eletrónico</h2>
                        <p>
                            Nos termos do Decreto-Lei n.º 74/2017, de 21 de junho, e da Portaria n.º 201-A/2017, de 30 de junho, a garrafeira <strong>3GWINE</strong> disponibiliza aos seus clientes o acesso direto ao <strong>Livro de Reclamações Eletrónico</strong> oficial da República Portuguesa.
                        </p>
                        <p>
                            Através desta plataforma pública oficial, poderá apresentar uma reclamação ou um pedido de esclarecimento relativamente aos serviços e artigos fornecidos pela nossa loja:
                        </p>

                        <div style={{ margin: '1.5rem 0' }}>
                            <a 
                                href="https://www.livroreclamacoes.pt" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="legal-badge-card"
                            >
                                <Image
                                    src="/images/livro-reclamacoes.svg"
                                    alt="Livro de Reclamações Eletrónico"
                                    width={180}
                                    height={45}
                                />
                                <span style={{ color: '#111827', fontSize: '0.9rem', fontWeight: 800 }}>
                                    Aceder à Plataforma Oficial do Livro de Reclamações →
                                </span>
                            </a>
                        </div>

                        <p style={{ fontSize: '0.88rem', color: '#9ca3af' }}>
                            A reclamação apresentada no Livro de Reclamações Eletrónico é enviada simultaneamente à entidade reguladora e fiscalizadora competente (ASAE - Autoridade de Segurança Alimentar e Económica).
                        </p>
                    </article>

                    {/* CONTACTO DIRETO 3GWINE */}
                    <article className="legal-card">
                        <h2>3. Contacto e Resolução Direta com a Garrafeira 3GWINE</h2>
                        <p>
                            A satisfação dos nossos clientes é a nossa prioridade máxima. Antes de iniciar qualquer procedimento arbitral ou de reclamação, convidamo-lo a entrar em contacto direto connosco. A nossa equipa está permanentemente disponível para prestar esclarecimentos e encontrar soluções justas e céleres:
                        </p>
                        <p>
                            • <strong>Email Oficial:</strong> 3gwine@gmail.com<br />
                            • <strong>Telefones de Apoio:</strong> (+351) 963 908 617 | (+351) 21 959 15 22<br />
                            • <strong>Morada da Loja:</strong> Rua António França Borges N-14 B, 2625-187 Póvoa de Santa Iria
                        </p>
                    </article>

                </div>
            </main>

            <Footer />
        </>
    );
}
