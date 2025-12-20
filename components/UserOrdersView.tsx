import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Order } from '../types';
import { Package, Clock, CheckCircle, XCircle, ArrowLeft, ExternalLink, Copy } from 'lucide-react';

interface UserOrdersViewProps {
    onBack: () => void;
}

export const UserOrdersView: React.FC<UserOrdersViewProps> = ({ onBack }) => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const { data: { user } } = await supabase.auth.getUser();
                if (!user) return;

                const { data, error } = await supabase
                    .from('orders')
                    .select('*')
                    .eq('user_id', user.id)
                    .order('created_at', { ascending: false });

                if (error) throw error;
                setOrders(data || []);
            } catch (error) {
                console.error('Erro ao buscar pedidos:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'approved': return 'text-green-400 bg-green-400/10 border-green-400/20';
            case 'pending': return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20';
            case 'expired': return 'text-red-400 bg-red-400/10 border-red-400/20';
            default: return 'text-gray-400 bg-gray-400/10 border-gray-400/20';
        }
    };

    const getStatusText = (status: string) => {
        switch (status) {
            case 'approved': return 'Aprovado';
            case 'pending': return 'Pendente';
            case 'expired': return 'Expirado';
            default: return status;
        }
    };

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        alert('Copiado para a área de transferência!');
    };

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <button
                onClick={onBack}
                className="flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition-colors"
            >
                <ArrowLeft className="w-4 h-4" /> Voltar para loja
            </button>

            <h1 className="text-2xl font-bold text-white mb-2">Meus Pedidos</h1>
            <p className="text-gray-400 mb-8">Acompanhe o status das suas compras.</p>

            {loading ? (
                <div className="flex justify-center py-12">
                    <div className="w-8 h-8 border-4 border-[#F5C518] border-t-transparent rounded-full animate-spin"></div>
                </div>
            ) : orders.length === 0 ? (
                <div className="text-center py-12 bg-[#27272a] rounded-xl border border-[#3f3f46]">
                    <Package className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-white mb-2">Nenhum pedido encontrado</h3>
                    <p className="text-gray-400">Você ainda não realizou nenhuma compra conosco.</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {orders.map((order) => (
                        <div key={order.id} className="bg-[#27272a] rounded-xl border border-[#3f3f46] overflow-hidden">
                            {/* Header */}
                            <div className="p-4 border-b border-[#3f3f46] flex flex-wrap items-center justify-between gap-4 bg-[#18181b]/50">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-[#18181b] rounded-lg">
                                        <Package className="w-5 h-5 text-[#F5C518]" />
                                    </div>
                                    <div>
                                        <div className="text-xs text-gray-400">Pedido #{order.id.slice(0, 8)}</div>
                                        <div className="text-white font-bold">
                                            {new Date(order.created_at).toLocaleDateString('pt-BR')} às {new Date(order.created_at).toLocaleTimeString('pt-BR')}
                                        </div>
                                    </div>
                                </div>
                                <div className={`px-3 py-1 rounded-full text-xs font-bold border flex items-center gap-1.5 ${getStatusColor(order.status)}`}>
                                    {order.status === 'approved' && <CheckCircle className="w-3 h-3" />}
                                    {order.status === 'pending' && <Clock className="w-3 h-3" />}
                                    {order.status === 'expired' && <XCircle className="w-3 h-3" />}
                                    {getStatusText(order.status)}
                                </div>
                            </div>

                            {/* Items */}
                            <div className="p-4">
                                {order.items.map((item, index) => (
                                    <div key={index} className="flex items-center gap-3 mb-3 last:mb-0">
                                        <div className="w-10 h-10 bg-[#18181b] rounded flex items-center justify-center text-lg shadow-sm border border-[#3f3f46]">
                                            {item.image}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="text-sm font-bold text-white truncate">{item.title}</div>
                                            <div className="text-xs text-gray-400">R$ {item.price.toFixed(2)}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Pix Copy/Paste if pending */}
                            {order.status === 'pending' && order.payment_method === 'pix' && order.payment_data?.copyPaste && (
                                <div className="px-4 py-3 bg-[#F5C518]/5 border-t border-[#F5C518]/10">
                                    <div className="text-xs text-[#F5C518] font-bold mb-2 uppercase tracking-wide">Pagamento Pendente</div>
                                    <div className="flex gap-2">
                                        <input
                                            readOnly
                                            value={order.payment_data.copyPaste}
                                            className="flex-1 bg-[#18181b] border border-[#3f3f46] rounded px-3 py-2 text-xs text-gray-300 outline-none"
                                        />
                                        <button
                                            onClick={() => copyToClipboard(order.payment_data.copyPaste)}
                                            className="bg-[#F5C518] hover:bg-[#ffd644] text-black px-3 rounded font-bold text-xs flex items-center gap-1 transition-colors"
                                        >
                                            <Copy className="w-3 h-3" /> Copiar
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* Footer */}
                            <div className="bg-[#18181b] px-4 py-3 flex items-center justify-between">
                                <span className="text-sm text-gray-400">Total</span>
                                <span className="text-lg font-bold text-white">R$ {order.total.toFixed(2)}</span>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
