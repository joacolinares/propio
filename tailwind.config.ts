import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        darkslategray: {
          "100": "#AAAFB6",
          "200": "#BCBBBB"
        },
        darkslateblack: {
          "100": "#101010",
        },
        lightslategray: {
          "100": "#F6F8FA",
          "200": "#6E757C",
        },
        lightslateBlue: {
          "100": "#3D93DA",
        },
        lightslateBlack: {
          "100": "#000000",
        },
      },
      transitionProperty: {
        multiple: "width , height , backgroundColor , border-radius"
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
    screens: {
      'sm': '640px',
      'md': '769px',
      'lg': '1024px',
      'xl': '1280px',
      "2xl": "1400px",
      "3xl": "1600px",
      "4xl": '1800px'
    },
  },
  plugins: [],
};
export default config;
