"use client";

import { useState } from "react";

export default function QuoteModal() {
  const [open, setOpen] = useState(false);
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
          email: formData.get("email"),
          phone: formData.get("phone"),
          budget: formData.get("budget"),
          message: formData.get("message"),
          source: "ppc-digital-marketing-quote"
        })
      });

      window.location.href = "/ppc/thank-you?source=custom-quote";
    } catch (err) {
      console.error("Quote form failed", err);
      alert("Something went wrong. Please try again.");
      setLoading(false);
    }
  }

  return (
    <>
      {/* Trigger Button */}
      <button
        onClick={() => setOpen(true)}
        className="bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover-glow hover-glow-purple"
      >
        Request a Custom Quote
      </button>

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4">
          <div className="relative bg-white rounded-2xl w-full max-w-lg p-8 animate-fadeUp">

            {/* Close */}
            <button
              onClick={() => setOpen(false)}
              className="absolute top-4 right-4 text-gray-500 text-xl"
            >
              ×
            </button>

            <h3 className="text-xl font-extrabold mb-6">
              Request a Custom Quote
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                name="name"
                required
                placeholder="Your Name"
                className="w-full border rounded-lg px-4 py-3"
              />

              <input
                name="email"
                type="email"
                required
                placeholder="Email Address"
                className="w-full border rounded-lg px-4 py-3"
              />

              <input
                name="phone"
                required
                placeholder="Phone Number"
                className="w-full border rounded-lg px-4 py-3"
              />

              <select
                name="budget"
                className="w-full border rounded-lg px-4 py-3 bg-white"
              >
                <option value="">Monthly Ad Budget</option>
                <option value="50k-1l">₹50k – ₹1L</option>
                <option value="1l-5l">₹1L – ₹5L</option>
                <option value="5l+">₹5L+</option>
              </select>

              <textarea
                name="message"
                placeholder="Briefly tell us about your goals"
                className="w-full border rounded-lg px-4 py-3 h-24"
              />

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-black text-white py-3 rounded-lg font-semibold hover-glow hover-glow-strong disabled:opacity-60"
              >
                {loading ? "Submitting..." : "Submit Request"}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
