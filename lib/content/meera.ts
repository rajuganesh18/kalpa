import { Series, Block } from "../types";

const cap = (t: string): Block => ({ k: "cap", t });
const th = (t: string): Block => ({ k: "th", t });
const sp = (w: string, t: string): Block => ({ k: "sp", w, t });

export const meera: Series = {
  slug: "meera",
  title: "Meera",
  world: "Modern Hearts",
  worldColor: "#E8A33D",
  gradient: "linear-gradient(150deg,#5b2320,#c4362a 60%,#e8a33d)",
  provocation: "Twenty-one days to her wedding. One message just changed everything.",
  eps: [
    /* ---------------- EP 1 ---------------- */
    {
      n: 1, title: "Twenty-One Days", days: "21 days to the wedding",
      nodes: [
        { t: "label", x: "Scene 1 · Her room, night" },
        { t: "panel", sc: "nightroom", b: [cap("Twenty-one days to the wedding. The house has never been louder. Her room has never been quieter.")] },
        { t: "panel", sc: "photo", b: [th("\u201CMeera weds Aditya.\u201D Gold letters. It looks like someone else's name.")] },
        { t: "phone", time: "11:02 PM", from: "KABIR", msgs: [{ tx: "Heard the news. Congratulations, I guess. I'm back in Bangalore." }] },
        { t: "choice", flag: "kabir_open", q: "Three years of silence, broken at 11 PM. What should Meera do?",
          a: { v: true, tx: "Reply — just a thank-you." }, b: { v: false, tx: "Delete the message." } },
        { t: "phone", when: f => f.kabir_open === true, time: "11:04 PM", from: "KABIR",
          msgs: [{ me: true, tx: "Thanks. Hope Bangalore treats you better this time." },
                 { tx: "You sound happy. Or like someone practising sounding happy." }] },
        { t: "panel", when: f => f.kabir_open === true, sc: "nightroom", o: { lamp: false },
          b: [th("Three years, and he still reads me in one line.")] },
        { t: "panel", when: f => f.kabir_open === false, sc: "nightroom", o: { lamp: false }, sfx: { x: "72%", y: "10%", tx: "TAP" },
          b: [cap("Some doors you have to close hard enough that the whole house hears."), th("Twenty-one days. No ghosts allowed.")] },
        { t: "label", x: "Scene 2 · The shagun, Sunday" },
        { t: "panel", sc: "family", b: [cap("Sunday. The Kapoors arrive with sweets, silk, and Aditya's easy smile."), sp("ADITYA", "Your mother's chai could end wars, Meera.")] },
        { t: "panel", sc: "family", sfx: { x: "66%", y: "8%", tx: "RING" },
          b: [cap("His phone, face-up on the sofa: incoming call — \u201CR\u201D. He glances a fraction too long."), sp("ADITYA", "Two minutes. Work.")] },
        { t: "panel", sc: "window", b: [cap("From the window, Meera watches the man she is going to marry become a man she has never met.")] },
        { t: "choice", flag: "asked_aditya", q: "He comes back in, smile reinstalled. What should Meera do?",
          a: { v: true, tx: "Ask about the call — lightly." }, b: { v: false, tx: "Say nothing. Keep watching." } },
        { t: "panel", when: f => f.asked_aditya === true, sc: "twoshot",
          b: [sp("MEERA", "Long call? Everything okay at work?"), sp("ADITYA", "Vendor issue. Boring stuff. You'd fall asleep.")] },
        { t: "panel", when: f => f.asked_aditya === true, sc: "twoshot",
          b: [{ k: "th", when: f => f.kabir_open === true, t: "\u201CPractising sounding happy.\u201D Kabir's line. Except now it fits Aditya." },
              { k: "th", when: f => f.kabir_open !== true, t: "Boring stuff doesn't take the smile out of a man's eyes." }] },
        { t: "panel", when: f => f.asked_aditya === false, sc: "family", sfx: { x: "70%", y: "10%", tx: "TAP" },
          b: [cap("Passing with the tray, she sees his thumb on the screen. Recents → delete. He doesn't notice her notice."),
              { k: "th", when: f => f.kabir_open === true, t: "Everyone's practising something today." },
              { k: "th", when: f => f.kabir_open !== true, t: "A man who deletes a two-minute work call." }] },
        { t: "label", x: "Scene 3 · That night" },
        { t: "phone", time: "11:47 PM", from: "UNKNOWN NUMBER",
          msgs: [{ when: f => f.asked_aditya === true, tx: "He lied to you today. Ask him about Pune." },
                 { when: f => f.asked_aditya !== true, tx: "Don't marry him. Ask him about Pune." }],
          typing: { when: f => f.kabir_open === true, tx: "Kabir is typing…" } },
        { t: "end", big: "Twenty days to the wedding.", next: "Episode 2 · \u201CPune\u201D" }
      ]
    },
    /* ---------------- EP 2 ---------------- */
    {
      n: 2, title: "Pune", days: "20 days to the wedding",
      recap: f => {
        const L: string[] = [];
        L.push(f.kabir_open ? "You told Meera to reply to Kabir. The door is open." : "You had Meera delete Kabir's message. No ghosts allowed.");
        L.push(f.asked_aditya ? "You asked Aditya about the call. \u201CVendor issue,\u201D he said — a beat too fast." : "You said nothing — and watched Aditya delete the call from his log.");
        L.push("Then an unknown number wrote: \u201CAsk him about Pune.\u201D");
        return L;
      },
      nodes: [
        { t: "label", x: "Scene 1 · Morning" },
        { t: "panel", sc: "nightroom", b: [cap("Morning does not make the message smaller. Meera has read it eleven times."), th("Pune. He's never once said the word Pune.")] },
        { t: "phone", time: "9:12 AM", from: "UNKNOWN NUMBER",
          msgs: [{ when: f => f.asked_aditya === true, tx: "He lied to you today. Ask him about Pune." },
                 { when: f => f.asked_aditya !== true, tx: "Don't marry him. Ask him about Pune." }] },
        { t: "choice", flag: "texted_unknown", q: "A stranger who knows too much. What should Meera do?",
          a: { v: true, tx: "Text back: \u201CWho is this?\u201D" }, b: { v: false, tx: "Block the number. Find out herself." } },
        { t: "phone", when: f => f.texted_unknown === true, time: "9:14 AM", from: "UNKNOWN NUMBER",
          msgs: [{ me: true, tx: "Who is this?" }], typing: { when: () => true, tx: "typing… then nothing. All day." } },
        { t: "panel", when: f => f.texted_unknown === false, sc: "nightroom", o: { lamp: false }, sfx: { x: "70%", y: "10%", tx: "BLOCK" },
          b: [cap("Blocked. But blocked numbers don't unring bells."), th("Fine. I'll ask Pune myself.")] },
        { t: "label", x: "Scene 2 · The search" },
        { t: "panel", sc: "search", b: [cap("Lunch break. An old company page, cached. Aditya Kapoor — Senior Analyst, Pune office, 2019 to 2021."), th("\u201CBorn and brought up Bangalore boy.\u201D His exact words. First dinner.")] },
        { t: "panel", sc: "cafe", b: [cap("Vicky — wedding planner, oldest friend, human newswire — narrows her eyes over coffee."),
            sp("VICKY", "Every family buries something before a wedding, Mimi. The only question is how deep. Want me to dig?"),
            { k: "th", when: f => f.asked_aditya === true, t: "\u201CVendor issue.\u201D The lie sits differently now." }] },
        { t: "label", x: "Scene 3 · The photo" },
        { t: "panel", sc: "photo", b: [cap("11:40 PM. Six years deep in a stranger's tagged photos. Diwali 2020, Pune. Aditya — and beside him, someone cropped by the frame."), th("The tag is still there. r_e_…")] },
        { t: "phone", when: f => f.texted_unknown === true, time: "11:47 PM", from: "UNKNOWN NUMBER", msgs: [{ tx: "Rhea." }] },
        { t: "panel", when: f => f.texted_unknown === false, sc: "search",
          b: [cap("She taps the half-hidden tag. The profile loads slowly, like it knows."), th("Rhea Kulkarni. Pune.")] },
        { t: "end", big: "Nineteen days to the wedding.", next: "Episode 3 · \u201CRhea\u201D" }
      ]
    },
    /* ---------------- EP 3 ---------------- */
    {
      n: 3, title: "Rhea", days: "19 days to the wedding",
      recap: f => {
        const L: string[] = [];
        L.push(f.texted_unknown ? "You texted the unknown number back. Hours later, one word came: \u201CRhea.\u201D" : "You blocked the number and dug yourself — and found the name: Rhea Kulkarni.");
        L.push("Aditya lived in Pune for two years. He told Meera he'd never left Bangalore.");
        if (f.kabir_open) L.push("Kabir is still typing, somewhere.");
        return L;
      },
      nodes: [
        { t: "label", x: "Scene 1 · The name has a face" },
        { t: "panel", sc: "search", b: [cap("Rhea Kulkarni. Architect. Pune. Last post eight months ago. The smile of someone who left something behind on purpose."), th("Nineteen days. And I'm stalking a stranger at 1 AM.")] },
        { t: "panel", sc: "notes", b: [cap("A message drafted. Deleted. Drafted again. Her thumb hovers over two futures.")] },
        { t: "choice", flag: "met_rhea", q: "One of them has the answers. Who should Meera ask?",
          a: { v: true, tx: "Message Rhea. Meet her quietly." }, b: { v: false, tx: "Go to Aditya. Say the name to his face." } },
        { t: "label", when: f => f.met_rhea === true, x: "Scene 2 · A cafe in Indiranagar" },
        { t: "phone", when: f => f.met_rhea === true, time: "8:03 AM", from: "RHEA",
          msgs: [{ me: true, tx: "You don't know me. I'm marrying Aditya Kapoor in three weeks. I think you knew him in Pune." },
                 { tx: "I'm in Bangalore till Friday. Coffee. Come alone." }] },
        { t: "panel", when: f => f.met_rhea === true, sc: "cafe",
          b: [cap("She is exactly as composed as her photos. She stirs her coffee like she's been waiting two years for this conversation."), sp("RHEA", "So. He's marrying again.")] },
        { t: "panel", when: f => f.met_rhea === true, sc: "cafe",
          b: [sp("RHEA", "We were engaged. 2020. Sangeet done, cards printed. I walked out ten days before."), sp("MEERA", "Why?"),
              sp("RHEA", "Because his mother runs that house, and I asked him to stand up for me once. Once. He chose silence. He's not cruel, Meera. He's a coward. Worse — a polite one.")] },
        { t: "panel", when: f => f.met_rhea === true, sc: "cafe",
          b: [sp("RHEA", "The ring was my grandmother's. His mother still has it. Ask him about that — and watch which one of us he protects."), th("Ten days before. I'm at nineteen.")] },
        { t: "label", when: f => f.met_rhea === false, x: "Scene 2 · Aditya's terrace" },
        { t: "panel", when: f => f.met_rhea === false, sc: "terrace",
          b: [cap("She doesn't rehearse. Rehearsed questions get rehearsed answers."), sp("MEERA", "Rhea Kulkarni.")] },
        { t: "panel", when: f => f.met_rhea === false, sc: "terrace",
          b: [cap("The silence lasts four seconds. She counts."), sp("ADITYA", "Who told you?"), th("Not \u201Cwho is she\u201D. Who TOLD you.")] },
        { t: "panel", when: f => f.met_rhea === false, sc: "terrace",
          b: [{ k: "sp", when: f => f.asked_aditya === true, w: "ADITYA", t: "First the call, now this. Have you been checking on me, Meera?" },
              sp("ADITYA", "We were engaged. It ended. The families decided it never happened. I wanted to tell you — every single day."),
              th("Wanted to. For eight months of \u201CBangalore boy\u201D.")] },
        { t: "label", x: "Scene 3 · What she knows" },
        { t: "panel", sc: "notes",
          b: [cap("Notes app, 1:12 AM. ENGAGED — 2020. ENDED — 10 days before. NOBODY TOLD ME."),
              { k: "th", when: f => f.met_rhea === true, t: "\u201CWatch which one of us he protects.\u201D" },
              { k: "th", when: f => f.met_rhea !== true, t: "He answered everything except \u201Cwhy\u201D." }] },
        { t: "phone", time: "1:31 AM", from: "ADITYA",
          msgs: [{ when: f => f.met_rhea === true, tx: "Rhea messaged me. You met her?? We need to talk. Not on the phone." },
                 { when: f => f.met_rhea !== true, tx: "I couldn't sleep. I'm outside your gate. I'll tell you everything — tonight, or never." }] },
        { t: "end", big: "Eighteen days to the wedding.", next: "Episode 4 · \u201CSeventeen Days\u201D" }
      ]
    },
    /* ---------------- EP 4 ---------------- */
    {
      n: 4, title: "Seventeen Days", days: "18 days to the wedding",
      recap: f => {
        const L: string[] = [];
        L.push(f.met_rhea ? "Rhea told you everything: engaged in 2020, she walked out ten days before. \u201CHe's not cruel. He's a coward.\u201D" : "You said the name to Aditya's face. He admitted the engagement — everything except why it ended.");
        L.push(f.met_rhea ? "Then Aditya found out you met her. \u201CWe need to talk. Not on the phone.\u201D" : "At 1:31 AM he stood outside the gate: \u201CTonight, or never.\u201D");
        if (f.kabir_open) L.push("And Kabir still doesn't know any of it.");
        return L;
      },
      nodes: [
        { t: "label", x: "Scene 1 · The talk" },
        { t: "panel", sc: "terrace", b: [cap("The terrace at midnight. The wedding lights of someone else's function blink across the street, keeping score.")] },
        { t: "panel", sc: "terrace",
          b: [sp("ADITYA", "Yes. Engaged. 2020. My mother ended it and called it Rhea's decision, and I let her. The families agreed it never happened. That's the whole truth."),
              { k: "sp", when: f => f.met_rhea === true, w: "MEERA", t: "Rhea says she asked you to stand up for her once. Once." },
              { k: "sp", when: f => f.met_rhea === true, w: "ADITYA", t: "She's right. I watched my mother return her grandmother's ring like a courier parcel. I said nothing. I've hated that silence every day since." }] },
        { t: "panel", sc: "twoshot",
          b: [sp("MEERA", "Why should this time be different?"), sp("ADITYA", "Because I'm telling you before the wedding. Not after."),
              { k: "th", when: f => (f.asked_aditya === true || f.texted_unknown === true || f.met_rhea === true), t: "No. You're telling me because I found out." }] },
        { t: "label", when: f => f.kabir_open === true, x: "Scene 2 · The other message" },
        { t: "phone", when: f => f.kabir_open === true, time: "8:20 AM", from: "KABIR",
          msgs: [{ tx: "One coffee. Before you decide anything. As friends. Even I don't believe me." }] },
        { t: "panel", when: f => f.kabir_open === true, sc: "nightroom", b: [th("Wrong week, Kabir. Wrong year. Maybe wrong life.")] },
        { t: "label", x: "Scene 3 · Seventeen days out" },
        { t: "panel", sc: "window",
          b: [cap("Seventeen days. Two families, three hundred guests, one truth nobody invited."), th("Whatever I choose, I choose with my eyes open. That's more than anyone gave me.")] },
        { t: "choice", flag: "gave_chance", q: "Everything is on the table now. What should Meera do?",
          a: { v: true, tx: "Give him one honest chance — on her terms." }, b: { v: false, tx: "Pause the wedding. Tell the families." } },
        { t: "panel", when: f => f.gave_chance === true, sc: "twoshot",
          b: [sp("MEERA", "Dinner. Your mother. My questions. If you go silent even once, I walk — loudly, in front of everyone."),
              sp("ADITYA", "…Deal."), cap("Hope, but armed. That's the only kind she has left.")] },
        { t: "panel", when: f => f.gave_chance === false, sc: "family",
          b: [cap("Breakfast. She says it plainly. Her mother's teacup stops mid-air. The house goes louder than any silence."),
              sp("PAPA", "Then we pause it. Weddings can wait. Daughters can't be un-married."), th("Papa. Of all people. Papa.")] },
        { t: "label", x: "Scene 4 · That evening" },
        { t: "phone", time: "7:58 PM", from: "ADITYA'S MOTHER",
          msgs: [{ when: f => f.gave_chance === true, tx: "Beta. Dinner tomorrow, I hear. Good. But first — come see me alone. Before you ask your clever questions." },
                 { when: f => f.gave_chance === false, tx: "Beta. I heard about the \u201Cpause\u201D. Come see me alone. Before you do something you will regret for two families." }] },
        { t: "phone", time: "11:47 PM", from: f => (f.texted_unknown ? "UNKNOWN NUMBER" : "RHEA"),
          msgs: [{ tx: "One more thing you don't know. It isn't about Rhea. Ask her about the FIRST daughter-in-law." }] },
        { t: "end", big: "Season finale next.", next: "Episode 5 · \u201CThe Mother\u201D — coming soon", memo: "Your five choices shape the finale." }
      ]
    }
  ]
};

export const allSeries: Series[] = [meera];
export const getSeries = (slug: string) => allSeries.find(s => s.slug === slug);
