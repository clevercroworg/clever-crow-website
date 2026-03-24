import PPCHero from "../components/PPCHero";
import PPCClientLogos from "../components/PPCClientLogos";
import PPCPricing from "../components/PPCPricing";
 
import TrendingReels from "../components/TrendingReels";
import TestimonialsCarousel from "../components/TestimonialsCarousel";
import NextCTA from "../components/NextCTA";

import TestimonialsWall from "../components/TestimonialsWall";

 import ResultsGrid from "../components/ResultsGrid";
 import FAQSection from "../components/FAQSection";
 import MobileStickyCTA from "../components/MobileStickyCTA";
 


export default function DigitalMarketingPPCPage() {
  return (
    <main className="bg-white">
      {/* HERO */}
      <PPCHero serviceName="Digital Marketing" />

      {/* CLIENT LOGOS */}
      <PPCClientLogos />

      {/* PRICING */}
      <PPCPricing
        items={[
          {
            title: "Website Design & Development",
            image: "/images/ppc/pricing-web.jpg",
            price: "₹9,999",
            period: "project",
            features: [
              "Professional website for credibility",
              "Responsive design for all devices",
              "Optimized for lead generation",
              "Fast loading & secure setup",
              "1-year maintenance support",
            ],
          },
          {
            title: "SEO Management",
            image: "/images/ppc/pricing-seo.jpg",
            price: "₹12,000",
            period: "month",
            features: [
              "Comprehensive keyword research",
              "On-page & technical optimization",
              "Authority link building",
              "Content optimization & reporting",
              "Monthly traffic insights",
            ],
          },
          {
            title: "Google Ads Management",
            image: "/images/ppc/pricing-google-ads.jpg",
            price: "₹15,000",
            period: "month",
            features: [
              "Search, Display & YouTube campaigns",
              "Conversion tracking setup",
              "Smart bidding & budget optimization",
              "Weekly performance review",
              "ROI-based scaling",
            ],
          },
          {
            title: "Meta Ads (Facebook & Instagram)",
            image: "/images/ppc/pricing-meta-ads.jpg",
            price: "₹15,000",
            period: "month",
            features: [
              "Creative ad strategy & copywriting",
              "Audience targeting & retargeting",
              "Lead generation campaigns",
              "Pixel & conversion tracking",
              "Monthly ROI reporting",
            ],
          },
          {
            title: "AI Automation & Integration",
            image: "/images/ppc/pricing-ai.jpg",
            price: "₹15,000",
            period: "setup",
            features: [
              "Lead automation via Email & WhatsApp",
              "CRM & AI chatbot integration",
              "Custom workflow automation",
              "Marketing system optimization",
              "Performance dashboard setup",
            ],
          },
          {
            title: "Social Media Management",
            image: "/images/ppc/pricing-smm.jpg",
            price: "₹12,000",
            period: "month",
            features: [
              "Content planning & creative design",
              "Post scheduling & publishing",
              "Community engagement",
              "Ad boosting guidance",
              "Monthly performance insights",
            ],
          },
        ]}
      />

    

      {/* TRENDING CONTENT */}
      <TrendingReels />

       <ResultsGrid />

      {/* SOCIAL PROOF */}
   
           <TestimonialsWall />


        <FAQSection />

       <NextCTA />
          <MobileStickyCTA />

      {/* CTA */}
    

       
    </main>
  );
 
  
}
