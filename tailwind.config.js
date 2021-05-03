module.exports = {
  mode: "jit",
  purge: ["./src/pages/**/*.{js,ts,jsx,tsx}", "./src/components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      rotate: {
        30: "30deg",
      },
      colors: {
        black: {
          normal: "#171923",
          light: "rgb(45, 55, 72)",
        },
        white: {
          normal: "#ffffff",
          faded: "rgba(255, 255, 255, 0.78)",
        },
        secondary: "#FD2070",
      },
      fontSize: {
        "10xl": ["9.1rem", 1],
        vw: ["18vw", 1],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/forms"), require("@tailwindcss/line-clamp")],
};
