const flowbite = require("flowbite-react/tailwind");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    flowbite.content(),
    'node_modules/flowbite-react/lib/esm/**/*.js',
  ],
  theme: {
    extend: {
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