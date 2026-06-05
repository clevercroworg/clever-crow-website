import { Metadata } from "next";
import SuccessStoriesClient from "./SuccessStoriesClient";

export const metadata: Metadata = {
  title: "Success Stories | Clever Crow Strategies",
  description:
    "See how Clever Crow Strategies helped brands grow with ROI-driven Google Ads, Meta Ads, and SEO campaigns. Real results, real growth.",
  keywords:
    "case studies, success stories, Google Ads results, Meta Ads ROI, SEO growth, performance marketing, digital marketing results",
};

export default function SuccessStoriesPage() {
  return <SuccessStoriesClient />;
}
