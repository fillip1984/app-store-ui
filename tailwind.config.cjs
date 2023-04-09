/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    // See: https://tailwindcss.com/docs/container
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "2rem",
        lg: "3rem",
        xl: "6rem",
        "2xl": "12rem",
      },
    },
    extend: {},
  },
  plugins: [require("@tailwindcss/forms")],
};
