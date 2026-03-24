export default function PlatformsStrip() {
  return (
    <section className="bg-white pt-3 pb-10">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-wrap items-center justify-left gap-x-14 gap-y-3 opacity-80">
          <img
            src="/logos/google-ads.svg"
            alt="Google Ads"
            className="h-7  "
          />
          <img
            src="/logos/ga4.png"
            alt="Google Analytics"
            className="h-7 "
          />
          <img
            src="/logos/gtm.svg"
            alt="Google Tag Manager"
            className="h-7  "
          />
          <img
            src="/logos/search-console.svg"
            alt="Search Console"
            className="h-7"
          />
        </div>
      </div>
    </section>
  );
}
