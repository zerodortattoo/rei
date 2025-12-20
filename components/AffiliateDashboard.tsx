
import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { DollarSign, Share2, LogOut, Copy, Check, Save } from 'lucide-react';

interface AffiliateDashboardProps {
    session: any;
    onLogout: () => void;
}

export const AffiliateDashboard: React.FC<AffiliateDashboardProps> = ({ session, onLogout }) => {
    const [profile, setProfile] = useState<any>(null);
    const [orders, setOrders] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [pixKey, setPixKey] = useState('');
    const [saving, setSaving] = useState(false);
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        fetchData();
    }, [session]);

    const fetchData = async () => {
        if (!session?.user) return;

        // 1. Get Profile
        const { data: profileData } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .single();

        if (profileData) {
            setProfile(profileData);
            setPixKey(profileData.pix_key || '');

            // 2. Get Orders
            const { data: ordersData } = await supabase
                .from('orders')
                .select('*')
                .eq('affiliate_code', profileData.affiliate_code)
                .order('created_at', { ascending: false });

            if (ordersData) {
                setOrders(ordersData);
            }
        }
        setLoading(false);
    };

    const handleSavePix = async () => {
        setSaving(true);
        await supabase
            .from('profiles')
            .update({ pix_key: pixKey })
            .eq('id', session.user.id);
        setSaving(false);
        alert('Chave Pix salva!');
    };

    const copyLink = () => {
        if (!profile?.affiliate_code) return;
        const link = `${window.location.origin}?ref=${profile.affiliate_code}`;
        navigator.clipboard.writeText(link);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    if (loading) return <div className="p-8 text-white">Carregando painel...</div>;

    const totalEarned = orders.reduce((acc, order) => {
        return order.status === 'approved' ? acc + (order.commission_amount || 0) : acc;
    }, 0);

    const pendingEarned = orders.reduce((acc, order) => {
        return order.status === 'pending' ? acc + (order.commission_amount || 0) : acc;
    }, 0);

    return (
        <div className="min-h-screen bg-[#18181b] text-white p-4 md:p-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex justify-between items-center mb-12">
                    <h1 className="text-3xl font-bold">Painel do Afiliado</h1>
                    <button
                        onClick={onLogout}
                        className="flex items-center gap-2 bg-[#27272a] hover:bg-[#3f3f46] px-4 py-2 rounded-lg transition-colors text-sm"
                    >
                        <LogOut className="w-4 h-4" /> Sair
                    </button>
                </div>

                {/* Greeting & Link */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                    <div className="bg-[#27272a] p-6 rounded-2xl border border-[#3f3f46]">
                        <h2 className="text-xl font-bold mb-4">Olá, {profile?.affiliate_code}! 👋</h2>
                        <p className="text-gray-400 mb-6">Compartilhe seu link exclusivo para começar a lucrar.</p>

                        <div className="flex gap-2 bg-[#18181b] p-3 rounded-lg border border-[#3f3f46]">
                            <code className="flex-1 text-green-400 truncate self-center">
                                {window.location.origin}?ref={profile?.affiliate_code}
                            </code>
                            <button
                                onClick={copyLink}
                                className="p-2 hover:bg-white/10 rounded transition-colors text-gray-400 hover:text-white"
                            >
                                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                            </button>
                        </div>
                    </div>

                    <div className="bg-[#27272a] p-6 rounded-2xl border border-[#3f3f46]">
                        <h2 className="text-xl font-bold mb-4">Configurar Recebimento</h2>
                        <div className="flex gap-2">
                            <input
                                type="text"
                                placeholder="Sua Chave Pix (CPF, Email...)"
                                value={pixKey}
                                onChange={e => setPixKey(e.target.value)}
                                className="flex-1 bg-[#18181b] border border-[#3f3f46] rounded-lg px-4 py-2 outline-none focus:border-[#F5C518]"
                            />
                            <button
                                onClick={handleSavePix}
                                disabled={saving}
                                className="bg-[#F5C518] text-black font-bold px-4 py-2 rounded-lg hover:bg-[#ffd644] flex items-center gap-2"
                            >
                                {saving ? '...' : <><Save className="w-4 h-4" /> Salvar</>}
                            </button>
                        </div>
                        <p className="text-xs text-gray-500 mt-2">Pagamentos são feitos manualmente para esta chave.</p>
                    </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    <div className="bg-[#18181b] p-6 rounded-2xl border border-[#3f3f46]">
                        <div className="text-gray-400 mb-2 font-medium">Comissão Disponível</div>
                        <div className="text-4xl font-bold text-[#F5C518]">R$ {totalEarned.toFixed(2)}</div>
                    </div>
                    <div className="bg-[#18181b] p-6 rounded-2xl border border-[#3f3f46]">
                        <div className="text-gray-400 mb-2 font-medium">Pendente (Aguardando Pagto)</div>
                        <div className="text-4xl font-bold text-gray-500">R$ {pendingEarned.toFixed(2)}</div>
                    </div>
                    <div className="bg-[#18181b] p-6 rounded-2xl border border-[#3f3f46]">
                        <div className="text-gray-400 mb-2 font-medium">Total de Vendas</div>
                        <div className="text-4xl font-bold text-white">{orders.length}</div>
                    </div>
                </div>

                {/* Recent Sales Table */}
                <h3 className="text-xl font-bold mb-6">Histórico de Vendas</h3>
                <div className="bg-[#27272a] rounded-2xl border border-[#3f3f46] overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-[#3f3f46]/50 text-gray-400 text-sm">
                                <tr>
                                    <th className="p-4">Data</th>
                                    <th className="p-4">Valor Venda</th>
                                    <th className="p-4">Sua Comissão</th>
                                    <th className="p-4">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#3f3f46]">
                                {orders.length === 0 ? (
                                    <tr>
                                        <td colSpan={4} className="p-8 text-center text-gray-500">
                                            Nenhuma venda registrada ainda.
                                        </td>
                                    </tr>
                                ) : (
                                    orders.map((order) => (
                                        <tr key={order.id} className="hover:bg-[#3f3f46]/30 transition-colors">
                                            <td className="p-4 text-gray-300">
                                                {new Date(order.created_at).toLocaleDateString()}
                                            </td>
                                            <td className="p-4 text-white font-medium">
                                                R$ {order.total_amount?.toFixed(2)}
                                            </td>
                                            <td className="p-4 text-[#F5C518] font-bold">
                                                + R$ {order.commission_amount?.toFixed(2)}
                                            </td>
                                            <td className="p-4">
                                                <span className={`px-2 py-1 rounded text-xs font-bold ${order.status === 'approved'
                                                        ? 'bg-green-500/20 text-green-500'
                                                        : 'bg-yellow-500/20 text-yellow-500'
                                                    }`}>
                                                    {order.status === 'approved' ? 'APROVADO' : 'PENDENTE'}
                                                </span>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};
