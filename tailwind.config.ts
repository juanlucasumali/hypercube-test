import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        'diary': ['diary', 'sans-serif'],
        'joystix': ['joystix', 'sans-serif'],
        'start': ['start', 'sans-serif'],
      },
      fontWeight: {
        light: '300',
        normal: '400',
        bold: '700',
      }
    },
  },
  plugins: [],
};
export default config;
