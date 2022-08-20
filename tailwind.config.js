/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      minWidth: {
        'mobile': '440px'
      },
      width: {
        '168': '42rem'
      },
      flexGrow: {
        '1/7': 1/7
      }
    },
  },
  plugins: [],
}
