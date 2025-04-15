/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      margin: {
        '-54': '-13.5rem', // 54 = 13.5 * 4 (as per Tailwind scale)
      },
    },
  },
  plugins: [],
});
