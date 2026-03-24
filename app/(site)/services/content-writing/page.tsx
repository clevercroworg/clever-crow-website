import ServicePageHero from "@/components/service/ServicePageHero";
import DynamicCTA from "@/components/DynamicCTA";
import FaqSection from "@/components/service/FaqSection";
import ContentWritingSections from "@/components/service/ContentWritingSections";
import WebPageSchema from "@/components/seo/WebPageSchema";
import ServiceSchema from "@/components/seo/ServiceSchema";
import FaqSchema from "@/components/seo/FaqSchema";

const faqs = [
  { question: "What type of content do you write?", answer: "We write website copy, blogs, emails, case studies, product descriptions, and more." },
  { question: "Is the content SEO-optimized?", answer: "Yes, all content is written with SEO best practices in mind." },
  { question: "How fast can you deliver content?", answer: "Typically within 2–5 days depending on scope and complexity." },
  { question: "Can you match our brand voice?", answer: "Absolutely, we adapt our writing to match your brand tone and style." },
];

export const metadata = {
  title: "Content Writing Services | Clever Crow",
  description: "Professional content writing services for websites, blogs, emails, and marketing — strategically crafted to connect with your audience.",
};

export default function ContentWritingPage() {
  return (
    <main>
      <ServicePageHero
        eyebrow="Content Writing"
        title="Content That Builds Trust & Drives Results"
        subtitle="We write clear, compelling, and SEO-friendly content that helps your business communicate value and convert visitors."
        serviceName="Content Writing"
        primaryCta="Get a Free Consultation"
        secondaryCta="See Our Process"
        secondaryCtaHref="#process"
        trustPoints={["Website & Blog Copy", "SEO-Optimized", "Brand Voice Aligned", "Fast Delivery"]}
      />
      <ContentWritingSections />
      <DynamicCTA />
      <FaqSection title="Frequently Asked Questions" description="Common questions about our content writing services." faqs={faqs} />
      <WebPageSchema title="Content Writing Services | Clever Crow" description="Professional content writing services for websites, blogs, emails, and marketing." url="https://clevercrow.in/services/content-writing" />
      <ServiceSchema serviceName="Content Writing Services" serviceDescription="Professional content writing for websites, blogs, emails, case studies, and brand storytelling." pageUrl="https://clevercrow.in/services/content-writing" />
      <FaqSchema faqs={faqs} />
    </main>
  );
}
