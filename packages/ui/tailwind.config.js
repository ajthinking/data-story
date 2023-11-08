/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      // make a super small font size
      fontSize: {
        xxs: '.5rem',
      },
      spacing: {
        128: '32rem',
      },
      colors: {
        vsCodeWarmGray: {
          900: '#1E1E1E'
        }
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),    
  ],
  variants: {
    extend: {
      display: ['group-hover'],
    },
  },
};
