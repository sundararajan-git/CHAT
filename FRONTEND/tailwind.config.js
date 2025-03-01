/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [
    require("daisyui")
  ],
  daisyui: {
    themes: [
      // "light",
      // "dark",
      // "cupcake",
      // "bumblebee",
      // "emerald",
      // "corporate",
      // "synthwave",
      // "retro",
      // "cyberpunk",
      // "valentine",
      // "halloween",
      // "garden",
      // "forest",
      // "aqua",
      // "lofi",
      // "pastel",
      // "fantasy",
      // "wireframe",
      // "black",
      // "luxury",
      // "dracula",
      // "cmyk",
      // "autumn",
      // "business",
      // "acid",
      // "lemonade",
      // "night",
      // "coffee",
      // "winter",
      // "dim",
      // "nord",
      // "sunset",
    ],
  },
};



// @plugin "daisyui/theme" {
//   name: "light";
//   default: false;
//   prefersdark: false;
//   color-scheme: "light";
//   --color-base-100: oklch(100% 0 0);
//   --color-base-200: oklch(98% 0 0);
//   --color-base-300: oklch(95% 0 0);
//   --color-base-content: oklch(21% 0.006 285.885);
//   --color-primary: oklch(0.723 0.219 149.579);
//   --color-primary-content: oklch(98% 0.003 247.858);
//   --color-secondary: oklch(0.723 0.219 149.579);
//   --color-secondary-content: oklch(98% 0.003 247.858);
//   --color-accent: oklch(0.723 0.219 149.579);
//   --color-accent-content: oklch(98% 0.003 247.858);
//   --color-neutral: oklch(0.723 0.219 149.579);
//   --color-neutral-content: oklch(98% 0.003 247.858);
//   --color-info: oklch(0.723 0.219 149.579);
//   --color-info-content: oklch(98% 0.003 247.858);
//   --color-success: oklch(0.723 0.219 149.579);
//   --color-success-content: oklch(98% 0.003 247.858);
//   --color-warning: oklch(82% 0.189 84.429);
//   --color-warning-content: oklch(41% 0.112 45.904);
//   --color-error: oklch(63% 0.237 25.331);
//   --color-error-content: oklch(27% 0.105 12.094);
//   --radius-selector: 0.5rem;
//   --radius-field: 0.5rem;
//   --radius-box: 0.5rem;
//   --size-selector: 0.25rem;
//   --size-field: 0.25rem;
//   --border: 1px;
//   --depth: 0;
//   --noise: 1;
// }

