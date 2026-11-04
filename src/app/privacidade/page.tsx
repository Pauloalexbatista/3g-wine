import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import '../termos/legal.css';

export const metadata = {
    title: 'Política de Privacidade e Proteção de Dados (RGPD) | 3GWINE',
    description: 'Política de privacidade e proteção de dados pessoais da garrafeira 3GWINE em cumprimento do Regulamento Geral sobre a Proteção de Dados (UE 2016/679) e Lei n.º 58/2019.',
};

export default function PrivacidadePage() {
    return (
        <>
            <Header />

            <main className="legal-page">
                <section className="legal-hero">
                    <h1 className="legal-hero-title">Política de Privacidade e Proteção de Dados</h1>
                    <p className="legal-hero-subtitle">
                        Em estrito cumprimento do Regulamento Geral sobre a Proteção de Dados (Regulamento UE 2016/679 - RGPD) e da Lei n.º 58/2019, de 8 de agosto.
                    </p>

                    <nav className="legal-nav-tabs" aria-label="Navegação Legal">
                        <Link href="/termos" className="legal-tab-btn">Termos e Condições</Link>
                        <Link href="/envios-e-devolucoes" className="legal-tab-btn">Envios & Devoluções</Link>
                        <Link href="/privacidade" className="legal-tab-btn active">Privacidade (RGPD)</Link>
                        <Link href="/ral" className="legal-tab-btn">Resolução de Litígios (RAL)</Link>
                    </nav>
                </section>

                <div className="legal-container">

                    {/* 1. RESPONSÁVEL PELO TRATAMENTO */}
                    <article className="legal-card">
                        <h2>1. Responsável pelo Tratamento de Dados</h2>
                        <p>
                            A entidade responsável pela recolha e tratamento dos dados pessoais dos utilizadores e clientes do website <strong>www.3gwine.pt</strong> é:
                        </p>
                        <div className="legal-highlight-box">
                            <p style={{ margin: 0 }}>
                                <strong>Titular Legal:</strong> Mário Jorge dos Santos Medeiros (Empresário em Nome Individual)<br />
                                <strong>Nome Comercial:</strong> 3GWINE<br />
                                <strong>NIF:</strong> 223412899<br />
                                <strong>Sede / Estabelecimento:</strong> Rua António França Borges N-14 B, 2625-187 Póvoa de Santa Iria, Portugal<br />
                                <strong>Email de Contacto para Assuntos de Privacidade:</strong> <a href="mailto:3gwine@gmail.com" style={{ color: '#FFD700' }}>3gwine@gmail.com</a><br />
                                <strong>Telefone:</strong> (+351) 963 908 617 / (+351) 21 959 15 22
                            </p>
                        </div>
                    </article>

                    {/* 2. DADOS RECOLHIDOS E FINALIDADES */}
                    <article className="legal-card">
                        <h2>2. Dados Pessoais Recolhidos e Finalidades do Tratamento</h2>
                        <p>
                            A 3GWINE recolhe apenas os dados estritamente necessários para prestar os seus serviços comerciais de forma eficaz, segura e legal:
                        </p>

                        <ul>
                            <li>
                                <strong>Gestão de Encomendas e Expedição:</strong> Nome completo, morada de envio, código postal, localidade e número de telefone. Finalidade: processar o pedido, preparar o embalamento e assegurar o envio das garrafas por estafeta ou disponibilização para levantamento em loja. <em>Fundamento: Execução de contrato de compra e venda (Art. 6.º, n.º 1, alínea b do RGPD).</em>
                            </li>
                            <li>
                                <strong>Faturação e Obrigações Fiscais:</strong> Nome completo, morada fiscal e Número de Identificação Fiscal (NIF). Finalidade: emissão de faturas e guias de transporte legalmente comunicadas à Autoridade Tributária e Aduaneira (AT). <em>Fundamento: Cumprimento de obrigação jurídica legal (Art. 6.º, n.º 1, alínea c do RGPD).</em>
                            </li>
                            <li>
                                <strong>Processamento de Pagamentos (IFTHENPAY):</strong> Quando escolhe pagar por Multibanco ou MB WAY, os dados do pedido (número de encomenda, montante e número de telemóvel para MB WAY) são transmitidos em canal encriptado de alta segurança à nossa entidade parceira licenciada pelo Banco de Portugal <strong>IFTHENPAY</strong>. A 3GWINE nunca acede nem armazena cartões, códigos bancários ou palavras-passe de clientes.
                            </li>
                            <li>
                                <strong>Apoio ao Cliente e Contactos:</strong> Nome, email, telefone e histórico de mensagens enviadas através do formulário de contactos. Finalidade: esclarecer dúvidas, prestar apoio pós-venda ou gerir eventuais reclamações e pedidos de devolução.
                            </li>
                            <li>
                                <strong>Newsletter e Comunicações:</strong> Endereço de email recolhido apenas mediante consentimento explícito e voluntário do utilizador. Finalidade: envio de novidades vínicas, colheitas exclusivas e campanhas. O subscritor pode cancelar a subscrição a qualquer momento.
                            </li>
                        </ul>
                    </article>

                    {/* 3. PARTILHA DE DADOS COM TERCEIROS */}
                    <article className="legal-card">
                        <h2>3. Destinatários e Subcontratantes dos Dados</h2>
                        <p>
                            A 3GWINE <strong>não vende, não aluga e não cede</strong> os seus dados pessoais a terceiros para fins de marketing ou publicidade. Os seus dados são partilhados estritamente com os parceiros operacionais essenciais ao cumprimento da encomenda:
                        </p>
                        <ul>
                            <li><strong>Entidades de Pagamento:</strong> IFTHENPAY - Instituição de Pagamento, Lda., para validação de pagamentos por Multibanco e MB WAY sob regulação do Banco de Portugal;</li>
                            <li><strong>Empresas de Transporte e Distribuição:</strong> Empresas de logística e estafetas responsáveis pela entrega física no domicílio;</li>
                            <li><strong>Autoridades Oficiais:</strong> Autoridade Tributária e Aduaneira (AT) e autoridades judiciais no estrito cumprimento das disposições legais imperativas.</li>
                        </ul>
                    </article>

                    {/* 4. PRAZOS DE CONSERVAÇÃO */}
                    <article className="legal-card">
                        <h2>4. Prazos de Conservação dos Dados Pessoais</h2>
                        <p>
                            Os dados pessoais são conservados apenas durante o período necessário para as finalidades para as quais foram recolhidos:
                        </p>
                        <ul>
                            <li><strong>Dados de Faturação e Contabilidade:</strong> Conservados obrigatoriamente durante o prazo de <strong>10 (dez) anos</strong>, por imposição legal do Código Comercial e do Código do IVA;</li>
                            <li><strong>Dados de Encomendas e Apoio ao Cliente:</strong> Conservados durante o período de garantia legal dos bens ou resolução de litígios;</li>
                            <li><strong>Subscrição da Newsletter:</strong> Conservados até que o titular dos dados retire o seu consentimento ou solicite a anulação da subscrição.</li>
                        </ul>
                    </article>

                    {/* 5. DIREITOS DOS TITULARES */}
                    <article className="legal-card">
                        <h2>5. Os Seus Direitos (Direitos do Titular sob o RGPD)</h2>
                        <p>
                            Enquanto titular dos dados, o utilizador dispõe dos seguintes direitos garantidos por lei:
                        </p>
                        <ul>
                            <li><strong>Direito de Acesso:</strong> Saber se os seus dados estão a ser tratados e obter uma cópia dos mesmos;</li>
                            <li><strong>Direito de Retificação:</strong> Solicitar a correção de dados incompletos ou inexatos;</li>
                            <li><strong>Direito ao Apagamento (&quot;Direito ao Esquecimento&quot;):</strong> Solicitar a eliminação dos seus dados quando estes deixem de ser necessários, com exceção dos dados que a 3GWINE tem obrigação legal de reter para efeitos fiscais;</li>
                            <li><strong>Direito à Limitação do Tratamento:</strong> Solicitar a suspensão do tratamento em situações previstas na lei;</li>
                            <li><strong>Direito à Portabilidade:</strong> Receber os seus dados num formato estruturado e legível por máquina;</li>
                            <li><strong>Direito de Oposição e Revogação do Consentimento:</strong> Opor-se ao tratamento de dados a qualquer momento ou retirar o consentimento dado para o envio da newsletter.</li>
                        </ul>

                        <div className="legal-highlight-box">
                            <strong>Como exercer os seus direitos:</strong><br />
                            Pode exercer qualquer um dos seus direitos mediante envio de pedido por correio eletrónico para <strong>3gwine@gmail.com</strong> ou por carta para a morada do nosso estabelecimento (Rua António França Borges N-14 B, 2625-187 Póvoa de Santa Iria), indicando o seu nome e o direito que pretende exercer.
                        </div>
                    </article>

                    {/* 6. AUTORIDADE DE CONTROLO */}
                    <article className="legal-card">
                        <h2>6. Direito de Reclamação junto da Autoridade de Controlo</h2>
                        <p>
                            Caso considere que o tratamento dos seus dados viola o Regulamento Geral sobre a Proteção de Dados, tem o direito de apresentar reclamação formal perante a autoridade de controlo nacional:
                        </p>
                        <div className="legal-highlight-box">
                            <strong>Comissão Nacional de Proteção de Dados (CNPD)</strong><br />
                            Morada: Av. D. Carlos I, 134 - 1.º, 1200-651 Lisboa<br />
                            Telefone: (+351) 213 928 400 | Email: geral@cnpd.pt<br />
                            Website: <a href="https://www.cnpd.pt" target="_blank" rel="noopener noreferrer" style={{ color: '#FFD700', textDecoration: 'underline' }}>www.cnpd.pt</a>
                        </div>
                    </article>

                    {/* 7. POLÍTICA DE COOKIES */}
                    <article className="legal-card">
                        <h2>7. Política de Cookies</h2>
                        <p>
                            O website 3gwine.pt utiliza cookies técnicos e de sessão estritamente necessários para permitir a navegação no website, a retenção dos produtos adicionados ao carrinho de compras e a segurança da sessão. Estes cookies essenciais não recolhem informação pessoal com propósitos publicitários e não requerem consentimento prévio para o funcionamento básico da loja.
                        </p>
                    </article>

                </div>
            </main>

            <Footer />
        </>
    );
}
