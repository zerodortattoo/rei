
import React from 'react';
import { Zap, ShoppingBag, Diamond, Sparkles } from 'lucide-react';
import { CartItem } from '../types';

interface ProductCardProps {
    id: string;
    title: string;
    oldPrice: number;
    price: number;
    discount: number;
    badges: string[];
    imageGradient: string;
    imageText: string;
    description?: string; // Hidden in card but used for cart
    onAddToCart: (item: Omit<CartItem, 'cartId'>) => void;
    buttonColor?: 'blue' | 'gold';
}

const ProductCard: React.FC<ProductCardProps> = ({
    id, title, oldPrice, price, discount, badges, imageGradient, imageText, description, onAddToCart, buttonColor = 'blue'
}) => {
    const buttonStyles = buttonColor === 'gold'
        ? "bg-[#F5C518] hover:bg-[#ffd644] text-black shadow-yellow-900/20"
        : "bg-[#3b82f6] hover:bg-[#2563eb] text-white shadow-blue-900/20";

    const iconButtonStyles = buttonColor === 'gold'
        ? "border-[#F5C518] text-[#F5C518] hover:bg-[#F5C518]/10"
        : "border-[#3b82f6] text-[#3b82f6] hover:bg-[#3b82f6]/10";

    return (
        <div className="bg-[#18181b] rounded-xl border border-[#3f3f46] overflow-hidden hover:border-[#F5C518] transition-all group">
            {/* Image Area */}
            <div className={`h-32 ${imageGradient} relative p-4 flex flex-col items-center justify-center text-center overflow-hidden`}>
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                <h3 className="relative z-10 text-2xl font-black text-white italic tracking-tighter uppercase drop-shadow-md">
                    {imageText}
                </h3>
                <div className="absolute top-2 right-2 flex gap-1">
                    {badges.map((badge, i) => (
                        <span key={i} className="text-[10px] font-bold px-2 py-0.5 rounded bg-black/50 text-white backdrop-blur-sm border border-white/10">
                            {badge}
                        </span>
                    ))}
                </div>
            </div>

            {/* Content */}
            <div className="p-4">
                <h4 className="text-white font-bold text-sm mb-3 line-clamp-2 h-10" title={title}>
                    {title}
                </h4>

                <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs text-gray-500 line-through">R$ {oldPrice.toFixed(2)}</span>
                    <span className="text-xs font-bold text-green-400 bg-green-400/10 px-1.5 py-0.5 rounded">
                        {discount}% OFF
                    </span>
                </div>

                <div className="flex items-center justify-between mb-2">
                    <span className="text-xl font-black text-white">R$ {price.toFixed(2)}</span>
                    <div className="flex gap-1 text-[#3b82f6]">
                        <Zap className="w-4 h-4 fill-current" />
                        <Diamond className="w-4 h-4 fill-current" />
                    </div>
                </div>

                {/* Scarcity Indicator */}
                <div className="mb-3">
                    <div className="flex items-center justify-between text-[10px] mb-1">
                        <span className="text-gray-400 flex items-center gap-1">
                            Vendidos: <span className="text-white font-bold">{Math.floor(Math.random() * (50 - 10) + 10)}</span>
                        </span>
                        <span className="text-red-400 font-bold flex items-center gap-1 animate-pulse">
                            Restam: {Math.floor(Math.random() * (8 - 2) + 2)}
                        </span>
                    </div>
                    <div className="w-full h-1.5 bg-[#27272a] rounded-full overflow-hidden">
                        <div
                            className="h-full bg-gradient-to-r from-red-500 to-[#F5C518] rounded-full"
                            style={{ width: `${Math.random() * (95 - 60) + 60}%` }}
                        />
                    </div>
                </div>

                <div className="flex gap-2">
                    <button
                        onClick={() => onAddToCart({ id, title, price, image: imageText.substring(0, 2), type: 'Account', description })}
                        className={`flex-1 font-bold py-2 rounded-lg text-sm transition-colors shadow-lg ${buttonStyles}`}
                    >
                        Comprar
                    </button>
                    <button
                        onClick={() => onAddToCart({ id, title, price, image: imageText.substring(0, 2), type: 'Account', description })}
                        className={`px-3 py-2 border rounded-lg transition-colors ${iconButtonStyles}`}
                    >
                        <ShoppingBag className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </div>
    );
};

interface LuckTestSectionProps {
    onAddToCart: (item: Omit<CartItem, 'cartId'>) => void;
}

