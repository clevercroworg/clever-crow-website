import WebDevServiceLayout from "@/components/service/WebDevServiceLayout";
import WebPageSchema from "@/components/seo/WebPageSchema";
import ServiceSchema from "@/components/seo/ServiceSchema";
import FaqSchema from "@/components/seo/FaqSchema";

const faqs = [
  { question: "Is healthcare digital marketing compliant with advertising regulations?", answer: "Yes. We focus on patient education, medical team expertise, and transparent service listings, ensuring ethical compliance." },
  { question: "How can we increase patient appointments?", answer: "We combine local SEO, Google Search Ads targeting medical queries, and simple website booking forms to drive patient enquiries." },
  { question: "Do you integrate with patient management software?", answer: "Yes, we can connect appointment booking forms to various clinic management tools, CRMs, or send notifications directly to email/WhatsApp." },
  { question: "Does SEO work for individual doctors and local clinics?", answer: "Yes. Local SEO is highly effective for local clinics and specialist doctors, helping them rank for location-based searches like 'dentist near me'." }
];

const services = [
  { icon: "laptop", title: "Patient Web Design", description: "Secure, professional websites with doctor profiles, treatment details, and booking forms.", href: "/business-website-development" },
  { icon: "target", title: "Local SEO & Google Maps", description: "Optimizing clinic and hospital listings to rank for local 'near me' patient searches.", href: "/seo-services" },
  { icon: "search", title: "Google Search Campaigns", description: "Targeting high-intent search terms for specific clinical treatments and specialist care.", href: "/google-ads-management-services" },
  { icon: "rocket", title: "WhatsApp Booking Integration", description: "Automated booking, appointment confirmations, and location maps via WhatsApp.", href: "/whatsapp-automation-services" },
  { icon: "pencil", title: "Healthcare SEO Content", description: "Publishing medical blog articles and FAQs that establish clinical authority and rank.", href: "/seo-services" },
  { icon: "megaphone", title: "Social Media & Branding", description: "Patient education, health tips, and clinic updates on Facebook and Instagram.", href: "/social-media-management-services" }
];

export const metadata = {
  title: "Healthcare Digital Marketing Agency | Clever Crow",
  description: "Grow patient enquiries for hospitals, clinics and healthcare brands with website, SEO, Google Ads, Meta Ads and lead tracking.",
  keywords: "healthcare digital marketing agency, clinic marketing, hospital advertising, medical SEO, patient appointment booking",
};

export default function HealthcareDigitalMarketingPage() {
  return (
    <main>
      <WebDevServiceLayout
        eyebrow="Healthcare Marketing"
        heroTitle="Healthcare Digital Marketing for Patient Enquiries"
        heroSubtitle="Grow patient enquiries for hospitals, clinics and healthcare brands with website, SEO, Google Ads, Meta Ads and lead tracking."
        serviceName="Healthcare Digital Marketing"
        services={services}
        whyChoose={[
          "Deep understanding of healthcare marketing regulations, privacy, and ethics.",
          "Proven experience increasing patient footfalls and appointment bookings.",
          "Specialized local SEO configurations for medical centers and practitioners.",
          "Appointment flow integration with website contact forms and WhatsApp APIs.",
          "Clear monthly reporting tracking cost-per-appointment and patient acquisitions."
        ]}
        faqs={faqs}
        pageUrl="https://clevercrow.in/industries/healthcare-digital-marketing"
      />
      <WebPageSchema title="Healthcare Digital Marketing Agency | Clever Crow" description="Grow patient enquiries for hospitals, clinics and healthcare brands with website, SEO, Google Ads, Meta Ads and lead tracking." url="https://clevercrow.in/industries/healthcare-digital-marketing" />
      <ServiceSchema serviceName="Healthcare Digital Marketing Services" serviceDescription="Grow patient enquiries for hospitals, clinics and healthcare brands with website, SEO, Google Ads, Meta Ads and lead tracking." pageUrl="https://clevercrow.in/industries/healthcare-digital-marketing" />
      <FaqSchema faqs={faqs} />
    </main>
  );
}
