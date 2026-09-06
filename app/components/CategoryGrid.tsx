import React from 'react';
import {Link} from '@remix-run/react';

const categories = [
  {name: 'Phones', image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=300&h=300&fit=crop', label: 'iPhone 17 Pro Max'},
  {name: 'Laptops', image: 'https://images.unsplash.com/photo-1496181133206-80ce9b39a859?w=300&h=300&fit=crop', label: 'MacBook Pro'},
  {name: 'Audio', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop', label: 'Headphones'},
  {name: 'Gaming', image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=300&h=300&fit=crop', label: 'Gaming Gear'},
  {name: 'Wearables', image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=300&h=300&fit=crop', label: 'Smart Watches'},
  {name: 'Cameras', image: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=300&h=300&fit=crop', label: 'Pro Cameras'},
  {name: 'Speakers', image: 'https://images.unsplash.com/photo-1608043152269-f4cdcaac0810?w=300&h=300&fit=crop', label: 'Bluetooth Speakers'},
  {name: 'Tablets', image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=300&h=300&fit=crop', label: 'Tablets'},
  {name: 'Drones', image: 'https://images.unsplash.com/photo-1473968512647-accf694974df?w=300&h=300&fit=crop', label: 'Drones'},
  {name: 'VR', image: 'https://images.unsplash.com/photo-1622979135225-d5ba3367e9d0?w=300&h=300&fit=crop', label: 'VR Headsets'},
  {name: 'Monitors', image: 'https://images.unsplash.com/photo-1527443224154-c94a60401df5?w=300&h=300&fit=crop', label: '4K Monitors'},
  {name: 'Accessories', image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=300&h=300&fit=crop', label: 'Keyboards & Mice'},
];

export default function CategoryGrid() {
  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
      {categories.map(cat => (
        <Link key={cat.name} to={`/products?category=${cat.name}`} className="group bg-white border border-gray-100 rounded-xl p-3 sm:p-4 flex flex-col items-center text-center hover:shadow-lg hover:border-gray-200 transition-all hover:-translate-y-1">
          <div className="w-full aspect-square rounded-lg overflow-hidden mb-2 bg-gray-50">
            <img src={cat.image} alt={cat.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
          </div>
          <p className="text-sm font-bold text-gray-900">{cat.name}</p>
          <p className="text-[10px] sm:text-xs text-gray-400 line-clamp-1">{cat.label}</p>
        </Link>
      ))}
    </div>
  );
}
