import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import Image from 'next/image';
import './legal.css';

export const metadata = {
    title: 'Termos e Condições Gerais de Venda | 3GWINE',
    description: 'Termos e condições gerais de venda online da garrafeira 3GWINE, nos termos do Decreto-Lei n.º 24/2014.',
};

export default function TermosPage() {
    return (
        <>
            <Header />

            <main className="legal-page">
                <section className="legal-hero">
                    <h1 className="legal-hero-title">Termos e Condições Gerais de Venda</h1>
                    <p className="legal-hero-subtitle">
                        Informação contratual obrigatória e transparência comercial nos termos do Decreto-Lei n.º 24/2014, de 14 de fevereiro, e demais legislação portuguesa aplicável.
                    </p>

                    <nav className="legal-nav-tabs" aria-label="Navegação Legal">
                        <Link href="/termos" className="legal-tab-btn active">Termos e Condições</Link>
                        <Link href="/envios-e-devolucoes" className="legal-tab-btn">Envios & Devoluções</Link>
                        <Link href="/privacidade" className="legal-tab-btn">Privacidade (RGPD)</Link>
                        <Link href="/ral" className="legal-tab-btn">Resolução de Litígios (RAL)</Link>
                    </nav>
                </section>

                <div className="legal-container">

                    {/* 1. IDENTIFICAÇÃO DO TITULAR */}
                    <article className="legal-card" id="identificacao">
                        <h2>1. Identificação da Entidade Titular (Art. 4.º, 1-a do DL 24/2014)</h2>
                        <p>
                            O presente website e loja online <strong>www.3gwine.pt</strong> são detidos e operados sob a responsabilidade de:
                        </p>
                        <div className="legal-highlight-box">
                            <p style={{ margin: 0 }}>
                                <strong>Nome Fiscal / Titular Legal:</strong> Mário Jorge dos Santos Medeiros (Empresário em Nome Individual)<br />
                                <strong>Denominação Comercial:</strong> 3GWINE (Garrafeira Exclusiva)<br />
                                <strong>Número de Identificação Fiscal (NIF):</strong> 223412899<br />
                                <strong>Código de Atividade Económica (CAE):</strong> 47250 (Comércio a Retalho de Bebidas em Estabelecimentos Especializados)<br />
                                <strong>Endereço Físico do Estabelecimento:</strong> Rua António França Borges N-14 B, 2625-187 Póvoa de Santa Iria, Portugal<br />
                                <strong>Contactos Telefónicos:</strong> (+351) 963 908 617 | (+351) 21 959 15 22 (chamada para rede móvel/fixa nacional)<br />
                                <strong>Endereço de Correio Eletrónico (Email):</strong> <a href="mailto:3gwine@gmail.com" style={{ color: '#FFD700' }}>3gwine@gmail.com</a><br />
                                <strong>Entidades de Fiscalização e Supervisão do Setor:</strong> ASAE (Autoridade de Segurança Alimentar e Económica) e IVV (Instituto da Vinha e do Vinho, I.P.).
                            </p>
                        </div>
                    </article>

                    {/* 2. IDADE LEGAL */}
                    <article className="legal-card" id="idade-legal">
                        <h2>2. Idade Legal de Compra de Bebidas Alcoólicas</h2>
                        <p>
                            Em estrito cumprimento do <strong>Decreto-Lei n.º 106/2015, de 16 de junho</strong>, a venda, disponibilização e consumo de bebidas alcoólicas são expressamente proibidos a menores de 18 (dezoito) anos de idade.
                        </p>
                        <p>
                            Ao navegar neste website e ao submeter qualquer encomenda na loja online da 3GWINE, o cliente declara e garante, sob compromisso de honra, possuir a idade legal mínima de 18 anos. A 3GWINE reserva-se o direito de exigir a comprovação da idade através de documento de identificação válido quer no momento da entrega domiciliária pelo estafeta, quer no ato de levantamento no estabelecimento físico.
                        </p>
                    </article>

                    {/* 3. PRODUTOS E PREÇOS */}
                    <article className="legal-card" id="precos">
                        <h2>3. Informação sobre Produtos, Stocks e Preços</h2>
                        <p>
                            Todos os preços apresentados no catálogo online encontram-se expressos em <strong>Euros (€)</strong> e incluem o Imposto sobre o Valor Acrescentado (<strong>IVA</strong>) à taxa legal em vigor em Portugal (13% para vinhos de mesa e comuns; 23% para espumantes, licorosos e demais artigos sujeitos à taxa normal).
                        </p>
                        <p>
                            O detalhe da taxa de IVA aplicada e a respetiva discriminação de base tributável e imposto são apresentados de forma clara e transparente no resumo do carrinho de compras e na fatura de venda que acompanha a encomenda.
                        </p>
                        <p>
                            As fotografias dos produtos procuram ser o mais fiéis possível às garrafas e colheitas comercializadas. No entanto, o ano de colheita e o design do rótulo poderão sofrer atualizações naturais por parte dos produtores vinícolas. Em caso de dúvida ou necessidade de colheita específica, o cliente deve contactar previamente a garrafeira.
                        </p>
                    </article>

                    {/* 4. MÉTODOS DE PAGAMENTO IFTHENPAY */}
                    <article className="legal-card" id="pagamentos">
                        <h2>4. Modalidades de Pagamento Certificado (IFTHENPAY)</h2>
                        <p>
                            Para assegurar a máxima fiabilidade, comodidade e proteção dos dados dos utilizadores, as transações na loja 3GWINE são processadas através da entidade de pagamentos autorizada pelo Banco de Portugal <strong>IFTHENPAY - Instituição de Pagamento, Lda.</strong>:
                        </p>
                        <ul>
                            <li>
                                <strong>Multibanco (Entidade, Referência e Montante):</strong> Ao selecionar esta modalidade, é gerada uma referência exclusiva associada à sua encomenda. O pagamento pode ser efetuado em qualquer terminal da rede Multibanco ou através do serviço de homebanking do seu banco. As referências têm uma validade padrão de 3 (três) dias seguidos, findos os quais a encomenda caduca caso o pagamento não seja concluído.
                            </li>
                            <li>
                                <strong>MB WAY:</strong> Ao optar por MB WAY, o cliente indica o seu número de telemóvel associado ao serviço e recebe imediatamente uma notificação na aplicação MB WAY para autorizar a transação. O cliente dispõe de 5 (cinco) minutos para confirmar o pagamento no seu telemóvel.
                            </li>
                        </ul>
                        <p>
                            A 3GWINE não armazena nem tem acesso a credenciais bancárias, códigos de segurança ou cartões de crédito dos utilizadores.
                        </p>
                    </article>

                    {/* 5. PRAZOS E CONDIÇÕES DE ENTREGA */}
                    <article className="legal-card" id="entregas">
                        <h2>5. Prazos e Condições de Entrega para os Vários Destinos</h2>
                        <p>
                            As encomendas são expedidas em embalagens térmicas e anti-choque especificamente reforçadas e certificadas para o transporte seguro de garrafas de vinho de vidro.
                        </p>

                        <table className="legal-table">
                            <thead>
                                <tr>
                                    <th>Destino / Modalidade</th>
                                    <th>Prazo Estimado de Entrega</th>
                                    <th>Custo de Envio (Portes)</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td><strong>Portugal Continental</strong></td>
                                    <td>24 a 72 horas úteis (após confirmação de pagamento)</td>
                                    <td>€12.50 (<strong>Grátis</strong> para encomendas ≥ €150.00)</td>
                                </tr>
                                <tr>
                                    <td><strong>Regiões Autónomas (Açores e Madeira)</strong></td>
                                    <td>3 a 8 dias úteis (conforme ligação marítima/aérea)</td>
                                    <td>Sob consulta prévia ou cálculo de expedição insular</td>
                                </tr>
                                <tr>
                                    <td><strong>Levantamento na Loja Física (Póvoa de Santa Iria)</strong></td>
                                    <td>Disponível em 24h úteis (ou no próprio dia se em stock)</td>
                                    <td><strong>100% Gratuito</strong></td>
                                </tr>
                            </tbody>
                        </table>

                        <p>
                            <strong>Verificação no ato de entrega:</strong> O cliente é expressamente advertido para verificar o estado exterior da embalagem no momento da receção perante o estafeta. Em caso de quebra percetível, derramamento de líquido ou embalagem violada, o cliente deve:
                        </p>
                        <ol>
                            <li>Recusar a encomenda ou assinalar a anomalia por escrito na guia de transporte do estafeta;</li>
                            <li>Fotografar a embalagem danificada;</li>
                            <li>Comunicar a situação à 3GWINE através do email <code>3gwine@gmail.com</code> no prazo de 24 horas, para que procedamos de imediato à reposição sem custos ou reembolso integral.</li>
                        </ol>
                    </article>

                    {/* 6. DIREITO DE LIVRE RESOLUÇÃO (ART. 10.º DL 24/2014) */}
                    <article className="legal-card" id="livre-resolucao">
                        <h2>6. Direito de Livre Resolução do Contrato (Artigo 10.º do DL 24/2014)</h2>
                        <p>
                            Nos termos do artigo 10.º do Decreto-Lei n.º 24/2014, de 14 de fevereiro, o consumidor tem o direito de resolver livremente o contrato de compra e venda à distância, <strong>sem necessidade de indicar qualquer motivo e sem custos adicionais</strong>, no prazo de <strong>14 (catorze) dias seguidos</strong> a contar do dia em que adquire a posse física do(s) bem(bens) encomendado(s) (ou pelo terceiro por si indicado que não o transportador).
                        </p>

                        <h3>Procedimento de Notificação:</h3>
                        <p>
                            Para exercer o direito de livre resolução, o consumidor deve comunicar à 3GWINE a sua decisão através de uma <strong>declaração inequívoca</strong> enviada por correio registado ou por correio eletrónico para <strong>3gwine@gmail.com</strong>. O cliente pode utilizar o modelo legal de formulário de livre resolução disponibilizado abaixo:
                        </p>

                        <div className="legal-form-box">
{`MODELO DE FORMULÁRIO DE LIVRE RESOLUÇÃO
(só deve preencher e devolver o presente formulário se quiser resolver o contrato)

Para:
Mário Jorge dos Santos Medeiros (3GWINE)
Morada: Rua António França Borges N-14 B, 2625-187 Póvoa de Santa Iria, Portugal
Correio eletrónico: 3gwine@gmail.com

Pela presente comunico que resolvo o meu contrato de compra e venda relativo ao(s) seguinte(s) bem(bens):
Produto(s): ___________________________________________________________
Número da Encomenda: ___________________________________________________
Encomendado em [____/____/________] / Recebido em [____/____/________]

Dados do Consumidor:
Nome do consumidor: ___________________________________________________
Endereço do consumidor: _______________________________________________
Contacto telefónico / Email: ___________________________________________

Assinatura do consumidor (só em caso de envio em suporte de papel): 
_______________________________________________________________________

Data: ____/____/________`}
                        </div>

                        <h3>Condições de Devolução dos Produtos:</h3>
                        <p>
                            Após a comunicação da decisão de resolução, o consumidor dispõe de um prazo de <strong>14 (catorze) dias seguidos</strong> para devolver ou entregar os bens na nossa loja física: <em>Rua António França Borges N-14 B, 2625-187 Póvoa de Santa Iria</em>.
                        </p>
                        <p>
                            Os custos diretos da devolução dos bens recaem sobre o consumidor, salvo em caso de erro comprovado no envio ou de artigo com defeito imputável à 3GWINE.
                        </p>

                        <div className="legal-highlight-box">
                            <strong>Atenção às Exceções Legais (Artigo 17.º do DL 24/2014):</strong><br />
                            Por motivos de proteção da saúde pública e de higiene alimentar, <strong>não são aceites devoluções de garrafas cujo selo fiscal, cápsula ou rolha tenham sido abertos, violados ou danificados</strong> após a entrega. Os vinhos devem ser restituídos na íntegra, no seu estado original de comercialização e devidamente acondicionados nas suas caixas de proteção.
                        </div>

                        <h3>Reembolso:</h3>
                        <p>
                            A 3GWINE reembolsa todos os pagamentos recebidos pelo consumidor, incluindo os custos iniciais da entrega padrão, no prazo máximo de 14 dias a contar da data de receção da comunicação de resolução. A 3GWINE reserva-se o direito de reter o reembolso até à efetiva receção e inspeção física dos bens devolvidos.
                        </p>
                        <p>
                            O reembolso é efetuado através do mesmo meio de pagamento utilizado pelo consumidor na transação inicial (ou através de transferência bancária para o IBAN expressamente indicado pelo consumidor, sem qualquer cobrança de taxas).
                        </p>
                    </article>

                    {/* 7. RESOLUÇÃO ALTERNATIVA DE LITÍGIOS (RAL) */}
                    <article className="legal-card" id="ral">
                        <h2>7. Centro de Arbitragem e RAL (Resolução Alternativa de Litígios de Consumo)</h2>
                        <p>
                            Em cumprimento do artigo 18.º da Lei n.º 144/2015, de 8 de setembro, informa-se que em caso de litígio de consumo o consumidor pode recorrer a uma Entidade de Resolução Alternativa de Litígios de Consumo (RAL):
                        </p>

                        <div className="legal-highlight-box">
                            <p style={{ margin: 0 }}>
                                <strong>Entidade RAL Competente na Área de Localização da Empresa:</strong><br />
                                <strong>Centro de Arbitragem de Conflitos de Consumo de Lisboa (CACCL)</strong><br />
                                Morada: Rua dos Douradores, 116, 2.º, 1100-207 Lisboa<br />
                                Telefone: (+351) 218 807 030<br />
                                Email: <a href="mailto:juridico@centroarbitragemlisboa.pt" style={{ color: '#FFD700' }}>juridico@centroarbitragemlisboa.pt</a><br />
                                Website Oficial: <a href="http://www.centroarbitragemlisboa.pt" target="_blank" rel="noopener noreferrer" style={{ color: '#FFD700', textDecoration: 'underline' }}>www.centroarbitragemlisboa.pt</a>
                            </p>
                        </div>

                        <p>
                            Em alternativa ou para clientes fora da área metropolitana de Lisboa:
                        </p>
                        <ul>
                            <li><strong>CNIACC - Centro Nacional de Informação e Arbitragem de Conflitos de Consumo:</strong> Faculdade de Direito da UNL, Campus de Campolide, 1099-032 Lisboa | Tel: 211 958 571 | Website: <a href="https://www.cniacc.pt" target="_blank" rel="noopener noreferrer" style={{ color: '#FFD700' }}>www.cniacc.pt</a></li>
                            <li><strong>Plataforma Europeia de Resolução de Litígios em Linha (ODR):</strong> <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener noreferrer" style={{ color: '#FFD700' }}>https://ec.europa.eu/consumers/odr</a></li>
                            <li>Mais informações no Portal do Consumidor: <a href="https://www.consumidor.gov.pt" target="_blank" rel="noopener noreferrer" style={{ color: '#FFD700' }}>www.consumidor.gov.pt</a></li>
                        </ul>
                    </article>

                    {/* 8. LIVRO DE RECLAMAÇÕES */}
                    <article className="legal-card" id="livro-reclamacoes">
                        <h2>8. Livro de Reclamações Eletrónico</h2>
                        <p>
                            Nos termos do Decreto-Lei n.º 74/2017, de 21 de junho, a 3GWINE disponibiliza o acesso direto à plataforma oficial do <strong>Livro de Reclamações Eletrónico</strong>, onde qualquer consumidor pode submeter formalmente a sua reclamação ou pedido de informação:
                        </p>
                        <div style={{ marginTop: '1rem' }}>
                            <a 
                                href="https://www.livroreclamacoes.pt" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="legal-badge-card"
                            >
                                <Image
                                    src="/images/livro-reclamacoes.svg"
                                    alt="Livro de Reclamações Eletrónico"
                                    width={160}
                                    height={40}
                                />
                                <span style={{ color: '#111827', fontSize: '0.85rem', fontWeight: 700 }}>
                                    Aceder ao Livro de Reclamações Eletrónico →
                                </span>
                            </a>
                        </div>
                    </article>

                    {/* 9. PROTEÇÃO DE DADOS */}
                    <article className="legal-card" id="protecao-dados">
                        <h2>9. Proteção de Dados Pessoais (RGPD)</h2>
                        <p>
                            O tratamento dos dados pessoais recolhidos rege-se pelo Regulamento Geral sobre a Proteção de Dados (Regulamento UE 2016/679) e pela Lei n.º 58/2019. Para consultar a política detalhada sobre tratamento, finalidades, prazos de conservação e exercício de direitos, por favor consulte a nossa página dedicada de <Link href="/privacidade" style={{ color: '#FFD700', textDecoration: 'underline' }}>Política de Privacidade</Link>.
                        </p>
                    </article>

                    {/* 10. LEI APLICÁVEL */}
                    <article className="legal-card" id="lei-aplicavel">
                        <h2>10. Lei Aplicável e Jurisdição</h2>
                        <p>
                            Todas as transações, compras e contratos celebrados através do website 3gwine.pt regem-se pela legislação portuguesa. Em caso de litígio que não possa ser resolvido por via amigável ou mediação RAL, é competente o foro da comarca da sede do titular do estabelecimento, com expressa renúncia a qualquer outro.
                        </p>
                        <p style={{ marginTop: '1.5rem', fontSize: '0.85rem', color: '#9ca3af', fontStyle: 'italic' }}>
                            Documento revisto e em conformidade legal. Última atualização: Novembro de 2026.
                        </p>
                    </article>

                </div>
            </main>

            <Footer />
        </>
    );
}
