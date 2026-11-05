/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: '#020B18',
        midnight: '#061629',
        'teal-deep': '#003B42',
        cyan: '#00C8FF',
        neon: '#00E878',
        emerald: '#00B889',
        body: '#C7D3DF',
        brandblue: '#087CB8',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
        display: ['Oswald', 'Bebas Neue', 'Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'brand-gradient': 'linear-gradient(110deg, #00C8FF 0%, #00E878 100%)',
      },
      opacity: Object.fromEntries(
        Array.from({ length: 101 }, (_, index) => [index, String(index / 100)]),
      ),
      boxShadow: {
        'glow-cyan': '0 0 60px -18px rgba(0, 200, 255, 0.45)',
        'glow-green': '0 0 70px -20px rgba(0, 232, 120, 0.35)',
        'panel': '0 32px 90px -55px rgba(0, 200, 255, 0.55)',
      },
      transitionTimingFunction: {
        smooth: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      keyframes: {
        'hero-zoom': {
          from: { transform: 'scale(1.02)' },
          to: { transform: 'scale(1.12)' },
        },
        'fade-up': {
          from: { opacity: '0', transform: 'translateY(18px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'menu-in': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        'line-grow': {
          from: { transform: 'scaleX(0)' },
          to: { transform: 'scaleX(1)' },
        },
        'float-slow': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
      },
      animation: {
        'hero-zoom': 'hero-zoom 26s ease-in-out infinite alternate',
        'fade-up': 'fade-up 0.8s cubic-bezier(0.22, 1, 0.36, 1) both',
        'menu-in': 'menu-in 0.3s ease-out both',
        'line-grow': 'line-grow 0.9s cubic-bezier(0.22, 1, 0.36, 1) both',
        'float-slow': 'float-slow 7s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
