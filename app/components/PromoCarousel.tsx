import React, {useState, useEffect} from 'react';
import {Link} from '@remix-run/react';
import {ArrowRight, Zap} from 'lucide-react';

const SLIDES = [
  {badge: 'Hot Deals', title: 'Summer Mega Sale', subtitle: 'Up to 60% off select gadgets — limited time only', cta: 'Shop Deals', link: '/deals', gradient: 'from-fuchsia-600 to-purple-700'},
  {badge: 'Just In', title: 'New Tech Arrivals', subtitle: 'The latest gadgets, fresh in stock for 2026', cta: 'Explore Now', link: '/products', gradient: 'from-indigo-700 to-blue-800'},
  {badge: 'Sound', title: 'Audio Sale', subtitle: '30% off headphones', cta: 'Shop', link: '/products?category=Audio', gradient: 'from-rose-600 to-orange-600'},
  {badge: 'Play', title: 'Gaming Gear', subtitle: 'Pro setups from £49', cta: 'Shop', link: '/products?category=Gaming', gradient: 'from-emerald-600 to-teal-700'},
  {badge: 'Save', title: 'Bundle & Save', subtitle: '3 for 2 on accessories', cta: 'Shop', link: '/products', gradient: 'from-amber-600 to-yellow-600'},
];

export default function PromoCarousel() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setIndex(prev => (prev + 1) % SLIDES.length), 3000);
    return () => clearInterval(timer);
  }, []);

  const slide = SLIDES[index];

  return (
    <div className="relative bg-white rounded-lg border border-gray-100/50 shadow-sm overflow-hidden h-[90px] sm:h-[110px]">
      {SLIDES.map((s, i) => (
        <div key={i} className={`absolute inset-0 transition-opacity duration-500 ${i === index ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
          <div className={`h-full bg-gradient-to-r ${s.gradient} text-white px-5 sm:px-8 flex items-center justify-between`}>
            <div>
              <div className="inline-flex items-center gap-1 bg-white/20 backdrop-blur-sm rounded-full px-2 py-0.5 text-[9px] sm:text-[11px] font-bold mb-1 uppercase tracking-wider">
                <Zap className="w-2.5 h-2.5" /> {s.badge}
              </div>
              <h3 className="text-base sm:text-xl font-black leading-tight">{s.title}</h3>
              <p className="text-[11px] sm:text-sm text-white/80 leading-tight">{s.subtitle}</p>
            </div>
            <Link to={s.link} className="inline-flex items-center gap-1 bg-white text-black px-3 py-1.5 rounded-full text-xs font-bold hover:scale-105 transition-transform flex-shrink-0">
              {s.cta} <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      ))}
      <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 flex gap-1 z-10">
        {SLIDES.map((_, i) => (
          <button key={i} onClick={() => setIndex(i)} className={`h-1.5 rounded-full transition-all ${i === index ? 'w-4 bg-white' : 'w-1.5 bg-white/50'}`} />
        ))}
      </div>
    </div>
  );
}
