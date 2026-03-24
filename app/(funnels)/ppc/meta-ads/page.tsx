import PPCHero from "../components/PPCHero";
import PPCClientLogos from "../components/PPCClientLogos";
import PPCPricing from "../components/PPCPricing";
import TrendingReels from "../components/TrendingReels";
import ResultsGrid from "../components/ResultsGrid";
import TestimonialsWall from "../components/TestimonialsWall";
import FAQSection from "../components/FAQSection";
import NextCTA from "../components/NextCTA";
import MobileStickyCTA from "../components/MobileStickyCTA";

export default function MetaAdsManagementPage() {
  return (
    <main className="bg-white">
      {/* ================= HERO ================= */}
      <PPCHero
        serviceName="Meta Ads Management"
        title="Meta Ads Management That Drives Scalable Growth"
        subtitle="We plan, launch, optimise, and scale high-performing Facebook & Instagram ad campaigns focused on leads, sales, and ROI."
        highlight="Meta Ads"
      />

      {/* ================= CLIENT LOGOS ================= */}
      <PPCClientLogos />

      {/* ================= PRICING ================= */}
      <PPCPricing
        items={[
          {
            title: "Launch Package",
            image: "/images/ppc/pricing-meta-launch.jpg",
            price: "₹12,000",
            period: "month",
            features: [
              "Ideal for new advertisers",
              "Business & audience research",
              "Meta Ads account setup",
              "Facebook & Instagram campaign setup",
              "Ad creatives & copy guidance",
              "Pixel & conversion tracking setup",
              "Negative audience exclusions",
              "Monthly performance report",
              "Call & email support",
            ],
          },
          {
            title: "Optimize Package",
            image: "/images/ppc/pricing-meta-optimize.jpg",
            price: "₹25,000",
            period: "month",
            features: [
              "Ideal for active brands & D2C businesses",
              "Up to 5 campaigns (Leads, Traffic, Sales)",
              "Advanced audience & interest targeting",
              "Creative A/B testing",
              "Custom conversion events",
              "Budget & bid optimisation",
              "Weekly reporting & insights",
              "WhatsApp & email support",
              "Monthly optimisation call",
            ],
          },
          {
            title: "Scale Package",
            image: "/images/ppc/pricing-meta-scale.jpg",
            price: "₹40,000",
            period: "month",
            features: [
              "Ideal for scaling brands & eCommerce",
              "Up to 8 campaigns including retargeting",
              "Full-funnel strategy (TOF, MOF, BOF)",
              "Advanced lookalike audiences",
              "Creative & offer scaling strategy",
              "Dedicated account manager",
              "Weekly reports & review calls",
              "Priority call support",
            ],
          },
        ]}
      />

      {/* ================= NOTE ================= */}
      <section className="max-w-6xl mx-auto px-6 -mt-6 text-sm text-gray-600">
        <p>
          💡 <strong>Note:</strong> Pricing covers our professional service fees only.
          Meta ad spend (Facebook & Instagram) is billed separately based on your
          campaign goals and reach.
        </p>
      </section>

      {/* ================= TRENDING CONTENT ================= */}
      <TrendingReels />

      {/* ================= RESULTS ================= */}
      <ResultsGrid />

      {/* ================= TESTIMONIALS ================= */}
      <TestimonialsWall />

      {/* ================= FAQ ================= */}
      <FAQSection
        items={[
          {
            question: "Why choose Clever Crow for Meta Ads management?",
            answer:
              "We specialise in Facebook and Instagram advertising using Meta Ads Manager, focusing on audience strategy, creatives, and ROI-driven optimisation.",
          },
          {
            question: "Do you create ad creatives?",
            answer:
              "We provide creative direction, ad copy, and testing frameworks. Creative production support can be added based on requirements.",
          },
          {
            question: "Do you manage ad spend?",
            answer:
              "No. Your ad spend is billed directly by Meta. We manage strategy, targeting, creatives, optimisation, and performance.",
          },
          {
            question: "Can you work with small budgets?",
            answer:
              "Yes. Our Launch package is designed for new advertisers and small businesses testing Meta Ads.",
          },
          {
            question: "Is there a minimum contract?",
            answer:
              "We offer flexible monthly and retainer-based engagement options.",
          },
        ]}
      />

      {/* ================= CTA ================= */}
      <NextCTA />

      {/* ================= MOBILE CTA ================= */}
      <MobileStickyCTA />
    </main>
  );
}
