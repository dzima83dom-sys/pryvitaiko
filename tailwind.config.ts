import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
    './store/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        cream: '#f7f1e8',
        lavender: '#8b5cf6',
      },
      boxShadow: {
        glass: '0 10px 28px rgba(0, 0, 0, 0.18), inset 0 1px 0 rgba(255,255,255,0.08)',
        glow: '0 0 18px rgba(255,255,255,0.18)',
      },
      backdropBlur: {
        soft: '10px',
      },
      keyframes: {
        heartbeat: {
          '0%, 36%, 72%, 100%': { transform: 'scale(1)' },
          '18%': { transform: 'scale(1.035)' },
          '54%': { transform: 'scale(1.02)' },
        },
        shimmer: {
          '0%, 55%': { left: '-120%' },
          '100%': { left: '135%' },
        },
        dotPulse: {
          '0%, 80%, 100%': { opacity: '0.35', transform: 'translateY(0) scale(0.9)' },
          '40%': { opacity: '1', transform: 'translateY(-4px) scale(1)' },
        },
      },
      animation: {
        heartbeat: 'heartbeat 2.2s ease-in-out infinite',
        shimmer: 'shimmer 3.8s ease-in-out infinite',
        dotPulse: 'dotPulse 1.2s infinite ease-in-out',
      },
    },
  },
  plugins: [],
};

export default config;
