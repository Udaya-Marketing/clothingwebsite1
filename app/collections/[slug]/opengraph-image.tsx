/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from "next/og";
import { notFound } from "next/navigation";
import { getCollection } from "@/data/collections";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage({ params }: PageProps<"/collections/[slug]">) {
  const { slug } = await params;
  const collection = getCollection(slug);
  if (!collection) notFound();

  return new ImageResponse(
    (
      <div style={{ alignItems: "center", background: "#f5f1eb", color: "#1a1714", display: "flex", height: "100%", justifyContent: "center", position: "relative", width: "100%" }}>
        <img alt="" src={collection.image} style={{ height: "100%", objectFit: "cover", position: "absolute", width: "100%" }} />
        <div style={{ alignItems: "center", background: "rgba(26,23,20,.43)", color: "#faf7f2", display: "flex", flexDirection: "column", height: "100%", justifyContent: "center", position: "absolute", width: "100%" }}>
          <div style={{ display: "flex", fontSize: 18, letterSpacing: 8 }}>S E R E I N · {collection.subtitle.toUpperCase()}</div>
          <div style={{ display: "flex", fontFamily: "Georgia, serif", fontSize: 102, letterSpacing: -4, marginTop: 24 }}>{collection.title}</div>
          <div style={{ display: "flex", fontSize: 18, letterSpacing: 3, marginTop: 20 }}>THOUGHTFUL CLOTHES FOR THE EVERYDAY</div>
        </div>
      </div>
    ),
    { ...size },
  );
}
