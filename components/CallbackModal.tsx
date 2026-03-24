"use client";

import { XMarkIcon, PhoneIcon } from "@heroicons/react/24/outline";

export default function CallbackModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  if (!open) return null;

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
          <form className="mt-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Your Name
              </label>
              <input
                type="text"
                required
                placeholder="Enter your name"
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
                className="w-full rounded-md border border-gray-300 px-3 py-2.5
                  text-gray-900
                  focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* SUBMIT */}
            <button
              type="submit"
              className="
                mt-2 w-full rounded-md px-4 py-3
                font-semibold text-white
                bg-gradient-to-r from-indigo-500 to-violet-500
                hover:from-indigo-600 hover:to-violet-600
                transition
                shadow-md hover:shadow-lg
              "
            >
              Request Call Back
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
