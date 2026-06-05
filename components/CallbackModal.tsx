"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { XMarkIcon, PhoneIcon } from "@heroicons/react/24/outline";

export default function CallbackModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState("");

  if (!open) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) {
      setStatusMsg("Please enter both name and phone number.");
      return;
    }
    setLoading(true);
    setStatusMsg("");

    try {
      const currentUrl = typeof window !== "undefined" ? window.location.href : "";
      const currentTitle = typeof window !== "undefined" ? document.title : "";
      const source = currentTitle || "Main Site Callback Modal";

      const message = `Callback Request Details:
- Referrer/Landed URL: ${currentUrl}`;

      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          phone,
          email: "",
          message,
          source,
        }),
      });

      if (!response.ok) {
        throw new Error("Something went wrong. Please try again.");
      }

      // Fire Google Ads conversion tracking
      if (typeof window !== "undefined" && (window as any).gtag) {
        (window as any).gtag("event", "conversion", {
          send_to: "AW-17335403082/YwV4CJ-q_e8YEPq9me49",
        });
        (window as any).gtag("event", "GenerateLead", {
          event_category: "Leads",
          event_label: "Lead Form Submit",
        });
      }

      setName("");
      setPhone("");
      onClose();
      router.push("/thank-you");
    } catch (err: any) {
      setStatusMsg(err.message || "An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 backdrop-blur-sm">
      
      <div className="relative w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl">
        
        {/* TOP AI GRADIENT STRIP */}
        <div className="h-1.5 bg-gradient-to-r from-indigo-500 via-violet-500 to-fuchsia-500" />

        {/* CLOSE */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-900 transition"
          aria-label="Close"
        >
          <XMarkIcon className="h-5 w-5" />
        </button>

        <div className="p-6 sm:p-7">
          
          {/* ICON */}
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
            <PhoneIcon className="h-6 w-6" />
          </div>

          {/* HEADING */}
          <h3 className="mt-4 text-xl font-semibold text-gray-900">
            Request a Call Back
          </h3>

          <p className="mt-2 text-sm text-gray-600">
            Share your details and our team will call you within one business day.
          </p>

          {/* FORM */}
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Your Name
              </label>
              <input
                type="text"
                required
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={loading}
                className="w-full rounded-md border border-gray-300 px-3 py-2.5
                  text-gray-900
                  focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                required
                placeholder="Enter your phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                disabled={loading}
                className="w-full rounded-md border border-gray-300 px-3 py-2.5
                  text-gray-900
                  focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {statusMsg && (
              <p className="text-xs font-semibold text-rose-600 mt-1">
                {statusMsg}
              </p>
            )}

            {/* SUBMIT */}
            <button
              type="submit"
              disabled={loading}
              className="
                mt-2 w-full rounded-md px-4 py-3
                font-semibold text-white
                bg-gradient-to-r from-indigo-500 to-violet-500
                hover:from-indigo-600 hover:to-violet-600
                transition
                shadow-md hover:shadow-lg
                disabled:opacity-50
              "
            >
              {loading ? "Submitting..." : "Request Call Back"}
            </button>
          </form>

          {/* TRUST LINE */}
          <p className="mt-4 text-center text-xs text-gray-500">
            We respect your privacy. No spam. No sales pressure.
          </p>
        </div>
      </div>
    </div>
  );
}
