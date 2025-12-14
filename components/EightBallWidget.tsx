import React, { useState } from 'react';
import { ShoppingCart } from 'lucide-react';
import { POOL_PACKS } from '../constants';
import { CartItem } from '../types';

interface EightBallWidgetProps {
  onAddToCart: (item: Omit<CartItem, 'cartId'>) => void;
}

export const EightBallWidget: React.FC<EightBallWidgetProps> = ({ onAddToCart }) => {
  const [selected, setSelected] = useState(1); 
  const selectedPack = POOL_PACKS.find(p => p.id === selected) || POOL_PACKS[0];

  const handleBuy = () => {
    onAddToCart({
      id: `8ball-${selectedPack.id}`,
      title: 'Fichas 8 Ball Pool',
      description: `Pacote: ${selectedPack.amount}`,
      price: selectedPack.price,
      image: '🎱',
      type: 'Currency'
    });
  };

  return (
    <div className="bg-[#27272a] rounded-xl border border-[#3f3f46] p-6 flex flex-col justify-between min-h-[300px]">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <div className="w-5 h-5 rounded-full bg-black border border-white flex items-center justify-center text-[10px] font-bold">8</div>
          Conta 8 Ball Pool Fichas
        </h3>
        <span className="text-xs text-gray-400">Entrega Rápida</span>
      </div>

      <div className="grid grid-cols-1 gap-3 mb-4">
        {POOL_PACKS.map((pack) => (
          <div 
            key={pack.id}
            onClick={() => setSelected(pack.id)}
            className={`cursor-pointer rounded-lg p-3 flex items-center justify-between border transition-all ${
              selected === pack.id 
                ? 'bg-[#F5C518]/10 border-[#F5C518]' 
                : 'bg-[#18181b] border-[#3f3f46] hover:border-gray-500'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold border-2 border-white/20">
                🎱
              </div>
              <div className="text-sm font-bold text-white">{pack.amount}</div>
            </div>
            <div className={`text-sm font-bold ${selected === pack.id ? 'text-[#F5C518]' : 'text-gray-400'}`}>
              R$ {pack.price.toFixed(2)}
            </div>
          </div>
        ))}
      </div>

      <button 
        onClick={handleBuy}
        className="w-full py-3 bg-[#F5C518] text-black font-bold rounded-lg hover:bg-[#ffd644] transition-colors flex items-center justify-center gap-2 shadow-lg mt-auto"
      >
        <ShoppingCart className="w-4 h-4" />
        Adicionar ao Carrinho
      </button>
    </div>
  );
};