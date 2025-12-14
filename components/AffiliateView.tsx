
import React, { useState } from 'react';
import { ArrowLeft, Share2, Copy, Check } from 'lucide-react';

interface AffiliateViewProps {
    onBack: () => void;
}

export const AffiliateView: React.FC<AffiliateViewProps> = ({ onBack }) => {
    const [name, setName] = useState('');
    const [generatedLink, setGeneratedLink] = useState('');
    const [copied, setCopied] = useState(false);

    const generateLink = () => {
        if (!name.trim()) return;
        const cleanName = name.trim().replace(/\s+/g, '-').toLowerCase();
        const baseUrl = window.location.origin;
        const link = `${baseUrl}?ref=${cleanName}`;
        setGeneratedLink(link);
        setCopied(false);
    };

    const copyToClipboard = () => {
        if (!generatedLink) return;
        navigator.clipboard.writeText(generatedLink);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

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
                        Crie seu link personalizado, compartilhe com seus amigos ou seguidores e ganhe <span className="text-[#F5C518] font-bold">20% de comissão</span> por cada venda realizada!
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left max-w-3xl mx-auto">
                        <div className="bg-[#18181b] p-5 rounded-xl border border-[#3f3f46]">
                            <div className="text-[#F5C518] font-bold text-lg mb-2">1. Crie</div>
                            <p className="text-gray-400 text-sm">Gere seu link único com seu nome abaixo. É rápido e gratuito.</p>
                        </div>
                        <div className="bg-[#18181b] p-5 rounded-xl border border-[#3f3f46]">
                            <div className="text-[#F5C518] font-bold text-lg mb-2">2. Divulgue</div>
                            <p className="text-gray-400 text-sm">Envie para amigos ou poste nas redes sociais.</p>
                        </div>
                        <div className="bg-[#18181b] p-5 rounded-xl border border-[#3f3f46]">
                            <div className="text-[#F5C518] font-bold text-lg mb-2">3. Receba</div>
                            <p className="text-gray-400 text-sm">Entre em contato via WhatsApp para receber seus pagamentos via Pix.</p>
                        </div>
                    </div>
                </div>

                <div className="p-8 md:p-12 bg-[#18181b]">
                    <div className="max-w-md mx-auto space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-2">
                                Qual seu nome ou nick?
                            </label>
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="ex: joao-gamer"
                                    className="flex-1 bg-[#27272a] border border-[#3f3f46] rounded-lg px-4 py-3 text-white outline-none focus:border-[#F5C518] transition-all"
                                    onKeyDown={(e) => e.key === 'Enter' && generateLink()}
                                />
                                <button
                                    onClick={generateLink}
                                    className="bg-[#F5C518] text-black font-bold px-6 py-3 rounded-lg hover:bg-[#ffd644] transition-colors"
                                >
                                    Gerar
                                </button>
                            </div>
                        </div>

                        {generatedLink && (
                            <div className="animate-in fade-in slide-in-from-top-4">
                                <label className="block text-sm font-medium text-green-500 mb-2">
                                    Seu link de afiliado está pronto!
                                </label>
                                <div className="bg-[#27272a] border border-green-500/30 rounded-lg p-1 pl-4 flex items-center justify-between group">
                                    <span className="text-gray-300 truncate mr-2 font-mono text-sm">
                                        {generatedLink}
                                    </span>
                                    <button
                                        onClick={copyToClipboard}
                                        className="p-3 bg-green-500/10 hover:bg-green-500/20 text-green-500 rounded-md transition-colors"
                                        title="Copiar link"
                                    >
                                        {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                                    </button>
                                </div>
                                <p className="text-xs text-gray-500 mt-2 text-center">
                                    Compartilhe este link. As vendas vindas dele serão rastreadas.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
