import ServiceHero from "@/components/service/ServiceHero";
import DynamicCTA from "@/components/DynamicCTA";
import FaqSection from "@/components/service/FaqSection";
import GraphicDesignSections from "@/components/service/GraphicDesignSections";
import WebPageSchema from "@/components/seo/WebPageSchema";
import ServiceSchema from "@/components/seo/ServiceSchema";
import FaqSchema from "@/components/seo/FaqSchema";

const faqs = [
  { question: "Do you design for ads specifically?", answer: "Yes, we create designs optimized for ad performance." },
  { question: "Can you follow our brand guidelines?", answer: "Absolutely, we ensure consistency with your brand." },
  { question: "How fast can you deliver designs?", answer: "Typically within 1–3 days depending on complexity." },
  { question: "Do you offer bulk design packages?", answer: "Yes, we can create ongoing design support plans." },
];

export const metadata = {
  title: "Graphic Design Services | Clever Crow",
  description: "We create high-impact visual designs for ads, social media, and marketing that help your brand stand out and convert.",
};

export default function GraphicDesignPage() {
  return (
    <main>
      <ServiceHero
        eyebrow="Graphic Design"
        title="Designs That Capture Attention & Drive Action"
        subtitle="We create high-impact visual designs for ads, social media, and marketing that help your brand stand out and convert."
        serviceName="Graphic Design"
        highlights={["Social Media Creatives", "Ad-Optimized Designs", "Brand Consistency", "Fast Delivery"]}
      />
      <GraphicDesignSections />
      <DynamicCTA />
      <FaqSection title="Frequently Asked Questions" description="Common questions about our graphic design services." faqs={faqs} />
      <WebPageSchema title="Graphic Design Services | Clever Crow" description="We create high-impact visual designs for ads, social media, and marketing that help your brand stand out and convert." url="https://clevercrow.in/services/graphic-design" />
      <ServiceSchema serviceName="Graphic Design Services" serviceDescription="Professional graphic design for ads, social media, marketing collateral, and brand visuals." pageUrl="https://clevercrow.in/services/graphic-design" />
      <FaqSchema faqs={faqs} />
    </main>
  );
}
