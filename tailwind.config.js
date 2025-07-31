/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {

    extend: {
      colors: {
        // Style guide colors
        primary: {
          DEFAULT: '#E31B95',
          50: '#FCE7F3',
          100: '#F9A8D4',
          500: '#E31B95',
          600: '#C817AE',
          700: '#A613A0'
        },
        secondary: {
          DEFAULT: '#FF295D'
        },
        white: '#FFFFFF',
        black: '#000000',
        gray: {
          50: '#F9FAFB',
          100: '#F3F4F6',
          200: '#E5E7EB',
          300: '#D1D5DB',
          400: '#9CA3AF',
          500: '#6B7280',
          600: '#666666',
          700: '#2F2F2F',
          800: '#1F2937',
          900: '#111827',
          'custom-1': '#AFADAF',
          'custom-2': '#979797'
        },
        blue: {
          DEFAULT: '#2970BE'
        },
        green: {
          DEFAULT: '#04C373',
          dark: '#1C752E'
        },
        yellow: {
          DEFAULT: '#FFD500'
        },
        accent: {
          light: '#FCF6D8',
          pink: '#FFEDF0'
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        // Style guide typography scale
        'h1': ['60px', { lineHeight: '1.2', fontWeight: '700' }],
        'h2': ['50px', { lineHeight: '1.2', fontWeight: '700' }],
        'h3': ['40px', { lineHeight: '1.2', fontWeight: '700' }],
        'subtitle-1': ['25px', { lineHeight: '1.4', fontWeight: '600' }],
        'subtitle-2': ['21px', { lineHeight: '1.4', fontWeight: '600' }],
        'subtitle-3': ['19px', { lineHeight: '1.4', fontWeight: '400' }],
        'subtitle-4': ['18px', { lineHeight: '1.4', fontWeight: '500' }],
        'subtitle-5': ['17px', { lineHeight: '1.4', fontWeight: '400' }],
        'subtitle-6': ['16px', { lineHeight: '1.4', fontWeight: '500' }],
        'subtitle-7': ['15px', { lineHeight: '1.4', fontWeight: '400' }],
        'subtitle-8': ['14px', { lineHeight: '1.4', fontWeight: '400' }],
        'btn-1': ['20px', { lineHeight: '1.4', fontWeight: '700' }],
        'btn-2': ['18px', { lineHeight: '1.4', fontWeight: '700' }],
      },
      backgroundImage: {
        'gradient-brand': 'linear-gradient(180deg, #FF295D 0%, #E31B95 50%, #C817AE 100%)',
        'gradient-brand-hover': 'linear-gradient(90deg, #E31B95 0%, #C817AE 50%, #A613A0 100%)',
        'hero-gradient': 'linear-gradient(135deg, rgba(255, 126, 95, 0.8) 0%, rgba(254, 180, 123, 0.6) 100%)',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      boxShadow: {
        'card': '0 2px 16px rgba(0, 0, 0, 0.08)',
        'card-hover': '0 8px 32px rgba(0, 0, 0, 0.12)',
        'category': '0 4px 20px rgba(227, 27, 149, 0.15)',
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm: '2rem',
          lg: '4rem',
          xl: '5rem',
          '2xl': '6rem',
        },
      },
    },
  },
  plugins: [],
}
