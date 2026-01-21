/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    // START NEW CONFIG
    container: {
      center: true,     // Automatically centers the content
      padding: {
        DEFAULT: '1rem', // Default padding on mobile (16px)
        sm: '2rem',      // Tablet padding (32px)
        lg: '4rem',      // Desktop padding (64px) - BIG "Universe Padding"
        xl: '5rem',      // Large screen padding (80px)
        '2xl': '6rem',   // Extra large screen padding (96px)
      },
    },
    // END NEW CONFIG
    extend: {
      colors: {
        brand: {
          light: '#6CA12B',
          DEFAULT: '#8FA67A',
          dark: '#7A8F68',
        }
      }
    },
  },
  plugins: [],
}