/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        'main-background':  '#faf7f5',
        'navigation': '#c7f9cc',
        'footer': '#c7f9cc',
        'font-color': '#264653',
        'dark-green': '#264653',
        'hover-style': '#80ed99',
        'card-background': '#95d5b2',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
