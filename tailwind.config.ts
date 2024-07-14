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
    },
  },
  plugins: [
    daisyui,
  ],
  daisyui: {
    themes: [
      {
        light: {
          ...require("daisyui/src/theming/themes")["dracula"],
          ".btn-primary:hover": {
            "background-color": "#1ba39c",
            "border-color": "#1ba39c",
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


