import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        primary: '#db0000'
      },
      borderRadius: {
        lg: '0.75rem'
      },
      boxShadow: {
        card: '0 10px 25px rgba(0,0,0,0.06)'
      }
    }
  },
  plugins: []
};

export default config;

