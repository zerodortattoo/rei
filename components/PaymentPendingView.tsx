import React, { useEffect, useState } from 'react';
import { Copy, CheckCircle, Clock, Loader2, PartyPopper } from 'lucide-react';
import { CartItem, PaymentData } from '../types';
import { PaymentService } from '../services/payment';
import { openWhatsApp } from '../utils';

interface PaymentPendingViewProps {
  order: {
      items: CartItem[];
      email: string;
      total: number;
      paymentData: PaymentData;
  };
  onBack: () => void;
}

export const PaymentPendingView: React.FC<PaymentPendingViewProps> = ({ order, onBack }) => {
  const [timeLeft, setTimeLeft] = useState(24 * 60 * 60); 
  const [status, setStatus] = useState<'pending' | 'approved'>('pending');

  // Timer de expiração
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Polling de Status (Verificar se pagou)
  useEffect(() => {
    if (status === 'approved') return;

    const interval = setInterval(async () => {
      try {
        const newStatus = await PaymentService.checkStatus(order.paymentData.id);
        if (newStatus === 'approved') {
            setStatus('approved');
            clearInterval(interval);
        }
      } catch (e) {
        console.error("Erro ao verificar status", e);
      }
    }, 5000); // Verifica a cada 5 segundos

    return () => clearInterval(interval);
  }, [status, order.paymentData.id]);

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(order.paymentData.copyPaste);
    alert('Código Pix copiado!');
  };

  if (status === 'approved') {
      return (
        <div className="max-w-xl mx-auto px-4 py-20 text-center">
            <div className="bg-[#27272a] rounded-2xl border border-green-500/50 p-8 shadow-[0_0_50px_rgba(34,197,94,0.2)]">
                <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-green-500/40">
                    <CheckCircle className="w-10 h-10 text-white" />
                </div>
                <h1 className="text-3xl font-bold text-white mb-4">Pagamento Aprovado!</h1>
                <p className="text-gray-300 mb-8">
                    Recebemos seu Pix. Seu pedido foi processado com sucesso e os dados foram enviados para: <br/>
                    <span className="text-[#F5C518] font-bold">{order.email}</span>
                </p>

                <div className="space-y-4">
                    <button 
                        onClick={() => openWhatsApp(`Olá! Meu pagamento do pedido #${order.paymentData.id} foi aprovado! Pode me ajudar a acessar?`)}
                        className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold py-3 rounded-lg transition-colors flex items-center justify-center gap-2 shadow-lg"
                    >
                        Falar com Suporte Agora
                    </button>
                    <button 
                        onClick={onBack} 
                        className="w-full bg-[#3f3f46] hover:bg-[#52525b] text-white font-bold py-3 rounded-lg transition-colors"
                    >
                        Voltar para Loja
                    </button>
                </div>
            </div>
        </div>
      );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="flex items-center gap-3 mb-2">
        <h1 className="text-2xl font-bold text-white">Aguardando pagamento</h1>
        <Loader2 className="w-5 h-5 text-[#F5C518] animate-spin" />
      </div>
      <p className="text-gray-400 text-sm mb-8">Pedido ID: {order.paymentData.id} • {new Date().toLocaleString()}</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Order Details */}
        <div className="bg-[#27272a] rounded-xl border border-[#3f3f46] p-6 h-fit">
           <div className="mb-6">
             <h3 className="text-gray-400 text-sm mb-2">Produtos</h3>
             <ul className="space-y-2">
               {order.items.map((item, idx) => (
                 <li key={idx} className="text-white font-medium text-sm flex justify-between">
                    <span>{item.title}</span>
                 </li>
               ))}
             </ul>
           </div>
           
           <div className="flex justify-between items-center border-t border-[#3f3f46] pt-4 mb-4">
             <span className="text-gray-400 text-sm">Total</span>
             <span className="text-xl font-bold text-white">R$ {order.total.toFixed(2)}</span>
           </div>

           <div className="mb-4">
             <h3 className="text-gray-400 text-sm mb-1">Email de entrega</h3>
             <p className="text-white font-mono text-sm">{order.email}</p>
           </div>
        </div>

        {/* Payment Area */}
        <div className="space-y-6">
            <div className="bg-[#27272a] rounded-xl border border-[#3f3f46] p-6 text-center">
                <div className="text-sm text-gray-400 mb-2">Tempo restante</div>
                <div className="text-2xl font-bold text-white font-mono mb-6">{formatTime(timeLeft)}</div>
                
                <div className="relative inline-block p-4 bg-white rounded-xl mb-6">
                   <img src={order.paymentData.qrCodeBase64} alt="QR Code Pix" className="w-48 h-48 mx-auto" />
                   <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#3b82f6] p-2 rounded-full shadow-lg">
                      <div className="text-white text-xs font-bold">PIX</div>
                   </div>
                </div>

                <div className="w-full h-px bg-[#3f3f46] mb-6"></div>
                
                <p className="text-sm text-gray-400 mb-2">Ou pague com</p>
                <div className="text-left mb-2">
                    <label className="text-xs text-gray-500 font-bold uppercase">Pix Copia e cola</label>
                    <div className="flex items-center gap-2 mt-1">
                        <div className="flex-1 bg-[#18181b] border border-[#3f3f46] rounded p-2 text-gray-400 text-xs truncate font-mono">
                            {order.paymentData.copyPaste}
                        </div>
                        <button onClick={copyToClipboard} className="p-2 bg-[#3f3f46] hover:bg-[#52525b] rounded text-white transition-colors">
                            <Copy className="w-4 h-4" />
                        </button>
                    </div>
                </div>

                <button 
                  onClick={copyToClipboard}
                  className="w-full bg-[#3b82f6] hover:bg-[#2563eb] text-white font-bold py-3 rounded-lg transition-colors shadow-lg mt-4"
                >
                  Copiar Código Pix
                </button>
            </div>
            
            <div className="bg-[#27272a] rounded-xl border border-blue-500/30 p-6">
                <h3 className="text-white font-bold mb-4">Importante: Como pagar</h3>
                <ul className="space-y-3">
                    <li className="flex gap-3 text-sm text-gray-300">
                        <div className="w-6 h-6 flex-shrink-0 bg-[#3f3f46] rounded flex items-center justify-center">1</div>
                        Abra o app do seu banco.
                    </li>
                    <li className="flex gap-3 text-sm text-gray-300">
                        <div className="w-6 h-6 flex-shrink-0 bg-[#3f3f46] rounded flex items-center justify-center">2</div>
                        Escolha <strong>Pix</strong> e depois <strong>Ler QR Code</strong> ou <strong>Pix Copia e Cola</strong>.
                    </li>
                    <li className="flex gap-3 text-sm text-gray-300">
                        <div className="w-6 h-6 flex-shrink-0 bg-[#3f3f46] rounded flex items-center justify-center">3</div>
                        Ao confirmar, o site atualizará automaticamente.
                    </li>
                </ul>
            </div>
            
            <button onClick={onBack} className="text-gray-500 text-sm hover:text-white underline w-full text-center">
                Cancelar e voltar
            </button>
        </div>
      </div>
    </div>
  );
};