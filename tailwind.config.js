/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#00B780",
        info: "#2F80ED",
        error: "#BA1A1A",
      },
      fontFamily: {
        pop: ["Poppins_400Regular"],
        popmedium: ["Poppins_500Medium"],
        popsemi: ["Poppins_600SemiBold"],
        popbold: ["Poppins_700Bold"],
        spacemono: ["SpaceMono"],
        poly: ["Poly_400Regular"],
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
      },
      animation: {
        fadeIn: "fadeIn 500ms ease-in-out",
      },
    },
  },
  plugins: [],
};
