import WebDevServiceLayout from "@/components/service/WebDevServiceLayout";
import WebPageSchema from "@/components/seo/WebPageSchema";
import ServiceSchema from "@/components/seo/ServiceSchema";
import FaqSchema from "@/components/seo/FaqSchema";

const faqs = [
  {
    question: "When should I redesign my website?",
    answer: "If your website is slow, looks outdated, doesn't work well on mobile, or isn't converting visitors into leads, it's time for a redesign.",
  },
  {
    question: "Will I lose my SEO rankings during a redesign?",
    answer: "No. We carefully plan URL structures, redirects, and on-page SEO to preserve and improve your existing search rankings.",
  },
  {
    question: "How long does a website redesign take?",
    answer: "Most website redesigns take 2–4 weeks depending on the scope, content, and complexity of the project.",
  },
  {
    question: "Can you keep my existing content?",
    answer: "Yes. We can retain your existing content while improving the design, layout, speed, and user experience.",
  },
];

const services = [
  {
    icon: "refreshcw",
    title: "Complete Website Redesign",
    description: "Full visual and structural overhaul of your existing website for modern standards.",
    href: "/website-redesign-services"
  },
  {
    icon: "code2",
    title: "React/Next.js Migration",
    description: "Migrate your WordPress or legacy site to a fast, modern React/Next.js platform.",
    href: "/react-nextjs-website-development"
  },
  {
    icon: "layout",
    title: "UI/UX Improvement",
    description: "Improve user experience with better navigation, clearer layouts, and modern design patterns.",
    href: "/website-redesign-services"
  },
  {
    icon: "search",
    title: "SEO-Focused Redesign",
    description: "Rebuild your site structure for better search engine visibility and organic traffic.",
    href: "/seo-services"
  },
  {
    icon: "smartphone",
    title: "Mobile Optimization",
    description: "Make your website fully responsive and optimized for mobile-first browsing.",
    href: "/website-redesign-services"
  },
  {
    icon: "rocket",
    title: "Speed Optimization",
    description: "Improve Core Web Vitals, reduce load times, and optimize images and code for faster performance.",
    href: "/website-maintenance-services"
  }
];

export const metadata = {
  title: "Website Redesign Services | Clever Crow",
  description:
    "Redesign your outdated website into a faster, cleaner and more conversion-focused experience for modern customers.",
  keywords: "website redesign company, website redesign services, modern website redesign, website makeover, website refresh",
};

export default function WebsiteRedesignServicesPage() {
  return (
    <main>
      <WebDevServiceLayout
        eyebrow="Website Redesign"
        heroTitle="Website Redesign Services for Better Brand Presence"
        heroSubtitle="Redesign your outdated website into a faster, cleaner and more conversion-focused experience for modern customers."
        serviceName="Website Redesign"
        services={services}
        whyChoose={[
          "Modern, clean designs that reflect your brand's current positioning and values.",
          "Careful SEO migration to preserve rankings while improving site structure.",
          "Faster loading speeds through optimized code, images, and hosting configuration.",
          "Mobile-first responsive design for consistent experience across all devices.",
          "Improved conversion paths with clear CTAs, better navigation, and trust signals.",
        ]}
        faqs={faqs}
        pageUrl="https://clevercrow.in/website-redesign-services"
      />

      <WebPageSchema
        title="Website Redesign Services | Clever Crow"
        description="Redesign your outdated website into a faster, cleaner and more conversion-focused experience for modern customers."
        url="https://clevercrow.in/website-redesign-services"
      />
      <ServiceSchema
        serviceName="Website Redesign Services"
        serviceDescription="Professional website redesign services to modernize your website, improve performance, and boost conversions."
        pageUrl="https://clevercrow.in/website-redesign-services"
      />
      <FaqSchema faqs={faqs} />
    </main>
  );
}
