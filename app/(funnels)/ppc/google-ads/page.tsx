import PPCHero from "../components/PPCHero";
import PPCClientLogos from "../components/PPCClientLogos";
import PPCPricing from "../components/PPCPricing";
import TrendingReels from "../components/TrendingReels";
import ResultsGrid from "../components/ResultsGrid";
import TestimonialsWall from "../components/TestimonialsWall";
import FAQSection from "../components/FAQSection";
import NextCTA from "../components/NextCTA";
import MobileStickyCTA from "../components/MobileStickyCTA";

export default function GoogleAdsManagementPage() {
  return (
    <main className="bg-white">
      {/* ================= HERO ================= */}
     <PPCHero
  serviceName="Google Ads Management"
  title="Google Ads Management That Drives Qualified Leads "
  subtitle="We plan, launch, optimise, and scale high-performing Google Ads campaigns focused on ROI — not wasted spend."
/>


      {/* ================= CLIENT LOGOS ================= */}
      <PPCClientLogos />

      {/* ================= PRICING ================= */}
      <PPCPricing
        items={[
          {
            title: "Launch Package",
            image: "/images/ppc/pricing-google-launch.jpg",
            price: "₹12,000",
            period: "month",
            features: [
              "Ideal for new advertisers",
              "Understanding business goals",
              "Comprehensive keyword research",
              "Campaign setup & ad creation",
              "Conversion tracking setup",
              "Negative keyword optimisation",
              "Monthly performance report",
              "Call & email support",
            ],
          },
          {
            title: "Optimize Package",
            image: "/images/ppc/pricing-google-optimize.jpg",
            price: "₹25,000",
            period: "month",
            features: [
              "Ideal for active brands & small businesses",
              "Up to 5 campaigns (Search, Display or Video)",
              "Advanced keyword & competitor analysis",
              "A/B testing for ads & landing pages",
              "Custom conversion tracking & goals",
              "Geo & audience optimisation",
              "Weekly reporting & insights",
              "WhatsApp & email support",
              "Monthly optimisation call",
            ],
          },
          {
            title: "Scale Package",
            image: "/images/ppc/pricing-google-scale.jpg",
            price: "₹40,000",
            period: "month",
            features: [
              "Ideal for medium-scale & eCommerce businesses",
              "Up to 8 campaigns including remarketing",
              "Full-funnel strategy (TOF, MOF, BOF)",
              "Advanced bidding & budget allocation",
              "Competitor & market positioning analysis",
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
          Google Ads spend is billed separately based on your campaign goals and reach.
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
            question: "Why choose Clever Crow for Google Ads management?",
            answer:
              "We are a Google Ads certified team focused on ROI-driven campaigns, transparent pricing, and data-backed optimisation strategies.",
          },
          {
            question: "Do you manage ad spend?",
            answer:
              "No. Your ad spend is billed directly by Google. We manage strategy, optimisation, and performance.",
          },
          {
            question: "Can you work with small budgets?",
            answer:
              "Yes. Our Launch package is designed specifically for new advertisers and small businesses.",
          },
          {
            question: "Do you provide reports?",
            answer:
              "Yes. You receive regular performance reports and insights so you always know where your money is going.",
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
