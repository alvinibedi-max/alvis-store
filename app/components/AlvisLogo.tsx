import React from 'react';

export default function AlvisLogo({size = 40, className = ''}: {size?: number; className?: string}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="6" fill="none" />
      <ellipse cx="50" cy="50" rx="45" ry="20" stroke="currentColor" strokeWidth="6" fill="none" />
      <ellipse cx="50" cy="50" rx="20" ry="45" stroke="currentColor" strokeWidth="6" fill="none" />
      <line x1="5" y1="50" x2="95" y2="50" stroke="currentColor" strokeWidth="6" />
    </svg>
  );
}
