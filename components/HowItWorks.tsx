import React from 'react';
import { MousePointerClick, MessageCircle, Zap } from 'lucide-react';

export const HowItWorks: React.FC = () => (
  <section className="bg-[#27272a] border-y border-[#3f3f46] py-8">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-8">
        <h2 className="text-xl md:text-2xl font-bold text-white">Como comprar?</h2>
        <p className="text-sm text-gray-400">É super simples, seguro e rápido.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
        <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-[#3f3f46] -z-0 transform -translate-y-6"></div>

        <div className="flex flex-col items-center gap-3 relative z-10">
          <div className="w-12 h-12 bg-[#F5C518] rounded-full flex items-center justify-center text-black shadow-[0_0_15px_rgba(245,197,24,0.4)]">
            <MousePointerClick className="w-6 h-6" />
          </div>
          <div className="text-center bg-[#27272a] px-2">
            <h3 className="text-lg font-bold text-white">1. Escolha</h3>
            <p className="text-xs text-gray-400 max-w-[200px] mx-auto">Selecione o produto ou serviço que você deseja no site.</p>
          </div>
        </div>
        
        <div className="flex flex-col items-center gap-3 relative z-10">
          <div className="w-12 h-12 bg-[#25D366] rounded-full flex items-center justify-center text-white shadow-[0_0_15px_rgba(37,211,102,0.4)]">
            <MessageCircle className="w-6 h-6" />
          </div>
          <div className="text-center bg-[#27272a] px-2">
            <h3 className="text-lg font-bold text-white">2. Chame no Zap</h3>
            <p className="text-xs text-gray-400 max-w-[200px] mx-auto">Clique no botão. Ele abre o WhatsApp já com a mensagem pronta!</p>
          </div>
        </div>

        <div className="flex flex-col items-center gap-3 relative z-10">
          <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white shadow-[0_0_15px_rgba(59,130,246,0.4)]">
            <Zap className="w-6 h-6 fill-white" />
          </div>
          <div className="text-center bg-[#27272a] px-2">
            <h3 className="text-lg font-bold text-white">3. Receba na Hora</h3>
            <p className="text-xs text-gray-400 max-w-[200px] mx-auto">Faça o pagamento via Pix e receba seu acesso imediatamente.</p>
          </div>
        </div>
      </div>
    </div>
  </section>
);