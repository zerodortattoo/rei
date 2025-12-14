import React from 'react';
import { MonitorPlay, ShoppingCart } from 'lucide-react';
import { SOFTWARE_PRODUCTS } from '../constants';
import { CartItem } from '../types';

interface SoftwareSectionProps {
  onAddToCart: (item: Omit<CartItem, 'cartId'>) => void;
}

export const SoftwareSection: React.FC<SoftwareSectionProps> = ({ onAddToCart }) => (
  <section className="py-12 bg-[#1c1c20] border-y border-[#27272a]">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex items-center gap-3 mb-8">
        <MonitorPlay className="w-6 h-6 text-[#F5C518]" />
        <h2 className="text-2xl font-bold text-white">Assinaturas & Softwares</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {SOFTWARE_PRODUCTS.map((prod) => (
          <div key={prod.id} className="bg-[#18181b] rounded-xl overflow-hidden border border-[#3f3f46] hover:border-[#F5C518] group transition-all flex flex-col">
            <div className="p-6 flex-1 flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-[#27272a] rounded-full flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform">
                {prod.image}
              </div>
              <h3 className="font-bold text-white text-lg mb-1">{prod.title}</h3>
              <span className="text-xs bg-[#27272a] text-gray-400 px-2 py-1 rounded mb-4">{prod.type}</span>
              
              <div className="mt-auto w-full pt-4 border-t border-[#3f3f46] flex items-center justify-between">
                <span className="text-xl font-bold text-[#F5C518]">{prod.price}</span>
                <button 
                  onClick={() => onAddToCart({
                    id: prod.id,
                    title: prod.title,
                    description: 'Assinatura Digital',
                    price: parseFloat(prod.price.toString().replace('R$ ', '').replace(',', '.')),
                    image: prod.image,
                    type: prod.type
                  })}
                  className="bg-[#F5C518] hover:bg-[#ffd644] text-black p-2 rounded-lg transition-colors flex items-center gap-2 px-4 text-sm font-bold"
                >
                  <ShoppingCart className="w-4 h-4" />
                  Comprar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);