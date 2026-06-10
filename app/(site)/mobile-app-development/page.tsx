import WebDevServiceLayout from "@/components/service/WebDevServiceLayout";
import WebPageSchema from "@/components/seo/WebPageSchema";
import ServiceSchema from "@/components/seo/ServiceSchema";
import FaqSchema from "@/components/seo/FaqSchema";

const faqs = [
  {
    question: "Do you build both Android and iOS apps?",
    answer: "Yes. Depending on your business goals, we can build for one platform first or launch across both.",
  },
  {
    question: "Can you build an MVP first?",
    answer: "Yes. MVP development is one of the best ways to test an app idea before investing in a larger build.",
  },
  {
    question: "How long does it take to build a mobile app?",
    answer: "The timeline depends on scope and complexity. Simple MVPs can be launched in 4–6 weeks, while larger apps may take 8–12 weeks.",
  },
  {
    question: "Do you provide support after launch?",
    answer: "Yes. We offer ongoing maintenance, updates, bug fixes, and future improvements.",
  },
];

const services = [
  {
    icon: "smartphone",
    title: "Android App Development",
    description: "Custom Android apps built for performance, scalability, and great user experience.",
    href: "/mobile-app-development"
  },
  {
    icon: "smartphone",
    title: "iOS App Development",
    description: "Native iOS apps designed for the Apple ecosystem with smooth, intuitive interfaces.",
    href: "/mobile-app-development"
  },
  {
    icon: "code2",
    title: "Cross-Platform Apps",
    description: "Build once, deploy on both platforms using React Native or Flutter for faster time to market.",
    href: "/mobile-app-development"
  },
  {
    icon: "rocket",
    title: "MVP Development",
    description: "Launch your minimum viable product quickly to validate your idea and attract early users.",
    href: "/mobile-app-development"
  },
  {
    icon: "layout",
    title: "App UI/UX Design",
    description: "Beautiful, intuitive mobile interfaces designed for engagement and easy navigation.",
    href: "/mobile-app-development"
  },
  {
    icon: "wrench",
    title: "App Maintenance & Updates",
    description: "Ongoing support, performance monitoring, bug fixes, and feature updates after launch.",
    href: "/mobile-app-development"
  }
];

export const metadata = {
  title: "Mobile App Development Company | Clever Crow",
  description:
    "Design and develop mobile apps for business operations, customer engagement, booking, sales, support and digital products.",
  keywords: "mobile app development company, Android app development, iOS app development, custom mobile app, cross platform app development",
};

export default function MobileAppDevelopmentPage() {
  return (
    <main>
      <WebDevServiceLayout
        eyebrow="Mobile App Development"
        heroTitle="Mobile App Development Company for Business Apps"
        heroSubtitle="Design and develop mobile apps for business operations, customer engagement, booking, sales, support and digital products."
        serviceName="Mobile App Development"
        services={services}
        whyChoose={[
          "Custom-built mobile apps tailored to your specific business workflows and customer needs.",
          "Scalable architecture designed to handle growing users without performance issues.",
          "Clean, modern UI/UX that delivers a smooth experience on Android and iOS.",
          "Agile development process with regular updates and transparent communication.",
          "Post-launch support with maintenance, monitoring, and feature upgrades.",
        ]}
        faqs={faqs}
        pageUrl="https://clevercrow.in/mobile-app-development"
      />

      <WebPageSchema
        title="Mobile App Development Company | Clever Crow"
        description="Design and develop mobile apps for business operations, customer engagement, booking, sales, support and digital products."
        url="https://clevercrow.in/mobile-app-development"
      />
      <ServiceSchema
        serviceName="Mobile App Development Services"
        serviceDescription="Professional mobile app development for Android and iOS platforms, from MVP to full-scale business applications."
        pageUrl="https://clevercrow.in/mobile-app-development"
      />
      <FaqSchema faqs={faqs} />
    </main>
  );
}
