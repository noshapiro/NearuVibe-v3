import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg0: "var(--bg0)",
        bg1: "var(--bg1)",
        bg2: "var(--bg2)",
        bg3: "var(--bg3)",
        bg4: "var(--bg4)",
        t1: "var(--t1)",
        t2: "var(--t2)",
        t3: "var(--t3)",
        acc: "var(--acc)",
        acc2: "var(--acc2)",
        happy: "var(--happy)",
        neutral: "var(--neutral)",
        fearful: "var(--fearful)",
        angry: "var(--angry)",
        calm: "var(--calm)",
        surprised: "var(--surprised)",
      },
      borderRadius: {
        rs: "var(--rs)",
        rm: "var(--rm)",
        rl: "var(--rl)",
      },
    },
  },
  plugins: [],
};
export default config;
