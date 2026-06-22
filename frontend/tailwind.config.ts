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
        'volcan-ember': '#D3A784',
        'volcan-magma': '#B2845E',
        'volcan-clay': '#8C5A3C',
        'volcan-sand': '#EFE6D8',
        'volcan-stone': '#3A332E',
        'volcan-cream': '#FBF7F0',
      },
      fontFamily: {
        serif: ['Fraunces', 'serif'],
        sans: ['Inter', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-brand': 'linear-gradient(135deg, #231F20 0%, #B2845E 60%, #D3A784 100%)',
      }
    },
  },
  plugins: [],
} satisfies Config
