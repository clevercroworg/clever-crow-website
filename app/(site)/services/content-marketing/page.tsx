import ServiceHero from "@/components/service/ServiceHero";
import DynamicCTA from "@/components/DynamicCTA";
import FaqSection from "@/components/service/FaqSection";
import ContentMarketingSections from "@/components/service/ContentMarketingSections";
import WebPageSchema from "@/components/seo/WebPageSchema";
import ServiceSchema from "@/components/seo/ServiceSchema";
import FaqSchema from "@/components/seo/FaqSchema";

const faqs = [
  { question: "What is content marketing?", answer: "Content marketing uses strategic content to attract, engage, and convert your target audience across channels." },
  { question: "How long before I see results?", answer: "Content marketing is a long-term strategy. Initial traction typically starts within 2–3 months with consistent effort." },
  { question: "Do you handle social media content?", answer: "Yes, we create content plans and posts for social media as part of our content marketing services." },
  { question: "Can you manage our blog?", answer: "Yes, we can handle everything from strategy and writing to publishing and performance tracking." },
];

export const metadata = {
  title: "Content Marketing Services | Clever Crow",
  description: "We build content marketing systems that attract the right audience, establish your authority, and drive consistent business growth.",
};

export default function ContentMarketingPage() {
  return (
    <main>
      <ServiceHero
        eyebrow="Content Marketing"
        title="Grow Your Business with Strategic Content Marketing"
        subtitle="We build content marketing systems that attract the right audience, establish your authority, and drive consistent business growth."
        serviceName="Content Marketing"
        highlights={["Strategy-Driven", "Multi-Channel Approach", "Data-Backed Results", "Consistent Growth"]}
      />
      <ContentMarketingSections />
      <DynamicCTA />
      <FaqSection title="Frequently Asked Questions" description="Common questions about our content marketing services." faqs={faqs} />
      <WebPageSchema title="Content Marketing Services | Clever Crow" description="We build content marketing systems that attract the right audience, establish your authority, and drive consistent business growth." url="https://clevercrow.in/services/content-marketing" />
      <ServiceSchema serviceName="Content Marketing Services" serviceDescription="Strategic content marketing services including blog marketing, social media content, email campaigns, and growth strategies." pageUrl="https://clevercrow.in/services/content-marketing" />
      <FaqSchema faqs={faqs} />
    </main>
  );
}