export const LuckTestSection: React.FC<LuckTestSectionProps> = ({ onAddToCart }) => {
    const bloxProducts = [
        {
            id: "1",
            title: "Conta Level 1000+ (Blox Fruits)",
            oldPrice: 10.00,
            price: 5.00,
            discount: 50,
            badges: ["Entrega Imediata", "Promoção"],
            imageGradient: "from-blue-600 to-blue-900",
            imageText: "LVL 1000+",
            description: "Conta upada até level 1000+ garantido. Pode conter frutas ou espadas aleatórias."
        },
        {
            id: "luck-max",
            title: "[ 🍀 🌟 ] Teste sua sorte (TODAS LV MAX)",
            oldPrice: 20.00,
            price: 10.00,
            discount: 50,
            badges: ["HOT"],
            imageGradient: "bg-gradient-to-br from-yellow-600 to-yellow-800",
            imageText: "TESTE SUA SORTE",
            description: "Level 2800 Garantido. Chance de Godhuman, CDK, Soul Guitar e Frutas Míticas."
        },
        {
            id: "mythical-1",
            title: "[ 🌍 🍎 ] +1 Fruta Mítica Aleatoria",
            oldPrice: 15.00,
            price: 7.00,
            discount: 53,
            badges: ["RARE"],
            imageGradient: "bg-gradient-to-br from-red-600 to-red-900",
            imageText: "1-3 FRUTAS ALEATÓRIAS",
            description: "Contém 1 a 3 Frutas Míticas no inventário (Dragon, Kitsune, Leopard, etc)."
        },
        {
            id: "mythical-2",
            title: "[ 🌍 🍎 ] +2 Fruta Míticas Aleatória",
            oldPrice: 20.00,
            price: 9.50,
            discount: 52,
            badges: ["BEST SELLER"],
            imageGradient: "bg-gradient-to-br from-purple-600 to-purple-900",
            imageText: "2-6 FRUTAS ALEATÓRIAS",
            description: "Contém 2 a 6 Frutas Míticas no inventário. Alta chance de Kitsune."
        },
        {
            id: "acc-tiger",
            title: "[ ✨ 🐆 ] TIGER/LEOPARD no inventário",
            oldPrice: 70.00,
            price: 19.90,
            discount: 71,
            badges: ["REWORK"],
            imageGradient: "bg-gradient-to-br from-orange-500 to-orange-800",
            imageText: "LEOPARD",
            description: "Conta com Leopard (Tiger) garantida no inventário."
        },
        {
            id: "acc-kitsune",
            title: "[ ✨ 🦊 ] Kitsune no inventário",
            oldPrice: 60.00,
            price: 29.90,
            discount: 50,
            badges: ["MYTHICAL"],
            imageGradient: "bg-gradient-to-br from-blue-400 to-blue-700",
            imageText: "KITSUNE",
            description: "Conta com Kitsune garantida no inventário."
        },
        {
            id: "acc-yeti",
            title: "[ ✨ 🧊 ] Yeti no Inventário",
            oldPrice: 30.00,
            price: 14.50,
            discount: 51,
            badges: ["NEW"],
            imageGradient: "bg-gradient-to-br from-cyan-500 to-cyan-800",
            imageText: "YETI / ICE",
            description: "Conta com Yeti (Ice Awakened/Mythical) no inventário."
        },
        {
            id: "acc-gas",
            title: "[ ✨ 💨 ] Gas no Inventário",
            oldPrice: 20.00,
            price: 9.90,
            discount: 50,
            badges: ["META"],
            imageGradient: "bg-gradient-to-br from-gray-600 to-gray-800",
            imageText: "GAS",
            description: "Conta com Gas Fruit garantida."
        }
    ];

    const poolProducts = [
        {
            id: "8ball-100m",
            title: "[ 🎱 💰 ] 100 Milhões de Fichas",
            oldPrice: 40.00,
            price: 25.00,
            discount: 37,
            badges: ["ENTREGA RÁPIDA"],
            imageGradient: "bg-gradient-to-br from-blue-600 to-blue-900",
            imageText: "100 MILHÕES",
            description: "Pacote de 100 Milhões de Fichas para 8 Ball Pool."
        },
        {
            id: "8ball-500m",
            title: "[ 🎱 💰 ] 500 Milhões de Fichas",
            oldPrice: 80.00,
            price: 50.00,
            discount: 37,
            badges: ["POPULAR"],
            imageGradient: "bg-gradient-to-br from-indigo-600 to-indigo-900",
            imageText: "500 MILHÕES",
            description: "Pacote de 500 Milhões de Fichas para 8 Ball Pool."
        },
        {
            id: "8ball-1b",
            title: "[ 🎱 👑 ] 1 Bilhão de Fichas (VIP)",
            oldPrice: 150.00,
            price: 100.00,
            discount: 33,
            badges: ["VIP"],
            imageGradient: "bg-gradient-to-br from-yellow-600 to-yellow-900",
            imageText: "1 BILHÃO",
            description: "Pacote de 1 Bilhão de Fichas para 8 Ball Pool. Torne-se um milionário!"
        }
    ];

    return (
        <div className="bg-[#18181b]">
            {/* Blox Fruits Section */}
            <section id="products-section" className="py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center gap-3 mb-8">
                        <Sparkles className="text-[#F5C518] w-8 h-8" />
                        <h2 className="text-2xl font-bold text-white uppercase italic tracking-wider">
                            Contas em Promoção <span className="text-[#F5C518]">Blox Fruits</span>
                        </h2>
                    </div>

                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                        {bloxProducts.map(product => (
                            <ProductCard
                                key={product.id}
                                {...product}
                                onAddToCart={onAddToCart}
                                buttonColor="gold"
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* 8 Ball Pool Section */}
            <section className="py-8 border-t border-[#3f3f46]/50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold border-2 border-white/20">🎱</div>
                        <h2 className="text-2xl font-bold text-white uppercase italic tracking-wider">
                            Fichas <span className="text-blue-500">8 Ball Pool</span>
                        </h2>
                    </div>

                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                        {poolProducts.map(product => (
                            <ProductCard
                                key={product.id}
                                {...product}
                                onAddToCart={onAddToCart}
                                buttonColor="gold"
                            />
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};
