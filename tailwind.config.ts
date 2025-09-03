import type { Config } from 'tailwindcss'

export default {
  theme: {
    extend: {
      colors: {
        // ===== Palettes =====
        gray: {
          0: '#ffffff',
          10: '#f9f9f9',
          50: '#f3f4f5',
          100: '#e8e9eb',
          200: '#d9dde0',
          300: '#c9cbd1',
          400: '#b4b7bd',
          500: '#91959c',
          600: '#74767c',
          700: '#5e6064',
          800: '#434447',
          900: '#292a2c',
          999: '#000000',
        },
        pink: {
          50: '#fff6fe',
          100: '#ffeffe',
          150: '#ffe8fd',
          200: '#ffd4fa',
          300: '#ff83f3',
          400: '#ff5bef',
          500: '#ff12e7',
          600: '#e200cb',
          700: '#b50598',
          800: '#90056d',
          900: '#6e0554',
        },
        mint: {
          50: '#e9fef8',
          100: '#d1f6ef',
          200: '#b4ede5',
          300: '#90e4d6',
          400: '#5ed7c3',
          500: '#0ec4b2',
          600: '#0db2a4',
          700: '#0a898b',
          800: '#08676c',
          900: '#064c52',
        },
        red: {
          50: '#fff2f0',
          100: '#ffe8e5',
          200: '#ffdcd8',
          500: '#ff7965',
        },
        yellow: {
          50: '#fffbf0',
          100: '#fff4d2',
          200: '#ffeebc',
          500: '#ffda6d',
          600: '#f1bd5d',
        },
        green: {
          50: '#f6fdf0',
          100: '#e9f9db',
          200: '#e1f8cb',
          500: '#a5e866',
        },
        violet: {
          50: '#f9f6ff',
          100: '#ede2ff',
          200: '#e4d4ff',
          500: '#c4a2ff',
        },
        transparency: {
          2: 'rgba(0, 0, 0, 0.02)',
          4: 'rgba(0, 0, 0, 0.04)',
          8: 'rgba(0, 0, 0, 0.08)',
          12: 'rgba(0, 0, 0, 0.12)',
          60: 'rgba(0, 0, 0, 0.6)',
        },
        // ===== Semantic aliases (Figma 변수 매핑) =====
        // Brand
        primary: '#0ec4b2', // Mint/500
        secondary: '#ff12e7', // Pink/500

        // Text
        'text-white': '#ffffff', // Gray/0
        'text-default': '#434447', // Gray/800
        'text-strong': '#292a2c', // Gray/900
        'text-subtle': '#91959c', // Gray/500
        'text-subtler': '#c9cbd1', // Gray/300
        'text-primary': '#0db2a4', // Mint/600
        'text-secondary': '#e200cb', // Pink/600

        // Fill
        fill: {
          white: '#ffffff', // Gray/0
          subtle: '#f3f4f5', // Gray/50
          default: '#e8e9eb', // Gray/100
          active: '#b4b7bd', // Gray/400
          disabled: '#f3f4f5', // Gray/50
          strong: '#74767c', // Gray/600
          deep: '#5e6064', // Gray/700
          black: '#000000', // Gray/999

          primary: '#5ed7c3', // Mint/400
          'primary-subtle': '#b4ede5', // Mint/200
          'primary-active': '#0db2a4', // Mint/600
          'primary-disabled': '#e9fef8', // Mint/50

          secondary: '#ff5bef', // Pink/400
          'secondary-subtle': '#ffe8fd', // Pink/200
          'secondary-active': '#e200cb', // Pink/600
          'secondary-disabled': '#fff6fe', // Pink/50
        },

        // Stroke
        stroke: {
          default: '#91959c', // Gray/500
          subtle: '#c9cbd1', // Gray/300
          subtler: ' #e8e9eb', // Gray/100
          active: '#5e6064', // Gray/700
          deep: '#434447', // Gray/800
          white: '#ffffff', // Gray/0

          primary: '#5ed7c3', // Mint/400
          'primary-subtle': '#90e4d6', // Mint/300
          'primary-active': '#0a898b', // Mint/700
          'primary-disabled': '#b4ede5', // Mint/200

          secondary: '#ff83f3', // Pink/300
          'secondary-subtle': '#ffd4fa', // Pink/200
          'secondary-active': '#b50598', // Pink/700
          'secondary-disabled': '#ffe8fd', // Pink/150

          // Extra colors
          mint: '#0ec4b2', // Mint/500
          pink: '#ff5bef', // Pink/400
          red: '#ff7965', // Red/500
          yellow: '#f1bd5d', // Yellow/600
          green: '#a5e866', // Green/500
          violet: '#c4a2ff', // Violet/500
        },

        // Background
        background: {
          white: '#ffffff', // Gray/0
          subtle: '#f9f9f9', // Gray/10

          // Mint
          'mint-faint': '#e9fef8', // Mint/50
          'mint-lighter': '#d1f6ef', // Mint/100
          'mint-light': '#b4ede5', // Mint/200

          // Pink
          'pink-faint': '#fff6fe', // Pink/50
          'pink-lighter': '#ffeffe', // Pink/100
          'pink-light': '#ffe8fd', // Pink/150

          // Red
          'red-faint': '#fff2f0', // Red/50
          'red-lighter': '#ffe8e5', // Red/100
          'red-light': '#ffdcd8', // Red/200

          // Yellow
          'yellow-faint': '#fffbf0', // Yellow/50
          'yellow-lighter': '#fff4d2', // Yellow/100
          'yellow-light': '#ffeebc', // Yellow/200

          // Gray
          'gray-faint': '#f3f4f5', // Gray/50
          'gray-lighter': '#e8e9eb', // Gray/100
          'gray-light': '#d9dde0', // Gray/200

          // Green
          'green-faint': '#f6fdf0', // Green/50
          'green-lighter': '#e9f9db', // Green/100
          'green-light': '#e1f8cb', // Green/200

          // Violet
          'violet-faint': '#f9f6ff', // Violet/50
          'violet-lighter': '#ede2ff', // Violet/100
          'violet-light': '#e4d4ff', // Violet/200
        },

        // Shadow
        shadow: {
          light: 'rgba(0,0,0,0.02)', // Transparency/2
          soft: 'rgba(0,0,0,0.04)', // Transparency/4
          strong: 'rgba(0,0,0,0.08)', // Transparency/8
          deep: 'rgba(0,0,0,0.12)', // Transparency/12
        },

        // Starcandy
        starcandy: {
          mint: '#5ed7c3', // Mint/400
          pink: '#ff83f3', // Pink/300
          red: '#ff7965', // Red/500
          yellow: '#ffda6d', // Yellow/500
          gray: '#c9cbd1', // Gray/300
          green: '#a5e866', // Green/500
          violet: '#c4a2ff', // Violet/500
        },
      },

      borderRadius: {
        xxs: '4px',
        xs: '8px',
        sm: '16px',
        md: '32px',
        lg: '40px',
        xl: '999px',
      },

      screens: {
        md: '769px', // min-width
      },
      maxWidth: {
        layout: '1440px', // max-width
      },

      fontFamily: {
        kor: ['var(--font-kor)'],
      },

      fontSize: {
        // Title
        'title-1': ['28px', { lineHeight: '40px' }],
        'title-2': ['22px', { lineHeight: '30px' }],
        'title-3': ['18px', { lineHeight: '26px' }],

        // Heading
        'heading-1': ['36px', { lineHeight: '52px' }],
        'heading-2': ['26px', { lineHeight: '36px' }],
        'heading-3': ['22px', { lineHeight: '30px' }],

        // Body
        'body-1': ['20px', { lineHeight: '36px' }],
        'body-2': ['20px', { lineHeight: '36px' }],
        'body-3': ['18px', { lineHeight: '32px' }],
        'body-4': ['16px', { lineHeight: '28px' }],
        'body-5': ['16px', { lineHeight: '28px' }],
        'body-6': ['16px', { lineHeight: '28px' }],

        // Label
        'label-1': ['26px', { lineHeight: '36px' }],
        'label-2': ['20px', { lineHeight: '28px' }],
        'label-3': ['24px', { lineHeight: '32px' }],
        'label-4': ['22px', { lineHeight: '30px' }],
        'label-5': ['20px', { lineHeight: '28px' }],
        'label-6': ['18px', { lineHeight: '26px' }],
        'label-7': ['18px', { lineHeight: '26px' }],
        'label-8': ['14px', { lineHeight: '20px' }],

        // Caption
        'caption-1': ['24px', { lineHeight: '32px' }],
        'caption-2': ['20px', { lineHeight: '28px' }],
        'caption-3': ['16px', { lineHeight: '22px' }],
      },

      fontWeight: {
        bold: '700',
        semibold: '600',
        medium: '500',
        regular: '400',
      },

      letterSpacing: {
        // tracking-* 로 사용
        // Title
        'title-2': '-0.48px',

        // Heading
        'heading-2': '-0.72px',

        // Body
        'body-1': '-0.6px',
        'body-2': '-0.6px',
        'body-3': '-0.5px',
        'body-4': '-0.4px',
        'body-5': '-0.4px',
        'body-6': '-0.4px',

        // Label
        'label-1': '-0.72px',
        'label-5': '-0.48px',
        'label-8': '-0.64px',

        // Caption
        'caption-3': '-0.32px',
      },
    },
  },
  plugins: [],
} satisfies Config
