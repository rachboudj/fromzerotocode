/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Space Mono', 'system-ui', 'monospace'],
        heading: ['Syne', 'serif'],
      },
      screens: {
        'phone': {'max' : '375px'},
        'tablet': {'max' : '768px'},
        'laptop': {'max' : '1024px'},
        'desktop': {'max' : '1280px'},
      },
    },
  },
  plugins: [],
}

