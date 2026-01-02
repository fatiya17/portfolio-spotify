/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        spotify: {
          green: '#1DB954',
          black: '#191414',
          dark: '#121212',
          light: '#282828',
          grey: '#B3B3B3',
        }
      },
      fontFamily: {
        sans: ['Circular Spotify', 'sans-serif'], 
      }
    },
  },
  plugins: [],
}