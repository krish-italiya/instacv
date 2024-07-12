/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";
import plugin from "preline/plugin";
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/preline/preline.js",
  ],
  theme: {
    extend: {},
  },
  plugins: [daisyui, plugin],
  daisyui: {
    themes: ["light", "dark", "cupcake", "retro"],
  },
  theme: {
    container: {
      padding: {
        DEFAULT: "1rem",
        sm: "2rem",
        lg: "4rem",
        xl: "5rem",
        "2xl": "6rem",
      },
    },
  },
};
