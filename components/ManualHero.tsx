import React from 'react';
import { MessageCircle, ShieldCheck, Gamepad2, CreditCard, ChevronRight } from 'lucide-react';
import { openWhatsApp } from '../utils';

export const ManualHero: React.FC = () => {
    const steps = [
        {
            icon: <Gamepad2 className="w-8 h-8 text-[#F5C518]" />,
            title: "1. Escolha",
            desc: "Selecione sua conta ou pacote de fichas ideal."
        },
        {
            icon: <CreditCard className="w-8 h-8 text-[#F5C518]" />,
            title: "2. Pague via Pix",
            desc: "Pagamento instantâneo via QR Code na finalização."
        },
        {
            icon: <MessageCircle className="w-8 h-8 text-[#F5C518]" />,
            title: "3. Solicite sua conta",
            desc: "Após o pagamento confirmado, o acesso ao WhatsApp é liberado para você retirar seu pedido."
        }
    ];

    return (
        <section className="relative pt-32 pb-12 overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-[#18181b]">
                <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#F5C518]/5 to-transparent blur-3xl" />
                <div className="absolute bottom-0 left-0 w-1/3 h-2/3 bg-gradient-to-tr from-purple-900/10 to-transparent blur-3xl" />
            </div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Main Card */}
                <div className="bg-[#27272a] rounded-3xl p-8 md:p-12 border border-[#3f3f46] shadow-2xl relative overflow-hidden group hover:border-[#F5C518]/30 transition-colors">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F5C518]/10 border border-[#F5C518]/20 text-[#F5C518] text-xs font-bold uppercase tracking-wider mb-6">
                        <ShieldCheck className="w-3 h-3" />
                        Entrega Garantida & Automática
                    </div>

                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div className="z-10">
                            <h1 className="text-4xl md:text-5xl font-black text-white leading-tight mb-6">
                                Sua conta dos <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F5C518] to-yellow-600">
                                    sonhos.
                                </span><br />
                                A um clique de distância.
                            </h1>

                            <p className="text-gray-400 text-lg mb-8 leading-relaxed max-w-md">
                                Escolha seu produto, realize o pagamento via Pix e libere seu acesso imediatamente.
                                Nosso sistema identifica seu pagamento e libera a retirada do pedido na hora, com total segurança.
                            </p>

                            <button
                                onClick={() => document.getElementById('products-section')?.scrollIntoView({ behavior: 'smooth' })}
                                className="inline-flex items-center gap-2 bg-[#F5C518] hover:bg-[#ffd644] text-black font-bold px-8 py-4 rounded-xl transition-all shadow-[0_0_20px_rgba(245,197,24,0.3)] hover:scale-105 group"
                            >
                                Ver Ofertas
                                <ChevronRight className="w-5 h-5 text-black group-hover:translate-x-1 transition-transform" />
                            </button>
                        </div>

                        {/* Visual Icon/Element on the Right */}
                        <div className="relative hidden md:flex items-center justify-center">
                            <div className="absolute inset-0 bg-[#F5C518]/20 blur-[100px] rounded-full" />
                            <Gamepad2 className="w-64 h-64 text-[#27272a] drop-shadow-[0_0_15px_rgba(255,255,255,0.1)] -rotate-12" />
                        </div>
                    </div>
                </div>

                {/* Steps Section (Como funciona) */}
                <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
                    {steps.map((step, idx) => (
                        <div key={idx} className="bg-[#27272a]/50 backdrop-blur border border-[#3f3f46] p-6 rounded-2xl flex items-start gap-4 hover:bg-[#27272a] transition-colors">
                            <div className="p-3 bg-[#18181b] rounded-xl border border-[#3f3f46]">
                                {step.icon}
                            </div>
                            <div>
                                <h3 className="text-white font-bold text-lg mb-1">{step.title}</h3>
                                <p className="text-sm text-gray-400 leading-snug">{step.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
