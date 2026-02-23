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
        obsidian: '#0A0A0A',
        gold: '#C9A962',
        champagne: '#F5EFE7',
        silver: '#A8A8A8',
        cream: '#FFFEF9',
        error: '#e74c3c'
      },
      fontFamily: {
        serif: ['Cormorant', 'Georgia', 'serif'],
        sans: ['Outfit', 'system-ui', 'sans-serif']
      },
      letterSpacing: {
        'ultra-wide': '0.5em',
        'wide': '0.3em'
      }
    }
  },
  plugins: []
};
