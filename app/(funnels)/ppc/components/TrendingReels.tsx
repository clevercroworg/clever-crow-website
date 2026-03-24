"use client";

import { useEffect, useRef, useState } from "react";

export default function TrendingReels() {
  const reels = Array.from({ length: 20 }, (_, i) => ({
    id: i + 1,
    src: `/images/reels/reel${i + 1}.mp4`,
  }));

  const ITEMS_PER_LOAD = 4;
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_LOAD);
  const loaderRef = useRef<HTMLDivElement | null>(null);

  // Load next 4 reels on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && visibleCount < reels.length) {
          setVisibleCount((prev) =>
            Math.min(prev + ITEMS_PER_LOAD, reels.length)
          );
        }
      },
      { threshold: 1 }
    );

    if (loaderRef.current) observer.observe(loaderRef.current);
    return () => observer.disconnect();
  }, [visibleCount, reels.length]);

  return (
    <section className="py-20 bg-black">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-3">
            What’s Working Right Now
          </h2>
          <p className="text-white max-w-2xl mx-auto">
            High-performing short-form creatives actively driving engagement and
            conversions across campaigns.
          </p>
        </div>

        {/* Reels Grid */}
        <div className="grid grid-cols-2 min-[900px]:grid-cols-4 gap-6">
          {reels.slice(0, visibleCount).map((reel) => (
            <ReelCard key={reel.id} src={reel.src} />
          ))}
        </div>

        {/* Scroll trigger */}
        {visibleCount < reels.length && (
          <div
            ref={loaderRef}
            className="h-10 mt-10 flex items-center justify-center"
          >
            <span className="text-sm text-gray-400">Loading more…</span>
          </div>
        )}
      </div>
    </section>
  );
}

/* ------------------------------------------------ */
/* ReelCard: lazy-load + pause & unload offscreen   */
/* ------------------------------------------------ */

function ReelCard({ src }: { src: string }) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.4 }
    );

    if (videoRef.current) observer.observe(videoRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isVisible) {
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  }, [isVisible]);

  return (
    <div className="relative overflow-hidden rounded-2xl bg-black aspect-[9/16]">
      <video
        ref={videoRef}
        src={isVisible ? src : undefined}
        muted
        loop
        playsInline
        preload="none"
        className="absolute inset-0 h-full w-full object-cover"
      />
    </div>
  );
}
