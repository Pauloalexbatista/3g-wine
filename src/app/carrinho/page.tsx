'use client';

import { useCart } from '@/context/CartContext';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import './cart.css';

export default function CartPage() {
    const { cart, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart();
    const [mounted, setMounted] = useState(false);
    const [deliveryMethod, setDeliveryMethod] = useState<'delivery' | 'pickup'>('delivery');
    const [shippingInfo, setShippingInfo] = useState({
        fullName: '',
        address: '',
        zipCode: '',
        city: '',
        phone: ''
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setShippingInfo(prev => ({ ...prev, [name]: value }));
    };

    const validateShippingInfo = () => {
        if (deliveryMethod === 'pickup') return true;
        return (
            shippingInfo.fullName.trim() !== '' &&
            shippingInfo.address.trim() !== '' &&
            shippingInfo.zipCode.trim() !== '' &&
            shippingInfo.city.trim() !== '' &&
            shippingInfo.phone.trim() !== ''
        );
    };

    const handleCheckout = async (paymentMethod: 'multibanco' | 'mbway') => {
        if (cart.length === 0) return;

        if (!validateShippingInfo()) {
            alert('Por favor, preencha todos os campos dos dados de envio.');
            return;
        }

        try {
            const currentSubtotal = cart.reduce((total, item) => total + item.price * (item.quantity || 1), 0);
            const IVA_RATE = 0.23;
            const ivaAmount = currentSubtotal * IVA_RATE;
            const subtotalWithIva = currentSubtotal + ivaAmount;
            const shippingCharge = (deliveryMethod === 'pickup' || currentSubtotal >= 100) ? 0 : 10;
            const finalTotal = subtotalWithIva + shippingCharge;

            const orderData = {
                customer_name: shippingInfo.fullName,
                customer_address: deliveryMethod === 'pickup' ? 'Levantamento em Loja' : shippingInfo.address,
                customer_zipcode: deliveryMethod === 'pickup' ? '-' : shippingInfo.zipCode,
                customer_city: deliveryMethod === 'pickup' ? '-' : shippingInfo.city,
                customer_phone: shippingInfo.phone,
                delivery_method: deliveryMethod,
                shipping_cost: shippingCharge,
                items: cart,
                subtotal: currentSubtotal,
                iva: ivaAmount,
                total: finalTotal,
                status: 'por enviar',
                payment_method: paymentMethod
            };

            const { error } = await supabase
                .from('orders')
                .insert([orderData]);

            if (error) throw error;

            alert(`Encomenda registada com sucesso! (Método: ${paymentMethod.toUpperCase()})\n\nSeria agora redirecionado para a plataforma de pagamento.`);
            clearCart();
            window.location.href = '/';

        } catch (error) {
            console.error('Erro ao guardar encomenda:', error);
            alert('Erro ao processar a encomenda. Por favor tente novamente.');
        }
    };

    useEffect(() => {
        setMounted(true);
    }, []);

    // Constantes de negócio
    const IVA_RATE = 0.23;
    const SHIPPING_COST = 20;
    const FREE_SHIPPING_THRESHOLD = 100;

    // Cálculos dinâmicos baseados no estado actual do carrinho
    const currentSubtotal = cart.reduce((total, item) => total + item.price * (item.quantity || 1), 0);
    const ivaAmount = currentSubtotal * IVA_RATE;
    const subtotalWithIva = currentSubtotal + ivaAmount;

    const shippingCharge = (deliveryMethod === 'pickup' || currentSubtotal >= FREE_SHIPPING_THRESHOLD)
        ? 0
        : SHIPPING_COST;

    const finalTotal = subtotalWithIva + shippingCharge;

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
            cursor: 'pointer',
            fontWeight: 600,
            fontSize: '0.9rem',
            backgroundColor: active ? 'white' : 'transparent',
            boxShadow: active ? 'var(--shadow-sm)' : 'none',
            color: active ? 'var(--color-primary)' : 'var(--color-gray-600)',
            transition: 'all 0.2s',
        }),
    };

    return (
        <div className="cart-page-container">
            <h1 className="cart-title">O Seu Carrinho</h1>

            {cart.length === 0 ? (
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
                    {/* Items List */}
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
                                Levantamento em Loja
                            </button>
                        </div>

                        {deliveryMethod === 'delivery' && (
                            <div style={{
                                backgroundColor: 'white',
                                padding: '1.5rem',
                                borderRadius: 'var(--radius-md)',
                                border: '1px solid var(--color-gray-200)',
                                marginTop: '1.5rem',
                                display: 'flex',
                                flexDirection: 'column' as const,
                                gap: '1rem',
                            }}>
                                <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '0.5rem' }}>Dados de Envio</h3>
                                <div className="flex flex-col gap-1">
                                    <label style={{ fontSize: '0.85rem', fontWeight: 600 }}>Nome Completo</label>
                                    <input
                                        type="text"
                                        name="fullName"
                                        placeholder="Seu nome..."
                                        className="input"
                                        value={shippingInfo.fullName}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="flex flex-col gap-1">
                                    <label style={{ fontSize: '0.85rem', fontWeight: 600 }}>Morada</label>
                                    <input
                                        type="text"
                                        name="address"
                                        placeholder="Rua, número, andar..."
                                        className="input"
                                        value={shippingInfo.address}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="flex flex-col gap-1">
                                        <label style={{ fontSize: '0.85rem', fontWeight: 600 }}>Cód. Postal</label>
                                        <input
                                            type="text"
                                            name="zipCode"
                                            placeholder="0000-000"
                                            className="input"
                                            value={shippingInfo.zipCode}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <label style={{ fontSize: '0.85rem', fontWeight: 600 }}>Localidade</label>
                                        <input
                                            type="text"
                                            name="city"
                                            placeholder="Cidade..."
                                            className="input"
                                            value={shippingInfo.city}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <label style={{ fontSize: '0.85rem', fontWeight: 600 }}>Telemóvel</label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        placeholder="9xx xxx xxx"
                                        className="input"
                                        value={shippingInfo.phone}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>
                        )}

                        <div className="cart-items-list" style={{ marginTop: '2rem' }}>
                            {displayItems.map((item) => (
                                <div key={item.id} className="cart-item">
                                    <div className="cart-item-image" style={{
                                        position: 'relative' as const,
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
                                        <h3 style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: '0.25rem' }}>{item.name}</h3>
                                        <p style={{ color: 'var(--color-secondary)', fontSize: '0.9rem' }}>{item.type} | {item.year}</p>
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
                                    <div className="cart-item-price-qty" style={{ textAlign: 'right' }}>
                                        <div style={{ fontWeight: 600, fontSize: '1.1rem', marginBottom: '0.5rem' }}>€{item.price.toFixed(2)}</div>
                                        <div style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'flex-end',
                                            gap: '0.75rem',
                                            backgroundColor: '#f3f4f6',
                                            padding: '0.25rem 0.5rem',
                                            borderRadius: 'var(--radius-sm)'
                                        }}>
                                            <button
                                                className="qty-btn"
                                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                style={{
                                                    border: 'none',
                                                    background: 'none',
                                                    cursor: 'pointer',
                                                    fontWeight: 'bold',
                                                    fontSize: '1.2rem',
                                                    color: 'var(--color-gray-600)',
                                                    padding: '0 5px'
                                                }}
                                            >
                                                -
                                            </button>
                                            <span style={{ fontWeight: 600, minWidth: '20px', textAlign: 'center' }}>
                                                {item.quantity}
                                            </span>
                                            <button
                                                className="qty-btn"
                                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                style={{
                                                    border: 'none',
                                                    background: 'none',
                                                    cursor: 'pointer',
                                                    fontWeight: 'bold',
                                                    fontSize: '1.2rem',
                                                    color: 'var(--color-gray-600)',
                                                    padding: '0 5px'
                                                }}
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Order Summary */}
                    <div className="cart-summary" style={{
                        backgroundColor: 'var(--color-light)',
                        padding: '2rem',
                        borderRadius: 'var(--radius-lg)',
                        boxShadow: 'var(--shadow-md)',
                        position: 'sticky' as const,
                        top: '100px',
                    }}>
                        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1.5rem', color: 'var(--color-dark)' }}>Resumo do Pedido</h2>

                        <div className="flex justify-between mb-3 text-base text-gray-700">
                            <span>Produtos (Base)</span>
                            <span>€{currentSubtotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between mb-3 text-base text-gray-700">
                            <span>IVA (23%)</span>
                            <span>€{ivaAmount.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between mb-3 text-base text-gray-700">
                            <span>Subtotal c/ IVA</span>
                            <span>€{subtotalWithIva.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between mb-3 text-base text-gray-700">
                            <span>Portes de Envio</span>
                            <span style={{ color: shippingCharge === 0 ? '#16a34a' : 'inherit' }}>
                                {shippingCharge === 0 ? 'Grátis' : `€${shippingCharge.toFixed(2)}`}
                            </span>
                        </div>

                        {deliveryMethod === 'delivery' && currentSubtotal < FREE_SHIPPING_THRESHOLD && (
                            <p style={{ fontSize: '0.75rem', color: 'var(--color-gray-500)', marginTop: '-0.5rem', marginBottom: '1rem' }}>
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
                            <span>Total</span>
                            <span>€{finalTotal.toFixed(2)}</span>
                        </div>

                        <span style={{
                            display: 'block',
                            marginTop: '2rem',
                            fontSize: '0.8rem',
                            color: 'var(--color-gray-500)',
                            textAlign: 'center' as const,
                            textTransform: 'uppercase' as const,
                            letterSpacing: '1px',
                        }}>Pagar via IFTHENPAY</span>
                        <div className="grid grid-cols-2 gap-2 mt-2">
                            <button
                                className="btn btn-secondary w-full"
                                style={{ fontSize: '0.8rem', backgroundColor: '#004fe5', border: 'none' }}
                                onClick={() => alert('Referência Multibanco: Preparando integração...')}
                            >
                                Multibanco
                            </button>
                            <button
                                className="btn btn-secondary w-full"
                                style={{ fontSize: '0.8rem', backgroundColor: '#e20613', border: 'none' }}
                                onClick={() => alert('MB WAY: Preparando integração...')}
                            >
                                MB WAY
                            </button>
                        </div>

                        <Link
                            href="/loja"
                            style={{
                                display: 'block',
                                width: '100%',
                                padding: '1.0rem',
                                border: '1px solid var(--color-gray-300)',
                                borderRadius: 'var(--radius-md)',
                                color: 'var(--color-gray-700)',
                                textAlign: 'center',
                                fontWeight: 600,
                                marginTop: '1.5rem',
                                textDecoration: 'none',
                                fontSize: '0.9rem'
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
        </div>
    );
}
