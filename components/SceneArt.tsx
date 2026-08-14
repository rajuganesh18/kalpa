/**
 * Storyboard scene art. In production, each scene id maps to a composited
 * sprite/background image (or a generated splash panel) served from storage —
 * swap the internals of <SceneArt/>, keep the scene ids in content unchanged.
 */

const fig = (x: number, y: number, s: number, c: string) => (
  <>
    <circle cx={x} cy={y - 26 * s} r={13 * s} fill="#221a10" />
    <path d={`M${x - 15 * s} ${y - 8 * s} q${15 * s} -${12 * s} ${30 * s} 0 l${4 * s} ${44 * s} h-${38 * s} z`} fill={c} />
  </>
);

const scenes: Record<string, (o?: Record<string, unknown>) => JSX.Element> = {
  nightroom: (o) => (
    <svg viewBox="0 0 400 150">
      <rect width="400" height="150" fill="#2A2140" />
      <rect x="290" y="16" width="82" height="62" fill="#1a1430" stroke="#4a3d6b" strokeWidth="3" />
      <circle cx="306" cy="30" r="3" fill="#E8A33D" /><circle cx="326" cy="50" r="3" fill="#C4362A" /><circle cx="348" cy="28" r="3" fill="#E8A33D" />
      {fig(120, 128, 1, "#0d0916")}
      <path d="M50 62 q10 -26 30 -8" stroke="#E8A33D" strokeWidth="3" fill="none" />
      <circle cx="50" cy="66" r="9" fill={o && o.lamp === false ? "#241a38" : "#E8A33D"} />
    </svg>
  ),
  search: () => (
    <svg viewBox="0 0 400 150">
      <rect width="400" height="150" fill="#1d1530" />
      <rect x="80" y="26" width="240" height="104" rx="6" fill="#101018" stroke="#3a2f56" strokeWidth="3" />
      <rect x="96" y="42" width="150" height="14" rx="4" fill="#232336" />
      <rect x="96" y="66" width="208" height="8" rx="3" fill="#1a1a28" />
      <rect x="96" y="80" width="180" height="8" rx="3" fill="#1a1a28" />
      <rect x="96" y="94" width="196" height="8" rx="3" fill="#1a1a28" />
      <rect x="96" y="112" width="90" height="10" rx="3" fill="#3b2f14" />
      <circle cx="330" cy="50" r="10" fill="none" stroke="#E8A33D" strokeWidth="3" />
      <line x1="337" y1="57" x2="346" y2="66" stroke="#E8A33D" strokeWidth="3" />
    </svg>
  ),
  photo: () => (
    <svg viewBox="0 0 400 150">
      <rect width="400" height="150" fill="#1d1530" />
      <rect x="110" y="14" width="180" height="122" fill="#EAD9B5" stroke="#221a10" strokeWidth="3" />
      <rect x="122" y="26" width="156" height="80" fill="#8a5a2b" />
      <circle cx="170" cy="56" r="11" fill="#221a10" /><path d="M158 70 q12 -9 24 0 l3 36 h-30 z" fill="#221a10" />
      <circle cx="240" cy="56" r="11" fill="#221a10" /><path d="M228 70 q12 -9 24 0 l3 36 h-30 z" fill="#221a10" opacity=".5" />
      <line x1="262" y1="20" x2="262" y2="112" stroke="#EAD9B5" strokeWidth="14" />
      <text x="200" y="128" textAnchor="middle" fontFamily="Mukta" fontSize="10" fill="#4a3c26">Diwali 2020 · Pune</text>
    </svg>
  ),
  cafe: () => (
    <svg viewBox="0 0 400 150">
      <rect width="400" height="150" fill="#EAD9B5" />
      <rect x="0" y="118" width="400" height="32" fill="#cbb98f" />
      {fig(120, 118, 1, "#C4362A")}{fig(280, 118, 1, "#5C6B3C")}
      <ellipse cx="200" cy="122" rx="52" ry="9" fill="#8a6a3a" />
      <rect x="184" y="104" width="12" height="12" rx="3" fill="#F6EEE0" stroke="#221a10" strokeWidth="2" />
      <rect x="206" y="104" width="12" height="12" rx="3" fill="#F6EEE0" stroke="#221a10" strokeWidth="2" />
      <path d="M40 20 h70 v10 h-70 z" fill="#C4362A" opacity=".5" />
    </svg>
  ),
  twoshot: () => (
    <svg viewBox="0 0 400 150">
      <rect width="400" height="150" fill="#241a38" />
      {fig(130, 150, 1.15, "#C4362A")}{fig(272, 150, 1.15, "#2E4A6B")}
      <circle cx="200" cy="24" r="12" fill="#F6EEE0" opacity=".14" />
    </svg>
  ),
  terrace: () => (
    <svg viewBox="0 0 400 150">
      <rect width="400" height="150" fill="#181126" />
      <circle cx="330" cy="30" r="14" fill="#F6EEE0" opacity=".2" />
      <circle cx="60" cy="46" r="2" fill="#F6EEE0" opacity=".5" /><circle cx="120" cy="24" r="2" fill="#F6EEE0" opacity=".4" /><circle cx="250" cy="40" r="2" fill="#F6EEE0" opacity=".4" />
      <rect x="0" y="120" width="400" height="30" fill="#0d0916" /><rect x="0" y="112" width="400" height="8" fill="#241a38" />
      {fig(150, 120, 1.05, "#C4362A")}{fig(255, 120, 1.05, "#2E4A6B")}
    </svg>
  ),
  door: () => (
    <svg viewBox="0 0 400 150">
      <rect width="400" height="150" fill="#1d1530" />
      <rect x="150" y="10" width="100" height="140" fill="#3b2c18" stroke="#221a10" strokeWidth="4" />
      <circle cx="238" cy="84" r="4" fill="#B98A2E" />
      {fig(200, 150, 1, "#2E4A6B")}
      <rect x="0" y="142" width="400" height="8" fill="#0d0916" />
    </svg>
  ),
  family: () => (
    <svg viewBox="0 0 400 150">
      <rect width="400" height="150" fill="#F0DFBE" />
      <path d="M0 0 h400 v12 h-400 z" fill="#C4362A" />
      {[40, 110, 180, 250, 320, 390].map(x => <circle key={x} cx={x} cy="12" r="5" fill="#E8A33D" />)}
      {fig(90, 142, 1, "#5C3A6E")}{fig(180, 142, 1, "#C4362A")}{fig(300, 142, 1, "#3E5C3A")}
      <rect x="150" y="128" width="110" height="14" rx="3" fill="#B98A2E" />
    </svg>
  ),
  notes: () => (
    <svg viewBox="0 0 400 150">
      <rect width="400" height="150" fill="#141021" />
      <rect x="120" y="8" width="160" height="136" rx="14" fill="#101018" stroke="#3a2f56" strokeWidth="3" />
      <rect x="134" y="26" width="80" height="10" rx="3" fill="#E8A33D" opacity=".8" />
      <rect x="134" y="48" width="130" height="7" rx="3" fill="#2c2c3e" />
      <rect x="134" y="62" width="118" height="7" rx="3" fill="#2c2c3e" />
      <rect x="134" y="76" width="126" height="7" rx="3" fill="#2c2c3e" />
      <rect x="134" y="98" width="96" height="7" rx="3" fill="#C4362A" opacity=".7" />
    </svg>
  ),
  window: () => (
    <svg viewBox="0 0 400 150">
      <rect width="400" height="150" fill="#241a38" />
      <rect x="60" y="8" width="280" height="134" fill="#EAD9B5" />
      <g stroke="#221a10" strokeWidth="6">
        {[60, 130, 200, 270, 340].map(x => <line key={x} x1={x} y1="8" x2={x} y2="142" />)}
        <line x1="60" y1="8" x2="340" y2="8" /><line x1="60" y1="76" x2="340" y2="76" /><line x1="60" y1="142" x2="340" y2="142" />
      </g>
      {fig(238, 150, 1, "#221a10")}
      <rect x="250" y="46" width="7" height="14" rx="3" fill="#101018" />
    </svg>
  )
};

export default function SceneArt({ id, o }: { id: string; o?: Record<string, unknown> }) {
  const S = scenes[id];
  return S ? S(o) : null;
}
