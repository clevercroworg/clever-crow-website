import WebDevServiceLayout from "@/components/service/WebDevServiceLayout";
import WebPageSchema from "@/components/seo/WebPageSchema";
import ServiceSchema from "@/components/seo/ServiceSchema";
import FaqSchema from "@/components/seo/FaqSchema";

const faqs = [
  { question: "What does social media management include?", answer: "It includes content planning, post design, caption writing, publishing, community management, and monthly performance reporting." },
  { question: "Which platforms do you manage?", answer: "We manage Instagram, Facebook, LinkedIn, and Twitter/X accounts. We can also support YouTube and Pinterest based on your needs." },
  { question: "Do you create the content?", answer: "Yes. We handle content planning, graphic design, video production, caption writing, and hashtag research." },
  { question: "How often do you post?", answer: "Posting frequency depends on your plan and goals. Most businesses benefit from 3–5 posts per week across platforms." },
];

const services = [
  { icon: "pencil", title: "Content Planning", description: "Monthly content calendars with themes, topics, and post schedules aligned with your brand.", href: "/social-media-management-services" },
  { icon: "layout", title: "Post Design", description: "Professional graphic design for feed posts, stories, carousels, and cover images.", href: "/social-media-management-services" },
  { icon: "smartphone", title: "Reels & Video Content", description: "Short-form video content for Instagram Reels, Facebook, and YouTube Shorts.", href: "/social-media-management-services" },
  { icon: "megaphone", title: "Community Management", description: "Engage with your audience through comments, DMs, and community interactions.", href: "/social-media-management-services" },
  { icon: "target", title: "Hashtag Strategy", description: "Research and implementation of targeted hashtags to increase post reach and discovery.", href: "/social-media-management-services" },
  { icon: "monitor", title: "Monthly Reporting", description: "Performance reports with engagement metrics, growth data, and content insights.", href: "/analytics-tracking-setup" },
];

export const metadata = {
  title: "Social Media Management Agency | Clever Crow",
  description: "Build a consistent social media presence with content planning, post design, reels, captions, publishing and monthly reporting.",
  keywords: "social media management agency, social media marketing, Instagram management, Facebook management, content planning, social media services",
};

export default function SocialMediaManagementServicesPage() {
  return (
    <main>
      <WebDevServiceLayout
        eyebrow="Social Media Management"
        heroTitle="Social Media Management for Growing Brands"
        heroSubtitle="Build a consistent social media presence with content planning, post design, reels, captions, publishing and monthly reporting."
        serviceName="Social Media Management"
        services={services}
        whyChoose={[
          "Strategic content planning aligned with your brand voice and business goals.",
          "Professional graphic design and video content that elevates your brand presence.",
          "Consistent publishing schedule to maintain audience engagement and growth.",
          "Active community management to build relationships with your audience.",
          "Monthly performance reports with actionable insights for continuous improvement.",
        ]}
        faqs={faqs}
        pageUrl="https://clevercrow.in/social-media-management-services"
      />
      <WebPageSchema title="Social Media Management Agency | Clever Crow" description="Build a consistent social media presence with content planning, post design, reels, captions, publishing and monthly reporting." url="https://clevercrow.in/social-media-management-services" />
      <ServiceSchema serviceName="Social Media Management" serviceDescription="Professional social media management with content planning, design, publishing, and reporting." pageUrl="https://clevercrow.in/social-media-management-services" />
      <FaqSchema faqs={faqs} />
    </main>
  );
}
