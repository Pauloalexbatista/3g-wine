/**
 * Utilitários para Cálculo e Mapeamento de IVA em Portugal
 */

export interface TypeTaxRate {
    type: string;
    rate: number; // Em percentagem (ex: 13, 6, 23)
    description?: string;
}

export const DEFAULT_TYPE_TAX_RATES: TypeTaxRate[] = [
    { type: 'Tinto', rate: 13, description: 'Vinho Tinto (Taxa Intermédia - 13%)' },
    { type: 'Branco', rate: 13, description: 'Vinho Branco (Taxa Intermédia - 13%)' },
    { type: 'Rosé', rate: 13, description: 'Vinho Rosé (Taxa Intermédia - 13%)' },
    { type: 'Espumante', rate: 13, description: 'Espumante (Taxa Intermédia - 13%)' },
    { type: 'Cave', rate: 13, description: 'Vinhos de Cave / Envelhecidos (Taxa Intermédia - 13%)' },
    { type: 'Azeite', rate: 6, description: 'Azeites (Taxa Reduzida - 6%)' },
    { type: 'Licores / Destilados', rate: 23, description: 'Licores e Bebidas Espirituosas (Taxa Normal - 23%)' },
    { type: 'Outros', rate: 23, description: 'Cabazes, Acessórios e Outros (Taxa Normal - 23%)' },
];

export const TAX_RATES_STORAGE_KEY = '3gwine_tax_rates_v1';

/**
 * Lê todas as taxas configuradas (do localStorage se disponível, ou padrões)
 */
export function getAllTypeTaxRates(): TypeTaxRate[] {
    if (typeof window !== 'undefined') {
        try {
            const saved = localStorage.getItem(TAX_RATES_STORAGE_KEY);
            if (saved) {
                const parsed = JSON.parse(saved);
                if (Array.isArray(parsed) && parsed.length > 0) {
                    return parsed;
                }
            }
        } catch (e) {
            console.error('Erro ao ler taxas de IVA do localStorage:', e);
        }
    }
    return DEFAULT_TYPE_TAX_RATES;
}

/**
 * Guarda a tabela de taxas no localStorage
 */
export function saveTypeTaxRates(rates: TypeTaxRate[]): void {
    if (typeof window !== 'undefined') {
        try {
            localStorage.setItem(TAX_RATES_STORAGE_KEY, JSON.stringify(rates));
        } catch (e) {
            console.error('Erro ao guardar taxas de IVA:', e);
        }
    }
}

/**
 * Obtém a taxa de IVA decimal (ex: 0.13, 0.06, 0.23) para um determinado tipo
 */
export function getTaxRate(type?: string): number {
    if (!type) return 0.13;
    const lower = type.trim().toLowerCase();

    const rates = getAllTypeTaxRates();
    const found = rates.find(r => r.type.trim().toLowerCase() === lower);
    if (found) {
        return found.rate / 100;
    }

    // Heurísticas de correspondência flexível
    if (lower.includes('azeite')) return 0.06;
    if (
        lower.includes('licor') ||
        lower.includes('destilad') ||
        lower.includes('spirit') ||
        lower.includes('aguardente') ||
        lower.includes('gin') ||
        lower.includes('whisky') ||
        lower.includes('vodka')
    ) {
        return 0.23;
    }
    if (lower.includes('outro') || lower.includes('cabaz') || lower.includes('acess')) {
        return 0.23;
    }

    return 0.13;
}

export function formatEuro(value: number): string {
    return '€' + value.toFixed(2).replace('.', ',');
}

export interface TaxInfo {
    basePrice: number;
    taxRate: number;
    taxPercent: number;
    taxAmount: number;
    finalPrice: number;
    formattedBase: string;
    formattedTax: string;
    formattedFinal: string;
}

export function calculateProductTax(basePrice: number, type?: string): TaxInfo {
    const rate = getTaxRate(type);
    const taxAmount = Number((basePrice * rate).toFixed(2));
    const finalPrice = Number((basePrice + taxAmount).toFixed(2));

    return {
        basePrice,
        taxRate: rate,
        taxPercent: Math.round(rate * 100),
        taxAmount,
        finalPrice,
        formattedBase: formatEuro(basePrice),
        formattedTax: formatEuro(taxAmount),
        formattedFinal: formatEuro(finalPrice),
    };
}
