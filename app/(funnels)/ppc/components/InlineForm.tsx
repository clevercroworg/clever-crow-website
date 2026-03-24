"use client";

import { useState } from "react";

export default function InlineForm() {
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      await fetch("/api/ppc-lead", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: formData.get("name"),
          phone: formData.get("phone"),
          businessType: formData.get("businessType"),
          source: "ppc-digital-marketing"
        })
      });

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
