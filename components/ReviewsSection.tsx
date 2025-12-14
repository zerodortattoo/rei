import React from 'react';
import { Star, CheckCircle, User } from 'lucide-react';

const REVIEWS = [
    {
        id: 1,
        name: 'Pedro Henrique',
        verified: true,
        stars: 5,
        date: 'Há 2 dias',
        product: '1 Bilhão de Fichas',
        content: 'Muito rápido! Fiquei com medo no começo mas o atendimento via Zap foi sensacional. As fichas caíram na hora.',
        avatarColor: 'bg-blue-600'
    },
    {
        id: 2,
        name: 'Lucas Gabriel',
        verified: true,
        stars: 5,
        date: 'Há 5 horas',
        product: 'Conta Level Max',
        content: 'A conta veio braba demais! Veio com CDK e Soul Guitar conforme o anúncio. Recomendo muito a loja.',
        avatarColor: 'bg-green-600'
    },
    {
        id: 3,
        name: 'João Vitor',
        verified: true,
        stars: 5,
        date: 'Ontem',
        product: 'Fruta Mítica Aleatória',
        content: 'Tirei uma Leopard!!! A sorte testada e aprovada kkkk. Vou comprar mais com certeza.',
        avatarColor: 'bg-yellow-600'
    },
    {
        id: 4,
        name: 'Matheus Silva',
        verified: true,
        stars: 5,
        date: 'Há 1 semana',
        product: '500 Milhões de Fichas',
        content: 'Preço muito bom e entrega garantida. Já é a terceira vez que compro aqui pro meu clã.',
        avatarColor: 'bg-purple-600'
    }
];

export const ReviewsSection: React.FC = () => {
    return (
        <section className="py-16 bg-[#18181b] border-t border-[#3f3f46]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-black text-white mb-4 uppercase italic tracking-wider">
                        Avaliações de <span className="text-[#F5C518]">Clientes</span>
                    </h2>
                    <div className="flex items-center justify-center gap-2 text-[#F5C518]">
                        <div className="flex">
                            {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-5 h-5 fill-current" />)}
                        </div>
                        <span className="text-white font-bold ml-2">4.9/5</span>
                        <span className="text-gray-500 text-sm">(+500 avaliações)</span>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {REVIEWS.map((review) => (
                        <div key={review.id} className="bg-[#27272a] p-6 rounded-2xl border border-[#3f3f46] hover:border-[#F5C518] transition-all group">
                            <div className="flex items-center gap-3 mb-4">
                                <div className={`w-10 h-10 rounded-full ${review.avatarColor} flex items-center justify-center text-white font-bold border-2 border-[#18181b]`}>
                                    {review.name.charAt(0)}
                                </div>
                                <div>
                                    <div className="flex items-center gap-1">
                                        <h4 className="text-white font-bold text-sm">{review.name}</h4>
                                        {review.verified && <CheckCircle className="w-3 h-3 text-blue-400 fill-blue-400/20" />}
                                    </div>
                                    <p className="text-[10px] text-gray-500">{review.date}</p>
                                </div>
                            </div>

                            <div className="flex text-[#F5C518] mb-3 gap-0.5">
                                {[...Array(review.stars)].map((_, i) => (
                                    <Star key={i} className="w-3 h-3 fill-current" />
                                ))}
                            </div>

                            <p className="text-gray-300 text-sm leading-relaxed mb-4">
                                "{review.content}"
                            </p>

                            <div className="flex items-center gap-2 pt-4 border-t border-[#3f3f46]">
                                <ShoppingBagIcon className="w-3 h-3 text-gray-500" />
                                <span className="text-xs text-gray-500 font-medium truncate">
                                    Comprou: <span className="text-gray-300">{review.product}</span>
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

function ShoppingBagIcon({ className }: { className?: string }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
            <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
            <path d="M3 6h18" />
            <path d="M16 10a4 4 0 0 1-8 0" />
        </svg>
    )
}
