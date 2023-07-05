/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      // make a super small font size
      fontSize: {
        xxs: ".5rem",
      },
      spacing: {
        128: "32rem",
      },
      colors: {
        vsCodeWarmGray: {
          900: "#1E1E1E"
        }
      }
    },
  },
  plugins: [],
  variants: {
    extend: {
      display: ["group-hover"],
    },
  },
};
