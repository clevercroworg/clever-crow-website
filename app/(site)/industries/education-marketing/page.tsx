import WebDevServiceLayout from "@/components/service/WebDevServiceLayout";
import WebPageSchema from "@/components/seo/WebPageSchema";
import ServiceSchema from "@/components/seo/ServiceSchema";
import FaqSchema from "@/components/seo/FaqSchema";

const faqs = [
  { question: "When should we start digital campaigns for admissions?", answer: "We recommend initiating campaigns 3 to 6 months before the new academic cycle starts to build brand presence and collect early applications." },
  { question: "How do you target parents vs students?", answer: "We create distinct campaign funnels: targeting parents with information on placements, safety, and fees; and students with campus culture, course structures, and campus life." },
  { question: "Can you integrate lead capture with our existing admission CRM?", answer: "Yes, we can sync web submissions with LeadSquared, ExtraaEdge, Zoho, or custom educational management platforms." },
  { question: "Do you design admission inquiry forms?", answer: "Yes. We build high-converting, multi-step application and inquiry forms optimized for student/parent conversions." }
];

const services = [
  { icon: "layout", title: "Admission Landing Pages", description: "Custom layouts focused on courses, facilities, and direct admission application forms.", href: "/landing-page-development" },
  { icon: "search", title: "Google Search Campaigns", description: "Targeting active student and parent searches for admissions, courses, and placements.", href: "/google-ads-management-services" },
  { icon: "megaphone", title: "Meta & Social Ads", description: "Facebook, Instagram, and LinkedIn ads showcasing college campus life, testimonials, and courses.", href: "/meta-ads-management-services" },
  { icon: "target", title: "Institutional SEO", description: "Ranking your institution website for regional, course, and educational search terms.", href: "/seo-services" },
  { icon: "rocket", title: "Student WhatsApp Bot", description: "Automated brochure downloads, application support, and follow-up templates via WhatsApp.", href: "/whatsapp-automation-services" },
  { icon: "monitor", title: "Enquiry CRM & Tracking", description: "Setting up tracking tools to track lead progress from initial enquiry to final admission.", href: "/lead-management-automation" }
];

export const metadata = {
  title: "Education Digital Marketing Agency | Clever Crow",
  description: "Promote colleges, institutes, admissions and courses with performance campaigns, landing pages, SEO and enquiry management systems.",
  keywords: "education digital marketing agency, college admission campaigns, school marketing, student recruitment ads, education lead generation",
};

export default function EducationMarketingPage() {
  return (
    <main>
      <WebDevServiceLayout
        eyebrow="Education Marketing"
        heroTitle="Education Digital Marketing for Admissions Growth"
        heroSubtitle="Promote colleges, institutes, admissions and courses with performance campaigns, landing pages, SEO and enquiry management systems."
        serviceName="Education Marketing"
        services={services}
        whyChoose={[
          "Specialized expertise in education marketing, targeting prospective students and parents.",
          "Focus on increasing course-specific admissions and quality of student enquiries.",
          "Creative strategy designed to showcase campus testimonials, alumni, and placements.",
          "Seamless integration of admission forms, fee calendars, and course brochures.",
          "Dedicated tracking measuring cost per verified student admission."
        ]}
        faqs={faqs}
        pageUrl="https://clevercrow.in/industries/education-marketing"
      />
      <WebPageSchema title="Education Digital Marketing Agency | Clever Crow" description="Promote colleges, institutes, admissions and courses with performance campaigns, landing pages, SEO and enquiry management systems." url="https://clevercrow.in/industries/education-marketing" />
      <ServiceSchema serviceName="Education Digital Marketing Services" serviceDescription="Promote colleges, institutes, admissions and courses with performance campaigns, landing pages, SEO and enquiry management systems." pageUrl="https://clevercrow.in/industries/education-marketing" />
      <FaqSchema faqs={faqs} />
    </main>
  );
}
