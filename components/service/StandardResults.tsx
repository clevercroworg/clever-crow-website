import ResultsCarousel from "@/components/ResultsCarousel";

export function StandardResults() {
  return (
    <ResultsCarousel
      title="Success Stories"
      items={[
        {
          client: "Baatu",
          industry: "Ecommerce",
          headline: "From Confusion to Conversion",
          image: "/landing-page/google-ads/case-studies/baatu.jpg",
          metrics: [
            { value: "₹25L", label: "Revenue" },
            { value: "120%", label: "Conversion Growth" },
            { value: "3×", label: "Customer Clarity" },
          ],
        },
        {
          client: "Wedding Planning Unzipped",
          industry: "Professional Wedding Planner",
          headline: "Clarity That Changed Everything",
          image: "/landing-page/google-ads/case-studies/wedding.jpg",
          metrics: [
            { value: "₹8.9L", label: "Revenue" },
            { value: "190%", label: "Conversion Rate" },
            { value: "2×", label: "Booking Momentum" },
          ],
        },
        {
          client: "Site Surgery Center",
          industry: "Healthcare Operations & Clinical Services",
          headline: "Efficiency Without Disruption",
          image: "/landing-page/google-ads/case-studies/lakeview.jpg",
          metrics: [
            { value: "₹84L", label: "Revenue" },
            { value: "58%", label: "Conversion Rate" },
            { value: "40%", label: "Operational Efficiency" },
          ],
        },
        {
          client: "DTC Dentals",
          industry: "Healthcare & Dental Services",
          headline: "Smiles That Convert",
          image: "/landing-page/google-ads/case-studies/ddcsmiles.jpg",
          metrics: [
            { value: "₹35L", label: "Monthly Revenue" },
            { value: "15×", label: "Conversion Growth" },
            { value: "31%", label: "Lower Cost Per Appointment" },
          ],
        },
        {
          client: "BGS Global Institute of Medical",
          industry: "Education",
          headline: "Making Admissions Effortless",
          image: "/landing-page/google-ads/case-studies/bgs-global.jpg",
          metrics: [
            { value: "₹2.4Cr", label: "Revenue" },
            { value: "25%", label: "Admission Increase" },
            { value: "1,800+", label: "New Enrollments" },
          ],
        },
        {
          client: "Asthitva – The Venue",
          industry: "Event Venues & Hospitality",
          headline: "From Clicks to Celebration",
          image: "/landing-page/google-ads/case-studies/ashray.jpg",
          metrics: [
            { value: "180%", label: "Website Conversion" },
            { value: "450+", label: "Venue Inquiries" },
            { value: "65%", label: "Inquiry-to-Booking Rate" },
          ],
        },
      ]}
    />
  );
}
