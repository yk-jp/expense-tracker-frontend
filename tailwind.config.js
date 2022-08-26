/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      minWidth: {
        'mobile': '440px'
      },
      borderWidth: {
        '15': '16px',
        '20': '20px'
      },
      width: {
        '1/7': "14.286%",
        '112': '28rem',
        '168': '42rem'
      },
      flexGrow: {
        '1/7': 1/7
      }
    },
  },
  plugins: [],
}
