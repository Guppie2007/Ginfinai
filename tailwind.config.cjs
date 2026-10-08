/** GinfinAI design tokens. Bron: claude/ginfinai-website-overdracht.md */
module.exports = {
  content: ['./pages/**/*.{js,jsx,ts,tsx}', './components/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      screens: {
        // Mobiel menu en inline dienstenpaneel tot en met 900 px
        nav: '901px',
        // Doorlopende lijn links van de inhoud
        rail: '1000px',
        wide: '1400px',
      },
      colors: {
        brand: {
          DEFAULT: '#5B4BD6',
          deep: '#3F31B8',
          light: '#C9C0FF',
          ondark: '#8B7BFF',
          accent: '#A99BFF',
          panel: '#EAE6FF',
          rule: '#7A6CE6',
        },
        ink: {
          DEFAULT: '#130E28',
          2: '#18122F',
          3: '#1D1638',
          line: '#2A2350',
          border: '#4B3F8F',
        },
        lavender: '#F6F4FF',
        selected: '#EEEBFC',
        line: '#E4E0F5',
        muted: '#4A4560',
        subtle: '#6F6A80',
        field: '#857DA8',
        chip: '#CFC8EE',
        ondark: {
          DEFAULT: '#D9D3F5',
          2: '#B7AEDB',
          3: '#8F86B8',
        },
        error: '#B42318',
      },
      fontFamily: {
        sans: ['var(--font-onest)', 'Onest', 'system-ui', 'sans-serif'],
        brand: ['var(--font-quicksand)', 'Quicksand', 'Onest', 'sans-serif'],
        mono: ['var(--font-mono)', '"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      maxWidth: {
        page: '1280px',
      },
    },
  },
  plugins: [],
}
