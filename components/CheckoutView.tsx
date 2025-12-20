import React, { useState, useMemo } from 'react';
import { Trash2, Lock, Tag, ShoppingBag, ArrowLeft, Loader2, CreditCard, QrCode } from 'lucide-react';
import { CartItem, PaymentData, CardFormData } from '../types';
import { PaymentService } from '../services/payment';
import { supabase } from '../lib/supabase';

interface CheckoutViewProps {
  cart: CartItem[];
  onRemove: (id: number) => void;
  onPaymentSuccess: (email: string, total: number, paymentData: PaymentData) => void;
  onContinueShopping: () => void;
}

export const CheckoutView: React.FC<CheckoutViewProps> = ({ cart, onRemove, onPaymentSuccess, onContinueShopping }) => {
  const [email, setEmail] = useState('');
  const [confirmEmail, setConfirmEmail] = useState('');
  // Payment is always Pix now
  const [coupon, setCoupon] = useState('');
  const [discount, setDiscount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const subtotal = useMemo(() => cart.reduce((acc, item) => acc + item.price, 0), [cart]);
  const total = Math.max(0, subtotal - discount);

  const handleApplyCoupon = () => {
    if (coupon.trim().toUpperCase() === 'DESCONTO10') {
      setDiscount(subtotal * 0.10); // 10% discount
      alert('Cupom de 10% aplicado com sucesso!');
    } else {
      setDiscount(0);
      alert('Cupom inválido. Tente "DESCONTO10"');
    }
  };

  const handleSubmit = async () => {
    if (!email || !confirmEmail) {
      alert('Por favor, preencha os campos de e-mail.');
      return;
    }
    if (email !== confirmEmail) {
      alert('Os e-mails não conferem.');
      return;
    }

    setIsLoading(true);

    try {
      const paymentData = await PaymentService.createPixPayment(email, total, cart);

      // Save order to Supabase if user is logged in
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        await supabase.from('orders').insert({
          user_id: session.user.id,
          items: cart,
          total: total,
          status: 'pending',
          payment_method: 'pix',
          payment_data: paymentData,
          payment_id: paymentData.id
        });
      }

      onPaymentSuccess(email, total, paymentData);
    } catch (error: any) {
      alert(`Erro no pagamento: ${error.message || 'Tente novamente.'}`);
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center p-4">
        <ShoppingBag className="w-24 h-24 text-gray-700 mb-6" />
        <h2 className="text-2xl font-bold text-white mb-2">Seu carrinho está vazio</h2>
        <p className="text-gray-400 mb-6">Parece que você ainda não adicionou nenhum item.</p>
        <button
          onClick={onContinueShopping}
          className="px-8 py-3 bg-[#F5C518] text-black font-bold rounded-lg hover:bg-[#ffd644] transition-colors"
        >
          Ver Produtos
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <button
        onClick={onContinueShopping}
        className="flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Voltar para loja
      </button>

      <h1 className="text-2xl font-bold text-white mb-2">Carrinho de compras</h1>
      <p className="text-gray-400 mb-8">Nesta página, você encontra os produtos adicionados ao seu carrinho.</p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Payment & Info */}
        <div className="lg:col-span-2 space-y-6">

          {/* Contact Info */}
          <div className="bg-[#27272a] rounded-xl border border-[#3f3f46] p-6">
            <h3 className="text-lg font-bold text-white mb-6 border-b border-[#3f3f46] pb-4">Dados de Contato</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-400 mb-2">Seu e-mail</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="exemplo@email.com"
                  className="w-full bg-[#18181b] border border-[#3f3f46] rounded-lg px-4 py-3 text-white outline-none focus:border-[#F5C518] focus:ring-1 focus:ring-[#F5C518] transition-all"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">Confirme o e-mail</label>
                <input
                  type="email"
                  value={confirmEmail}
                  onChange={(e) => setConfirmEmail(e.target.value)}
                  placeholder="Confirme seu email"
                  className="w-full bg-[#18181b] border border-[#3f3f46] rounded-lg px-4 py-3 text-white outline-none focus:border-[#F5C518] focus:ring-1 focus:ring-[#F5C518] transition-all"
                />
              </div>
            </div>
          </div>

          {/* Payment Method */}
          <div className="bg-[#27272a] rounded-xl border border-[#3f3f46] p-6">
            <h3 className="text-lg font-bold text-white mb-6 border-b border-[#3f3f46] pb-4">Forma de Pagamento</h3>

            <div className="p-4 bg-[#F5C518]/10 border border-[#F5C518] rounded-lg flex items-center gap-3 mb-4">
              <QrCode className="w-6 h-6 text-[#F5C518]" />
              <span className="font-bold text-[#F5C518]">Pix (Aprovação Imediata)</span>
            </div>

            <div className="p-4 bg-[#18181b] border border-[#2dbda5]/30 rounded-lg flex items-center gap-3">
              <div className="w-4 h-4 rounded-full border-[5px] border-[#2dbda5] bg-transparent"></div>
              <span className="text-gray-300 text-sm">
                Pagamento via <strong>Pix</strong> é processado na hora e você recebe seu produto automaticamente.
              </span>
            </div>
          </div>

          {/* Coupon */}
          <div className="bg-[#27272a] rounded-xl border border-[#3f3f46] p-6 flex flex-col sm:flex-row items-center gap-4">
            <div className="p-3 bg-[#18181b] rounded-full">
              <Tag className="w-6 h-6 text-gray-400" />
            </div>
            <div className="flex-1 text-center sm:text-left">
              <h4 className="text-white font-bold">Cupom de desconto</h4>
              <p className="text-xs text-gray-400">Adicione desconto em seu pedido!</p>
            </div>
            <div className="flex gap-2 w-full sm:w-auto">
              <input
                type="text"
                placeholder="CUPOM"
                value={coupon}
                onChange={(e) => setCoupon(e.target.value)}
                className="bg-[#18181b] border border-[#3f3f46] rounded-lg px-3 py-2 text-white outline-none w-full sm:w-24 text-sm uppercase"
              />
              <button
                onClick={handleApplyCoupon}
                className="px-4 py-2 border border-white/20 text-white rounded-lg hover:bg-white/5 text-sm font-medium transition-colors"
              >
                Adicionar
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Order Summary */}
        <div className="space-y-6">
          {/* Cart Items Box */}
          <div className="bg-[#27272a] rounded-xl border border-[#3f3f46] p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white font-bold">Produtos no carrinho</h3>
              <span className="text-xs px-2 py-1 bg-[#18181b] rounded text-gray-400 border border-[#3f3f46]">{cart.length} item(s)</span>
            </div>

            <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
              {cart.map((item) => (
                <div key={item.cartId} className="flex gap-3 bg-[#18181b] p-3 rounded-lg border border-[#3f3f46]">
                  <div className="w-16 h-16 bg-[#27272a] rounded flex items-center justify-center text-2xl flex-shrink-0">
                    {item.image}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-white text-sm font-bold truncate">{item.title}</h4>
                    <p className="text-xs text-gray-400 truncate">{item.description}</p>
                    <div className="flex items-center justify-between mt-2">
                      <div className="text-[#F5C518] font-bold text-sm">R$ {item.price.toFixed(2)}</div>
                      <button
                        onClick={() => onRemove(item.cartId)}
                        className="p-1.5 hover:bg-red-500/10 rounded-md text-gray-500 hover:text-red-500 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Summary Box */}
          <div className="bg-[#27272a] rounded-xl border border-[#3f3f46] p-6">
            <h3 className="text-white font-bold mb-4 border-b border-[#3f3f46] pb-4">Resumo da compra</h3>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Subtotal</span>
                <span className="text-white">R$ {subtotal.toFixed(2)}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-green-400">Desconto</span>
                  <span className="text-green-400">- R$ {discount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Método</span>
                <span className="flex items-center gap-1 text-[#2dbda5]">
                  <div className="w-3 h-3 text-[#2dbda5] rotate-45 transform">💠</div> Pix
                </span>
              </div>
            </div>

            <div className="flex justify-between items-center mb-6 pt-4 border-t border-[#3f3f46]">
              <span className="text-white font-bold text-lg">Total</span>
              <span className="text-white font-bold text-lg">R$ {total.toFixed(2)}</span>
            </div>

            <div className="flex items-start gap-2 mb-4">
              <input type="checkbox" id="terms" className="mt-1" defaultChecked />
              <label htmlFor="terms" className="text-xs text-gray-400">
                Li e concordo com os <a href="#" className="text-[#F5C518] hover:underline">Termos de Serviço</a>
              </label>
            </div>

            <button
              onClick={handleSubmit}
              disabled={isLoading}
              className="w-full bg-[#3b82f6] hover:bg-[#2563eb] disabled:bg-blue-800 disabled:cursor-not-allowed text-white font-bold py-3 rounded-lg transition-colors flex items-center justify-center gap-2 shadow-lg shadow-blue-900/20"
            >
              {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Gerar pagamento Pix'}
            </button>

            <div className="mt-4 flex justify-center text-xs text-gray-500 gap-2">
              <Lock className="w-3 h-3" /> Ambiente seguro
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};