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
          I design interfaces, then build them. To me these aren&rsquo;t two
          jobs: the person choosing the type sizes, spacing and hierarchy is the
          same one writing the code that ships — so the small decisions in a
          design don&rsquo;t get lost on the way into code.
        </p>

        <p>
          I came up through software development. What actually stopped me was
          noticing how much I&rsquo;d fuss over whether a page looked good
          enough, felt considered enough — the kind of thing most people never
          register, but where being slightly off just reads as wrong to me, and
          I can&rsquo;t leave it alone. Engineering is my foundation; it&rsquo;s
          what lets the things I want to make actually get built.
        </p>

        <p>
          Two recent things: AI Chat, a chat app built on a design system of my
          own; and Urban Studio, a press-on nail label where I set everything
          from the brand to the storefront&rsquo;s templates. One is a product
          surface, the other a shopfront — and they turned out to be the same
          work. The detail is in the case studies, not in this paragraph.
        </p>

        <p>
          Master of Software Development from the University of Utah, finished at
          the end of 2024.
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

      {/* Pulled out of the prose and set at the foot of the page as a sign-off,
          so it reads as a location line rather than as a clause on the degree —
          "University of Utah ... based in New York" made Utah sound like it was
          in New York. */}
      <p className="about__location">Based in New York</p>
    </>
  );
}
