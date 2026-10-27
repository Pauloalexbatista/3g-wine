'use client';

import { getTaxRate, calculateProductTax, formatEuro } from '@/utils/tax';
import { useCart } from '@/context/CartContext';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState, useRef } from 'react';
import './cart.css';

interface PaymentModalState {
    orderId: string | number;
    method: 'multibanco' | 'mbway';
    data: any;
    paid: boolean;
}

export default function CartPage() {
    const { cart, removeFromCart, updateQuantity, clearCart } = useCart();
    const [mounted, setMounted] = useState(false);
    const [deliveryMethod, setDeliveryMethod] = useState<'delivery' | 'pickup'>('delivery');
    const [selectedPayment, setSelectedPayment] = useState<'multibanco' | 'mbway'>('mbway');
    const [mbwayPhone, setMbwayPhone] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);
    const [copied, setCopied] = useState(false);
    const [paymentModal, setPaymentModal] = useState<PaymentModalState | null>(null);
    const [countdown, setCountdown] = useState(300); // 5 minutos MB WAY

    const [shippingInfo, setShippingInfo] = useState({
        fullName: '',
        address: '',
        zipCode: '',
        city: '',
        phone: '',
        nif: ''
    });

    const pollIntervalRef = useRef<NodeJS.Timeout | null>(null);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setShippingInfo(prev => ({ ...prev, [name]: value }));
        if (name === 'phone' && !mbwayPhone) {
            setMbwayPhone(value);
        }
    };

    const validateShippingInfo = () => {
        if (deliveryMethod === 'pickup') {
            return shippingInfo.fullName.trim() !== '' && shippingInfo.phone.trim() !== '';
        }
        return (
            shippingInfo.fullName.trim() !== '' &&
            shippingInfo.address.trim() !== '' &&
            shippingInfo.zipCode.trim() !== '' &&
            shippingInfo.city.trim() !== '' &&
            shippingInfo.phone.trim() !== ''
        );
    };

    // Constantes de negócio
    const IVA_RATE = 0.23;
    const SHIPPING_COST = 12.50;
    const FREE_SHIPPING_THRESHOLD = 150;

    const currentSubtotal = cart.reduce((total, item) => total + item.price * (item.quantity || 1), 0);
    const ivaAmount = currentSubtotal * IVA_RATE;
    const subtotalWithIva = currentSubtotal + ivaAmount;
    const shippingCharge = (deliveryMethod === 'pickup' || currentSubtotal >= FREE_SHIPPING_THRESHOLD)
        ? 0
        : SHIPPING_COST;
    const finalTotal = subtotalWithIva + shippingCharge;

    const handleCheckout = async (paymentMethod: 'multibanco' | 'mbway') => {
        if (cart.length === 0) return;

        if (!validateShippingInfo()) {
            alert('Por favor, preencha todos os campos obrigatórios dos dados de envio.');
            return;
        }

        const phoneToUse = paymentMethod === 'mbway' ? (mbwayPhone || shippingInfo.phone) : shippingInfo.phone;
        if (paymentMethod === 'mbway' && (!phoneToUse || phoneToUse.replace(/\D/g, '').length < 9)) {
            alert('Por favor, indique um número de telemóvel válido de 9 dígitos para o MB WAY.');
            return;
        }

        setIsProcessing(true);

        try {
            const orderTaxBreakdown: { [key: number]: { base: number; tax: number } } = {};
            cart.forEach(item => {
                const qty = item.quantity || 1;
                const itemBase = item.price * qty;
                const rate = getTaxRate(item.type);
                const itemTax = itemBase * rate;
                const pct = Math.round(rate * 100);

                if (!orderTaxBreakdown[pct]) orderTaxBreakdown[pct] = { base: 0, tax: 0 };
                orderTaxBreakdown[pct].base += itemBase;
                orderTaxBreakdown[pct].tax += itemTax;
            });

            const res = await fetch('/api/checkout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    customer_name: shippingInfo.fullName,
                    customer_address: shippingInfo.address,
                    customer_zipcode: shippingInfo.zipCode,
                    customer_city: shippingInfo.city,
                    customer_phone: shippingInfo.phone,
                    customer_nif: shippingInfo.nif,
                    delivery_method: deliveryMethod,
                    payment_method: paymentMethod,
                    mbway_phone: phoneToUse,
                    items: cart,
                    subtotal: currentSubtotal,
                    shipping_cost: shippingCharge,
                    iva_breakdown: orderTaxBreakdown,
                    iva: ivaAmount,
                    total: finalTotal,
                }),
            });

            const result = await res.json();

            if (!res.ok || !result.success) {
                throw new Error(result.error || 'Erro ao processar o pagamento.');
            }

            clearCart();
            setPaymentModal({
                orderId: result.orderId,
                method: paymentMethod,
                data: result.data,
                paid: false,
            });
            setCountdown(300);

        } catch (error: any) {
            console.error('Erro no checkout:', error);
            alert(error.message || 'Erro ao processar a encomenda. Por favor tente novamente.');
        } finally {
            setIsProcessing(false);
        }
    };

    // Polling de estado do pagamento enquanto a modal estiver aberta
    useEffect(() => {
        if (!paymentModal || paymentModal.paid) {
            if (pollIntervalRef.current) clearInterval(pollIntervalRef.current);
            return;
        }

        pollIntervalRef.current = setInterval(async () => {
            try {
                const res = await fetch(`/api/payments/status?orderId=${paymentModal.orderId}`);
                const data = await res.json();
                if (data.paid) {
                    setPaymentModal(prev => prev ? { ...prev, paid: true } : null);
                    if (pollIntervalRef.current) clearInterval(pollIntervalRef.current);
                }
            } catch (e) {
                console.error('Erro no polling do pagamento:', e);
            }
        }, 3500);

        return () => {
            if (pollIntervalRef.current) clearInterval(pollIntervalRef.current);
        };
    }, [paymentModal]);

    // Temporizador decrescente para o MB WAY
    useEffect(() => {
        if (!paymentModal || paymentModal.method !== 'mbway' || paymentModal.paid) return;

        const timer = setInterval(() => {
            setCountdown(c => {
                if (c <= 1) {
                    clearInterval(timer);
                    return 0;
                }
                return c - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [paymentModal]);

    const handleCopyReference = (ref: string) => {
        navigator.clipboard.writeText(ref.replace(/\s+/g, ''));
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
    };

    const handleSimulatePayment = async () => {
        if (!paymentModal) return;
        try {
            await fetch('/api/payments/status', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ orderId: paymentModal.orderId }),
            });
            setPaymentModal(prev => prev ? { ...prev, paid: true } : null);
        } catch (e) {
            console.error(e);
        }
    };

    useEffect(() => {
        setMounted(true);
    }, []);

    const displayItems = cart.map(item => ({
        ...item,
        quantity: item.quantity || 1
    }));

    if (!mounted) return null;

    const dynamicStyles = {
        methodBtn: (active: boolean) => ({
            flex: 1,
            padding: '0.75rem',
            borderRadius: 'var(--radius-sm)',
            border: 'none',
            fontWeight: 600,
            cursor: 'pointer',
            backgroundColor: active ? 'var(--color-primary)' : '#e5e7eb',
            color: active ? '#ffffff' : 'var(--color-dark)',
            transition: 'all 0.2s ease',
        }),
        paymentSelectBtn: (active: boolean) => ({
            flex: 1,
            padding: '1rem',
            borderRadius: 'var(--radius-md)',
            border: active ? '2px solid #D4AF37' : '1px solid #e5e7eb',
            backgroundColor: active ? '#1a1a1a' : '#ffffff',
            color: active ? '#ffffff' : '#1a1a1a',
            cursor: 'pointer',
            textAlign: 'left' as const,
            transition: 'all 0.2s ease',
        }),
    };

    const formatSeconds = (sec: number) => {
        const m = Math.floor(sec / 60);
        const s = sec % 60;
        return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
    };

    return (
        <div className="cart-page-container">
            <h1 className="cart-title">O Seu Carrinho</h1>

            {cart.length === 0 && !paymentModal ? (
                <div className="cart-empty text-center">
                    <p style={{ fontSize: '1.25rem', color: 'var(--color-gray-500)', marginBottom: '2rem' }}>
                        O seu carrinho está vazio.
                    </p>
                    <Link href="/loja" className="btn btn-primary" style={{ textDecoration: 'none' }}>
                        Descobrir Vinhos
                    </Link>
                </div>
            ) : (
                <div className="cart-grid">
                    {/* Items List & Customer Details */}
                    <div>
                        <div style={{
                            display: 'flex',
                            gap: '1rem',
                            marginBottom: '2rem',
                            backgroundColor: '#f3f4f6',
                            padding: '0.5rem',
                            borderRadius: 'var(--radius-md)',
                        }}>
                            <button
                                style={dynamicStyles.methodBtn(deliveryMethod === 'delivery')}
                                onClick={() => setDeliveryMethod('delivery')}
                            >
                                Entrega ao Domicílio
                            </button>
                            <button
                                style={dynamicStyles.methodBtn(deliveryMethod === 'pickup')}
                                onClick={() => setDeliveryMethod('pickup')}
                            >
                                Levantamento em Loja (Barbearia)
                            </button>
                        </div>

                        {/* Dados de Envio & Faturação */}
                        <div style={{
                            backgroundColor: 'white',
                            padding: '1.5rem',
                            borderRadius: 'var(--radius-md)',
                            border: '1px solid var(--color-gray-200)',
                            marginTop: '1.5rem',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '1rem',
                        }}>
                            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '0.5rem', color: '#111' }}>
                                {deliveryMethod === 'delivery' ? 'Dados de Envio e Faturação' : 'Dados de Contacto e Faturação'}
                            </h3>

                            <div className="flex flex-col gap-1">
                                <label style={{ fontSize: '0.85rem', fontWeight: 600, color: '#333' }}>Nome Completo *</label>
                                <input
                                    type="text"
                                    name="fullName"
                                    placeholder="Ex: João Silva"
                                    className="input"
                                    value={shippingInfo.fullName}
                                    onChange={handleInputChange}
                                    style={{ padding: '0.65rem', border: '1px solid #d1d5db', borderRadius: '6px' }}
                                    required
                                />
                            </div>

                            {deliveryMethod === 'delivery' && (
                                <>
                                    <div className="flex flex-col gap-1">
                                        <label style={{ fontSize: '0.85rem', fontWeight: 600, color: '#333' }}>Morada *</label>
                                        <input
                                            type="text"
                                            name="address"
                                            placeholder="Rua, número, andar..."
                                            className="input"
                                            value={shippingInfo.address}
                                            onChange={handleInputChange}
                                            style={{ padding: '0.65rem', border: '1px solid #d1d5db', borderRadius: '6px' }}
                                            required
                                        />
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div className="flex flex-col gap-1">
                                            <label style={{ fontSize: '0.85rem', fontWeight: 600, color: '#333' }}>Cód. Postal *</label>
                                            <input
                                                type="text"
                                                name="zipCode"
                                                placeholder="0000-000"
                                                className="input"
                                                value={shippingInfo.zipCode}
                                                onChange={handleInputChange}
                                                style={{ padding: '0.65rem', border: '1px solid #d1d5db', borderRadius: '6px' }}
                                                required
                                            />
                                        </div>
                                        <div className="flex flex-col gap-1">
                                            <label style={{ fontSize: '0.85rem', fontWeight: 600, color: '#333' }}>Localidade *</label>
                                            <input
                                                type="text"
                                                name="city"
                                                placeholder="Cidade..."
                                                className="input"
                                                value={shippingInfo.city}
                                                onChange={handleInputChange}
                                                style={{ padding: '0.65rem', border: '1px solid #d1d5db', borderRadius: '6px' }}
                                                required
                                            />
                                        </div>
                                    </div>
                                </>
                            )}

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="flex flex-col gap-1">
                                    <label style={{ fontSize: '0.85rem', fontWeight: 600, color: '#333' }}>Telemóvel *</label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        placeholder="9xx xxx xxx"
                                        className="input"
                                        value={shippingInfo.phone}
                                        onChange={handleInputChange}
                                        style={{ padding: '0.65rem', border: '1px solid #d1d5db', borderRadius: '6px' }}
                                        required
                                    />
                                </div>
                                <div className="flex flex-col gap-1">
                                    <label style={{ fontSize: '0.85rem', fontWeight: 600, color: '#333' }}>NIF (Opcional p/ Fatura)</label>
                                    <input
                                        type="text"
                                        name="nif"
                                        placeholder="123456789"
                                        className="input"
                                        value={shippingInfo.nif}
                                        onChange={handleInputChange}
                                        style={{ padding: '0.65rem', border: '1px solid #d1d5db', borderRadius: '6px' }}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Lista de Garrafas no Carrinho */}
                        <div className="cart-items-list" style={{ marginTop: '2rem' }}>
                            {displayItems.map((item) => (
                                <div key={item.id} className="cart-item">
                                    <div className="cart-item-image" style={{
                                        position: 'relative',
                                        width: '100px',
                                        height: '100px',
                                        backgroundColor: '#f9fafb',
                                        borderRadius: 'var(--radius-md)',
                                        overflow: 'hidden',
                                        flexShrink: 0,
                                    }}>
                                        <Image
                                            src={item.image || '/images/products/douro-2018.png'}
                                            alt={item.name}
                                            fill
                                            style={{ objectFit: 'contain', padding: '0.5rem' }}
                                        />
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <h3 style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: '0.25rem', color: '#111' }}>{item.name}</h3>
                                        <p style={{ color: '#854d0e', fontSize: '0.9rem' }}>{item.type} {item.year ? `| ${item.year}` : ''}</p>
                                        <button
                                            onClick={() => removeFromCart(item.id)}
                                            style={{
                                                color: '#ef4444',
                                                backgroundColor: 'transparent',
                                                border: 'none',
                                                fontSize: '0.875rem',
                                                textDecoration: 'underline',
                                                cursor: 'pointer',
                                                marginTop: '0.5rem',
                                                padding: 0
                                            }}
                                        >
                                            Remover
                                        </button>
                                    </div>
                                    {(() => {
                                        const qty = item.quantity || 1;
                                        const itemTotal = item.price * qty;

                                        return (
                                            <div className="cart-item-price-qty" style={{ textAlign: 'right' }}>
                                                <div style={{ fontWeight: 800, fontSize: '1.2rem', marginBottom: '0.5rem', color: '#111' }}>
                                                    €{itemTotal.toFixed(2)}
                                                </div>
                                                <div style={{ display: 'inline-flex', alignItems: 'center', border: '1px solid #d1d5db', borderRadius: '4px' }}>
                                                    <button
                                                        onClick={() => updateQuantity(item.id, qty - 1)}
                                                        style={{ padding: '0.25rem 0.6rem', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 700 }}
                                                    >
                                                        -
                                                    </button>
                                                    <span style={{ padding: '0.25rem 0.6rem', fontWeight: 600 }}>{qty}</span>
                                                    <button
                                                        onClick={() => updateQuantity(item.id, qty + 1)}
                                                        style={{ padding: '0.25rem 0.6rem', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 700 }}
                                                    >
                                                        +
                                                    </button>
                                                </div>
                                            </div>
                                        );
                                    })()}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Resumo do Pedido & Pagamento IFTHENPAY */}
                    <div className="cart-summary" style={{
                        backgroundColor: 'var(--color-light)',
                        padding: '2rem',
                        borderRadius: 'var(--radius-lg)',
                        boxShadow: 'var(--shadow-md)',
                        position: 'sticky',
                        top: '100px',
                    }}>
                        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1.5rem', color: 'var(--color-dark)' }}>Resumo do Pedido</h2>

                        <div className="flex justify-between mb-3 text-base text-gray-700">
                            <span>Produtos (Base)</span>
                            <span>€{currentSubtotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between mb-3 text-base text-gray-700">
                            <span>IVA (23% incluído)</span>
                            <span>€{ivaAmount.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between mb-3 text-base text-gray-700">
                            <span>Portes de Envio</span>
                            <span style={{ color: shippingCharge === 0 ? '#16a34a' : 'inherit', fontWeight: shippingCharge === 0 ? 700 : 400 }}>
                                {shippingCharge === 0 ? 'Grátis' : `€${shippingCharge.toFixed(2)}`}
                            </span>
                        </div>

                        {deliveryMethod === 'delivery' && currentSubtotal < FREE_SHIPPING_THRESHOLD && (
                            <p style={{ fontSize: '0.75rem', color: 'var(--color-gray-500)', marginTop: '-0.25rem', marginBottom: '1rem' }}>
                                Adicione mais €{(FREE_SHIPPING_THRESHOLD - currentSubtotal).toFixed(2)} para ter portes grátis!
                            </p>
                        )}

                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            marginTop: '1.5rem',
                            paddingTop: '1.5rem',
                            borderTop: '2px solid var(--color-gray-200)',
                            fontWeight: 800,
                            fontSize: 'var(--text-xl)',
                            color: 'var(--color-dark)',
                        }}>
                            <span>Total a Pagar</span>
                            <span style={{ color: '#D4AF37' }}>€{finalTotal.toFixed(2)}</span>
                        </div>

                        {/* Seleção do Método de Pagamento IFTHENPAY */}
                        <div style={{ marginTop: '2rem' }}>
                            <span style={{
                                display: 'block',
                                fontSize: '0.8rem',
                                color: 'var(--color-gray-500)',
                                textTransform: 'uppercase',
                                letterSpacing: '1px',
                                marginBottom: '0.75rem',
                                fontWeight: 700
                            }}>
                                Escolha o Método de Pagamento
                            </span>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                <button
                                    type="button"
                                    style={dynamicStyles.paymentSelectBtn(selectedPayment === 'mbway')}
                                    onClick={() => setSelectedPayment('mbway')}
                                >
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <div>
                                            <span style={{ display: 'block', fontWeight: 800, fontSize: '1rem' }}>MB WAY</span>
                                            <small style={{ opacity: 0.8, fontSize: '0.75rem' }}>Confirmação instantânea na app</small>
                                        </div>
                                        <span style={{
                                            backgroundColor: '#e20613',
                                            color: 'white',
                                            padding: '3px 8px',
                                            borderRadius: '4px',
                                            fontWeight: 800,
                                            fontSize: '0.75rem'
                                        }}>
                                            MB WAY
                                        </span>
                                    </div>
                                </button>

                                {selectedPayment === 'mbway' && (
                                    <div style={{
                                        backgroundColor: '#f9fafb',
                                        padding: '0.75rem 1rem',
                                        borderRadius: '6px',
                                        border: '1px solid #e5e7eb',
                                        marginTop: '-0.25rem',
                                    }}>
                                        <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#374151', display: 'block', marginBottom: '4px' }}>
                                            Telemóvel associado ao MB WAY:
                                        </label>
                                        <input
                                            type="tel"
                                            value={mbwayPhone || shippingInfo.phone}
                                            onChange={(e) => setMbwayPhone(e.target.value)}
                                            placeholder="9xx xxx xxx"
                                            style={{
                                                width: '100%',
                                                padding: '0.5rem',
                                                border: '1px solid #d1d5db',
                                                borderRadius: '4px',
                                                fontSize: '0.9rem',
                                                fontWeight: 600,
                                            }}
                                        />
                                    </div>
                                )}

                                <button
                                    type="button"
                                    style={dynamicStyles.paymentSelectBtn(selectedPayment === 'multibanco')}
                                    onClick={() => setSelectedPayment('multibanco')}
                                >
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <div>
                                            <span style={{ display: 'block', fontWeight: 800, fontSize: '1rem' }}>Multibanco</span>
                                            <small style={{ opacity: 0.8, fontSize: '0.75rem' }}>Entidade, Referência e Montante</small>
                                        </div>
                                        <span style={{
                                            backgroundColor: '#004fe5',
                                            color: 'white',
                                            padding: '3px 8px',
                                            borderRadius: '4px',
                                            fontWeight: 800,
                                            fontSize: '0.75rem'
                                        }}>
                                            MB
                                        </span>
                                    </div>
                                </button>
                            </div>

                            <button
                                className="btn btn-primary w-full"
                                style={{
                                    marginTop: '1.5rem',
                                    padding: '1rem',
                                    fontSize: '1rem',
                                    fontWeight: 800,
                                    width: '100%',
                                    backgroundColor: selectedPayment === 'mbway' ? '#e20613' : '#004fe5',
                                    border: 'none',
                                    cursor: isProcessing ? 'not-allowed' : 'pointer',
                                    opacity: isProcessing ? 0.7 : 1,
                                }}
                                disabled={isProcessing}
                                onClick={() => handleCheckout(selectedPayment)}
                            >
                                {isProcessing
                                    ? 'A Processar Pagamento...'
                                    : selectedPayment === 'mbway'
                                        ? `Pagar €${finalTotal.toFixed(2)} com MB WAY`
                                        : `Gerar Referência Multibanco (€${finalTotal.toFixed(2)})`}
                            </button>
                        </div>

                        <Link
                            href="/loja"
                            style={{
                                display: 'block',
                                width: '100%',
                                padding: '0.85rem',
                                border: '1px solid var(--color-gray-300)',
                                borderRadius: 'var(--radius-md)',
                                color: 'var(--color-gray-700)',
                                textAlign: 'center',
                                fontWeight: 600,
                                marginTop: '1.25rem',
                                textDecoration: 'none',
                                fontSize: '0.85rem'
                            }}
                        >
                            Continuar a Comprar
                        </Link>

                        <button
                            onClick={clearCart}
                            style={{
                                backgroundColor: 'transparent',
                                border: 'none',
                                color: 'var(--color-gray-500)',
                                width: '100%',
                                marginTop: '1rem',
                                textDecoration: 'underline',
                                cursor: 'pointer',
                                fontSize: '0.8rem'
                            }}
                        >
                            Esvaziar Carrinho
                        </button>
                    </div>
                </div>
            )}

            {/* MODAL LUXO / CONFIRMAÇÃO DE PAGAMENTO IFTHENPAY */}
            {paymentModal && (
                <div style={{
                    position: 'fixed',
                    inset: 0,
                    backgroundColor: 'rgba(0, 0, 0, 0.85)',
                    backdropFilter: 'blur(5px)',
                    zIndex: 9999,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '1rem',
                }}>
                    <div style={{
                        backgroundColor: '#111111',
                        border: '1px solid #D4AF37',
                        borderRadius: '12px',
                        maxWidth: '520px',
                        width: '100%',
                        padding: '2rem',
                        color: 'white',
                        boxShadow: '0 25px 50px -12px rgba(212, 175, 55, 0.25)',
                        position: 'relative',
                        textAlign: 'center',
                    }}>
                        {paymentModal.paid ? (
                            /* Ecrã de Pagamento Confirmado */
                            <div>
                                <div style={{
                                    width: '70px',
                                    height: '70px',
                                    backgroundColor: '#16a34a',
                                    borderRadius: '50%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    margin: '0 auto 1.5rem',
                                    fontSize: '2rem',
                                }}>
                                    ✓
                                </div>
                                <h3 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#D4AF37', marginBottom: '0.5rem' }}>
                                    Pagamento Confirmado!
                                </h3>
                                <p style={{ color: '#9ca3af', marginBottom: '1.5rem' }}>
                                    A sua encomenda <strong style={{ color: 'white' }}>#{paymentModal.orderId}</strong> foi registada com sucesso e já está a ser preparada na garrafeira 3GWINE.
                                </p>
                                <div style={{
                                    backgroundColor: '#1a1a1a',
                                    padding: '1rem',
                                    borderRadius: '8px',
                                    marginBottom: '1.5rem',
                                    fontSize: '0.85rem',
                                    color: '#d1d5db',
                                }}>
                                    Irá receber os detalhes de envio no seu telemóvel e email.
                                </div>
                                <button
                                    onClick={() => window.location.href = '/'}
                                    className="btn btn-primary"
                                    style={{ width: '100%', padding: '0.85rem', fontWeight: 700 }}
                                >
                                    Voltar à Página Inicial
                                </button>
                            </div>
                        ) : paymentModal.method === 'multibanco' ? (
                            /* Ecrã de Dados Multibanco */
                            <div>
                                <div style={{
                                    backgroundColor: '#004fe5',
                                    color: 'white',
                                    display: 'inline-block',
                                    padding: '4px 14px',
                                    borderRadius: '4px',
                                    fontWeight: 900,
                                    fontSize: '0.85rem',
                                    letterSpacing: '1px',
                                    marginBottom: '1rem',
                                }}>
                                    MULTIBANCO
                                </div>

                                <h3 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '0.25rem' }}>
                                    Dados para Pagamento
                                </h3>
                                <p style={{ color: '#9ca3af', fontSize: '0.85rem', marginBottom: '1.5rem' }}>
                                    Encomenda #{paymentModal.orderId} • Pague no Homebanking ou Caixa Multibanco
                                </p>

                                <div style={{
                                    backgroundColor: '#1c1c1c',
                                    border: '1px solid #333',
                                    borderRadius: '8px',
                                    padding: '1.25rem',
                                    textAlign: 'left',
                                    marginBottom: '1.5rem',
                                }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0', borderBottom: '1px solid #2a2a2a' }}>
                                        <span style={{ color: '#9ca3af' }}>Entidade:</span>
                                        <strong style={{ fontSize: '1.1rem', letterSpacing: '2px' }}>{paymentModal.data.entity}</strong>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0', borderBottom: '1px solid #2a2a2a' }}>
                                        <span style={{ color: '#9ca3af' }}>Referência:</span>
                                        <strong style={{ fontSize: '1.1rem', letterSpacing: '2px', color: '#D4AF37' }}>{paymentModal.data.reference}</strong>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0' }}>
                                        <span style={{ color: '#9ca3af' }}>Montante:</span>
                                        <strong style={{ fontSize: '1.2rem', color: '#10b981' }}>€{paymentModal.data.amount.toFixed(2)}</strong>
                                    </div>
                                </div>

                                <button
                                    onClick={() => handleCopyReference(paymentModal.data.reference)}
                                    style={{
                                        backgroundColor: '#262626',
                                        color: '#D4AF37',
                                        border: '1px solid #D4AF37',
                                        padding: '0.65rem 1.25rem',
                                        borderRadius: '6px',
                                        fontWeight: 700,
                                        fontSize: '0.85rem',
                                        cursor: 'pointer',
                                        width: '100%',
                                        marginBottom: '1rem',
                                    }}
                                >
                                    {copied ? '✓ Referência Copiada!' : 'Copiar Referência'}
                                </button>

                                <div style={{
                                    backgroundColor: 'rgba(212, 175, 55, 0.1)',
                                    border: '1px dashed #D4AF37',
                                    borderRadius: '6px',
                                    padding: '0.75rem',
                                    marginBottom: '1.25rem',
                                    fontSize: '0.75rem',
                                    color: '#f3f4f6',
                                }}>
                                    ℹ️ O sistema deteta o pagamento automaticamente. Assim que pagar, a encomenda passa a Paga.
                                </div>

                                <div style={{ display: 'flex', gap: '0.5rem' }}>
                                    <button
                                        onClick={handleSimulatePayment}
                                        style={{
                                            flex: 1,
                                            backgroundColor: '#16a34a',
                                            color: 'white',
                                            border: 'none',
                                            padding: '0.65rem',
                                            borderRadius: '6px',
                                            fontSize: '0.75rem',
                                            fontWeight: 700,
                                            cursor: 'pointer',
                                        }}
                                        title="Simulação para testes antes da aprovação do contrato IFTHENPAY"
                                    >
                                        🧪 Simular Pagamento Recebido (Teste)
                                    </button>
                                    <button
                                        onClick={() => window.location.href = '/'}
                                        style={{
                                            backgroundColor: 'transparent',
                                            color: '#9ca3af',
                                            border: '1px solid #444',
                                            padding: '0.65rem 1rem',
                                            borderRadius: '6px',
                                            fontSize: '0.75rem',
                                            cursor: 'pointer',
                                        }}
                                    >
                                        Fechar
                                    </button>
                                </div>
                            </div>
                        ) : (
                            /* Ecrã de Confirmação MB WAY */
                            <div>
                                <div style={{
                                    backgroundColor: '#e20613',
                                    color: 'white',
                                    display: 'inline-block',
                                    padding: '4px 14px',
                                    borderRadius: '4px',
                                    fontWeight: 900,
                                    fontSize: '0.85rem',
                                    letterSpacing: '1px',
                                    marginBottom: '1rem',
                                }}>
                                    MB WAY
                                </div>

                                <h3 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '0.5rem' }}>
                                    Autorize no seu Telemóvel
                                </h3>

                                <div style={{
                                    fontSize: '2.5rem',
                                    fontWeight: 800,
                                    color: countdown < 60 ? '#ef4444' : '#D4AF37',
                                    margin: '1rem 0',
                                    fontFamily: 'monospace',
                                }}>
                                    {formatSeconds(countdown)}
                                </div>

                                <p style={{ color: '#d1d5db', fontSize: '0.9rem', marginBottom: '0.5rem' }}>
                                    Enviámos uma notificação para o número:
                                </p>
                                <strong style={{ fontSize: '1.2rem', color: 'white', letterSpacing: '1px', display: 'block', marginBottom: '1.5rem' }}>
                                    {paymentModal.data.phone}
                                </strong>

                                <div style={{
                                    backgroundColor: '#1c1c1c',
                                    border: '1px solid #333',
                                    borderRadius: '8px',
                                    padding: '1rem',
                                    textAlign: 'left',
                                    marginBottom: '1.5rem',
                                    fontSize: '0.85rem',
                                    color: '#9ca3af',
                                }}>
                                    1. Abra a app <strong>MB WAY</strong> ou do seu banco.<br />
                                    2. Confirme a notificação de <strong>€{paymentModal.data.amount.toFixed(2)}</strong> para <strong>3GWINE</strong>.<br />
                                    3. Esta página atualiza-se automaticamente assim que aprovar.
                                </div>

                                <div style={{ display: 'flex', gap: '0.5rem' }}>
                                    <button
                                        onClick={handleSimulatePayment}
                                        style={{
                                            flex: 1,
                                            backgroundColor: '#16a34a',
                                            color: 'white',
                                            border: 'none',
                                            padding: '0.65rem',
                                            borderRadius: '6px',
                                            fontSize: '0.75rem',
                                            fontWeight: 700,
                                            cursor: 'pointer',
                                        }}
                                        title="Simulação para testes antes da aprovação do contrato IFTHENPAY"
                                    >
                                        🧪 Simular Aprovação no MB WAY (Teste)
                                    </button>
                                    <button
                                        onClick={() => window.location.href = '/'}
                                        style={{
                                            backgroundColor: 'transparent',
                                            color: '#9ca3af',
                                            border: '1px solid #444',
                                            padding: '0.65rem 1rem',
                                            borderRadius: '6px',
                                            fontSize: '0.75rem',
                                            cursor: 'pointer',
                                        }}
                                    >
                                        Cancelar
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
