module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    fontFamily: {
      aleo: ['Aleo', 'serif'],
      overpass: ['Overpass', 'sans-serif']
    },
    container: {
      center: true,
      padding: '1rem'
    },
    extend: {
      height: {
        hr: '1px'
      },
      aspectRatio: {
        '4/3': '4 / 3'
      },
      colors: {
        svelteOrange: '#FF3E00',
        svelteDark: '#F03A00',
        hotPink: '#FF1966',
        dark: '#111111',
        light: '#FAFAFA',

        'fg-primary': '#fff',
        'fg-secondary': '#9e9a9a',
        'bg-primary': '#071113',
        'bg-accent': '#073D4F',
        'bg-accent-dark': '#0A2E3B'
      }
    }
  },
  plugins: []
};
