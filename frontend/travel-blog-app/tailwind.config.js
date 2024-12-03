/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    fontFamily: {
      display: ["Poppins", "sans-serif"]
    },
    extend: {
      colors: {
        primary: "#05B6D3",
        seconday:"#EF86E3",
      },
      backgroundImage: {
        'bg-login-bg-img': "url('./src/assets/login.jpg')"
      }
    },
  },
  plugins: [],
}

