import React from 'react';
import { openWhatsApp } from '../utils';

interface FooterProps {
  onAffiliateClick?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onAffiliateClick }) => (
  <footer className="bg-[#18181b] border-t border-[#27272a] py-12">
    <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-[#F5C518] rounded flex items-center justify-center font-bold text-black">R</div>
        <span className="text-white font-bold">Rei das Contas</span>
      </div>

      <div className="flex gap-6 text-sm text-gray-500">
        <a href="#" className="hover:text-[#F5C518]">Como funciona</a>
        <button onClick={onAffiliateClick} className="hover:text-[#F5C518]">Trabalhe conosco</button>
        <a
          onClick={() => openWhatsApp("Oi, preciso de suporte.")}
          className="hover:text-[#F5C518] cursor-pointer"
        >
          Suporte
        </a>
      </div>

      <p className="text-xs text-gray-600">© 2024 Rei das Contas. Negócios Digitais.</p>
    </div>
  </footer>
);