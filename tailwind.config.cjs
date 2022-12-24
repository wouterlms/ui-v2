/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    './index.html',
    './src/**/*.{vue,ts}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      zIndex: {
        1: 1,
        2: 2,
        3: 3,
        4: 4,
        5: 5,
        6: 6,
        7: 7,
        8: 8,
        9: 9,
      },
      boxShadow: {
        primary: '0 2px 12px 0 rgba(7, 6, 6, 0.1)',
        light: '0 2px 12px 0 rgba(7, 6, 6, 0.05)',
      },
      colors: {
        accent: {
          primary: 'var(--accent-primary)',
          success: 'var(--success)',
          error: 'var(--error)',
          danger: 'var(--danger)',
        },

        gray: {
          primary: 'var(--gray-primary)',
          secondary: 'var(--gray-secondary)',
          tertiary: 'var(--gray-tertiary)',
          quaternary: 'var(--gray-quaternary)',
        },
      },
      textColor: {
        'primary': 'var(--text-primary)',
        'primary-inverted': 'var(--text-primary-inverted)',
        'secondary': 'var(--text-secondary)',
        'tertiary': 'var(--text-tertiary)',

        'input': 'var(--text-input)',
        'input-disabled': 'var(--text-input-disabled)',
        'input-placeholder': 'var(--text-input-placeholder)',
      },
      backgroundColor: {
        'primary': 'var(--bg-primary)',
        'primary-inverted': 'var(--bg-primary-inverted)',
        'secondary': 'var(--bg-secondary)',
        'tertiary': 'var(--bg-tertiary)',

        'input': 'var(--bg-input)',
        'input-disabled': 'var(--bg-input-disabled)',

        'switch': 'var(--bg-switch)',
      },
      borderColor: {
        primary: 'var(--border-primary)',
        secondary: 'var(--border-secondary)',
        tertiary: 'var(--border-tertiary)',

        input: 'var(--border-input)',
      },
    },
  },
}
