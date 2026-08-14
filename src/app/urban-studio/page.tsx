import type { Metadata } from "next";
import Image from "next/image";

// The root layout supplies the "— Yuyao Tu" suffix. The description is what a
// link preview shows under the title, so it states what the project is rather
// than repeating the page's own opening line.
const DESCRIPTION =
  "A press-on nail label — brand, Shopify storefront, and the hand-written Liquid underneath it.";

export const metadata: Metadata = {
  title: "Urban Studio",
  description: DESCRIPTION,
  // Overrides the root block rather than replacing it wholesale: siteName and
  // type still come from the layout.
  openGraph: {
    title: "Urban Studio — Yuyao Tu",
    description: DESCRIPTION,
    url: "/urban-studio",
    images: [{ url: "/og/og-urban-studio.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og/og-urban-studio.png"],
  },
};

const LINKS = [
  { href: "https://urbanstudionails.com", label: "Live store" },
  {
    href: "https://github.com/spencertyy/shopify-custom-theme-urbanstudionails",
    label: "Code",
  },
];

const FACTS = [
  { value: "53%", label: "of sessions on mobile" },
  { value: "9%", label: "returning customers" },
  { value: "$49.80", label: "average order value" },
];

// The honest ledger. Kept as data rather than markup because the point of the
// section is the split itself — each row has to be a deliberate claim.
//
// "JSON‑LD" carries a non-breaking hyphen (U+2011) rather than the usual
// hyphen-minus: in the narrow single-column layout the term was breaking after
// "JSON-", which reads as two words.
const LEDGER = [
  {
    term: "Hand-written, live",
    desc: "A sticky mobile add-to-cart bar. A Product JSON‑LD snippet with per-variant offers, length-typed GTINs and a guarded rating. An FAQ section that emits FAQPage data. Three storefront sections: a promo marquee, a product spotlight, and a product-page “how it works”.",
  },
  {
    term: "Configured, not built",
    desc: "Dawn’s cart drawer and quick-add — switched on, not written. Google Merchant Center taxonomy and feeds, set up by hand so the catalogue is eligible for Shopping surfaces.",
  },
  {
    term: "The theme’s, not mine",
    desc: "fetchpriority, responsive srcset, deferred CSS and the Open Graph tags all ship with Dawn v15. They were on a draft of my résumé until I read the source.",
  },
  {
    term: "Built, never shipped",
    desc: "An SVG variant picker that draws each nail shape — finished, and it never renders, because the products are sold by size rather than by shape. A lookbook template and a gift landing page are complete and waiting on a collection and a page to attach to.",
  },
];

export default function UrbanStudioPage() {
  return (
    <>
      <div className="case__eyebrow">02 — Brand · Storefront · Conversion</div>
      <h1 className="page-title">Urban Studio</h1>

      <p className="lede">
        A press-on nail label I founded and still run — the identity, the
        storefront, and the code underneath it. Built on Shopify’s Dawn theme
        with the custom parts hand-written in Liquid, vanilla JavaScript and
        CSS, and shipped to people who actually pay for it.
      </p>

      <div className="case__links">
        {LINKS.map((l) => (
          <a key={l.href} href={l.href} target="_blank" rel="noreferrer">
            {l.label}
            <span aria-hidden="true"> ↗</span>
          </a>
        ))}
      </div>

      {/* priority: largest element above the fold, same reasoning as the AI
          Chat case study — it should not wait for lazy-loading. */}
      <div className="case__figure">
        <Image
          src="/urban-studio.jpg"
          alt="Urban Studio storefront homepage — full-bleed hero photograph of press-on nails, wordmark, and a shop-all call to action"
          width={2880}
          height={1620}
          priority
        />
      </div>

      <div className="facts">
        {FACTS.map((f) => (
          <div key={f.label} className="facts__item">
            <div className="facts__value">{f.value}</div>
            <div className="facts__label">{f.label}</div>
          </div>
        ))}
      </div>

      <section className="section">
        <div className="section__label">Half the visitors arrive on a phone</div>
        <div className="prose stack">
          <p>
            Two years of sessions split just past half onto mobile. On a phone
            Dawn’s product page is long enough that the add-to-cart button
            leaves the screen within a scroll or two of the fold, and getting
            back to it means scrolling up past everything you just read to
            decide.
          </p>
          <p>
            So a bar slides up from the bottom once the real button exits the
            viewport — thumbnail, title, price, buy. An{" "}
            <code>IntersectionObserver</code> watches the main submit button and
            toggles a class; the bar animates on <code>transform</code> rather
            than <code>bottom</code>, which keeps it on the compositor instead
            of forcing layout every frame. A scroll listener would have needed
            throttling to do the same job worse.
          </p>
          <p>
            The bar’s button does not reimplement add-to-cart. It calls{" "}
            <code>.click()</code> on the main one, so variant selection,
            quantity and the cart drawer keep working through the code that
            already handles them. The cost is a hard dependency on that
            button’s DOM id — rename it upstream and the bar silently stops
            working. One coupling in exchange for not maintaining two purchase
            paths that drift.
          </p>
          <p>
            It shipped, and then it was invisible on real phones. A loyalty
            widget and Shopify’s chat launcher both sit at maximum{" "}
            <code>z-index</code>, floating exactly where the bar appears.
            Patching vendor code would have been undone by their next release,
            so the bar toggles a class on <code>&lt;body&gt;</code> and
            mobile-scoped CSS lifts both launchers while it is up.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="section__label">
          Structured data the theme did not ship
        </div>
        <div className="prose stack">
          <p>
            Dawn emits a basic Product JSON-LD. This one adds a per-variant{" "}
            <code>Offer</code> inside the <code>AggregateOffer</code>, so every
            variant carries its own price, availability, URL and{" "}
            <code>priceValidUntil</code> and Google resolves a specific product
            rather than a range. Barcodes are typed by length — eight digits
            emit <code>gtin8</code>, twelve emit <code>gtin12</code> — and a
            missing barcode emits nothing rather than an empty field.
          </p>
          <p>
            <code>aggregateRating</code> is written only when a real rating and
            a non-zero review count both exist. That guard is the reason the
            snippet has a conditional in it at all: an empty or invented rating
            is the kind of thing Google issues manual actions over, and a small
            store has nothing spare to spend recovering from one.
          </p>
          <p>
            The images array broke the whole block in a way nothing surfaced.
            The loop walks <code>product.media</code> and skips anything that is
            not an image, but the separator came from <code>forloop.last</code>{" "}
            — so a video in the final slot left a trailing comma and invalidated
            the JSON. Invalid JSON-LD does not warn; it is simply ignored. The
            fix counts what was actually emitted and writes the comma{" "}
            <em>before</em> each item after the first.
          </p>
          <p>
            An FAQ section renders a visible accordion and emits FAQPage JSON-LD
            from the same blocks, so the answer a reader sees and the answer
            Google indexes cannot drift apart. It is switched off on product
            pages deliberately — those already carry Product structured data,
            and one FAQPage repeated across every product URL adds nothing.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="section__label">
          The hardest problem was not a code problem
        </div>
        <div className="prose stack">
          <p>
            Press-on nails come in hundreds of designs, and a catalogue that
            size is not a service to a first-time visitor — it is a decision
            they have to finish before they can spend anything. People browsed,
            kept browsing, and left.
          </p>
          <p>
            The answer was a mystery box: pick a direction you like, get several
            sets bundled under the individual price, check out once.
            Engineering-wise it is a Shopify bundle and took an afternoon. The
            work was recognising that the full catalogue was a cost being
            charged to the visitor.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="section__label">
          What I built, and what the theme already did
        </div>
        <div className="prose stack">
          <p>
            A Dawn store is mostly Dawn. Working out which parts are actually
            mine meant diffing against the v15 source, and it took several
            things off the list I had been happy to claim.
          </p>
        </div>
        {/* dl rather than a table: these are term → description pairs, and a
            table would imply the rows relate to each other column-wise. */}
        <dl className="ledger">
          {LEDGER.map((row) => (
            <div key={row.term} className="ledger__row">
              <dt className="ledger__term">{row.term}</dt>
              <dd className="ledger__desc">{row.desc}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="section">
        <div className="section__label">What I&rsquo;d change</div>
        <div className="prose stack">
          <p>
            The sticky bar finds the main button by DOM id, and nothing enforces
            that id. A theme update could break the mobile purchase path without
            failing a build or raising an error. A data attribute plus a check
            that fails loudly would cost almost nothing.
          </p>
          <p>
            I know just over half of visitors are on mobile. I do not know where
            they leave. Every decision here was reasoned from a traffic split
            and from watching people use the store, not measured against a
            funnel — the sticky bar is defensible, but it is not proven.
          </p>
          <p>
            Session counts include datacenter traffic, so the numbers I trust
            are the ones derived from real orders — returning-customer rate and
            average order value — and the ones I do not are anything computed
            from raw sessions. Worth saying out loud rather than quoting the
            bigger number.
          </p>
          <p>
            Three sections went live; several more are finished in the repo and
            attached to nothing. Building ahead of a decision felt productive
            and produced code I now have to keep reading past.
          </p>
        </div>
      </section>
    </>
  );
}
