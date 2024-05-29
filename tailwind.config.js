/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'purle-text': "9E78CF",
        'item--bg--color': "#15101C"
      }
    },
  },
  plugins: [],
}

