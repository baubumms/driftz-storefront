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

        "fg-primary":  "#fff",
        "fg-secondary": "#181818",
        "bg-primary": "#181818",
        "bg-accent": "#07212C",
      }
    }
  },
  plugins: []
};
