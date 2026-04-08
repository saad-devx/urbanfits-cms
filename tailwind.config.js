/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gold': "linear-gradient(180deg, #FAE892 0%, #B3903E 100%)",
        'gold-land': "linear-gradient(90deg, #FAE892 0%, #B3903E 100%)",
        'metal-gold': "linear-gradient(270deg, rgba(250, 232, 146, 0.2) 0.02%, rgba(179, 144, 62, 0) 55.35%);"
      },
      fontSize: {
        '10px': '10px',
        '13px': '13px',
      },
      letterSpacing: {
        '1': '1.4px',
        '2': '4.2px',
        '3': '5.2px'
      },
      colors: {
        'gotham-black': '#383838',
      },
    },
  },
  plugins: [],
}
