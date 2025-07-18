import type { Config } from "tailwindcss";
import daisyui from "daisyui";

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
      keyframes: {
        grid: {
          "0%": { transform: "translateY(-50%)" },
          "100%": { transform: "translateY(0)" },
        },
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
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(calc(-100% - var(--gap)))" },
        },
        "marquee-vertical": {
          from: { transform: "translateY(0)" },
          to: { transform: "translateY(calc(-100% - var(--gap)))" },
        },
      },
      animation: {
        grid: "grid 15s linear infinite",
        fullSpin: 'fullSpin 10s linear infinite',
        ripple: "ripple var(--duration,2s) ease calc(var(--i, 0)*.2s) infinite",
        marquee: "marquee var(--duration) linear infinite",
        "marquee-vertical": "marquee-vertical var(--duration) linear infinite",
      }
    },
  },
  plugins: [
    daisyui,
  ],
  daisyui: {
    themes: [
      {
        dim: {
          ...require("daisyui/src/theming/themes")["dark"],
          ".:hover": {
            "background-color": "#1ba39c",
            "border-color": "#1ba39c",
          },
          ".btn": {
            "border-radius": "14px",
          },
          ".btn-primary": {
            "background-color": "#1ca49e",
            "border-color": "#1ca49e",
            "color": "#fff",
          },
          ".btn-primary:hover": {
            "background-color": "#3d3d3d",
            "border-color": "#3d3d3d",
            "color": "#fff",
          },
          ".divider-primary::before, .divider-primary::after": {
            "background-color": "#1ba39c",
          },
        },
      },
    ],
  },
};
export default config;


