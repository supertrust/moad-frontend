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
      primary: 'var(--primary-color) !important',
      secondary: 'var(--primary-color) !important',
      danger : '#F24747!important' ,
      'admin-primary': 'var(--primary-color) !important',
      'admin-secondary': "#EBEFF6!important",
      'admin-light' : '#F8FAFF!important',
      "admin-error" : "#FF3252!important",
      "admin-stroke" : "#EAECF0!important",
      "admin-sub": "#99A0AC !important",
      "admin-sub-2" : "#535A65",
      "admin-gray-1" :"#9CA3AF",
      "admin-gray-2" :"#E7EFFF",
      "admin-button-1":"#5F7FB9",
      "admin-button-2":"#EBEFF6",
      "admin-success-bg":"#EBF8F1",
      "admin-success":"#1CBA75",
      "admin-danger-bg":"#EBF8F1",
      "admin-danger":"#1CBA75",
      "admin-warning-bg":"#FFF5DF",
      "admin-warning":"#FF9C2B",
      "admin-placeholder":"#CDD1D9",
      "admin-dark-1": "#1D2025",
      "admin-grey-50" : "#6B7280",
      "advertiser-primary" : 'var(--primary-color)',
      "advertiser-light" : 'var(--light-color)',
      "advertiser-light-border" : 'var(--light-border)',
      'advertiser-deep' : 'var(--deep-color)',
      "table-header" : 'var(--table-header)'
    },
  },
  plugins: [],
}
