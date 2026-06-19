import MobileAppLandingClient from "./MobileAppLandingClient";
import { getMobileAppLandingData } from "./mobile-data";

export const metadata = {
  title: "Mobile App Development Company | Clever Crow",
  description: "High-performing iOS and Android apps designed for smooth user experience, robust backend scaling, and seamless store approval.",
  keywords: "mobile app development, Android app development, iOS app development, custom mobile app, app development company",
};

export default function MobileAppLandingPage() {
  const data = getMobileAppLandingData();

  return <MobileAppLandingClient data={data} />;
}
