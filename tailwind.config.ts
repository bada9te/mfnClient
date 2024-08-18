import type { Config } from "tailwindcss";
import daisyui from "daisyui";
import dThemes from  "daisyui/src/theming/themes";

const config: Config = {

  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        primary: "#FFFFFF",
      },
      keyframes: {
        fullSpin: {
          '100%': {
            transform: 'rotate(-360deg)'
          }
        },
        ripple: {
          "0%, 100%": {
            transform: "translate(-50%, -50%) scale(1)",
          },
          "50%": {
            transform: "translate(-50%, -50%) scale(0.9)",
          },
        },
      },
      animation: {
        fullSpin: 'fullSpin 10s linear infinite',
        ripple: "ripple var(--duration,2s) ease calc(var(--i, 0)*.2s) infinite",
      }
    },
  },
  plugins: [
    daisyui,
  ],
  daisyui: {
    themes: [
      {
        dark: {
          ...require("daisyui/src/theming/themes")["dim"],
          ".btn-primary:hover": {
            "background-color": "#1ba39c",
            "border-color": "#1ba39c",
          },
          ".btn": {
            "border-radius": "14px",
          },
          ".divider-primary::before, .divider-primary::after": {
            "background-color": "#1ba39c",
          },
        }
      }
    ],
  },
};
export default config;


