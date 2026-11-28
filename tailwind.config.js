/** @type {import('tailwindcss').Config} */
// Tailwind provides layout utilities only. Colors, type, spacing values and radii come from
// the Design System v2 tokens in app/globals.css (see docs/DESIGN-CHARTER.md), and the light
// theme is switched with [data-theme] on <html>, not Tailwind's dark: variant.
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // Preflight gives every element this border color; it must be a real color in both themes.
      borderColor: {
        DEFAULT: "var(--border)",
      },
    },
  },
  plugins: [],
};
