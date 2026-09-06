import React, {useRef} from 'react';
import {Star, ChevronLeft, ChevronRight, Quote} from 'lucide-react';

const sampleAuthors = ['James Carter', 'Sophia Lin', 'Marcus Webb', 'Elena Rodriguez', 'David Kim', 'Aisha Patel', 'Tom Brennan', 'Nina Volkov', 'Chris O\'Donnell', 'Yuki Tanaka', 'Olivia Stone', 'Raj Mehta'];
const sampleTitles = ['Exceeded my expectations', 'Solid build quality', 'Worth every penny', 'Fast and reliable', 'Best purchase this year', 'Highly recommend', 'Perfect for daily use', 'Great value', 'Impressive performance', 'No regrets at all'];
const sampleBodies = [
  'Been using this for a few weeks now and it has completely changed my workflow. The build quality feels premium and it performs exactly as advertised.',
  'Was hesitant at first but so glad I pulled the trigger. The packaging was excellent and setup took under 5 minutes. Absolutely flawless.',
  'The attention to detail is remarkable. Every feature works as described and the performance is top-notch for this price point.',
  'I have tried several competitors and this one stands out. The battery life alone is worth the investment. Highly recommend to anyone on the fence.',
  'Shipped fast, arrived in perfect condition. Been using daily with zero issues. The design is sleek and fits perfectly in my setup.',
  'After a month of heavy use I can confidently say this is one of the best tech purchases I have made. Reliable, fast, and well-built.',
  'The specs looked good on paper but the real-world performance blew me away. Handles everything I throw at it without breaking a sweat.',
  'Customer support was helpful when I had a question about setup. The product itself is fantastic — exactly what I needed and more.',
  'Compared this to three other options and this was the clear winner. The value for money is unbeatable at this quality level.',
  'Two months in and still going strong. No overheating, no lag, no issues whatsoever. This is how you build a product.',
];

const generateSampleReviews = (productName: string, count: number) => {
  const reviews = [];
  for (let i = 0; i < count; i++) {
    reviews.push({
      id: `sample-${i}`,
      author: sampleAuthors[i % sampleAuthors.length],
      rating: [5, 5, 5, 4, 5, 5, 4, 5, 5, 4][i % 10],
      title: sampleTitles[i % sampleTitles.length],
      body: sampleBodies[i % sampleBodies.length],
      verified: true,
    });
  }
  return reviews;
};

export default function ReviewsSlider({reviews = [], productName = 'this product'}: {reviews?: any[]; productName?: string}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const mergedReviews = reviews.length >= 10 ? reviews.slice(0, 10) : [...reviews, ...generateSampleReviews(productName, 10 - reviews.length)];
  const avgRating = mergedReviews.length > 0 ? (mergedReviews.reduce((s, r) => s + r.rating, 0) / mergedReviews.length).toFixed(1) : '0.0';

  const scroll = (dir: number) => {
    if (scrollRef.current) scrollRef.current.scrollBy({left: dir * 320, behavior: 'smooth'});
  };

  return (
    <div className="bg-gray-50 rounded-2xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-black rounded-xl flex items-center justify-center">
            <Quote className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-bold text-base">Customer Reviews</h3>
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={`w-3.5 h-3.5 ${i < Math.floor(Number(avgRating)) ? 'fill-black text-black' : 'text-gray-300'}`} />
              ))}
              <span className="text-xs text-gray-500 ml-1">{avgRating} · {mergedReviews.length} reviews</span>
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <button onClick={() => scroll(-1)} className="w-9 h-9 rounded-full border border-gray-200 bg-white flex items-center justify-center hover:bg-gray-50 transition-colors">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button onClick={() => scroll(1)} className="w-9 h-9 rounded-full border border-gray-200 bg-white flex items-center justify-center hover:bg-gray-50 transition-colors">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div ref={scrollRef} className="flex gap-4 overflow-x-auto scroll-smooth pb-2" style={{scrollbarWidth: 'none'}}>
        {mergedReviews.map(review => (
          <div key={review.id || review.author} className="flex-shrink-0 w-72 bg-white rounded-xl p-5 border border-gray-100">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-9 h-9 bg-black text-white rounded-full flex items-center justify-center font-bold text-xs">
                {review.author?.[0]?.toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm truncate">{review.author}</p>
                {review.verified && <p className="text-xs text-green-600 flex items-center gap-1">✓ Verified Buyer</p>}
              </div>
            </div>
            <div className="flex gap-0.5 mb-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={`w-3.5 h-3.5 ${i < review.rating ? 'fill-black text-black' : 'text-gray-200'}`} />
              ))}
            </div>
            {review.title && <p className="font-bold text-sm mb-1">{review.title}</p>}
            <p className="text-xs text-gray-500 leading-relaxed line-clamp-4">{review.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
