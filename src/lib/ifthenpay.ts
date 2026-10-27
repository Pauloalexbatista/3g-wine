/**
 * IFTHENPAY Integration Service - 3GWINE
 * Suporte para Multibanco e MB WAY com modo de simulação (sandbox)
 */

export interface MultibancoInitResponse {
  success: boolean;
  entity: string;
  reference: string;
  amount: number;
  expiryDate?: string;
  error?: string;
}

export interface MbwayInitResponse {
  success: boolean;
  requestId?: string;
  status?: string;
  message?: string;
  error?: string;
}

export interface MbwayStatusResponse {
  status: 'pending' | 'paid' | 'rejected' | 'expired' | 'error';
  rawCode?: string;
  message?: string;
}

const IS_SANDBOX = process.env.IFTHENPAY_SANDBOX === 'true' || !process.env.IFTHENPAY_MB_KEY;

/**
 * Gera uma referência Multibanco (Entidade, Referência, Valor)
 */
export async function generateMultibanco({
  orderId,
  amount,
  description = '3GWINE Encomenda',
}: {
  orderId: string | number;
  amount: number;
  description?: string;
}): Promise<MultibancoInitResponse> {
  const mbKey = process.env.IFTHENPAY_MB_KEY;
  const entity = process.env.IFTHENPAY_ENTIDADE || '11249';

  // Modo Sandbox / Demonstração
  if (IS_SANDBOX || !mbKey) {
    const randomRef = `${Math.floor(100 + Math.random() * 900)} ${Math.floor(100 + Math.random() * 900)} ${Math.floor(100 + Math.random() * 900)}`;
    const expiry = new Date();
    expiry.setDate(expiry.getDate() + 3);

    return {
      success: true,
      entity: entity,
      reference: randomRef,
      amount: Number(amount.toFixed(2)),
      expiryDate: expiry.toISOString().split('T')[0],
    };
  }

  try {
    const callbackUrl = process.env.NEXT_PUBLIC_SITE_URL 
      ? `${process.env.NEXT_PUBLIC_SITE_URL}/api/payments/ifthenpay-callback`
      : 'https://3gwine.pt/api/payments/ifthenpay-callback';

    const res = await fetch('https://api.ifthenpay.com/multibanco/reference/init', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        mbKey,
        orderId: String(orderId),
        amount: amount.toFixed(2),
        description,
        url: callbackUrl,
      }),
    });

    const data = await res.json();

    if (data.Code === '0' || data.Status === '0' || data.Entity) {
      return {
        success: true,
        entity: data.Entity || entity,
        reference: formatMultibancoReference(data.Reference),
        amount: Number(amount.toFixed(2)),
        expiryDate: data.ExpiryDate,
      };
    }

    return {
      success: false,
      entity: '',
      reference: '',
      amount,
      error: data.Message || 'Erro ao gerar referência Multibanco',
    };
  } catch (err: any) {
    console.error('Erro ao comunicar com a IFTHENPAY (Multibanco):', err);
    return {
      success: false,
      entity: '',
      reference: '',
      amount,
      error: err.message || 'Falha de comunicação',
    };
  }
}

/**
 * Envia um pedido de pagamento MB WAY para o telemóvel do cliente
 */
export async function requestMbway({
  orderId,
  amount,
  mobileNumber,
  description = '3GWINE Encomenda',
}: {
  orderId: string | number;
  amount: number;
  mobileNumber: string;
  description?: string;
}): Promise<MbwayInitResponse> {
  const cleanPhone = mobileNumber.replace(/\D/g, '');
  const mbWayKey = process.env.IFTHENPAY_MBWAY_KEY;

  if (IS_SANDBOX || !mbWayKey) {
    const mockRequestId = `sbx-mbway-${orderId}-${Date.now()}`;
    return {
      success: true,
      requestId: mockRequestId,
      status: '000',
      message: 'Pedido MB WAY simulado com sucesso. Notificação enviada.',
    };
  }

  try {
    const res = await fetch('https://api.ifthenpay.com/spg/payment/mbway', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        mbWayKey,
        orderId: String(orderId),
        amount: amount.toFixed(2),
        mobileNumber: cleanPhone,
        description,
      }),
    });

    const data = await res.json();

    if (data.Status === '000' || data.Code === '0') {
      return {
        success: true,
        requestId: data.RequestId,
        status: data.Status,
        message: data.Message || 'Notificação MB WAY enviada com sucesso.',
      };
    }

    return {
      success: false,
      error: data.Message || 'Erro ao iniciar pagamento MB WAY.',
      status: data.Status,
    };
  } catch (err: any) {
    console.error('Erro ao comunicar com a IFTHENPAY (MB WAY):', err);
    return {
      success: false,
      error: err.message || 'Falha de comunicação MB WAY',
    };
  }
}

/**
 * Consulta o estado de um pedido MB WAY
 */
export async function checkMbwayStatus(requestId: string): Promise<MbwayStatusResponse> {
  const mbWayKey = process.env.IFTHENPAY_MBWAY_KEY;

  if (IS_SANDBOX || !mbWayKey || requestId.startsWith('sbx-mbway-')) {
    return {
      status: 'pending',
      rawCode: '122',
      message: 'Aguardando validação na app MB WAY (Sandbox)',
    };
  }

  try {
    const res = await fetch(
      `https://api.ifthenpay.com/spg/payment/mbway/status?mbWayKey=${encodeURIComponent(
        mbWayKey
      )}&requestId=${encodeURIComponent(requestId)}`
    );
    const data = await res.json();

    if (data.Status === '000') {
      return { status: 'paid', rawCode: data.Status, message: 'Pago com sucesso' };
    }
    if (data.Status === '122') {
      return { status: 'pending', rawCode: data.Status, message: 'Aguardando confirmação na app' };
    }
    if (data.Status === '123') {
      return { status: 'rejected', rawCode: data.Status, message: 'Recusado pelo utilizador' };
    }
    if (data.Status === '124') {
      return { status: 'expired', rawCode: data.Status, message: 'Tempo limite expirado' };
    }

    return { status: 'pending', rawCode: data.Status, message: data.Message };
  } catch (err: any) {
    return { status: 'error', message: err.message };
  }
}

/**
 * Formata referência Multibanco para blocos de 3 dígitos (ex: 123 456 789)
 */
export function formatMultibancoReference(ref: string | number): string {
  const str = String(ref).replace(/\D/g, '');
  if (str.length === 9) {
    return `${str.slice(0, 3)} ${str.slice(3, 6)} ${str.slice(6, 9)}`;
  }
  return str;
}
