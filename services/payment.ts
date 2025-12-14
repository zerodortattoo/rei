import { PaymentData, CartItem, CardFormData } from '../types';

// Em produção no Netlify, usamos URL relativa que é redirecionada para a Function
// Em desenvolvimento, usa o localhost:3001
const API_BASE_URL = import.meta.env.PROD ? "/api/orders" : "http://localhost:3001/api/orders";

export const PaymentService = {
  createPixPayment: async (email: string, amount: number, items: CartItem[]): Promise<PaymentData> => {
    try {
      const affiliateCode = localStorage.getItem('affiliate_ref');

      const response = await fetch(API_BASE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          paymentMethod: 'pix',
          email,
          total: amount,
          items,
          affiliateCode // Envia o código de afiliado
        })
      });

      if (!response.ok) {
        throw new Error('Erro ao criar pagamento Pix');
      }

      const data = await response.json();
      return {
        id: data.id,
        qrCodeBase64: data.qrCodeBase64,
        copyPaste: data.copyPaste,
        expiresAt: new Date(data.expiresAt),
        status: data.status
      };

    } catch (error) {
      console.error("Erro Pix Service:", error);
      throw error;
    }
  },

  createCardPayment: async (email: string, amount: number, items: CartItem[], cardData: CardFormData): Promise<PaymentData> => {
    try {
      const affiliateCode = localStorage.getItem('affiliate_ref');

      const response = await fetch(API_BASE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          paymentMethod: 'card',
          email,
          total: amount,
          items,
          cardData,
          affiliateCode // Envia o código de afiliado
        })
      });

      if (!response.ok) {
        throw new Error('Erro ao processar cartão');
      }

      const data = await response.json();
      return {
        id: data.id,
        expiresAt: new Date(data.expiresAt),
        status: data.status
      };

    } catch (error) {
      console.error("Erro Card Service:", error);
      throw error;
    }
  },

  checkStatus: async (paymentId: string): Promise<'pending' | 'approved'> => {
    try {
      const response = await fetch(`${API_BASE_URL}/${paymentId}`, {
        method: 'GET'
      });

      if (!response.ok) return 'pending';
      const data = await response.json();
      return data.status === 'approved' ? 'approved' : 'pending';
    } catch (error) {
      return 'pending';
    }
  }
};