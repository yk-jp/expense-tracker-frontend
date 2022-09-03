/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      minWidth: {
        'mobile': '440px',
        '272': '68rem'
      },
      maxWidth: {
        '232': '58rem',
        '272': '68rem'
      },
      borderWidth: {
        '15': '16px',
        '20': '20px'
      },
      width: {
        '1/7': "14.286%",
        '112': '28rem',
        '168': '42rem',
      },
      flexGrow: {
        '1/7': 1/7
      },
      fontFamily: {
        sans: ['Helvetica', 'Arial', 'sans-serif'],
        fantasy: ['Copperplate', 'Papyrus', 'fantasy']
      }
    },
  },
  plugins: [],
}
