export default function PPCClientLogos() {
  const logos = [
    "/images/ppc/client1.png",
    "/images/ppc/client2.png",
    "/images/ppc/client3.png",
    "/images/ppc/client4.png",
    "/images/ppc/client5.png",
    "/images/ppc/client6.png",
    "/images/ppc/client7.png",
    "/images/ppc/client8.png",
    "/images/ppc/client9.png",
  ];

  return (
    <section className="relative overflow-hidden bg-white border-b py-3">
      <div className="mx-auto max-w-7xl px-6 relative">

        {/* LEFT FADE — hides hard cut of scrolling logos */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-white to-transparent z-10" />

        {/* RIGHT FADE — same purpose */}
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-white to-transparent z-10" />

        {/* LOGO SCROLLER */}
        <div className="flex w-max items-center gap-16 animate-ppc-scroll">
          {[...logos, ...logos].map((src, i) => (
            <div
              key={i}
              className="flex h-16 w-32 items-center justify-center"
            >
              <img
                src={src}
                alt="Client logo"
                className="max-h-12 max-w-[120px] object-contain"
                loading="lazy"
              />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
