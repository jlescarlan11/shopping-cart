/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      minHeight: {
        screen: "calc(100vh - 10rem)",
      },
      fontSize: {
        "10xl": ["10rem", { lineHeight: "1" }],
      },
    },
  },
  plugins: [],
};
