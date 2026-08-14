"use client";

import { useRouter, useParams } from "next/navigation";
import { getSeries } from "@/lib/content/meera";
import { useSeriesState } from "@/lib/state";

export default function SeriesPage() {
  const router = useRouter();
  const { slug } = useParams<{ slug: string }>();
  const series = getSeries(slug);
  const { done, hydrated, reset } = useSeriesState(slug);

  if (!series) return <div className="frame"><p style={{ marginTop: 40 }}>Story not found.</p></div>;

  return (
    <div className="frame">
      <div className="hdr">
        <button className="back" onClick={() => router.push("/")}>←</button>
        <span className="brand" style={{ fontSize: "1rem" }}>{series.title}</span>
        <span style={{ width: 30 }} />
      </div>

      <div className="hero" style={{ background: series.gradient }}>
        <div className="t"><b>{series.title}</b><span>{series.world} · Season 1</span></div>
      </div>

      {series.eps.map(ep => {
        const isDone = done.includes(ep.n);
        const unlocked = ep.n === 1 || done.includes(ep.n - 1) || isDone;
        return (
          <button
            key={ep.n}
            className="eprow"
            disabled={!hydrated || !unlocked}
            onClick={() => router.push(`/s/${series.slug}/${ep.n}`)}
          >
            <span className={"n " + (isDone ? "done" : unlocked ? "now" : "todo")}>{isDone ? "✓" : ep.n}</span>
            <span className="g">
              <b>{ep.title}</b>
              <em>{isDone ? "Read — tap to revisit" : unlocked ? ep.days : "Finish the previous episode first"}</em>
            </span>
            <span className="c">{unlocked ? (isDone ? "↻" : "Read →") : "🔒"}</span>
          </button>
        );
      })}

      <p className="finale-note">Episode 5 · &ldquo;The Mother&rdquo; — season finale, coming soon</p>

      {done.length > 0 && (
        <div className="resetrow">
          <button onClick={() => { if (confirm("Restart the season? All choices will be forgotten.")) reset(); }}>
            Restart season (forget my choices)
          </button>
        </div>
      )}
    </div>
  );
}
