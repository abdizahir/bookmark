/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        neutral: {
          0: "#FFFFFF",
          100: "#E8F0EF",
          300: "#DDE9E7",
          400: "#C0CFCC",
          500: "#899492",
          800: "#4C5C59",
          900: "#051513",
          dark: {
            0: "#FFFFFF",
            100: "#B1B9B9",
            300: "#00706E",
            400: "#004746",
            500: "#004241",
            600: "#002E2D",
            800: "#001F1F",
            900: "#001414"
          },
        },
        teal: {
          700: "#014745",
          800: "#013C3B",
        },
        red: {
          600: "#FD4740",
          800: "#CB0A04",
        },
      },
       fontFamily: {
        sans: ['Manrope', 'sans-serif'],
      },
      // 3. Custom Font Sizes, Weights, and Line Heights for Text Presets
      fontSize: {
        // You can reference these by class, e.g. text-preset1, text-preset2, etc.
        'preset1': ['24px', { lineHeight: '140%' }],    // Bold
        'preset2': ['20px', { lineHeight: '140%' }],    // Bold
        'preset2sb': ['20px', { lineHeight: '120%' }],  // SemiBold
        'preset3': ['16px', { lineHeight: '140%' }],    // SemiBold
        'preset3m': ['16px', { lineHeight: '120%' }],   // Medium
        'preset4': ['14px', { lineHeight: '140%' }],    // SemiBold
        'preset4m': ['14px', { lineHeight: '150%' }],   // Medium
        'preset5': ['12px', { lineHeight: '140%' }],    // Medium
      },
      fontWeight: {
        medium: 500,
        semibold: 600,
        bold: 700,
      },
    },
  },
  plugins: [],
}