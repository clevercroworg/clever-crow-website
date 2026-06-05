"use client";

import { useState } from "react";

export default function InlineForm() {
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const form = e.currentTarget;
    const formData = new FormData(form);
    const name = formData.get("name") as string;
    const phone = formData.get("phone") as string;
    const businessType = formData.get("businessType") as string;

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name,
          phone,
          email: "",
          message: `PPC Enquiry Callback. Business Type: ${businessType || "Not specified"}`,
          source: "PPC Landing Page"
        })
      });

      if (!response.ok) {
        throw new Error("Failed to submit");
      }

      // Fire Google Ads conversion tracking
      if (typeof window !== "undefined" && (window as any).gtag) {
        (window as any).gtag("event", "conversion", {
          send_to: "AW-17335403082/YwV4CJ-q_e8YEPq9me49",
        });
      }

      window.location.href = "/ppc/thank-you?source=digital-marketing";
    } catch (err) {
      console.error("Form submission failed", err);
      alert("Something went wrong. Please try again.");
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5"
    >
      <h3 className="text-xl font-extrabold">
        Request a Call Back
      </h3>

      <input
        name="name"
        required
        placeholder="Your Name"
        className="w-full border rounded-lg px-4 py-3 focus:outline-none"
      />

      <input
        name="phone"
        required
        placeholder="Phone Number"
        className="w-full border rounded-lg px-4 py-3 focus:outline-none"
      />

      <select
        name="businessType"
        className="w-full border rounded-lg px-4 py-3 bg-white focus:outline-none"
      >
        <option value="">Business Type</option>
        <option value="service">Service Business</option>
        <option value="ecommerce">E-commerce</option>
        <option value="local">Local Business</option>
        <option value="startup">Startup</option>
      </select>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-black text-white py-3 rounded-lg font-semibold hover-glow hover-glow-strong disabled:opacity-60"
      >
        {loading ? "Submitting..." : "Get Call Back"}
      </button>

      <p className="text-xs text-gray-500">
        We respect your privacy. No spam.
      </p>
    </form>
  );
}
