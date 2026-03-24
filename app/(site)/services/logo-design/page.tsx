import ServicePageHero from "@/components/service/ServicePageHero";
import DynamicCTA from "@/components/DynamicCTA";
import FaqSection from "@/components/service/FaqSection";
import LogoDesignSections from "@/components/service/LogoDesignSections";
import WebPageSchema from "@/components/seo/WebPageSchema";
import ServiceSchema from "@/components/seo/ServiceSchema";
import FaqSchema from "@/components/seo/FaqSchema";

const faqs = [
  { question: "How long does it take to design a logo?", answer: "Typically 5–10 working days depending on revisions." },
  { question: "How many revisions are included?", answer: "We include multiple revisions to ensure satisfaction." },
  { question: "Will I get all file formats?", answer: "Yes, you'll receive all required formats for digital and print use." },
  { question: "Can you redesign my existing logo?", answer: "Yes, we offer complete logo redesign and refresh services." },
];

export const metadata = {
  title: "Logo Design Services | Clever Crow",
  description: "We create powerful, timeless logos that build trust, recognition, and strong brand recall for your business.",
};

export default function LogoDesignPage() {
  return (
    <main>
      <ServicePageHero
        eyebrow="Logo Design"
        title="Design a Logo That People Remember"
        subtitle="We create powerful, timeless logos that build trust, recognition, and strong brand recall for your business."
        serviceName="Logo Design"
        primaryCta="Get a Free Consultation"
        secondaryCta="See Our Process"
        secondaryCtaHref="#process"
        trustPoints={["Custom Logo Concepts", "Brand-Aligned Design", "Scalable Vector Files", "Fast Turnaround"]}
      />
      <LogoDesignSections />
      <DynamicCTA />
      <FaqSection title="Frequently Asked Questions" description="Common questions about our logo design services." faqs={faqs} />
      <WebPageSchema title="Logo Design Services | Clever Crow" description="We create powerful, timeless logos that build trust, recognition, and strong brand recall for your business." url="https://clevercrow.in/services/logo-design" />
      <ServiceSchema serviceName="Logo Design Services" serviceDescription="Professional logo design services with strategy-driven approach for startups and businesses." pageUrl="https://clevercrow.in/services/logo-design" />
      <FaqSchema faqs={faqs} />
    </main>
  );
}
