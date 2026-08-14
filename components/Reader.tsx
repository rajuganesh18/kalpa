"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Episode, Flags, Node, Series } from "@/lib/types";
import { useSeriesState } from "@/lib/state";
import SceneArt from "./SceneArt";

const visible = (when: ((f: Flags) => boolean) | undefined, f: Flags) => !when || when(f) === true;

function PanelNode({ nd, flags }: { nd: Extract<Node, { t: "panel" }>; flags: Flags }) {
  return (
    <section className="panel">
      <div className="scene">
        <SceneArt id={nd.sc} o={nd.o} />
        {nd.sfx && <div className="sfx" style={{ left: nd.sfx.x, top: nd.sfx.y }}>{nd.sfx.tx}</div>}
      </div>
      {nd.b.filter(b => visible(b.when, flags)).map((b, i) =>
        b.k === "cap" ? <div key={i} className="cap">{b.t}</div>
        : b.k === "th" ? <div key={i} className="th">{b.t}</div>
        : <div key={i} className="sp"><b>{b.w}</b>{b.t}</div>
      )}
    </section>
  );
}

function PhoneNode({ nd, flags }: { nd: Extract<Node, { t: "phone" }>; flags: Flags }) {
  const from = typeof nd.from === "function" ? nd.from(flags) : nd.from;
  return (
    <section className="panel">
      <div className="phone">
        <div className="pt">{nd.time}</div>
        <div className="pf">{from}</div>
        {nd.msgs.filter(m => visible(m.when, flags)).map((m, i) => (
          <div key={i} className={"m" + (m.me ? " me" : "")}>{m.tx}</div>
        ))}
        {nd.typing && nd.typing.when(flags) === true && <div className="typ">{nd.typing.tx}</div>}
      </div>
    </section>
  );
}

function ChoiceNode({ nd, flags, onPick }: {
  nd: Extract<Node, { t: "choice" }>; flags: Flags; onPick: (flag: string, v: boolean) => void;
}) {
  const val = flags[nd.flag];
  const answered = val === true || val === false;
  return (
    <section className={"choice" + (answered ? " done" : "")}>
      <div className="q">{nd.q}</div>
      <button className={answered && val === nd.a.v ? "pick" : ""} disabled={answered} onClick={() => onPick(nd.flag, nd.a.v)}>{nd.a.tx}</button>
      <button className={answered && val === nd.b.v ? "pick" : ""} disabled={answered} onClick={() => onPick(nd.flag, nd.b.v)}>{nd.b.tx}</button>
      <div className="sv">Your choice is saved. Meera will remember.</div>
    </section>
  );
}

export default function Reader({ series, ep }: { series: Series; ep: Episode }) {
  const router = useRouter();
  const { flags, done, hydrated, setFlag, markDone } = useSeriesState(series.slug);
  const needsRecap = !!ep.recap && !done.includes(ep.n);
  const [phase, setPhase] = useState<"recap" | "read">(needsRecap ? "recap" : "read");

  // Walk nodes: skip failed conditions, stop rendering past the first unanswered choice.
  const { shown, progress, ended } = useMemo(() => {
    const out: Node[] = [];
    let gate = false, total = 0, count = 0, ended = false;
    for (const nd of ep.nodes) {
      if (!visible(nd.when, flags)) continue;
      total++;
      if (gate) continue;
      count++;
      out.push(nd);
      if (nd.t === "choice") {
        const v = flags[nd.flag];
        if (v !== true && v !== false) gate = true;
      }
      if (nd.t === "end") ended = true;
    }
    return { shown: out, progress: Math.round((100 * count) / Math.max(total, 1)), ended };
  }, [ep, flags]);

  if (!hydrated) return null;

  if (phase === "recap" && ep.recap) {
    return (
      <div className="frame">
        <div className="hdr">
          <button className="back" onClick={() => router.push(`/s/${series.slug}`)}>←</button>
          <span className="brand">Kalpa</span><span style={{ width: 30 }} />
        </div>
        <div className="recapwrap">
          <div className="k">Episode {ep.n}</div>
          <h2>{ep.title}</h2>
          <div className="d">{ep.days}</div>
        </div>
        <div className="recap">
          <div className="k2">Your story so far</div>
          {ep.recap(flags).map((l, i) => <div key={i} className="l">{l}</div>)}
          <button className="gobtn" onClick={() => setPhase("read")}>Begin Episode {ep.n}</button>
        </div>
      </div>
    );
  }

  if (ended && !done.includes(ep.n)) markDone(ep.n);
  const next = series.eps.find(e => e.n === ep.n + 1);

  return (
    <div className="frame">
      <div className="rbar">
        <button className="back" onClick={() => router.push(`/s/${series.slug}`)}>←</button>
        <span className="pbar"><i style={{ width: `${progress}%` }} /></span>
        <span className="epname">Ep {ep.n} · {ep.title}</span>
      </div>

      {shown.map((nd, i) => {
        if (nd.t === "label") return <div key={i} className="scene-label">{nd.x}</div>;
        if (nd.t === "panel") return <PanelNode key={i} nd={nd} flags={flags} />;
        if (nd.t === "phone") return <PhoneNode key={i} nd={nd} flags={flags} />;
        if (nd.t === "choice") return <ChoiceNode key={i} nd={nd} flags={flags} onPick={setFlag} />;
        if (nd.t === "end") return (
          <section key={i} className="endcard">
            <div className="big">{nd.big}</div>
            <div className="nx">{nd.next}</div>
            <div className="memo">{nd.memo ?? "Your choices are saved. Meera will remember."}</div>
            {next
              ? <button className="n1" onClick={() => router.push(`/s/${series.slug}/${next.n}`)}>Continue → Episode {next.n}</button>
              : <button className="n1" onClick={() => router.push(`/s/${series.slug}`)}>Back to series</button>}
            <button className="ghost" onClick={() => router.push("/")}>Back to all stories</button>
          </section>
        );
        return null;
      })}
    </div>
  );
}
