const flowbite = require("flowbite-react/tailwind");

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    flowbite.content(),
    'node_modules/flowbite-react/lib/esm/**/*.js',
  ],
  theme: {
    extend: {

      colors: {
        primary: {
          light: '#1c64f2',  // Light theme primary color
          dark: '#2c5282',   // Dark theme primary color
        },
        secondary: {
          light: '#4299e1',  // Light theme secondary color
          dark: '#2b6cb0',   // Dark theme secondary color
        },
        text: {
          light: '#4a5568',  // Light theme text color
          dark: '#e2e8f0',   // Dark theme text color
        },
        background: {
          light: '#f7fafc',  // Light theme background color
          dark: '#1a202c',   // Dark theme background color
        },
        accent: {
          light: '#e2e8f0',  // Light theme accent color
          dark: '#4a5568',   // Dark theme accent color
        },
      },

      boxShadow: {
        'md': '1px 1px 10px rgba(0, 0, 0, 0.3)',
      },
    },
    screens: {
      'lgx': {'max': '1023px'},
      // => @media (max-width: 1023px) { ... }

      'mdx': {'max': '767px'},
      // => @media (max-width: 767px) { ... }

      'smx': {'max': '639px'},
      // => @media (max-width: 639px) { ... }

      'xsx': {'max': '375px'},
      // => @media (max-width:375px) { ... }

      'xxsx': {'max': '320px'},
      // => @media (max-width:320px) { ... }


      'sm': '640px',
      // => @media (min-width: 640px) { ... }

      'md': '768px',
      // => @media (min-width: 768px) { ... }

      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }

    }
  },
  plugins: [
    require('flowbite/plugin'),
  ],
}