export default function NextCTA() {
  return (
    <section className="relative py-20 sm:py-24 bg-[#fafafa] overflow-hidden">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        
        {/* CTA Card */}
        <div
          className="
            group
            rounded-2xl
            border border-black/10
            bg-white
            px-6 py-10 sm:px-10 sm:py-14
            transition-colors duration-300
            hover:bg-yellow-400
          "
        >
          <div className="grid gap-8 md:grid-cols-[1.5fr_1fr] items-center">
            
            {/* LEFT: Text */}
            <div className="text-center md:text-left">
              <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-black">
                Ready to grow your business?
              </h2>

              <p className="mt-4 max-w-xl text-base sm:text-lg text-black/70">
                Speak directly with our team and get a clear growth plan tailored
                to your business.
              </p>
            </div>

            {/* RIGHT: Actions */}
            <div className="flex flex-col sm:flex-row md:flex-col items-center md:items-end gap-4">
              
              {/* WhatsApp */}
              <a
                href="https://wa.me/919986389444"
                target="_blank"
                rel="noopener noreferrer"
                className="
                  w-full sm:w-auto md:w-full
                  inline-flex items-center justify-center gap-3
                  rounded-full
                  bg-black
                  px-8 py-4
                  text-sm font-medium
                  text-white
                  transition-colors duration-300
                  group-hover:bg-white
                  group-hover:text-black
                "
              >
                {/* WhatsApp Icon */}
                <svg
                  className="h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 2a10 10 0 0 0-8.47 15.32L2 22l4.82-1.27A10 10 0 1 0 12 2zm0 18a8 8 0 0 1-4.08-1.12l-.29-.17-2.86.75.76-2.78-.19-.29A8 8 0 1 1 12 20zm4.43-5.57c-.24-.12-1.41-.7-1.63-.78-.22-.08-.38-.12-.54.12-.16.24-.62.78-.76.94-.14.16-.28.18-.52.06-.24-.12-1-.37-1.9-1.18-.7-.62-1.18-1.38-1.32-1.62-.14-.24-.01-.37.11-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.3-.74-1.78-.2-.48-.4-.42-.54-.42h-.46c-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2 0 1.18.86 2.32.98 2.48.12.16 1.7 2.6 4.12 3.64.58.25 1.03.4 1.38.51.58.18 1.1.16 1.52.1.46-.07 1.41-.58 1.61-1.14.2-.56.2-1.04.14-1.14-.06-.1-.22-.16-.46-.28z" />
                </svg>
                Chat on WhatsApp
              </a>

              {/* Phone */}
              <a
                href="tel:09986389444"
                className="
                  w-full sm:w-auto md:w-full
                  inline-flex items-center justify-center gap-3
                  rounded-full
                  border border-black/30
                  px-8 py-4
                  text-sm font-medium
                  text-black
                  transition-colors duration-300
                  group-hover:border-black
                "
              >
                {/* Phone Icon */}
                <svg
                  className="h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22 16.9v3a2 2 0 0 1-2.2 2A19.8 19.8 0 0 1 3 5.2 2 2 0 0 1 5 3h3a2 2 0 0 1 2 1.7l.6 3a2 2 0 0 1-.5 1.8l-1.3 1.3a16 16 0 0 0 6.4 6.4l1.3-1.3a2 2 0 0 1 1.8-.5l3 .6a2 2 0 0 1 1.7 2z" />
                </svg>
                Call 09986389444
              </a>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
