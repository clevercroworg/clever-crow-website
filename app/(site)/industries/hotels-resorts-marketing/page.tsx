import WebDevServiceLayout from "@/components/service/WebDevServiceLayout";
import WebPageSchema from "@/components/seo/WebPageSchema";
import ServiceSchema from "@/components/seo/ServiceSchema";
import FaqSchema from "@/components/seo/FaqSchema";

const faqs = [
  { question: "How do we reduce dependence on OTAs like Booking.com or Agoda?", answer: "We build a direct booking website and run targeted Google Search and Meta ads that offer direct-booking incentives, guiding guests to book directly on your channel." },
  { question: "What platforms do you use for resort websites?", answer: "We build high-performance Next.js websites for fast load speeds, or WordPress with integrated booking engines for easy content management." },
  { question: "Can you manage booking engines and channel managers?", answer: "Yes. We integrate booking calendars, channel managers, and payment gateways seamlessly into your website." },
  { question: "How soon will we see booking enquiries from campaigns?", answer: "Paid campaigns (Google Search and Instagram ads) typically begin generating direct enquiries and bookings within 48 to 72 hours of launch." }
];

const services = [
  { icon: "laptop", title: "Direct Booking Website", description: "High-converting hotel website with integrated booking engines and room displays.", href: "/business-website-development" },
  { icon: "target", title: "Local SEO & Google Maps", description: "Optimizing your property profile to rank for local travel searches and map queries.", href: "/seo-services" },
  { icon: "pencil", title: "Social Media Management", description: "Aesthetic content creation and community management on Instagram and Facebook.", href: "/social-media-management-services" },
  { icon: "search", title: "Google Search Ads", description: "Targeting travelers actively searching for stays, hotels, and resorts in your area.", href: "/google-ads-management-services" },
  { icon: "megaphone", title: "Meta & Instagram Ads", description: "Visual Facebook and Instagram campaigns showcasing rooms, amenities, and scenery.", href: "/meta-ads-management-services" },
  { icon: "rocket", title: "WhatsApp Lead Booking", description: "Automating booking enquiries and customer support via WhatsApp business API.", href: "/whatsapp-automation-services" }
];

export const metadata = {
  title: "Digital Marketing for Hotels & Resorts | Clever Crow",
  description: "Attract direct enquiries and bookings for hotels, resorts, homestays and villas with branding, ads, SEO and booking-ready funnels.",
  keywords: "digital marketing for hotels and resorts, hotel marketing agency, resort website design, direct bookings hospitality, resort advertising",
};

export default function HotelsResortsMarketingPage() {
  return (
    <main>
      <WebDevServiceLayout
        eyebrow="Hospitality Marketing"
        heroTitle="Digital Marketing for Hotels, Resorts and Homestays"
        heroSubtitle="Attract direct enquiries and bookings for hotels, resorts, homestays and villas with branding, ads, SEO and booking-ready funnels."
        serviceName="Hotels & Resorts Marketing"
        services={services}
        whyChoose={[
          "Deep experience marketing hospitality brands, homestays, and boutique resorts.",
          "Focus on driving direct bookings to save on expensive OTA commissions.",
          "High-quality visual ad creative design and precise targeting strategies.",
          "Seamless integration of booking systems, calendars, and payment gateways.",
          "Detailed tracking of cost per booking and ad campaign return on investment (ROAS)."
        ]}
        faqs={faqs}
        pageUrl="https://clevercrow.in/industries/hotels-resorts-marketing"
      />
      <WebPageSchema title="Digital Marketing for Hotels & Resorts | Clever Crow" description="Attract direct enquiries and bookings for hotels, resorts, homestays and villas with branding, ads, SEO and booking-ready funnels." url="https://clevercrow.in/industries/hotels-resorts-marketing" />
      <ServiceSchema serviceName="Hotels & Resorts Marketing Services" serviceDescription="Attract direct enquiries and bookings for hotels, resorts, homestays and villas with branding, ads, SEO and booking-ready funnels." pageUrl="https://clevercrow.in/industries/hotels-resorts-marketing" />
      <FaqSchema faqs={faqs} />
    </main>
  );
}
