import type { Config } from 'tailwindcss'

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary-bg': '#1A1A1A',
        'primary-accent': '#FFD700',
        'primary-text': '#F5F5F5',
        'primary-text-bright': '#FFFFFF',
      },
      fontFamily: {
        'headline': ['Poppins', 'sans-serif'],
        'body': ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
} satisfies Config
