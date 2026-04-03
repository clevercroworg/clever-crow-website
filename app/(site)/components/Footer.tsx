"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Phone } from "lucide-react";
import { FaWhatsapp, FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="relative w-full bg-gradient-to-b from-[#1a1f35] to-[#0d1218] text-gray-300">
      {/* Main Footer Content */}
      <div className="mx-auto max-w-7xl px-6 py-16 sm:py-20">
        {/* Footer Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12 mb-16">
          {/* Services Column */}
          <div>
            <h3 className="text-white text-lg font-bold mb-6 tracking-tight">Services</h3>
            <ul className="space-y-3">
              <li><Link href="/services/google-ads" className="text-gray-400 hover:text-yellow-400 transition-colors">Google Ads Management</Link></li>
              <li><Link href="/services/meta-ads" className="text-gray-400 hover:text-yellow-400 transition-colors">Meta Ads Management</Link></li>
              <li><Link href="/services/business-websites" className="text-gray-400 hover:text-yellow-400 transition-colors">Website Development</Link></li>
              <li><Link href="/services/mobile-app" className="text-gray-400 hover:text-yellow-400 transition-colors">App Development</Link></li>
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h3 className="text-white text-lg font-bold mb-6 tracking-tight">Company</h3>
            <ul className="space-y-3">
              <li><Link href="/" className="text-gray-400 hover:text-yellow-400 transition-colors">About Us</Link></li>
              <li><Link href="/services" className="text-gray-400 hover:text-yellow-400 transition-colors">Our Work / Case Studies</Link></li>
              <li><Link href="/contact" className="text-gray-400 hover:text-yellow-400 transition-colors">Contact Us</Link></li>
              <li><Link href="/internship" className="text-gray-400 hover:text-yellow-400 transition-colors">Careers</Link></li>
            </ul>
          </div>

          {/* Resources Column */}
          <div>
            <h3 className="text-white text-lg font-bold mb-6 tracking-tight">Resources</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors">FAQs</a></li>
              <li><a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors">Blog</a></li>
              <li><Link href="/services" className="text-gray-400 hover:text-yellow-400 transition-colors">Case Studies</Link></li>
              <li><Link href="/contact" className="text-gray-400 hover:text-yellow-400 transition-colors">Free Consultation</Link></li>
            </ul>
          </div>

          {/* Get in Touch Column */}
          <div>
            <h3 className="text-white text-lg font-bold mb-6 tracking-tight">Get in Touch</h3>
            
            {/* Phone */}
            <a 
              href="tel:+919986389444" 
              className="flex items-center gap-3 text-gray-400 hover:text-yellow-400 transition-colors mb-6"
            >
              <Phone size={20} />
              <span className="font-semibold">+91 99863 89444</span>
            </a>

            {/* Buttons */}
            <div className="space-y-3">
              <a 
                href="/contact" 
                className="flex items-center justify-center gap-2 w-full bg-[#f4c542] hover:brightness-110 text-black px-6 py-3 rounded-full text-sm font-bold transition-all"
              >
                <span>✉️</span> Request a Quote
              </a>
              <a 
                href="https://wa.me/919986389444" 
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 w-full bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-full text-sm font-bold transition-all"
              >
                <FaWhatsapp size={18} /> Chat With Us
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section with Logo and Social Links */}
        <div className="border-t border-gray-700 pt-12">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            {/* Left: Logo and Description */}
            <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
              <div className="mb-4">
                <Image
                  src="/logo-dark.svg"
                  alt="Clever Crow"
                  width={160}
                  height={50}
                  className="h-10 w-auto"
                />
              </div>
              <p className="text-gray-400 text-sm max-w-xs">
                Clever Crow Strategies helps ambitious brands grow with premium websites, sharper campaigns, and creative systems built to convert.
              </p>
              
              {/* Social Links */}
              <div className="flex gap-4 mt-6">
                <a
                  href="https://www.facebook.com/people/Clever-Crow-Strategies/61579261586907/"
                  target="_blank"
                  rel="noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-600 bg-gray-900 hover:bg-yellow-400 hover:border-yellow-400 transition-all"
                >
                  <FaFacebook size={18} className="text-gray-400 hover:text-black" />
                </a>
                <a
                  href="https://www.instagram.com/clevercrow.strategies"
                  target="_blank"
                  rel="noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-600 bg-gray-900 hover:bg-yellow-400 hover:border-yellow-400 transition-all"
                >
                  <FaInstagram size={18} className="text-gray-400 hover:text-black" />
                </a>
                <a
                  href="https://www.linkedin.com/company/clever-crow-strategies/"
                  target="_blank"
                  rel="noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-600 bg-gray-900 hover:bg-yellow-400 hover:border-yellow-400 transition-all"
                >
                  <FaLinkedin size={18} className="text-gray-400 hover:text-black" />
                </a>
              </div>
            </div>

            {/* Right: Footer Links */}
            <div className="flex flex-col sm:flex-row items-center gap-6 text-sm text-gray-500">
              <Link href="/privacy-policy" className="hover:text-gray-300 transition-colors">Privacy Policy</Link>
              <span className="hidden sm:inline">|</span>
              <Link href="/terms-and-conditions" className="hover:text-gray-300 transition-colors">Terms & Conditions</Link>
              <span className="hidden sm:inline">|</span>
              <a href="#" className="hover:text-gray-300 transition-colors">Refund Policy</a>
            </div>
          </div>

          {/* Copyright */}
          <div className="mt-8 pt-6 border-t border-gray-700 text-center text-gray-500 text-xs">
            <p>© 2026 Clever Crow Strategies LLP. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
