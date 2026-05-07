/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#050505",
        bone: "#f3f0e9",
        acid: "#d7ff36",
        lilac: "#f1d7ff",
        coral: "#ff5b4a",
        cyan: "#5ae2ff",
        violet: "#8c6cff",
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["Archivo Black", "Inter", "ui-sans-serif", "system-ui"],
      },
      boxShadow: {
        glow: "0 24px 80px rgba(215, 255, 54, 0.18)",
      },
    },
  },
  plugins: [],
};
