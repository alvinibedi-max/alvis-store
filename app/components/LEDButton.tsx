import React, {useState} from 'react';
import {cn} from '~/lib/utils';

const LED_STYLES = `
  .led-btn { box-shadow: 0 0 0 rgba(255,255,255,0); position: relative; }
  .led-active { box-shadow: 0 0 24px 4px rgba(255,255,255,0.5), 0 0 48px 8px rgba(255,255,255,0.2); transform: scale(0.97); }
  .led-glow { animation: led-pulse 0.6s ease-out; }
  @keyframes led-pulse {
    0% { box-shadow: 0 0 0 0 rgba(255,255,255,0.6); }
    100% { box-shadow: 0 0 40px 10px rgba(255,255,255,0); }
  }
`;

let styleInjected = false;

export default function LEDButton({
  children,
  className = '',
  onClick,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {children: React.ReactNode}) {
  const [lit, setLit] = useState(false);

  if (typeof document !== 'undefined' && !styleInjected) {
    const existing = document.getElementById('led-button-styles');
    if (!existing) {
      const style = document.createElement('style');
      style.id = 'led-button-styles';
      style.textContent = LED_STYLES;
      document.head.appendChild(style);
    }
    styleInjected = true;
  }

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setLit(true);
    setTimeout(() => setLit(false), 600);
    onClick?.(e as any);
  };

  return (
    <button
      {...props}
      onClick={handleClick}
      className={cn(`led-btn ${lit ? 'led-active' : ''} ${className}`)}
    >
      {lit && <span className="absolute inset-0 rounded-[inherit] pointer-events-none led-glow" />}
      <span className="relative z-10 flex items-center justify-center">{children}</span>
    </button>
  );
}
