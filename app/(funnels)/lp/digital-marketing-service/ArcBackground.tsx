import React from "react";

// Light background of thin concentric arcs entering from the edges. Pure SVG (crisp at any size);
// groups sit away from the centred heading so it stays easy to read. Decorative only.
function ArcGroup({ className, from = 0, sweep = 360, rings = 16 }: { className: string; from?: number; sweep?: number; rings?: number }) {
  const paths: string[] = [];
  for (let i = 0; i < rings; i++) {
    const r = 120 + i * 18;
    if (sweep >= 360) {
      paths.push(`M ${-r} 0 A ${r} ${r} 0 1 0 ${r} 0 A ${r} ${r} 0 1 0 ${-r} 0`);
    } else {
      const a0 = (from * Math.PI) / 180;
      const a1 = ((from + sweep) * Math.PI) / 180;
      const large = sweep > 180 ? 1 : 0;
      paths.push(
        `M ${(r * Math.cos(a0)).toFixed(2)} ${(r * Math.sin(a0)).toFixed(2)} A ${r} ${r} 0 ${large} 1 ${(r * Math.cos(a1)).toFixed(2)} ${(r * Math.sin(a1)).toFixed(2)}`
      );
    }
  }
  return (
    <svg viewBox="-420 -420 840 840" className={`absolute ${className}`} fill="none">
      {paths.map((d, i) => (
        <path key={i} d={d} stroke="#C5CDD8" strokeWidth="1" strokeOpacity={0.35 + (i / rings) * 0.45} vectorEffect="non-scaling-stroke" />
      ))}
    </svg>
  );
}

export default function ArcBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
      {/* Top-left, cropped by the corner */}
      <ArcGroup className="-left-[260px] -top-[300px] w-[640px] sm:-left-[220px] sm:-top-[260px] sm:w-[760px]" />
      {/* Right edge beside the heading, opening to the right */}
      <ArcGroup className="-right-[320px] top-[40px] w-[560px] sm:-right-[300px] sm:top-[60px] sm:w-[780px]" from={90} sweep={180} />
      {/* Middle-left, partly behind the cards */}
      <ArcGroup className="-left-[360px] top-[46%] hidden w-[820px] lg:block" from={-90} sweep={180} />
      {/* Bottom-right */}
      <ArcGroup className="-bottom-[340px] -right-[200px] w-[680px] sm:w-[860px]" from={180} sweep={180} />
      {/* Bottom-left, small */}
      <ArcGroup className="-bottom-[260px] -left-[200px] w-[520px] sm:w-[620px]" from={-90} sweep={180} rings={12} />
    </div>
  );
}
