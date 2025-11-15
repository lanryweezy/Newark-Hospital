/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{tsx,jsx}",
    "./components/**/*.{tsx,jsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Lora', 'serif'],
      },
      colors: {
        primary: {
          DEFAULT: '#0A192F', // Navy
          light: '#172A46',
          lightest: '#303C55',
        },
        secondary: {
          DEFAULT: '#E63946', // Vibrant Red
        },
        accent: {
          DEFAULT: '#F5F7FA', // Off-White
        },
        light: '#FFFFFF',
        slate: {
          light: '#CCD6F6',
          DEFAULT: '#8892B0',
          dark: '#495670',
        },
      },
      boxShadow: {
        'md': '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)',
        'lg': '0 10px 15px -3px rgba(0, 0, 0, 0.05), 0 4px 6px -2px rgba(0, 0, 0, 0.025)',
        'xl': '0 20px 25px -5px rgba(0, 0, 0, 0.05), 0 10px 10px -5px rgba(0, 0, 0, 0.02)',
        'inner-lg': 'inset 0 2px 4px 0 rgba(0,0,0,0.04)',
        'glow-secondary': "0 0 15px theme('colors.secondary.DEFAULT'), 0 0 5px theme('colors.secondary.DEFAULT')",
        'glow-primary': "0 0 15px rgba(100, 255, 218, 0.1), 0 0 5px rgba(100, 255, 218, 0.05)",
      },
      keyframes: {
        'page-fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-in-from-left': {
          '0%': { opacity: '0', transform: 'translateX(-20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        'aurora': {
          'from': { backgroundPosition: '0% 50%' },
          'to': { backgroundPosition: '100% 50%' },
        },
        'focus-border-pulse': {
          '0%, 100%': { borderColor: "theme('colors.primary.lightest')" },
          '50%': { borderColor: "theme('colors.secondary.DEFAULT')" },
        },
      },
      animation: {
        'page-fade-in': 'page-fade-in 0.5s ease-out forwards',
        'fade-in-up': 'fade-in-up 0.6s ease-out forwards',
        'slide-in-from-left': 'slide-in-from-left 0.7s ease-out forwards',
        'aurora': 'aurora 10s ease-in-out infinite alternate',
        'focus-border-pulse': 'focus-border-pulse 2.5s ease-in-out infinite',
      },
    }
  },
  plugins: [],
}