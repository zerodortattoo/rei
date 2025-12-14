
export interface Game {
  id: string;
  name: string;
  icon: string;
  type: string;
}

export interface Product {
  id: number;
  title: string;
  price: string | number;
  image: string;
  type: string;
}

export interface PoolPack {
  id: number;
  amount: string;
  price: number;
}

export interface CartItem {
  cartId: number;
  id: string | number;
  title: string;
  description?: string;
  price: number;
  image: string;
  type: string;
}

export interface PaymentData {
  id: string;
  qrCodeBase64?: string;
  copyPaste?: string;
  expiresAt: Date;
  status: 'pending' | 'approved' | 'expired';
}

export interface CardFormData {
  cardNumber: string;
  cardName: string;
  expiryDate: string;
  cvv: string;
  cpf: string;
}
