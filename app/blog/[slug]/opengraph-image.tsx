/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from "next/og";
import { notFound } from "next/navigation";
import { getPost } from "@/data/posts";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage({ params }: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  return new ImageResponse(
    (
      <div style={{ alignItems: "center", background: "#f5f1eb", color: "#1a1714", display: "flex", height: "100%", justifyContent: "center", position: "relative", width: "100%" }}>
        <img alt="" src={post.image} style={{ height: "100%", objectFit: "cover", position: "absolute", width: "100%" }} />
        <div style={{ alignItems: "center", background: "rgba(26,23,20,.45)", color: "#faf7f2", display: "flex", flexDirection: "column", height: "100%", justifyContent: "center", padding: 64, position: "absolute", textAlign: "center", width: "100%" }}>
          <div style={{ display: "flex", fontSize: 18, letterSpacing: 6 }}>S E R E I N J O U R N A L · {post.category.toUpperCase()}</div>
          <div style={{ display: "flex", fontFamily: "Georgia, serif", fontSize: 82, letterSpacing: -3, lineHeight: 1, marginTop: 28 }}>{post.title}</div>
          <div style={{ display: "flex", fontSize: 18, letterSpacing: 3, marginTop: 28 }}>THOUGHTFUL CLOTHES FOR THE EVERYDAY</div>
        </div>
      </div>
    ),
    { ...size },
  );
}
