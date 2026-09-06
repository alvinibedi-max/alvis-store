/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx}', './index.html'],
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        // Alvis Brand Colors — Fuchsia-Violet gradient
        'alvis-fuchsia': '#c026d3',
        'alvis-violet': '#7c3aed',
        'alvis-surface': '#0a0a0a',
        'alvis-card': '#141414',
        'alvis-border': '#2a2a2a',
      },
      fontFamily: {
        display: ['Barlow Condensed', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        mono: ['Barlow', 'monospace'],
      },
      animation: {
        'bounce-slow': 'bounce 2s infinite',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
