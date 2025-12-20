
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

export interface Order {
  id: string; // our db id
  user_id?: string; // linked user
  payment_id?: string; // mp id
  created_at: string;
  total: number;
  status: 'pending' | 'approved' | 'expired' | 'paid';
  items: CartItem[];
  payment_method: 'pix' | 'card';
  payment_data?: any; // To store QR code etc
}
