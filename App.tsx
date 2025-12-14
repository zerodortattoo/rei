import React, { useState } from 'react';
import { MessageCircle, ArrowRight, ShieldCheck } from 'lucide-react';
import { Header } from './components/Header';

import { ManualHero } from './components/ManualHero';

import { LuckTestSection } from './components/LuckTestSection';
import { FeaturedGames } from './components/FeaturedGames';
import { SocialMediaSecret } from './components/SocialMediaSecret';
import { Footer } from './components/Footer';
import { SearchResults } from './components/SearchResults';
import { CheckoutView } from './components/CheckoutView';
import { PaymentPendingView } from './components/PaymentPendingView';
import { AffiliateView } from './components/AffiliateView';
import { SalesNotification } from './components/SalesNotification';
import { ReviewsSection } from './components/ReviewsSection';
import { openWhatsApp } from './utils';
import { CartItem, PaymentData } from './types';

export default function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [currentView, setCurrentView] = useState<'home' | 'checkout' | 'payment' | 'affiliates'>('home');

  // Capture affiliate ref
  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const ref = params.get('ref');
    if (ref) {
      localStorage.setItem('affiliate_ref', ref);
      // Optional: Clean URL
      const newUrl = window.location.protocol + "//" + window.location.host + window.location.pathname;
      window.history.pushState({ path: newUrl }, '', newUrl);
    }
  }, []);

  // Estado aprimorado para guardar os dados reais do pagamento
  const [activeOrder, setActiveOrder] = useState<{
    items: CartItem[],
    email: string,
    total: number,
    paymentData: PaymentData
  } | null>(null);

  const addToCart = (item: Omit<CartItem, 'cartId'>) => {
    const newItem = { ...item, cartId: Date.now() };
    setCart([...cart, newItem]);
    setCurrentView('checkout');
  };

  const removeFromCart = (cartId: number) => {
    setCart(cart.filter(item => item.cartId !== cartId));
  };

  const handlePaymentCreated = (email: string, total: number, paymentData: PaymentData) => {
    setActiveOrder({
      items: [...cart],
      email,
      total,
      paymentData
    });
    setCart([]); // Limpa o carrinho
    setCurrentView('payment');
  };

  return (
    <div className="min-h-screen bg-[#18181b] font-sans selection:bg-[#F5C518] selection:text-black pb-20 md:pb-0">
      <Header
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        cartCount={cart.length}
        onCartClick={() => setCurrentView('checkout')}
        onLogoClick={() => setCurrentView('home')}
      />



      <main>
        {currentView === 'home' && (
          searchTerm ? (
            <SearchResults query={searchTerm} />
          ) : (
            <>
              <ManualHero />


              <LuckTestSection onAddToCart={addToCart} />

              <ReviewsSection />

              <SocialMediaSecret />

              {/* Section Updated with "Compra Segura" branding */}
              <section className="py-16 bg-gradient-to-b from-[#27272a] to-[#18181b] text-center px-4 border-t border-[#3f3f46]">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F5C518]/10 border border-[#F5C518]/20 text-[#F5C518] text-xs font-bold uppercase tracking-wider mb-6">
                  <ShieldCheck className="w-3 h-3" />
                  Compra Segura via WhatsApp
                </div>

                <h2 className="text-3xl font-extrabold text-white mb-4">
                  Não achou o que procurava?
                </h2>

                <p className="text-gray-400 mb-8 max-w-lg mx-auto text-lg">
                  Trabalhamos com encomendas de contas raras e itens específicos para mais de 100 jogos.
                  Negocie diretamente comigo.
                </p>

                <div className="mb-12">
                  <FeaturedGames />
                </div>

                <button
                  onClick={() => openWhatsApp("Oi, estou procurando um item específico que não vi no site.")}
                  className="inline-flex items-center gap-3 bg-[#F5C518] text-black font-bold px-8 py-4 rounded-xl hover:bg-[#ffd644] transition-all shadow-[0_0_20px_rgba(245,197,24,0.3)] hover:scale-105"
                >
                  Chamar no Zap
                  <MessageCircle className="w-5 h-5 fill-black" />
                </button>
              </section>
            </>
          )
        )}

        {currentView === 'checkout' && (
          <CheckoutView
            cart={cart}
            onRemove={removeFromCart}
            onPaymentSuccess={handlePaymentCreated}
            onContinueShopping={() => setCurrentView('home')}
          />
        )}

        {currentView === 'payment' && activeOrder && (
          <PaymentPendingView
            order={activeOrder}
            onBack={() => setCurrentView('home')}
          />
        )}

        {currentView === 'affiliates' && (
          <AffiliateView onBack={() => setCurrentView('home')} />
        )}
      </main>

      <Footer onAffiliateClick={() => setCurrentView('affiliates')} />

      <div className="fixed bottom-6 right-6 z-50 md:hidden">
        {currentView === 'home' ? (
          <button
            onClick={() => openWhatsApp("Oi! Preciso de ajuda.")}
            className="w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
          >
            <MessageCircle className="w-8 h-8 text-white fill-white" />
          </button>
        ) : (
          <button
            onClick={() => setCurrentView('home')}
            className="w-14 h-14 bg-[#F5C518] rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
          >
            <ArrowRight className="w-8 h-8 text-black" />
          </button>
        )}
      </div>
      <SalesNotification />
    </div>
  );
}