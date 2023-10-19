/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      gridTemplateColumns: {
        100: "repeat(100, minmax(0, 1fr))",
      },
    },
  },
  plugins: [],
};
