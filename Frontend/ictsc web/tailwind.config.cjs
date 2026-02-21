/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ictscBlue: "#1E40AF",
        ictscDark: "#0F172A",
        ictscLight: "#F1F5F9",
      },
    },
  },
  plugins: [],
}