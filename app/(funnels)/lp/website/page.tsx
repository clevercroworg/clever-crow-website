import WebsiteLandingClient from "./WebsiteLandingClient";
import { getWebsiteLandingData } from "./website-data";

export default function WebsiteLandingPage() {
  const data = getWebsiteLandingData();

  return <WebsiteLandingClient data={data} />;
}
