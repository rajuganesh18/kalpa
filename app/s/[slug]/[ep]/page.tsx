"use client";

import { useParams } from "next/navigation";
import { getSeries } from "@/lib/content/meera";
import Reader from "@/components/Reader";

export default function EpisodePage() {
  const { slug, ep } = useParams<{ slug: string; ep: string }>();
  const series = getSeries(slug);
  const episode = series?.eps.find(e => e.n === Number(ep));

  if (!series || !episode) {
    return <div className="frame"><p style={{ marginTop: 40 }}>Episode not found.</p></div>;
  }
  return <Reader series={series} ep={episode} />;
}
