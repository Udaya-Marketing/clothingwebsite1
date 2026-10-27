import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Serein Studio",
    short_name: "Serein",
    description: "Thoughtful clothes for the everyday.",
    start_url: "/",
    display: "standalone",
    background_color: "#f5f1eb",
    theme_color: "#f5f1eb",
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml", purpose: "any" },
      { src: "/apple-touch-icon.png", sizes: "180x180", type: "image/png", purpose: "any" },
    ],
  };
}
