/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'Segoe UI', 'Roboto', 'Arial', 'sans-serif']
      },
      colors: {
        fiducial: {
          deep: '#007A3D',
          mint: '#DFF3EA',
          anthracite: '#2F3A3A',
          offwhite: '#F7FAF8',
          light: '#E8ECEA',
          accent: '#00A86B'
        }
      },
      boxShadow: {
        soft: '0 24px 80px rgba(47, 58, 58, 0.12)',
        glass: '0 20px 60px rgba(0, 122, 61, 0.12)'
      }
    }
  },
  plugins: []
};
