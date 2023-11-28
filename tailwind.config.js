/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        blue: "#20233E",
        gray: {
          100: "#F5F5F5",
          300: "#F1EFEF",
          400: "#EAEAEA",
          500: "#D8D8D8",
          900: "#212121",
        },
        indigo: {
          50: "#E8EAF6",
          400: "#5C6BC0",
        },
      },
      opacity: {
        8: ".08",
        24: ".24",
        32: ".32",
        87: ".87",
      },
    },
  },
  plugins: [
    // https://github.com/tailwindlabs/tailwindcss-intellisense/issues/227#issuecomment-1139895799
    ({ addUtilities }) => {
      addUtilities({
        ".headline-xl": {
          "font-size": "3.938rem",
          "font-weight": "700",
          "letter-spacing": "0.016em",
        },
        ".headline-lg": {
          "font-size": "2.188rem",
          "font-weight": "600",
          "letter-spacing": "0.016em",
        },
        ".headline-md": {
          "font-size": "1.625rem",
          "font-weight": "500",
          "letter-spacing": "0.016em",
        },
        ".headline-sm": {
          "font-size": "1.313rem",
          "font-weight": "600",
          "letter-spacing": "0.009em",
        },
        ".body": {
          "font-size": "1rem",
          "font-weight": "400",
          "letter-spacing": "0.009em",
        },
        ".body-2": {
          "font-size": "1rem",
          "font-weight": "500",
          "letter-spacing": "0.009em",
        },
        ".body-3": {
          "font-size": "1rem",
          "font-weight": "700",
          "letter-spacing": "0.016em",
        },
      });
    },
  ],
};
