import type { Metadata } from "next";
import EcommerceLandingClient from "./EcommerceLandingClient";
import { getEcommerceLandingData } from "./ecommerce-data";

// E-commerce website packages. Same look, forms and tracking as /lp/website. All copy lives in ecommerce-data.ts.
export const metadata: Metadata = {
  title: "E-commerce Website Development from ₹24,999 | Clever Crow",
  description:
    "Get a complete online store starting at ₹24,999 + GST. UPI, cards and COD payments, shipping and order tracking, and an easy admin panel to manage products and orders.",
  robots: { index: false, follow: false },
};

export default function EcommerceLandingPage() {
  return <EcommerceLandingClient data={getEcommerceLandingData()} />;
}
