"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  src: string;
  poster: string;
  width: number;
  height: number;
  /** Describes what the clip shows, the same way alt text describes an image. */
  label: string;
};

/**
 * A looping clip that starts only if the reader has not asked for less motion.
 *
 * This is the reason these are videos rather than the GIFs the repositories
 * ship. An animated GIF plays the moment it decodes: it cannot be paused, and
 * it has no way to hear `prefers-reduced-motion`. A page of nine of them is
 * genuinely hard to use for anyone sensitive to motion — and there is no markup
 * that fixes it, because the format has no controls.
 *
 * So: the server renders a still frame with no autoplay attribute, and the
 * client starts playback only after confirming motion is welcome. Anyone who
 * asked for less gets the poster plus real controls, and can opt in.
 */
export default function Motion({ src, poster, width, height, label }: Props) {
  const ref = useRef<HTMLVideoElement>(null);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");

    const apply = () => {
      setReduced(query.matches);
      const video = ref.current;
      if (!video) return;
      // play() rejects when the browser blocks autoplay — a muted, inline video
      // is normally allowed, but the promise still has to be handled or it
      // surfaces as an unhandled rejection in the console.
      if (query.matches) video.pause();
      else void video.play().catch(() => {});
    };

    apply();
    query.addEventListener("change", apply);
    return () => query.removeEventListener("change", apply);
  }, []);

  return (
    <video
      ref={ref}
      src={src}
      poster={poster}
      width={width}
      height={height}
      aria-label={label}
      loop
      muted
      playsInline
      preload="metadata"
      controls={reduced}
    />
  );
}
