import React from 'react';
import {cn} from '~/lib/utils';

interface ViseAvatarProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  status?: 'online' | 'offline' | 'typing';
}

export default function ViseAvatar({
  size = 'md',
  className,
  status = 'online',
}: ViseAvatarProps) {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-14 h-14',
  };

  const statusColors = {
    online: 'bg-green-400',
    offline: 'bg-gray-400',
    typing: 'bg-yellow-400',
  };

  const statusSizes = {
    sm: 'w-2 h-2',
    md: 'w-2.5 h-2.5',
    lg: 'w-3 h-3',
  };

  return (
    <div
      className={cn(
        'relative rounded-full bg-gradient-to-br from-fuchsia-500 to-purple-600 flex items-center justify-center text-white font-bold',
        sizeClasses[size],
        className,
      )}
    >
      <span className="text-xs font-black">V</span>
      <span
        className={cn(
          'absolute bottom-0 right-0 rounded-full border-2 border-white',
          statusColors[status],
          statusSizes[size],
        )}
      />
    </div>
  );
}
