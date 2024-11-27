/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      display: ["Poppins", "sans-serif"]
    },
    colors: {
      primary: "#05B6D3",
      seconday:"#EF86E3",
    },
    extend: {},
  },
  plugins: [],
}

