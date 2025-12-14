import React from 'react';
import { ShieldCheck, MessageCircle, Gamepad2 } from 'lucide-react';
import { openWhatsApp } from '../utils';

export const Hero: React.FC = () => (
  <section className="relative bg-[#18181b] overflow-hidden py-8">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-[#27272a] to-[#1c1c20] border border-[#3f3f46] shadow-2xl">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#F5C518]/10 via-transparent to-transparent opacity-50 blur-3xl"></div>
        
        <div className="relative z-10 px-6 py-10 md:py-14 md:px-12 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-lg space-y-6 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F5C518]/10 border border-[#F5C518]/20 text-[#F5C518] text-xs font-bold uppercase tracking-wider">
              <ShieldCheck className="w-3 h-3" />
              Compra Segura via WhatsApp
            </div>
            <h1 className="text-3xl md:text-5xl font-extrabold text-white leading-tight">
              Sua conta dos sonhos.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F5C518] to-[#fde047]">
                A um clique de distância.
              </span>
            </h1>
            <p className="text-gray-400 text-base md:text-lg">
              Negocie diretamente comigo no WhatsApp. Sem taxas escondidas, sem burocracia. Entrega imediata para Contas Roblox e Fichas 8 Ball Pool.
            </p>
            <div className="flex flex-wrap justify-center md:justify-start gap-4">
              <button 
                onClick={() => openWhatsApp("Oi, quero ver o catálogo completo de produtos.")}
                className="px-6 py-3 bg-[#F5C518] hover:bg-[#ffd644] text-black font-bold rounded-lg transition-all flex items-center gap-2"
              >
                Chamar no Zap
                <MessageCircle className="w-4 h-4 fill-black" />
              </button>
            </div>
          </div>
          
          <div className="hidden md:block relative">
             <div className="w-64 h-64 bg-[#F5C518]/20 rounded-full blur-3xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
             <Gamepad2 className="relative w-48 h-48 text-gray-700/50 rotate-12" />
          </div>
        </div>
      </div>
    </div>
  </section>
);