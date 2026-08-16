import type { Metadata } from "next";
import { Fraunces } from "next/font/google";
import Link from "next/link";
import "./globals.css";
import Nav from "./components/Nav";
import RailFooter from "./components/RailFooter";

// Self-hosted at build time — no runtime request to Google, and the @font-face
// rules are generated with the right unicode-range for the latin subset.
//
// No `weight`, because Fraunces is a variable font: one file covers the whole
// range continuously, so asking for 400 and 500 costs nothing extra and any
// value in between is available if it is ever wanted.
//
// The italic is a second file and is loaded on purpose — <em> appears in the
// case studies, and a face with a drawn italic should not be made to fake one.
const fraunces = Fraunces({
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz"],
  display: "swap",
  variable: "--font-fraunces",
});

const SITE = "https://portfolio-sand-nine-91.vercel.app";
const DESCRIPTION =
  "Design developer working across brand, interface and production code.";

export const metadata: Metadata = {
  // Required before any relative path in `openGraph.images` means anything: a
  // link preview is fetched by someone else's server, which has no page to
  // resolve "/og/og-home.png" against. Next uses this to make them absolute.
  metadataBase: new URL(SITE),

  // `template` is filled in by whatever a child page sets as its title, so the
  // suffix is written once here instead of being repeated — and re-typed
  // slightly differently — on every case study.
  title: {
    default: "Yuyao Tu — Design Developer",
    template: "%s — Yuyao Tu",
  },
  description: DESCRIPTION,

  // Inherited by every page that does not declare its own, so /about is covered
  // without repeating the block there.
  openGraph: {
    type: "website",
    siteName: "Yuyao Tu",
    title: "Yuyao Tu — Design Developer",
    description: DESCRIPTION,
    url: SITE,
    images: [{ url: "/og/og-home.png", width: 1200, height: 630 }],
  },

  // Twitter/X reads its own tags first and falls back to Open Graph. Declaring
  // the card type is the part that is not inferable — without it a large image
  // is rendered as a small thumbnail beside the text.
  twitter: {
    card: "summary_large_image",
    title: "Yuyao Tu — Design Developer",
    description: DESCRIPTION,
    images: ["/og/og-home.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={fraunces.variable}>
      <body>
        {/* Keyboard users hit this first and can jump straight past the rail
            instead of tabbing through every nav link on every page. */}
        <a href="#main" className="skip-link">
          Skip to content
        </a>

        <div className="shell">
          <aside className="rail">
            {/* The name doubles as the route home — the convention every
                visitor already knows, so it costs no extra nav item. */}
            <Link href="/" className="rail__brand">
              <div className="rail__name">Yuyao Tu</div>
              {/* What the work is, not a job title. Two words set side by side
                  rather than a claimed role — it reads on every page without
                  overstating a title the experience hasn't earned yet. The
                  location moved to the foot of the About page. */}
              <div className="rail__role">Design and code</div>
            </Link>

            <Nav />

            <RailFooter />
          </aside>

          <main id="main" className="content">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
