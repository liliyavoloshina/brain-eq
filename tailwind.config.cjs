const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    colors: {
      violet: {
        10: '#7D9AFF',
        20: '#B6C5FB',
        30: '#4B5C9B'
      },
      azure: {
        10: '#4ADEFF',
        20: '#B6EFFB',
        30: '#349BB2'
      },
      green: {
        10: '#65FF62',
        20: '#B8FBB6',
        30: '#36B234'
      },
      canary: {
        10: '#FFD954',
        20: '#FBECB6',
        30: '#B29634'
      },
      orange: {
        10: '#FF823B',
        20: '#FBCFB6',
        30: '#B26134'
      },
      gray: {
        100: '#141B29',
        90: '#172030',
        80: '#202939',
        70: '#364152',
        60: '#4B5565',
        50: '#697586',
        40: '#9AA3B2',
        30: '#E3E8EF',
        20: '#EEF2F6',
        10: '#F8FAFC'
      },
      warning: '#FFF974',
      primary: 'var(--primary)',
      'primary-light': 'var(--primary-light)',
      'primary-muted': 'var(--primary-muted)',
      'primary-bg': 'var(--primary-bg)'
    },
    extend: {
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans]
      },
      boxShadow: {
        11: '0px 1px 11px 0px rgba(0, 0, 0, 0.1)'
      },
      backgroundImage: {
        'radial-gradient':
          'radial-gradient(50% 50% at 30% 50%, var(--primary) 0%, var(--primary-bg) 100%)'
      }
    }
  },
  plugins: []
}
