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