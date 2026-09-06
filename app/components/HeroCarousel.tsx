import React, {useState, useEffect, useCallback} from 'react';
import {Link} from '@remix-run/react';
import {ChevronLeft, ChevronRight, Zap, ArrowRight} from 'lucide-react';

const slides = [
  {image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=1600&h=700&fit=crop', title: 'iPhone 17 Pro Max', subtitle: 'The Future is Here', badge: 'New Release', tint: 'from-purple-900/80 to-fuchsia-900/40', category: 'Phones'},
  {image: 'https://images.unsplash.com/photo-1496181133206-80ce9b39a859?w=1600&h=700&fit=crop', title: 'MacBook Pro M5', subtitle: 'Power Meets Precision', badge: 'Pro Series', tint: 'from-slate-900/80 to-blue-900/40', category: 'Laptops'},
  {image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1600&h=700&fit=crop', title: 'Gaming Setup', subtitle: 'Level Up Your Game', badge: 'Pro Gaming', tint: 'from-indigo-900/80 to-purple-900/40', category: 'Gaming'},
  {image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1600&h=700&fit=crop', title: 'Premium Headphones', subtitle: 'Pure Sound Experience', badge: 'Studio Sound', tint: 'from-rose-900/80 to-orange-900/40', category: 'Audio'},
  {image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=1600&h=700&fit=crop', title: 'Smart Watches', subtitle: 'Time Redefined', badge: 'Wearables', tint: 'from-teal-900/80 to-cyan-900/40', category: 'Phones'},
  {image: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=1600&h=700&fit=crop', title: 'Pro Cameras', subtitle: 'Capture Every Moment', badge: 'Photography', tint: 'from-gray-900/80 to-slate-900/40', category: 'Gaming'},
  {image: 'https://images.unsplash.com/photo-1608043152269-f4cdcaac0810?w=1600&h=700&fit=crop', title: 'Bluetooth Speakers', subtitle: 'Feel the Bass', badge: 'Big Sound', tint: 'from-orange-900/80 to-red-900/40', category: 'Audio'},
  {image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=1600&h=700&fit=crop', title: 'Tablets', subtitle: 'Big Screen Freedom', badge: 'On The Go', tint: 'from-blue-900/80 to-indigo-900/40', category: 'Phones'},
];

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => setCurrent(prev => (prev + 1) % slides.length), []);
  const prev = useCallback(() => setCurrent(prev => (prev - 1 + slides.length) % slides.length), []);

  useEffect(() => {
    const interval = setInterval(next, 2500);
    return () => clearInterval(interval);
  }, [next]);

  return (
    <div className="relative w-full h-[180px] sm:h-[240px] lg:h-[280px] overflow-hidden rounded-none sm:rounded-2xl group">
      {slides.map((slide, i) => (
        <div key={i} className={`absolute inset-0 transition-opacity duration-700 ${i === current ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}>
          <img src={slide.image} alt={slide.title} className="absolute inset-0 w-full h-full object-cover" />
          <div className={`absolute inset-0 bg-gradient-to-r ${slide.tint}`} />
          <div className="relative h-full flex items-center">
            <div className="max-w-7xl mx-auto px-6 sm:px-10 w-full">
              <div className="max-w-xl text-white">
                <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 text-[10px] sm:text-xs font-bold mb-2 uppercase tracking-wider">
                  <Zap className="w-3.5 h-3.5" /> {slide.badge}
                </div>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black leading-tight mb-1 drop-shadow-lg">{slide.title}</h2>
                <p className="text-sm sm:text-lg font-bold mb-4 text-white/90">{slide.subtitle}</p>
                <Link to={`/products?category=${slide.category}`}>
                  <span className="inline-flex items-center gap-2 bg-white text-black px-5 py-2 rounded-full font-bold text-xs sm:text-sm hover:scale-105 transition-transform">
                    Shop Now <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}
      <button onClick={prev} className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-white/30 backdrop-blur-sm hover:bg-white/50 rounded-full flex items-center justify-center text-white transition-all opacity-0 group-hover:opacity-100">
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button onClick={next} className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-white/30 backdrop-blur-sm hover:bg-white/50 rounded-full flex items-center justify-center text-white transition-all opacity-0 group-hover:opacity-100">
        <ChevronRight className="w-5 h-5" />
      </button>
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-1.5">
        {slides.map((_, i) => (
          <button key={i} onClick={() => setCurrent(i)} className={`h-2 rounded-full transition-all ${i === current ? 'w-7 bg-white' : 'w-2 bg-white/50 hover:bg-white/70'}`} />
        ))}
      </div>
      <div className="absolute top-4 right-4 z-20 bg-black/40 backdrop-blur-sm text-white text-xs font-bold px-3 py-1.5 rounded-full">
        {current + 1} / {slides.length}
      </div>
    </div>
  );
}
