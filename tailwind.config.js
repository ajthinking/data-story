module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
        colors: {            
            malibu: {
                500: '#61dafb',
                600: '#52B8D2',
                700: '#4499AF',
                800: '#32879d',
                900: '#1b7086',
            },
        },
        fontSize: {
            'xxs': '.65rem',
        },
        minWidth: {
            'bajs': '50%'
        }        
    },
             
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
