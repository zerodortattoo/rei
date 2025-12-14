import React, { useMemo } from 'react';
import { Gamepad2 } from 'lucide-react';
import { FEATURED_GAMES, ALL_GAME_NAMES } from '../constants';
import { openWhatsApp } from '../utils';

interface SearchResultsProps {
  query: string;
}

export const SearchResults: React.FC<SearchResultsProps> = ({ query }) => {
  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    const allNames = new Set([
      ...FEATURED_GAMES.map(g => g.name),
      ...ALL_GAME_NAMES
    ]);

    return Array.from(allNames)
      .filter(name => name.toLowerCase().includes(q))
      .sort();
  }, [query]);

  return (
    <section className="py-8 bg-[#18181b] min-h-[50vh]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-xl font-bold text-white mb-6">
          Resultados para "{query}": <span className="text-[#F5C518]">{filtered.length}</span> encontrados
        </h2>
        
        {filtered.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {filtered.map((name, idx) => (
              <div 
                key={idx}
                onClick={() => openWhatsApp(`Oi, quero comprar algo sobre o jogo: ${name}.`)}
                className="bg-[#27272a] hover:bg-[#3f3f46] p-3 rounded-lg border border-[#3f3f46] hover:border-[#F5C518] cursor-pointer transition-colors flex items-center gap-3"
              >
                <Gamepad2 className="w-5 h-5 text-gray-500" />
                <span className="text-sm text-gray-200 font-medium truncate">{name}</span>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-400">Não encontramos este jogo na lista.</p>
            <button 
              onClick={() => openWhatsApp(`Oi, estou procurando o jogo: ${query}, vocês conseguem arranjar?`)}
              className="mt-4 text-[#F5C518] hover:underline"
            >
              Perguntar no WhatsApp se conseguimos arranjar
            </button>
          </div>
        )}
      </div>
    </section>
  );
};