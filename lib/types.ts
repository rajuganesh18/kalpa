export type Flags = Record<string, boolean | undefined>;
export type Cond = (f: Flags) => boolean;

export interface Block {
  k: "cap" | "th" | "sp";
  t: string;
  w?: string;        // speaker (for "sp")
  when?: Cond;
}

export interface SfxTag { x: string; y: string; tx: string }

export type Node =
  | { t: "label"; x: string; when?: Cond }
  | { t: "panel"; sc: string; o?: Record<string, unknown>; sfx?: SfxTag; b: Block[]; when?: Cond }
  | { t: "phone"; time: string; from: string | ((f: Flags) => string);
      msgs: { tx: string; me?: boolean; when?: Cond }[];
      typing?: { tx: string; when: Cond }; when?: Cond }
  | { t: "choice"; flag: string; q: string;
      a: { v: boolean; tx: string }; b: { v: boolean; tx: string }; when?: Cond }
  | { t: "end"; big: string; next: string; memo?: string; when?: Cond };

export interface Episode {
  n: number;
  title: string;
  days: string;
  recap?: (f: Flags) => string[];
  nodes: Node[];
}

export interface Series {
  slug: string;
  title: string;
  world: string;
  worldColor: string;
  gradient: string;
  provocation: string;
  eps: Episode[];
}
