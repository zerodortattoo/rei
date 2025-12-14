import React from 'react';
import { Star } from 'lucide-react';
import { FEATURED_GAMES } from '../constants';
import { openWhatsApp } from '../utils';

export const FeaturedGames: React.FC = () => (
  <section className="py-8 bg-[#18181b]">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex items-center gap-2 mb-6">
        <Star className="text-[#F5C518] w-5 h-5 fill-[#F5C518]" />
        <h2 className="text-2xl font-bold text-white">Verificar Estoque para:</h2>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {FEATURED_GAMES.map((game) => (
          <div
            key={game.id}
            onClick={() => openWhatsApp(`Oi, quero comprar contas ou serviços de ${game.name}. O que tem disponível?`)}
            className="group relative bg-[#27272a] border border-[#3f3f46] rounded-xl p-4 hover:border-[#F5C518] hover:-translate-y-1 transition-all cursor-pointer flex flex-col items-center gap-3"
          >
            <div className="w-12 h-12 rounded-lg bg-[#18181b] flex items-center justify-center text-2xl shadow-inner group-hover:scale-110 transition-transform">
              {game.icon}
            </div>
            <div className="text-center">
              <h3 className="text-sm font-bold text-white group-hover:text-[#F5C518]">{game.name}</h3>
              <p className="text-[10px] text-gray-500 mt-1 uppercase tracking-wide">{game.type}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);