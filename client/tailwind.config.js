import animate from "tailwindcss-animate"

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [animate, require("daisyui")],

  daisyui: {
    themes: false,
    darkTheme: false,
    base: false,
  },
}
