/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        // Legacy dark theme (kept for tracker pages)
        obsidian: '#0A0A0A',
        cream: '#FFFEF9',

        // Bold warm palette
        ivory: '#FAFAF7',
        blush: '#F4EBE3',
        sand: '#E8D5C4',
        terracotta: '#B8644A',
        'terra-light': '#F0DED6',
        gold: '#C9A962',
        'gold-deep': '#A8893E',
        'gold-pale': '#F5EBD6',
        charcoal: '#1C1A17',
        stone: '#6B6058',
        feather: '#B5AAA2',
        champagne: '#F5EFE7',
        silver: '#A8A8A8',
        error: '#c0392b'
      },
      fontFamily: {
        serif: ['var(--font-cormorant)', 'Cormorant', 'Georgia', 'serif'],
        sans: ['var(--font-outfit)', 'Outfit', 'system-ui', 'sans-serif']
      },
      letterSpacing: {
        'ultra-wide': '0.55em',
        'wide': '0.3em'
      }
    }
  },
  plugins: []
};
