import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import '../termos/legal.css';

export const metadata = {
    title: 'Prazos de Entrega, Envios e Devoluções | 3GWINE',
    description: 'Informações detalhadas sobre portes de envio, prazos de entrega para Portugal Continental e Ilhas, e condições de devolução e livre resolução (DL 24/2014) da 3GWINE.',
};

export default function EnviosDevolucoesPage() {
    return (
        <>
            <Header />

            <main className="legal-page">
                <section className="legal-hero">
                    <h1 className="legal-hero-title">Envios, Prazos de Entrega e Devoluções</h1>
                    <p className="legal-hero-subtitle">
                        Conheça as nossas condições de expedição para todo o território nacional e as regras legais do Direito de Livre Resolução.
                    </p>

                    <nav className="legal-nav-tabs" aria-label="Navegação Legal">
                        <Link href="/termos" className="legal-tab-btn">Termos e Condições</Link>
                        <Link href="/envios-e-devolucoes" className="legal-tab-btn active">Envios & Devoluções</Link>
                        <Link href="/privacidade" className="legal-tab-btn">Privacidade (RGPD)</Link>
                        <Link href="/ral" className="legal-tab-btn">Resolução de Litígios (RAL)</Link>
                    </nav>
                </section>

                <div className="legal-container">

                    {/* EXPEDIÇÃO E PRAZOS */}
                    <article className="legal-card">
                        <h2>1. Prazos e Condições de Envio para os Vários Destinos</h2>
                        <p>
                            Todas as encomendas são expedidas pela garrafeira <strong>3GWINE</strong> a partir do nosso estabelecimento físico situado na Póvoa de Santa Iria.
                        </p>

                        <table className="legal-table">
                            <thead>
                                <tr>
                                    <th>Destino / Serviço</th>
                                    <th>Prazo de Entrega Estimado</th>
                                    <th>Custo de Envio (Portes)</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td><strong>Portugal Continental</strong></td>
                                    <td>24 a 72 horas úteis após confirmação do pagamento</td>
                                    <td>
                                        €12.50<br />
                                        <span style={{ color: '#4ade80', fontWeight: 700 }}>PORTES GRÁTIS</span> em compras iguais ou superiores a €150.00
                                    </td>
                                </tr>
                                <tr>
                                    <td><strong>Regiões Autónomas (Açores e Madeira)</strong></td>
                                    <td>3 a 8 dias úteis (conforme rotas de transporte aéreo/marítimo)</td>
                                    <td>Calculado sob consulta ou peso/volume da expedição</td>
                                </tr>
                                <tr>
                                    <td><strong>Levantamento na Garrafeira 3GWINE (Loja Física)</strong></td>
                                    <td>Disponível em 24h úteis (ou no próprio dia se stock disponível)</td>
                                    <td><strong>100% Gratuito</strong></td>
                                </tr>
                            </tbody>
                        </table>

                        <div className="legal-highlight-box">
                            <strong>📍 Morada para Levantamento em Loja Física:</strong><br />
                            Garrafeira 3GWINE<br />
                            Rua António França Borges N-14 B, 2625-187 Póvoa de Santa Iria<br />
                            Horário: Terça a Sábado das 10h00 às 13h00 e das 14h30 às 19h30.<br />
                            Contacto de apoio: (+351) 963 908 617 | (+351) 21 959 15 22
                        </div>
                    </article>

                    {/* EMBALAMENTO E VERIFICAÇÃO NA ENTREGA */}
                    <article className="legal-card">
                        <h2>2. Embalamento Seguro e Verificação na Entrega</h2>
                        <p>
                            As garrafas de vinho são acondicionadas em embalagens de cartão reforçado de alta resistência com células individuais e separadores anti-choque, especialmente concebidas para suportar o transporte rodoviário e aéreo de garrafas de vidro.
                        </p>
                        <h3>Procedimento de Segurança no Ato de Receção:</h3>
                        <p>
                            Recomendamos vivamente que todos os clientes inspecionem cuidadosamente o exterior da caixa no momento da entrega efetuada pelo estafeta:
                        </p>
                        <ul>
                            <li>Se notar ruído de vidros partidos, líquido a verter ou se a embalagem estiver amassada ou aberta, <strong>recuse a encomenda</strong> ou mencione expressamente na folha de assinatura do estafeta: <em>&quot;Embalagem com danos exteriores / mercadoria sob reserva de conferência&quot;</em>;</li>
                            <li>Tire fotografias demonstrativas do estado da caixa;</li>
                            <li>Contacte a nossa equipa nas 24 horas seguintes via <strong>3gwine@gmail.com</strong> para organizarmos a substituição imediata sem quaisquer custos adicionais.</li>
                        </ul>
                    </article>

                    {/* DIREITO DE LIVRE RESOLUÇÃO (ARTIGO 10.º DL 24/2014) */}
                    <article className="legal-card">
                        <h2>3. Direito de Livre Resolução (14 Dias - Art. 10.º do DL 24/2014)</h2>
                        <p>
                            O cliente consumidor que efetue compras à distância na loja online 3GWINE beneficia do direito de livre resolução do contrato, no prazo legal de <strong>14 (catorze) dias seguidos</strong> a contar da data de receção dos bens, <strong>sem custos de penalização e sem necessidade de apresentar qualquer motivo</strong>.
                        </p>

                        <h3>Como Exercer o Direito de Livre Resolução:</h3>
                        <ol>
                            <li>Envie uma mensagem eletrónica inequívoca para <strong>3gwine@gmail.com</strong> manifestando a sua vontade de resolver o contrato (ou use o modelo abaixo);</li>
                            <li>Embale os produtos nas mesmas caixas de proteção reforçada;</li>
                            <li>Envie ou entregue os produtos na nossa garrafeira física: <em>Rua António França Borges N-14 B, 2625-187 Póvoa de Santa Iria</em>, no prazo máximo de 14 dias a contar da notificação;</li>
                            <li>Os custos diretos da devolução dos bens são suportados pelo consumidor.</li>
                        </ol>

                        <div className="legal-form-box">
{`FORMULÁRIO DE LIVRE RESOLUÇÃO DO CONTRATO
(Decreto-Lei n.º 24/2014, de 14 de fevereiro)

Para: 
Mário Jorge dos Santos Medeiros (Garrafeira 3GWINE)
Rua António França Borges N-14 B, 2625-187 Póvoa de Santa Iria
Correio Eletrónico: 3gwine@gmail.com

Pela presente comunico que resolvo o contrato de compra e venda referente a:
- Encomenda N.º: __________________________________________________
- Produto(s): _____________________________________________________
- Data da Encomenda: ____/____/________
- Data de Receção dos Bens: ____/____/________

Identificação do Consumidor:
- Nome Completo: _________________________________________________
- Morada: ________________________________________________________
- Telefone / Email: ______________________________________________
- IBAN para Reembolso: ___________________________________________

Assinatura do consumidor (só em suporte de papel): __________________
Data: ____/____/________`}
                        </div>

                        <div className="legal-highlight-box">
                            <strong>⚠️ Condições Obrigatórias dos Produtos Devolvidos (Artigo 17.º do DL 24/2014):</strong><br />
                            Por imperativos de proteção de saúde e higiene de produtos alimentares, <strong>não serão aceites devoluções de garrafas que tenham sido abertas, manipuladas ou cujos selos de garantia fiscais/cápsulas tenham sido violados</strong>. As garrafas devem ser devolvidas intocadas, seladas e em perfeito estado de conservação.
                        </div>

                        <h3>Reembolso:</h3>
                        <p>
                            Após a verificação da integridade das garrafas recebidas, a 3GWINE procederá ao reembolso integral dos valores pagos pelo cliente (incluindo o custo de expedição padrão original) no prazo máximo de 14 dias a contar da receção da comunicação de cancelamento.
                        </p>
                    </article>

                </div>
            </main>

            <Footer />
        </>
    );
}
