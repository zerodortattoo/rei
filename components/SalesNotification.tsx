import React, { useState, useEffect } from 'react';
import { ShoppingCart } from 'lucide-react';

const NAMES = [
    'João P.', 'Pedro H.', 'Miguel S.', 'Arthur G.', 'Davi L.',
    'Gabriel M.', 'Bernardo R.', 'Lucas F.', 'Matheus C.', 'Rafael A.',
    'Enzo K.', 'Felipe J.', 'Gustavo B.', 'Murilo S.', 'Nicolas D.'
];

const PRODUCTS = [
    '100 Milhões de Fichas',
    'Conta Level Max',
    'Fruta Mítica Aleatória',
    'Conta com Leopard',
    'Conta com Kitsune',
    '500 Milhões de Fichas',
    '1 Bilhão de Fichas'
];

const CITIES = [
    'São Paulo - SP', 'Rio de Janeiro - RJ', 'Belo Horizonte - MG',
    'Curitiba - PR', 'Porto Alegre - RS', 'Salvador - BA', 'Fortaleza - CE'
];

export const SalesNotification: React.FC = () => {
    const [visible, setVisible] = useState(false);
    const [data, setData] = useState({ name: '', product: '', city: '' });

    useEffect(() => {
        const showNotification = () => {
            // Randomize data
            const name = NAMES[Math.floor(Math.random() * NAMES.length)];
            const product = PRODUCTS[Math.floor(Math.random() * PRODUCTS.length)];
            const city = CITIES[Math.floor(Math.random() * CITIES.length)];

            setData({ name, product, city });
            setVisible(true);

            // Hide after 5 seconds
            setTimeout(() => {
                setVisible(false);
            }, 5000);
        };

        // Initial delay
        const initialTimeout = setTimeout(showNotification, 5000);

        // Loop
        const interval = setInterval(() => {
            // Random interval between 15 and 30 seconds
            if (!visible) {
                showNotification();
            }
        }, Math.random() * (30000 - 15000) + 15000);

        return () => {
            clearTimeout(initialTimeout);
            clearInterval(interval);
        };
    }, []);

    if (!visible) return null;

    return (
        <div className="fixed bottom-4 left-4 z-50 animate-slide-in-up md:bottom-6 md:left-6">
            <div className="bg-[#18181b] border border-[#F5C518]/30 rounded-xl shadow-2xl shadow-black/50 p-4 flex items-center gap-4 max-w-sm backdrop-blur-md bg-opacity-95">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#F5C518] to-orange-600 flex items-center justify-center shrink-0 border-2 border-[#18181b] ring-2 ring-[#F5C518]/20">
                    <ShoppingCart className="w-6 h-6 text-black fill-black" />
                </div>
                <div>
                    <p className="text-white text-sm font-bold leading-tight">
                        <span className="text-[#F5C518]">{data.name}</span> comprou
                    </p>
                    <p className="text-gray-300 text-xs font-medium leading-tight my-0.5">
                        {data.product}
                    </p>
                    <p className="text-gray-500 text-[10px] uppercase tracking-wide">
                        {data.city} • Há instantes
                    </p>
                </div>
            </div>
        </div>
    );
};
