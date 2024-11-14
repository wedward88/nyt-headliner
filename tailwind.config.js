/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)"],
        mono: ["var(--font-mono)"],
        chomsky: ["var(--font-chomsky)"],
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["retro", "dracula"],
  },
};
