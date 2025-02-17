/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        // Redéfinir le breakpoint 'md'
        'md': '1245px',
        // Vous pouvez également ajuster d'autres breakpoints si nécessaire
        'lg': '1440px', // Exemple de redéfinition pour 'lg'
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
      fontSize: {
        
        xss: '0.5rem',
        smm: '0.6rem',
        sm: '0.8rem',
        base: '1rem',
        xl: '1.25rem',
        '2xl': '1.563rem',
        '3xl': '1.953rem',
        '4xl': '2.441rem',
        '5xl': '3.052rem',
      },
      colors: {
        'secondary': '#141414',
        'tertiary' : '#090A09'
      },
    },
  },
  plugins: [],
}


