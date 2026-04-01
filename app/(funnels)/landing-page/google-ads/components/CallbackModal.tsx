"use client";

import React, { useEffect } from "react";

interface CallbackModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CallbackModal({ isOpen, onClose }: CallbackModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("modal-open");
    } else {
      document.body.classList.remove("modal-open");
    }
    return () => document.body.classList.remove("modal-open");
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div id="callback-modal" className="modal-overlay" aria-hidden="false">
      <div className="modal-backdrop" onClick={onClose}></div>
      <div className="modal-panel">
        <button type="button" className="modal-close" onClick={onClose} aria-label="Close callback form">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M18 6 6 18"></path>
            <path d="m6 6 12 12"></path>
          </svg>
        </button>
        <div className="mb-5">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brandSoft/80">Request a Callback</p>
          <h2 className="mt-3 text-2xl font-bold text-white">Speak with Clever Crow Strategies</h2>
          <p className="mt-2 text-sm text-white/62">Call: <a href="tel:+919986389444" className="font-semibold text-support">+91 99863 89444</a></p>
        </div>
        <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); alert("Thanks!"); onClose(); }}>
          <div>
            <label htmlFor="modal-name" className="mb-2 block text-sm font-medium text-white/78">Name</label>
            <input id="modal-name" name="name" type="text" placeholder="Your full name" className="form-input" />
          </div>
          <div>
            <label htmlFor="modal-phone" className="mb-2 block text-sm font-medium text-white/78">Phone Number</label>
            <input id="modal-phone" name="phone" type="tel" placeholder="+91" className="form-input" />
          </div>
          <div>
            <label htmlFor="modal-business" className="mb-2 block text-sm font-medium text-white/78">Business Name</label>
            <input id="modal-business" name="business" type="text" placeholder="Company or brand" className="form-input" />
          </div>
          <div>
            <label htmlFor="modal-budget" className="mb-2 block text-sm font-medium text-white/78">Monthly Ad Budget</label>
            <select id="modal-budget" name="budget" className="form-input">
              <option>Under ₹25,000</option>
              <option>₹25,000 to ₹50,000</option>
              <option>₹50,000 to ₹1,00,000</option>
              <option>₹1,00,000+</option>
            </select>
          </div>
          <div>
            <label htmlFor="modal-interest" className="mb-2 block text-sm font-medium text-white/78">Service Interest</label>
            <select id="modal-interest" name="interest" className="form-input" defaultValue="Google Ads Management">
              <option value="Google Ads Management">Google Ads Management</option>
              <option value="Google Ads Setup">Google Ads Setup</option>
              <option value="Google Ads Audit">Google Ads Audit</option>
            </select>
          </div>
          <button type="submit" className="inline-flex w-full items-center justify-center rounded-2xl bg-[#f4c542] px-6 py-3.5 text-base font-bold text-black transition hover:brightness-110 shadow-[0_8px_25px_rgba(244,197,66,0.25)] mt-2">
            Request a Callback
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-white/56">We usually get back within one business day</p>
      </div>
    </div>
  );
}
