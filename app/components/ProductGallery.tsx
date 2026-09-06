import React, {useState} from 'react';
import {Play} from 'lucide-react';
import {cn} from '~/lib/utils';

export default function ProductGallery({
  images,
  name,
  discount,
  videoUrl,
  videoAvailable,
}: {
  images: string[];
  name: string;
  discount: number;
  videoUrl?: string;
  videoAvailable?: boolean;
}) {
  const media: {type: 'video' | 'image'; url: string}[] = [];
  if (videoUrl) media.push({type: 'video', url: videoUrl});
  (images && images.length > 0 ? images : []).forEach(url => media.push({type: 'image', url}));

  const [active, setActive] = useState(0);

  if (media.length === 0) {
    return (
      <div className="aspect-square bg-gray-50 rounded-2xl flex items-center justify-center">
        <p className="text-gray-400">No image available</p>
      </div>
    );
  }

  const current = media[active] || media[0];

  return (
    <div>
      <div className="relative aspect-square bg-white rounded-2xl border border-gray-100 overflow-hidden">
        {discount > 0 && (
          <div className="absolute top-4 left-4 z-10 bg-gradient-to-r from-rose-500 to-pink-600 text-white text-sm font-bold px-3 py-1 rounded-full shadow-md">
            -{discount}% OFF
          </div>
        )}
        {current.type === 'video' ? (
          <video src={current.url} controls autoPlay muted loop playsInline className="w-full h-full object-contain p-4 sm:p-8 bg-white" aria-label={`${name} product video`} />
        ) : (
          <img src={current.url} alt={`${name} - view ${active + 1}`} className="w-full h-full object-contain p-8 sm:p-12 bg-white" />
        )}
      </div>

      {media.length > 1 && (
        <div className="flex gap-3 mt-4 overflow-x-auto scrollbar-hide pb-1">
          {media.map((m, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={cn(
                'flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition-all relative bg-white',
                active === i ? 'border-fuchsia-500 ring-2 ring-fuchsia-200' : 'border-gray-100 hover:border-gray-300',
              )}
              aria-label={`View ${m.type === 'video' ? 'video' : 'image'} ${i + 1}`}
            >
              {m.type === 'video' ? (
                <div className="w-full h-full flex items-center justify-center bg-gray-900">
                  <div className="w-7 h-7 rounded-full bg-white/90 flex items-center justify-center">
                    <Play className="w-3.5 h-3.5 text-black fill-black ml-0.5" />
                  </div>
                </div>
              ) : (
                <img src={m.url} alt={`${name} thumbnail ${i + 1}`} className="w-full h-full object-contain p-1" />
              )}
            </button>
          ))}
        </div>
      )}

      {media.length > 0 && !videoUrl && videoAvailable && (
        <p className="text-[11px] text-gray-400 mt-2 text-center">Video preview available</p>
      )}
    </div>
  );
}
