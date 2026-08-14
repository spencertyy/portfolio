import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description:
    "Design developer in New York. Master of Software Development, University of Utah.",
};

export default function AboutPage() {
  return (
    <>
      <h1 className="page-title">About</h1>

      <div className="prose stack">
        <p>
          I design interfaces and then build them. In practice that means the
          same person decides the type scale and writes the CSS that ships it —
          which is usually why the details survive the trip to production.
        </p>

        <p>
          Two things I&rsquo;ve made recently. An AI chat app, built around a
          fully tokenised design system with the accessibility work done
          properly rather than as a checklist — every colour, size and spacing
          value resolves through a variable, and the contrast was measured
          against composited backgrounds rather than declared ones. And Urban
          Studio, a press-on nail label where I set the brand and customised the
          storefront down to its Liquid templates. One is a product surface, the
          other is a shopfront. The work turns out to be the same work.
        </p>

        <p>
          I hold a Master of Software Development from the University of Utah,
          in Salt Lake City, finished at the end of 2024. I&rsquo;m now based in
          New York.
        </p>

        {/* The rail's icons are the fast path from anywhere on the site; this is
            the address itself, spelled out, for anyone who wants to copy it
            rather than open a mail client. An icon cannot be pasted. */}
        <p>
          The fastest way to reach me is{" "}
          <a className="link" href="mailto:spencer.tuyuyao@gmail.com">
            spencer.tuyuyao@gmail.com
          </a>
          .
        </p>
      </div>
    </>
  );
}
