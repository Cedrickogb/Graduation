/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./node_modules/flowbite-react/**/*.js",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors:{
        "blaack":"rgba(8, 1, 5, 2)",
        "whiite":"rgba(151, 160, 170, 0.1)",
        "grey":"rgba(111, 110, 120, 0.4)",
        "purp":"rgba(133, 125, 250, 0.4)"
      },
      keyframes: {
        slidetoleft: {
          'from': { transform: 'translateX(150%)' },
          'to': { transform: 'translateX(0)' },
        },
        slidedown: {
          'from': { transform: 'translateY(-150%)' },
          'to': { transform: 'translateY(0)' },
        },
        smooth: {
          'from': { transform: 'translateY(-10%)' },
          'to': { transform: 'translateY(0)' },
        },
      },
      animation: {
        slidetoleft: 'slidetoleft 1s ease',
        slidedown: 'slidedown 1s ease',
        smooth: 'smooth 700ms ease',

      }
    },
  },
  plugins: [
    require("flowbite/plugin")
  ],
}