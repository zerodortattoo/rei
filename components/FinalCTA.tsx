import React from 'react';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { openWhatsApp } from '../utils';

export const FinalCTA: React.FC = () => {
    return (
        <section className="py-20 bg-gradient-to-b from-[#18181b] to-black border-t border-[#3f3f46] text-center px-4 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/10 via-transparent to-transparent pointer-events-none" />

            <div className="relative z-10 max-w-4xl mx-auto">
                <h2 className="text-3xl md:text-5xl font-black text-white mb-12 uppercase italic">
                    Duas opções
                </h2>

                <div className="grid md:grid-cols-2 gap-8 mb-12">
                    <div className="bg-[#27272a]/50 p-8 rounded-2xl border border-red-900/30 hover:border-red-500/50 transition-colors">
                        <div className="text-5xl mb-6 grayscale opacity-50">🚜</div>
                        <h3 className="text-xl font-bold text-gray-400 mb-4">Opção 1</h3>
                        <p className="text-gray-500 text-lg">
                            Fechar a página e voltar a farmar por semanas. Apanhar de quem tem conta melhor.
                        </p>
                    </div>

                    <div className="bg-[#27272a] p-8 rounded-2xl border border-[#F5C518] shadow-[0_0_30px_rgba(245,197,24,0.15)] transform md:-translate-y-4">
                        <div className="text-5xl mb-6">🚀</div>
                        <h3 className="text-xl font-bold text-[#F5C518] mb-4">Opção 2</h3>
                        <p className="text-white text-lg">
                            Pegar o atalho agora e entrar no jogo como veterano. Respeito imediato.
                        </p>
                    </div>
                </div>

                <div className="flex flex-col items-center gap-6">
                    <button
                        onClick={() => document.getElementById('products-section')?.scrollIntoView({ behavior: 'smooth' })}
                        className="inline-flex items-center gap-3 bg-[#F5C518] text-black font-black text-xl px-12 py-6 rounded-2xl hover:bg-[#ffd644] hover:scale-105 transition-all shadow-[0_0_25px_rgba(245,197,24,0.4)]"
                    >
                        ESCOLHER MINHA CONTA AGORA
                        <ArrowRight className="w-6 h-6" />
                    </button>

                    <div className="text-gray-400 mt-8">
                        <p className="mb-2 font-bold">Dúvidas ou pedido especial?</p>
                        <button
                            onClick={() => openWhatsApp("Oi, tenho uma dúvida/pedido especial.")}
                            className="inline-flex items-center gap-2 text-[#25D366] hover:text-[#20bd5a] hover:underline transition-colors font-medium"
                        >
                            <MessageCircle className="w-4 h-4" />
                            🟢 Suporte no WhatsApp — resposta em minutos, não em dias.
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};
