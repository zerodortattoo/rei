import React from 'react';
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';

const FAQS = [
    {
        question: "É seguro?",
        answer: "Contas são adquiridas de forma legítima e verificadas antes da venda. Oferecemos suporte pós-compra para qualquer imprevisto."
    },
    {
        question: "E se a conta tiver problema?",
        answer: "Substituição ou reembolso dentro de 24h, sem burocracia."
    },
    {
        question: "Vocês vendem hacks ou cheats?",
        answer: "Não. Vendemos contas e itens. Nenhum software de trapaça."
    }
];

export const FAQSection: React.FC = () => {
    const [openIndex, setOpenIndex] = React.useState<number | null>(0);

    return (
        <section className="py-16 bg-[#18181b] border-t border-[#3f3f46]">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-2xl font-bold text-white uppercase tracking-wider mb-2">FAQ RÁPIDO</h2>
                    <p className="text-gray-400">Tirando suas dúvidas antes de você farmar mais 1 hora à toa.</p>
                </div>

                <div className="space-y-4">
                    {FAQS.map((faq, index) => (
                        <div
                            key={index}
                            className="bg-[#27272a] border border-[#3f3f46] rounded-xl overflow-hidden transition-all duration-300 hover:border-[#F5C518]/50"
                        >
                            <button
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                className="w-full flex items-center justify-between p-4 md:p-6 text-left"
                            >
                                <span className="text-lg font-bold text-white flex gap-3 items-center">
                                    <HelpCircle className="w-5 h-5 text-[#F5C518]" />
                                    {faq.question}
                                </span>
                                {openIndex === index ? (
                                    <ChevronUp className="w-5 h-5 text-gray-400" />
                                ) : (
                                    <ChevronDown className="w-5 h-5 text-gray-400" />
                                )}
                            </button>

                            {openIndex === index && (
                                <div className="px-6 pb-6 text-gray-300 text-sm leading-relaxed border-t border-[#3f3f46]/50 pt-4">
                                    {faq.answer}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
