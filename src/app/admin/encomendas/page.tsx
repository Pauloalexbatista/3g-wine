'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';
import Image from 'next/image';

interface OrderItem {
    id: number;
    name: string;
    price: number;
    quantity: number;
}

interface Order {
    id: string;
    created_at: string;
    customer_name: string;
    customer_address: string;
    customer_zipcode: string;
    customer_city: string;
    customer_phone: string;
    customer_nif?: string;
    delivery_method: 'delivery' | 'pickup';
    shipping_cost: number;
    items: OrderItem[];
    subtotal: number;
    iva: number;
    total: number;
    status: 'por enviar' | 'enviada' | 'pendente' | 'cancelada';
    payment_method: string;
    payment_status?: 'pendente' | 'pago' | 'cancelado' | 'expirado';
    payment_entity?: string;
    payment_reference?: string;
    paid_at?: string;
}

export default function OrdersAdminPage() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [filterStatus, setFilterStatus] = useState<string>('todos');
    const [filterPayment, setFilterPayment] = useState<string>('todos');
    const [selectedOrders, setSelectedOrders] = useState<string[]>([]);
    const [startDate, setStartDate] = useState<string>('');
    const [endDate, setEndDate] = useState<string>('');

    useEffect(() => {
        fetchOrders();
    }, []);

    async function fetchOrders() {
        try {
            setLoading(true);
            const { data, error } = await supabase
                .from('orders')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;
            if (data) setOrders(data);
        } catch (error) {
            console.error('Erro ao buscar encomendas:', error);
        } finally {
            setLoading(false);
        }
    }

    const toggleOrderSelection = (id: string) => {
        setSelectedOrders(prev =>
            prev.includes(id) ? prev.filter(oid => oid !== id) : [...prev, id]
        );
    };

    const updateStatus = async (status: Order['status']) => {
        if (selectedOrders.length === 0) return;

        try {
            const { error } = await supabase
                .from('orders')
                .update({ status })
                .in('id', selectedOrders);

            if (error) throw error;

            setOrders(orders.map(o => selectedOrders.includes(o.id) ? { ...o, status } : o));
            setSelectedOrders([]);
            alert('Estados actualizados com sucesso!');
        } catch (error) {
            console.error('Erro ao atualizar estados:', error);
        }
    };

    const updatePaymentStatus = async (id: string, payment_status: 'pago' | 'pendente') => {
        try {
            const { error } = await supabase
                .from('orders')
                .update({
                    payment_status,
                    paid_at: payment_status === 'pago' ? new Date().toISOString() : null
                })
                .eq('id', id);

            if (error) throw error;

            setOrders(orders.map(o => o.id === id ? {
                ...o,
                payment_status,
                paid_at: payment_status === 'pago' ? new Date().toISOString() : undefined
            } : o));
        } catch (error) {
            console.error('Erro ao atualizar pagamento:', error);
        }
    };

    const handlePrintSelection = () => {
        if (selectedOrders.length === 0) {
            alert('Por favor, selecione pelo menos uma encomenda para imprimir.');
            return;
        }
        window.print();
    };

    const filteredOrders = orders.filter(order => {
        const matchesStatus = filterStatus === 'todos' || order.status === filterStatus;
        const matchesPayment = filterPayment === 'todos' || (order.payment_status || 'pendente') === filterPayment;

        const orderDate = new Date(order.created_at).toISOString().split('T')[0];
        const matchesStart = !startDate || orderDate >= startDate;
        const matchesEnd = !endDate || orderDate <= endDate;

        return matchesStatus && matchesPayment && matchesStart && matchesEnd;
    });

    const styles = {
        container: { padding: '2rem', maxWidth: '1200px', margin: '0 auto' },
        card: { background: 'white', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', marginBottom: '2rem' },
        filters: { display: 'flex', gap: '1rem', flexWrap: 'wrap' as const, marginBottom: '1.5rem', alignItems: 'flex-end' },
        table: { width: '100%', borderCollapse: 'collapse' as const },
        th: { textAlign: 'left' as const, padding: '12px', borderBottom: '2px solid #eee', fontSize: '0.85rem', color: '#666' },
        td: { padding: '12px', borderBottom: '1px solid #eee', fontSize: '0.9rem' },
        statusBadge: (status: string) => ({
            padding: '4px 8px',
            borderRadius: '4px',
            fontSize: '0.75rem',
            fontWeight: 600,
            textTransform: 'uppercase' as const,
            backgroundColor: status === 'enviada' ? '#dcfce7' : status === 'por enviar' ? '#fef9c3' : '#f3f4f6',
            color: status === 'enviada' ? '#166534' : status === 'por enviar' ? '#854d0e' : '#374151',
        }),
        paymentBadge: (status?: string) => ({
            padding: '4px 8px',
            borderRadius: '4px',
            fontSize: '0.75rem',
            fontWeight: 700,
            textTransform: 'uppercase' as const,
            backgroundColor: status === 'pago' ? '#dcfce7' : status === 'cancelado' ? '#fee2e2' : '#fef3c7',
            color: status === 'pago' ? '#15803d' : status === 'cancelado' ? '#b91c1c' : '#b45309',
            display: 'inline-block',
        }),
    };

    if (loading) return <div style={styles.container}>A carregar encomendas...</div>;

    return (
        <div style={styles.container}>
            <style jsx global>{`
                @media print {
                    .no-print { display: none !important; }
                    .print-area { display: block !important; width: 100%; }
                    body { background: white; }
                    .order-card-print { 
                        page-break-after: always; 
                        border: 2px solid #000;
                        padding: 20px;
                        margin-bottom: 20px;
                    }
                }
            `}</style>

            <div className="no-print">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                    <h1 style={{ fontSize: '2rem', color: 'var(--color-primary)' }}>Gestão de Encomendas</h1>
                    <Link href="/admin" style={{ color: '#666', textDecoration: 'underline' }}>Voltar ao Admin</Link>
                </div>

                <div style={styles.card}>
                    <div style={styles.filters}>
                        <div>
                            <label style={{ display: 'block', fontSize: '0.8rem', marginBottom: '4px' }}>Envio</label>
                            <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)} style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}>
                                <option value="todos">Todos os Envios</option>
                                <option value="por enviar">Por Enviar</option>
                                <option value="enviada">Enviada</option>
                                <option value="cancelada">Cancelada</option>
                            </select>
                        </div>
                        <div>
                            <label style={{ display: 'block', fontSize: '0.8rem', marginBottom: '4px' }}>Pagamento</label>
                            <select value={filterPayment} onChange={e => setFilterPayment(e.target.value)} style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}>
                                <option value="todos">Todos os Pagamentos</option>
                                <option value="pago">Pagas</option>
                                <option value="pendente">Pendentes</option>
                            </select>
                        </div>
                        <div>
                            <label style={{ display: 'block', fontSize: '0.8rem', marginBottom: '4px' }}>De:</label>
                            <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }} />
                        </div>
                        <div>
                            <label style={{ display: 'block', fontSize: '0.8rem', marginBottom: '4px' }}>Até:</label>
                            <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }} />
                        </div>
                        <div style={{ marginLeft: 'auto', display: 'flex', gap: '8px' }}>
                            <button
                                onClick={() => updateStatus('enviada')}
                                disabled={selectedOrders.length === 0}
                                style={{ padding: '8px 16px', backgroundColor: '#166534', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', opacity: selectedOrders.length === 0 ? 0.5 : 1 }}
                            >
                                Marcar como Enviada
                            </button>
                            <button
                                onClick={handlePrintSelection}
                                disabled={selectedOrders.length === 0}
                                style={{ padding: '8px 16px', backgroundColor: '#333', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', opacity: selectedOrders.length === 0 ? 0.5 : 1 }}
                            >
                                Imprimir Selecionadas
                            </button>
                        </div>
                    </div>

                    <table style={styles.table}>
                        <thead>
                            <tr>
                                <th style={styles.th}><input type="checkbox" onChange={e => setSelectedOrders(e.target.checked ? filteredOrders.map(o => o.id) : [])} /></th>
                                <th style={styles.th}>Data</th>
                                <th style={styles.th}>Cliente</th>
                                <th style={styles.th}>Localidade</th>
                                <th style={styles.th}>Total</th>
                                <th style={styles.th}>Pagamento (IFTHENPAY)</th>
                                <th style={styles.th}>Envio</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredOrders.map(order => (
                                <tr key={order.id}>
                                    <td style={styles.td}>
                                        <input
                                            type="checkbox"
                                            checked={selectedOrders.includes(order.id)}
                                            onChange={() => toggleOrderSelection(order.id)}
                                        />
                                    </td>
                                    <td style={styles.td}>{new Date(order.created_at).toLocaleDateString('pt-PT')}</td>
                                    <td style={styles.td}>
                                        <strong>{order.customer_name}</strong><br />
                                        <small>{order.customer_phone}</small>
                                        {order.customer_nif && (
                                            <div><small style={{ color: '#6b7280' }}>NIF: {order.customer_nif}</small></div>
                                        )}
                                    </td>
                                    <td style={styles.td}>{order.customer_city}</td>
                                    <td style={styles.td}><strong>€{order.total.toFixed(2)}</strong></td>
                                    <td style={styles.td}>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', alignItems: 'flex-start' }}>
                                            <span style={styles.paymentBadge(order.payment_status)}>
                                                {order.payment_status === 'pago' ? '✓ PAGO' : '⏳ PENDENTE'}
                                            </span>
                                            <small style={{ color: '#4b5563', textTransform: 'uppercase', fontWeight: 600 }}>
                                                {order.payment_method}
                                            </small>
                                            {order.payment_reference && (
                                                <small style={{ color: '#9ca3af', fontFamily: 'monospace' }}>
                                                    Ref: {order.payment_reference}
                                                </small>
                                            )}
                                        </div>
                                    </td>
                                    <td style={styles.td}>
                                        <span style={styles.statusBadge(order.status)}>{order.status}</span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* ZONA DE IMPRESSÃO - Visível apenas no papel */}
            <div className="print-area" style={{ display: 'none' }}>
                {orders.filter(o => selectedOrders.includes(o.id)).map(order => (
                    <div key={order.id} className="order-card-print">
                        <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '2px solid #333', paddingBottom: '10px', marginBottom: '20px' }}>
                            <h2 style={{ margin: 0 }}>3GWINE - Guia de Envio</h2>
                            <span>Encomenda: #{order.id}</span>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', marginBottom: '30px' }}>
                            <div>
                                <h3 style={{ borderBottom: '1px solid #ccc' }}>Destinatário</h3>
                                <p style={{ fontSize: '1.2rem', margin: '5px 0' }}><strong>{order.customer_name}</strong></p>
                                <p style={{ margin: '5px 0' }}>{order.customer_address}</p>
                                <p style={{ margin: '5px 0' }}>{order.customer_zipcode} {order.customer_city}</p>
                                <p style={{ margin: '15px 0' }}>Tel: {order.customer_phone}</p>
                                {order.customer_nif && <p style={{ margin: '5px 0' }}>NIF: {order.customer_nif}</p>}
                            </div>
                            <div>
                                <h3 style={{ borderBottom: '1px solid #ccc' }}>Detalhes</h3>
                                <p>Data: {new Date(order.created_at).toLocaleString('pt-PT')}</p>
                                <p>Método Envio: {order.delivery_method === 'pickup' ? 'Levantamento em Loja' : 'Entrega ao Domicílio'}</p>
                                <p>Pagamento: {order.payment_method?.toUpperCase()} ({order.payment_status?.toUpperCase() || 'PENDENTE'})</p>
                            </div>
                        </div>

                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <thead>
                                <tr style={{ backgroundColor: '#f0f0f0' }}>
                                    <th style={{ padding: '8px', border: '1px solid #ccc', textAlign: 'left' }}>Produto</th>
                                    <th style={{ padding: '8px', border: '1px solid #ccc', textAlign: 'center' }}>Qtd</th>
                                    <th style={{ padding: '8px', border: '1px solid #ccc', textAlign: 'right' }}>Preço Un.</th>
                                </tr>
                            </thead>
                            <tbody>
                                {order.items?.map((item, i) => (
                                    <tr key={i}>
                                        <td style={{ padding: '8px', border: '1px solid #ccc' }}>{item.name}</td>
                                        <td style={{ padding: '8px', border: '1px solid #ccc', textAlign: 'center' }}>{item.quantity}</td>
                                        <td style={{ padding: '8px', border: '1px solid #ccc', textAlign: 'right' }}>€{item.price.toFixed(2)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        <div style={{ marginTop: '20px', textAlign: 'right' }}>
                            <p>Portes: €{Number(order.shipping_cost || 0).toFixed(2)}</p>
                            <p style={{ fontSize: '1.4rem' }}><strong>TOTAL: €{Number(order.total || 0).toFixed(2)}</strong></p>
                        </div>

                        <div style={{ marginTop: '40px', fontSize: '0.8rem', color: '#666', fontStyle: 'italic' }}>
                            Obrigado pela sua encomenda na 3GWINE.pt
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
