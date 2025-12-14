import React, { useState } from 'react';
import { Sword, ShoppingCart } from 'lucide-react';
import { ROBLOX_STYLES } from '../constants';
import { CartItem } from '../types';

interface RobloxWidgetProps {
  onAddToCart: (item: Omit<CartItem, 'cartId'>) => void;
}

export const RobloxWidget: React.FC<RobloxWidgetProps> = ({ onAddToCart }) => {
  const [selectedStyle, setSelectedStyle] = useState(ROBLOX_STYLES[0]);
  const price = 15.00;

  const handleHire = () => {
    onAddToCart({
      id: 'roblox-account',
      title: 'Conta Roblox',
      description: `Estilo: ${selectedStyle}`,
      price: price,
      image: '🧱',
      type: 'Account'
    });
  };

  return (
    <div className="bg-[#27272a] rounded-xl border border-[#3f3f46] p-6 relative overflow-hidden flex flex-col justify-between min-h-[300px]">
      <div>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Sword className="text-[#F5C518] w-5 h-5" />
            CONTAS ROBLOX (+50 TIPOS)
          </h3>
          <span className="text-xs font-mono text-green-400 bg-green-400/10 px-2 py-1 rounded">ESTOQUE</span>
        </div>

        <p className="text-xs text-gray-400 mb-4">
          Escolha o estilo de luta da sua conta (Godhuman, Sanguine e mais):
        </p>

        <div className="space-y-4">
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-gray-500 uppercase">Estilo de Luta / Tipo</label>
            <select 
              value={selectedStyle}
              onChange={(e) => setSelectedStyle(e.target.value)}
              className="w-full bg-[#18181b] text-white border border-[#3f3f46] rounded-lg p-3 text-sm outline-none focus:border-[#F5C518]"
            >
              {ROBLOX_STYLES.map((style, i) => <option key={i} value={style}>{style}</option>)}
            </select>
          </div>
        </div>
      </div>

      <div className="bg-[#18181b] rounded-lg p-4 flex items-center justify-between border border-[#3f3f46] mt-auto">
        <div>
          <p className="text-gray-500 text-[10px] uppercase font-bold">Oferta Especial</p>
          <p className="text-xl font-bold text-[#F5C518]">R$ {price.toFixed(2)}</p>
        </div>
        <button 
          onClick={handleHire}
          className="bg-[#F5C518] hover:bg-[#ffd644] text-black font-bold py-2 px-4 rounded-md transition-colors text-sm flex items-center gap-2"
        >
          Adicionar <ShoppingCart className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};