/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        GeneralSans: ["General Sans", "sans-serif"],
      },
      colors: {
        purple500: "#5955B3",
        purple200: "#B2B1DC",
        purple700: "#3E3C7F",
        selectedState: "#8580F0",
        grey500: "#121212",
        grey300: "#606060",
        grey200: "#929292",
        grey100: "#B6B6B6",
      },
    },
  },
  plugins: [],
};
