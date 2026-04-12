import ServiceHero from "@/components/service/ServiceHero";
import DynamicCTA from "@/components/DynamicCTA";
import FaqSection from "@/components/service/FaqSection";
import ScriptWritingSections from "@/components/service/ScriptWritingSections";
import WebPageSchema from "@/components/seo/WebPageSchema";
import ServiceSchema from "@/components/seo/ServiceSchema";
import FaqSchema from "@/components/seo/FaqSchema";

const faqs = [
  { question: "Do you write scripts for reels and shorts?", answer: "Yes, we specialize in short-form content scripts." },
  { question: "Can you write ad scripts for paid campaigns?", answer: "Absolutely, we create high-converting ad scripts." },
  { question: "Do you provide multiple script variations?", answer: "Yes, especially for hooks and openings." },
  { question: "How fast can you deliver scripts?", answer: "Usually within 1–2 days depending on requirements." },
];

export const metadata = {
  title: "Script Writing Services | Clever Crow",
  description: "We write powerful scripts for ads, reels, and videos that hook your audience and deliver your message effectively.",
};

export default function ScriptWritingPage() {
  return (
    <main>
      <ServiceHero
        eyebrow="Script Writing"
        title="Scripts That Capture Attention & Drive Engagement"
        subtitle="We write powerful scripts for ads, reels, and videos that hook your audience and deliver your message effectively."
        serviceName="Script Writing"
        highlights={["Short-form & Long-form", "Ad Script Specialists", "Hook-Driven Approach", "Fast Turnaround"]}
      />
      <ScriptWritingSections />
      <DynamicCTA />
      <FaqSection title="Frequently Asked Questions" description="Common questions about our script writing services." faqs={faqs} />
      <WebPageSchema title="Script Writing Services | Clever Crow" description="We write powerful scripts for ads, reels, and videos that hook your audience and deliver your message effectively." url="https://clevercrow.in/services/script-writing" />
      <ServiceSchema serviceName="Script Writing Services" serviceDescription="Professional script writing for ads, reels, YouTube videos, and brand storytelling." pageUrl="https://clevercrow.in/services/script-writing" />
      <FaqSchema faqs={faqs} />
    </main>
  );
}
