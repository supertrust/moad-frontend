/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/modules/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/layout/**/*.{js,ts,jsx,tsx,mdx}',
    './src/sections/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
    colors: {
      primary: '#0868FD !important',
      secondary: '#2f48d1 !important',
      danger : '#F24747!important' ,
      'admin-primary': '#3772FF!important', 
      'admin-secondary': "#EBEFF6!important",
      'admin-light' : '#F8FAFF!important',
      "admin-error" : "#FF3252!important",
      "admin-stroke" : "#EAECF0!important",
      "admin-sub": "#99A0AC !important",
      "admin-gray-1" :"#9CA3AF",
      "admin-gray-2" :"#E7EFFF",
    }
  },
  plugins: [],
}
