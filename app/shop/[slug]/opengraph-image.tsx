/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from "next/og";
import { notFound } from "next/navigation";
import { products } from "@/data/products";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage({ params }: PageProps<"/shop/[slug]">) {
  const { slug } = await params;
  const product = products.find((entry) => entry.slug === slug);
  if (!product) notFound();

  return new ImageResponse(
    (
      <div style={{ background: "#f5f1eb", color: "#1a1714", display: "flex", height: "100%", width: "100%" }}>
        <img alt="" src={product.image} style={{ height: "100%", objectFit: "cover", width: "46%" }} />
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", padding: "64px", width: "54%" }}>
          <div style={{ color: "#4a423a", display: "flex", fontSize: 18, letterSpacing: 7 }}>S E R E I N</div>
          <div style={{ display: "flex", fontFamily: "Georgia, serif", fontSize: 68, letterSpacing: -2, lineHeight: 0.98, marginTop: 42 }}>{product.name}</div>
          <div style={{ color: "#4a423a", display: "flex", fontSize: 20, letterSpacing: 2, marginTop: 28 }}>{product.category.toUpperCase()} · {product.color.toUpperCase()}</div>
          <div style={{ color: "#4a423a", display: "flex", fontSize: 18, letterSpacing: 2, marginTop: 54 }}>THOUGHTFUL CLOTHES FOR THE EVERYDAY</div>
        </div>
      </div>
    ),
    { ...size },
  );
}
