import Link from "next/link";

// Kept next to the nav's list on purpose — these two are the only places that
// know what the projects are, and they should be edited together.
const WORK = [
  {
    href: "/ai-chat",
    index: "01",
    title: "AI Chat",
    meta: "Design system · Streaming UI · 2026",
  },
  {
    href: "/urban-studio",
    index: "02",
    title: "Urban Studio",
    // Start year only. An end year on a project that is still running would
    // need editing every January to stay true, and a date that quietly goes
    // stale is worse than one that was never precise.
    meta: "Brand · Shopify storefront · 2023",
  },
];

export default function HomePage() {
  return (
    <>
      {/* The line breaks here are structural, not decorative — max-width on
          .hero is set in ch so the shape holds as the font size scales. */}
      <h1 className="hero">
        I design and build the surfaces people see before they sign up.
      </h1>

      <p className="lede">
        Design developer. I work across brand, interface and production code —
        most recently a design system for an AI chat product, and the brand and
        storefront for a DTC nail label.
      </p>

      <section className="section">
        <div className="section__label">Selected work</div>
        <div className="work">
          {WORK.map((item) => (
            <Link key={item.href} href={item.href} className="work__item">
              <span className="work__index">{item.index}</span>
              <span className="work__title">{item.title}</span>
              <span className="work__meta">{item.meta}</span>
              <span className="work__arrow" aria-hidden="true">
                →
              </span>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
