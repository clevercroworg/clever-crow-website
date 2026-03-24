import ServicePageHero from "@/components/service/ServicePageHero";
import DynamicCTA from "@/components/DynamicCTA";
import FaqSection from "@/components/service/FaqSection";
import StrategyPlanningSections from "@/components/service/StrategyPlanningSections";
import WebPageSchema from "@/components/seo/WebPageSchema";
import ServiceSchema from "@/components/seo/ServiceSchema";
import FaqSchema from "@/components/seo/FaqSchema";

const faqs = [
  { question: "How long does strategy planning take?", answer: "Usually 1–2 weeks depending on scope." },
  { question: "Will this include competitor research?", answer: "Yes, we conduct detailed competitor analysis." },
  { question: "Do you help with execution after strategy?", answer: "Yes, we can support design, content, and marketing execution." },
  { question: "Is this suitable for small businesses?", answer: "Absolutely, we tailor strategy based on your stage and goals." },
];

export const metadata = {
  title: "Strategy & Planning Services | Clever Crow",
  description: "We help you define your positioning, messaging, and growth roadmap so your brand stands out and scales with confidence.",
};

export default function StrategyPlanningPage() {
  return (
    <main>
      <ServicePageHero
        eyebrow="Strategy & Planning"
        title="Build a Brand with Clear Direction & Purpose"
        subtitle="We help you define your positioning, messaging, and growth roadmap so your brand stands out and scales with confidence."
        serviceName="Strategy & Planning"
        primaryCta="Book a Strategy Call"
        secondaryCta="See Our Process"
        secondaryCtaHref="#process"
        trustPoints={["Brand Positioning", "Competitor Analysis", "Messaging Framework", "Growth Roadmap"]}
      />
      <StrategyPlanningSections />
      <DynamicCTA />
      <FaqSection title="Frequently Asked Questions" description="Common questions about our strategy and planning services." faqs={faqs} />
      <WebPageSchema title="Strategy & Planning Services | Clever Crow" description="We help you define your positioning, messaging, and growth roadmap so your brand stands out and scales with confidence." url="https://clevercrow.in/services/strategy-planning" />
      <ServiceSchema serviceName="Strategy & Planning Services" serviceDescription="Brand strategy, positioning, competitor analysis, and growth roadmap services for businesses." pageUrl="https://clevercrow.in/services/strategy-planning" />
      <FaqSchema faqs={faqs} />
    </main>
  );
}
