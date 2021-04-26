module.exports = {
  mode: "jit",
  purge: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        black: {
          normal: "#171923",
          light: "rgb(45, 55, 72)",
        },
        white: {
          normal: "#ffffff",
          faded: "rgba(255, 255, 255, 0.8)",
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
