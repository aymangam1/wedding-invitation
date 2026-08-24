/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        cream: '#fdf9f3',
        ivory: '#fffdf9',
        blush: {
          50: '#fdf5f4',
          100: '#fbe9e7',
          200: '#f6d2cf',
          300: '#eeb0ab',
          400: '#e08a83',
          500: '#cd6a62',
        },
        gold: {
          200: '#eadfc4',
          300: '#dcc999',
          400: '#c9ad6d',
          500: '#b3924e',
          600: '#8f7238',
        },
        sage: {
          300: '#b9c9b4',
          400: '#94aa8d',
          500: '#71876a',
        },
        ink: '#3b332e',
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', '"Playfair Display"', 'serif'],
        script: ['"Great Vibes"', 'cursive'],
        arabic: ['Cairo', 'system-ui', 'sans-serif'],
        arabicDisplay: ['Amiri', 'Cairo', 'serif'],
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        fall: {
          '0%': { transform: 'translate3d(0, -10vh, 0) rotate(0deg)', opacity: '0' },
          '10%': { opacity: '0.9' },
          '100%': { transform: 'translate3d(var(--drift, 40px), 110vh, 0) rotate(540deg)', opacity: '0' },
        },
        shimmer: {
          '0%, 100%': { opacity: '0.35' },
          '50%': { opacity: '0.9' },
        },
        pulseRing: {
          '0%': { transform: 'scale(0.9)', opacity: '0.6' },
          '100%': { transform: 'scale(1.6)', opacity: '0' },
        },
        heartbeat: {
          '0%, 100%': { transform: 'scale(1)' },
          '25%': { transform: 'scale(1.12)' },
          '50%': { transform: 'scale(1)' },
          '75%': { transform: 'scale(1.08)' },
        },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        shimmer: 'shimmer 4s ease-in-out infinite',
        pulseRing: 'pulseRing 2.4s ease-out infinite',
        heartbeat: 'heartbeat 2.2s ease-in-out infinite',
      },
      boxShadow: {
        soft: '0 18px 50px -20px rgba(59, 51, 46, 0.25)',
        card: '0 10px 40px -18px rgba(59, 51, 46, 0.28)',
      },
    },
  },
  plugins: [],
}
