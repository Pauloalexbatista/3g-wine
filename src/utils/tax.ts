/**
 * Utilitários para Cálculo e Mapeamento de IVA em Portugal
 */

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

/**
 * Obtém a taxa de IVA aplicável com base no tipo/categoria do produto
 * - Vinhos (Tinto, Branco, Rosé, Espumante, Cave): 13%
 * - Azeite: 6%
 * - Licores / Destilados: 23%
 * - Outros / Cabazes / Acessórios: 23%
 */
export function getTaxRate(type?: string): number {
    if (!type) return 0.13;
    const lower = type.trim().toLowerCase();

    if (lower.includes('azeite')) {
        return 0.06;
    }

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

    // Por defeito, vinhos (Tinto, Branco, Rosé, Espumante, Cave, etc.) = 13%
    return 0.13;
}

export function formatEuro(value: number): string {
    return '€' + value.toFixed(2).replace('.', ',');
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
