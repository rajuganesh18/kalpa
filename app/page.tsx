"use client";

import Link from "next/link";
import { allSeries } from "@/lib/content/meera";
import { useSeriesState } from "@/lib/state";

const CycleMark = () => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden>
    <path d="M12 3a9 9 0 1 0 9 9" stroke="#E8A33D" strokeWidth="2.4" strokeLinecap="round" />
    <path d="M12 8a4 4 0 1 1-4 4" stroke="#E8A33D" strokeWidth="2.4" strokeLinecap="round" />
  </svg>
);

export default function Shelf() {
  const meera = allSeries[0];
  const { done, hydrated } = useSeriesState(meera.slug);
  const next = meera.eps.find(e => !done.includes(e.n));

  return (
    <div className="frame">
      <div className="hdr">
        <span className="markrow"><CycleMark /><span className="brand">Kalpa</span></span>
        <span style={{ fontSize: ".68rem", opacity: .5, letterSpacing: 2 }}>EN</span>
      </div>

      <div className="today">
        <b>Today · Monday</b>
        <span style={{ opacity: .7 }}>
          {!hydrated ? "…" : next ? `Meera Ep ${next.n} is waiting` : "You're all caught up"}
        </span>
      </div>

      <Link href={`/s/${meera.slug}`} className="scard">
        <span className="art" style={{ background: meera.gradient }}>
          <span className="badge" style={{ color: meera.worldColor }}>{meera.world}</span>
        </span>
        <span className="meta">
          <span className="ttl">{meera.title}</span>
          <span className="prov">{meera.provocation}</span>
          <span className="row">
            <span>{meera.eps.length} episodes · Season 1</span>
            <span style={{ color: "#E8A33D" }}>
              {!hydrated ? "" : done.length ? (next ? `Continue Ep ${next.n} →` : "Read again →") : "Start reading →"}
            </span>
          </span>
        </span>
      </Link>

      <div className="scard soon">
        <span className="art" style={{ background: "linear-gradient(150deg,#2b1f10,#8a5a2b 55%,#b98a2e)" }}>
          <span className="badge" style={{ color: "#B98A2E" }}>Itihaas</span>
        </span>
        <span className="meta">
          <span className="ttl">Ranganatha</span>
          <span className="prov">He doesn&apos;t know his city falls next year. Don&apos;t tell him.</span>
          <span className="row"><span>Season 1</span><span style={{ color: "#E8A33D" }}>Coming soon</span></span>
        </span>
      </div>

      <div className="scard soon">
        <span className="art" style={{ background: "linear-gradient(150deg,#241a38,#5c3a6e 60%,#9a6fb0)" }}>
          <span className="badge" style={{ color: "#c9a6e0" }}>Anime</span>
        </span>
        <span className="meta">
          <span className="ttl">Hikari</span>
          <span className="prov">She remembers a conversation you haven&apos;t had yet.</span>
          <span className="row"><span>Season 1</span><span style={{ color: "#E8A33D" }}>Coming soon</span></span>
        </span>
      </div>
    </div>
  );
}
