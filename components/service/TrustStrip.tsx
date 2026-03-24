type TrustStripProps = {
  title?: string;
  items?: string[];
};

export default function TrustStrip({
  title = "Platforms we work with",
  items = [
    "Google Ads",
    "Google Analytics (GA4)",
    "Google Tag Manager",
    "Search Console",
  ],
}: TrustStripProps) {
  return (
   <section className="border-y border-gray-200 py-8 bg-gray-50">

      <div className="mx-auto max-w-6xl px-6">

        <p className="mb-6 text-center text-sm font-medium text-gray-500">
          {title}
        </p>

        <ul className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 text-sm font-medium text-gray-700">
          {items.map((item, index) => (
            <li key={index} className="opacity-80">
              {item}
            </li>
          ))}
        </ul>

      </div>
    </section>
  );
}
