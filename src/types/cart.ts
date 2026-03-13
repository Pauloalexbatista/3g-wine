export interface Product {
    id: number;
    name: string;
    type: string;
    year?: number;
    region?: string;
    price: number;
    description?: string;
    featured?: boolean;
    image: string;
    quantity?: number;
}

export interface CartContextType {
    cart: Product[];
    addToCart: (product: Product) => void;
    removeFromCart: (productId: number) => void;
    updateQuantity: (productId: number, quantity: number) => void;
    clearCart: () => void;
    cartTotal: number;
    cartCount: number;
}
