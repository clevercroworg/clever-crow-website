// Imported only by the server page, so unapproved claims never reach the production bundle.
//
// Publication rules (developer brief, Section 4):
// - These figures are user-reported and not yet verified. Keep `approved: false` until dates,
//   denominators, services delivered and evidence are confirmed.
// - Drafts render only in `next dev`, with a visible DRAFT label. Production hides them.
// - Never add bracketed placeholders. Leave a detail field undefined until it is approved.
// - SIT, Siddaganga Medical College and VIMS get a card only once an approved scope and result exist.

export type CaseStudy = {
  id: string;
  institution: string;
  category: string;
  // "result" shows the headline as a metric; "experience" is continuity, not a performance metric.
  kind: "result" | "experience";
  headline: string;
  supportingLine?: string;
  logo?: { src: string; width: number; height: number };
  details?: {
    period?: string;
    challenge?: string;
    ourWork?: string;
    result?: string;
  };
  approved: boolean;
};

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: "carver",
    institution: "Carver Aviation",
    category: "Aviation Education",
    kind: "result",
    headline: "80% of Seats Filled",
    supportingLine:
      "The institute recorded 80% seat occupancy for the confirmed intake period during our engagement.",
    logo: { src: "/images/logos/carver.png", width: 1631, height: 380 },
    approved: false,
  },
  {
    id: "vsma",
    institution: "VSMA Aerospace",
    category: "Specialised Education",
    kind: "result",
    headline: "Seat Occupancy Grew from 10% to 60%",
    supportingLine:
      "A 50-percentage-point improvement over one year, across the confirmed comparison periods.",
    logo: { src: "/images/logos/vsmaerospace.png", width: 638, height: 174 },
    approved: false,
  },
  {
    id: "bgs-gims",
    institution: "BGS GIMS",
    category: "Medical Education",
    kind: "experience",
    headline: "Four Years of Marketing Support",
    logo: { src: "/images/logos/bgsgims.svg", width: 424, height: 101 },
    approved: false,
  },
];
