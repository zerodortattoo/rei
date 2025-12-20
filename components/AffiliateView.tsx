import React from 'react';
import { ArrowLeft, Share2, TrendingUp, DollarSign } from 'lucide-react';

interface AffiliateViewProps {
    onBack: () => void;
    onRegisterClick?: () => void;
    onLoginClick?: () => void;
}

export const AffiliateView: React.FC<AffiliateViewProps> = ({ onBack, onRegisterClick, onLoginClick }) => {
    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 min-h-[60vh]">
            <button
                onClick={onBack}
                className="flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors"
            >
                <ArrowLeft className="w-4 h-4" /> Voltar para loja
            </button>

            <div className="bg-[#27272a] rounded-2xl border border-[#3f3f46] overflow-hidden">
                <div className="p-8 md:p-12 text-center border-b border-[#3f3f46]">
                    <div className="w-16 h-16 bg-[#F5C518]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Share2 className="w-8 h-8 text-[#F5C518]" />
                    </div>
                    <h1 className="text-3xl font-bold text-white mb-4">Programa de Afiliados</h1>
                    <p className="text-gray-400 max-w-lg mx-auto text-lg mb-8">
                        Indique nossos produtos e ganhe <span className="text-[#F5C518] font-bold">20% de comissão</span> em cada venda realizada pelo seu link!
                    </p>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto mb-8">
                        <button
                            onClick={onRegisterClick}
                            className="bg-[#F5C518] text-black font-bold px-8 py-4 rounded-xl hover:bg-[#ffd644] transition-all shadow-[0_0_20px_rgba(245,197,24,0.3)] hover:scale-105 flex-1"
                        >
                            Quero Ser Afiliado
                        </button>
                        <button
                            onClick={onLoginClick}
                            className="bg-[#18181b] text-white font-bold px-8 py-4 rounded-xl border border-[#3f3f46] hover:bg-[#3f3f46] transition-all flex-1"
                        >
                            Já tenho conta
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left max-w-3xl mx-auto mt-12">
                        <div className="bg-[#18181b] p-5 rounded-xl border border-[#3f3f46]">
                            <div className="text-[#F5C518] font-bold text-lg mb-2 flex items-center gap-2">
                                <span className="bg-[#F5C518]/10 w-6 h-6 rounded flex items-center justify-center text-xs">1</span>
                                Crie sua conta
                            </div>
                            <p className="text-gray-400 text-sm">Cadastro rápido e gratuito. Você terá acesso ao seu painel exclusivo.</p>
                        </div>
                        <div className="bg-[#18181b] p-5 rounded-xl border border-[#3f3f46]">
                            <div className="text-[#F5C518] font-bold text-lg mb-2 flex items-center gap-2">
                                <span className="bg-[#F5C518]/10 w-6 h-6 rounded flex items-center justify-center text-xs">2</span>
                                Divulgue
                            </div>
                            <p className="text-gray-400 text-sm">Pegue seu link de afiliado e compartilhe nas redes sociais ou com amigos.</p>
                        </div>
                        <div className="bg-[#18181b] p-5 rounded-xl border border-[#3f3f46]">
                            <div className="text-[#F5C518] font-bold text-lg mb-2 flex items-center gap-2">
                                <span className="bg-[#F5C518]/10 w-6 h-6 rounded flex items-center justify-center text-xs">3</span>
                                Receba
                            </div>
                            <p className="text-gray-400 text-sm">Acompanhe suas vendas em tempo real e receba seus lucros via Pix.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
