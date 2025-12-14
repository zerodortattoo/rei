import React from 'react';
import { TrendingUp, Globe, ArrowRight } from 'lucide-react';

export const SocialMediaSecret: React.FC = () => (
  <section className="py-8 bg-gradient-to-r from-[#18181b] via-[#27272a] to-[#18181b] border-y border-[#3f3f46] my-4">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
      <div className="flex items-center gap-4">
        <div className="w-14 h-14 bg-[#7c3aed] rounded-full flex items-center justify-center animate-pulse shadow-[0_0_20px_rgba(124,58,237,0.5)]">
          <TrendingUp className="w-7 h-7 text-white" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-white">Quer dominar as redes sociais também?</h3>
          <p className="text-sm text-gray-400 max-w-md">
            Descubra a ferramenta secreta que grandes influenciadores usam para crescer rápido no Instagram e TikTok.
          </p>
        </div>
      </div>
      
      <a 
        href="https://www.afontedoengajamento.com.br" 
        target="_blank" 
        rel="noopener noreferrer"
        className="px-6 py-3 bg-[#7c3aed] hover:bg-[#6d28d9] text-white font-bold rounded-lg transition-all flex items-center gap-2 border border-[#7c3aed] shadow-lg hover:shadow-[#7c3aed]/50 transform hover:-translate-y-1"
      >
        <Globe className="w-4 h-4" />
        Acessar A Fonte do Engajamento
        <ArrowRight className="w-4 h-4" />
      </a>
    </div>
  </section>
);