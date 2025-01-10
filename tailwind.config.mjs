/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['"CMU Serif"', 'serif'],
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        navy: '#3f6eba',
        contact: '#6f6f6f'
      },
      width: {
        letter: '816px'
      },
      height: {
        letter: '1056px'
      }
    },
  },
  plugins: [],
};
