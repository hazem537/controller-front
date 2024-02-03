/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        "new-blue": "#1d3c45",
        "new-gray": "#ced7d8",
        "new-orange": "#d2601a",
      },
    },
  },
  plugins: [],
};
