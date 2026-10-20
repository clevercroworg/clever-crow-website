// Open roles shown on /careers. Shared by the page, its JobPosting schema and /api/careers.

export type OpenRole = {
  id: string;
  title: string;
  eyebrow: string;
  highlight: string;
  tagline: string;
  employmentType: "Full-time" | "Freelance";
  engagement: string;
  location: string;
  datePosted: string; // ISO date for the JobPosting schema
  // "cv": CV required. "samples": portfolio / sample-video link required, CV optional.
  applyWith: "cv" | "samples";
  applyHint: string;
  summary: string;
  responsibilities: { title: string; detail: string; icon: "plan" | "reels" | "community" | "camera" | "video" | "story" }[];
  alsoDo: string[];
  requirements: string[];
  niceToHave: string[];
};

export const OPEN_ROLES: OpenRole[] = [
  {
    id: "social-media-manager",
    title: "Social Media Manager",
    eyebrow: "We're hiring",
    highlight: "0–1 Year Experience",
    tagline: "Turn ideas into content that connects.",
    employmentType: "Full-time",
    engagement: "0–1 year experience",
    location: "Remote",
    datePosted: "2026-10-20",
    applyWith: "cv",
    applyHint: "Share your CV & portfolio",
    summary:
      "We're looking for a Social Media Manager who loves turning ideas into scroll-stopping content. You'll plan, write and publish content for Clever Crow and the brands we manage, spot trends early, and help build engaged communities across Instagram, Facebook and LinkedIn.",
    responsibilities: [
      {
        title: "Content planning & captions",
        detail: "Build monthly content calendars, write on-brand captions and hooks, and brief designers on creatives.",
        icon: "plan",
      },
      {
        title: "Reels & trend spotting",
        detail: "Track trending audio, formats and topics, plan short-form video ideas, and adapt trends to each brand's voice.",
        icon: "reels",
      },
      {
        title: "Community engagement",
        detail: "Reply to comments and messages, engage with relevant communities, and help each account grow an active audience.",
        icon: "community",
      },
    ],
    alsoDo: ["Schedule and publish posts on time", "Track reach and engagement and share simple monthly insights"],
    requirements: [
      "0–1 year of experience. Freshers with a strong feel for social media are welcome",
      "Good written English and a knack for short, catchy copy",
      "Comfortable with Instagram, Facebook and LinkedIn, including Reels and Stories",
      "Basic understanding of insights such as reach, engagement and saves",
      "Organised, consistent and comfortable working to deadlines",
    ],
    niceToHave: [
      "Basic Canva or mobile video-editing skills",
      "A personal, college or freelance page you've grown or managed",
      "Curiosity about marketing, brands and internet culture",
    ],
  },
  {
    id: "ugc-content-creator",
    title: "UGC Content Creators",
    eyebrow: "Creators wanted",
    highlight: "Create videos for our ad campaigns",
    tagline: "Bring our digital services to life on camera.",
    employmentType: "Freelance",
    engagement: "Project-based",
    location: "Remote",
    datePosted: "2026-10-20",
    applyWith: "samples",
    applyHint: "Share your portfolio or sample videos",
    summary:
      "We're looking for freelance UGC creators to film short, authentic videos for our ad campaigns. You'll bring Clever Crow's digital services (websites, SEO, ads and automation) to life on camera, working from a clear brief and adding your own natural style.",
    responsibilities: [
      {
        title: "Confident on camera",
        detail: "Present to camera naturally: talking-head explainers, reactions, testimonials-style pieces and voiceovers.",
        icon: "camera",
      },
      {
        title: "Short-form ad videos",
        detail: "Film vertical videos for Instagram, Facebook and YouTube ads from our briefs, with strong opening hooks.",
        icon: "video",
      },
      {
        title: "Authentic storytelling",
        detail: "Turn our services into relatable, everyday stories that feel genuine rather than scripted.",
        icon: "story",
      },
    ],
    alsoDo: ["Deliver clean footage to the agreed brief and timeline", "Take feedback and turn around revisions on agreed videos"],
    requirements: [
      "Comfortable and clear speaking on camera in English",
      "A smartphone that shoots good-quality video, and a quiet, well-lit space to film",
      "Sample videos you can share: a portfolio, Instagram profile or drive link",
      "Reliable with briefs and deadlines",
    ],
    niceToHave: [
      "Basic editing skills (CapCut, InShot or similar)",
      "Previous UGC or brand collaborations",
      "Experience explaining business or tech topics simply",
    ],
  },
];

export const CV_MAX_BYTES = 4 * 1024 * 1024;
export const CV_ACCEPT = ".pdf,.doc,.docx";

export function isAllowedCvName(fileName: string) {
  return /\.(pdf|docx?)$/i.test(fileName);
}
