import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'main-text': '#191919',
        'main-back-color': '#191919',
        'main-color': '#829f82',
      },
      fontFamily: {
        title: ['ClashDisplay'],
        body: ['Nunito'],
      },
    },
  },
  plugins: [],
};
export default config;
