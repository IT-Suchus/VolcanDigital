import type { Config } from 'tailwindcss'

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'volcan-night': '#231F20',
        'volcan-clay': '#684036',
        'volcan-ember': '#D3A784',
        'volcan-taupe': '#9E8B7D',
        'volcan-cream': '#F7F3F0',
      },
      fontFamily: {
        serif: ['Poppins', 'sans-serif'],
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-brand': 'linear-gradient(135deg, #231F20 0%, #684036 55%, #D3A784 100%)',
      }
    },
  },
  plugins: [],
} satisfies Config
