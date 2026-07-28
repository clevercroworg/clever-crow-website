import React from "react";
import SetupLandingClient from "./SetupLandingClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Complete Digital Marketing Setup | 2026 | Clever Crow",
  description:
    "A professionally configured digital marketing foundation for businesses ready to advertise, track leads, and scale online. One-time setup @ ₹19,999 + GST. No monthly commitment.",
  robots: {
    index: true,
    follow: true,
  },
};

export default function DigitalMarketingSetupPage() {
  return <SetupLandingClient />;
}
