import type { Config } from "tailwindcss";

export default {
  content: [
    "../../apps/**/*.{ts,tsx}",
    "../../packages/ui/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {}
  },
  plugins: []
} satisfies Config;