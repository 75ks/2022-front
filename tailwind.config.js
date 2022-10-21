module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "./src/**/**/.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        "scale-out-ver-top": "scale-out-ver-top 0.5s cubic-bezier(0.550, 0.085, 0.680, 0.530)   both",
        "scale-in-ver-top": "scale-in-ver-top 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940)   both"
      },
      keyframes: {
        "scale-out-ver-top": {
          "0%": {
            transform: "scaleY(1)",
            "transform-origin": "100% 0%",
            opacity: "1"
          },
          to: {
            transform: "scaleY(0)",
            "transform-origin": "100% 0%",
            opacity: "1"
          }
        },
        "scale-in-ver-top": {
          "0%": {
            transform: "scaleY(0)",
            "transform-origin": "100% 0%",
            opacity: "1"
          },
          to: {
            transform: "scaleY(1)",
            "transform-origin": "100% 0%",
            opacity: "1"
          }
        }
      }
    },
  },
  plugins: [],
}
