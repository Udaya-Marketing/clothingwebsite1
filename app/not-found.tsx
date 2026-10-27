import Link from "next/link";
import { StructuredData } from "@/components/ui/structured-data";
import { breadcrumbItems } from "@/lib/seo";

export default function NotFound() {
  return (
    <main className="not-found-page" id="main-content">
      <StructuredData data={breadcrumbItems([{ name: "Home", path: "/" }, { name: "Not found", path: "/" }])} />
      <p className="eyebrow">A little off the path</p>
      <h1 className="display-heading">This page took a different turn.</h1>
      <p>We could not find what you were looking for. The collection, journal, and studio are still here.</p>
      <div>
        <Link className="button-dark" href="/shop">Explore the collection <span aria-hidden="true">↗</span></Link>
        <Link className="text-link" href="/">Return home <span aria-hidden="true">↗</span></Link>
      </div>
    </main>
  );
}
