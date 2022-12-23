module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}', './static/**/*.{css}'],
  theme: {
    fontFamily: {
      aleo: ['Aleo', 'serif'],
      overpass: ['Overpass', 'sans-serif'],
    },
    container: {
      center: true,
      padding: '0.7rem',
    },
    extend: {
      height: {
        'hr': '1px',
      },
      aspectRatio: {
        '4/3': '4 / 3',
      },
      colors: {
        svelteOrange: '#FF3E00',
        svelteDark: '#F03A00',
        hotPink: '#FF1966',
        dark: '#111111',
        light: '#FAFAFA',


        "light-gray": "#C7C7C7",
        "dark-blue": "#07212C",
        "dark-gray": "#181818",
      }
    }
  },
  plugins: []
};
