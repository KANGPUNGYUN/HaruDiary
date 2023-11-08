import localFont from "next/font/local";

const GowunBatang = localFont({
  src: [
    { path: "./GowunBatang-Regular.woff2", weight: "400", style: "normal" },
    { path: "./GowunBatang-Bold.woff2", weight: "700", style: "normal" },
  ],
  display: "swap",
});

const Agdasima = localFont({
  src: [
    { path: "./Agdasima-Regular.woff2", weight: "400", style: "normal" },
    { path: "./Agdasima-Bold.woff2", weight: "700", style: "normal" },
  ],
  display: "swap",
});

export { GowunBatang, Agdasima };
