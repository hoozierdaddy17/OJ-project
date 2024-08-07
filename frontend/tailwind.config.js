/** @type {import('tailwindcss').Config} */
import filters from "tailwindcss-filters";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backdropBlur: {
        xs: "2px",
        sm: "4px",
        md: "8px",
        lg: "12px",
        xl: "16px",
        "2xl": "24px",
        "3xl": "40px",
        "4xl": "64px",
      },
    },
  },
  plugins: [
    filters, 
  ],
};
