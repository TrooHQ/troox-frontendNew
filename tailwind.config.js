/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        Inter: ["Inter", "sans-serif"],
      },
      backgroundImage: {
        footer: "url('/src/assets/FooterImage.svg')",
      },
      colors: {
        black100: "#CBCAE7",
        black500: "#121212",
        black200: "#B2B1DC",
        black600: "#504DA3",
        black700: "#3E3C7F",
        selectedState: "#8580F0",
        grey700: "#0D0D0D",
        grey500: "#121212",
        grey300: "#606060",
        grey200: "#929292",
        grey100: "#B6B6B6",
      },
    },
  },
  plugins: [],
};
