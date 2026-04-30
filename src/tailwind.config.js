/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary": "#0d631b",
        "primary-container": "#2e7d32",
        "surface": "#f9f9f9",
        "on-background": "#1a1c1c",
        "outline": "#707a6c",
      },
      fontFamily: {
        'work-sans': ['"Work Sans"', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
