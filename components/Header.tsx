import React from 'react';
import { Search, MessageCircle, ShoppingCart, User } from 'lucide-react';
import { openWhatsApp } from '../utils';

interface HeaderProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  cartCount: number;
  onCartClick: () => void;
  onLogoClick: () => void;
  isLoggedIn?: boolean;
  onUserClick?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  searchTerm,
  setSearchTerm,
  cartCount,
  onCartClick,
  onLogoClick,
  isLoggedIn,
  onUserClick
}) => (
  <header className="sticky top-0 z-50 bg-[#18181b]/95 backdrop-blur-md border-b border-[#27272a]">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
      <div
        className="flex items-center gap-2 flex-shrink-0 cursor-pointer"
        onClick={onLogoClick}
      >
        <div className="w-8 h-8 bg-[#F5C518] rounded flex items-center justify-center font-bold text-black text-xl">R</div>
        <span className="text-xl font-bold text-white tracking-tight hidden sm:block">Rei das <span className="text-[#F5C518]">Contas</span></span>
      </div>

      <div className="flex-1 max-w-2xl mx-2 relative hidden md:block">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Busque seu jogo (ex: Roblox, 8 Ball)..."
          className="w-full bg-[#27272a] text-gray-200 pl-10 pr-4 py-2.5 rounded-lg border border-transparent focus:border-[#F5C518] focus:ring-1 focus:ring-[#F5C518] transition-all outline-none text-sm placeholder-gray-500"
        />
        <Search className="absolute left-3 top-2.5 text-gray-500 w-4 h-4" />
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={onCartClick}
          className="relative p-2 text-gray-400 hover:text-white transition-colors"
        >
          <ShoppingCart className="w-6 h-6" />
          {cartCount > 0 && (
            <span className="absolute top-0 right-0 bg-[#F5C518] text-black text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
              {cartCount}
            </span>
          )}
        </button>

        <button
          onClick={onUserClick}
          className={`p-2 transition-colors ${isLoggedIn ? 'text-[#F5C518]' : 'text-gray-400 hover:text-white'}`}
          title={isLoggedIn ? "Minha Conta" : "Fazer Login"}
        >
          <User className="w-6 h-6" />
        </button>

        <button
          onClick={() => openWhatsApp("Oi, vim pelo site e tenho uma dúvida geral.")}
          className="flex items-center gap-2 px-3 py-2 sm:px-5 sm:py-2 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold rounded-full transition-all shadow-[0_0_10px_rgba(37,211,102,0.3)] hidden sm:flex"
        >
          <MessageCircle className="w-5 h-5 fill-white" />
          <span className="hidden md:inline">Fale Conosco</span>
        </button>
      </div>
    </div>
  </header>
);