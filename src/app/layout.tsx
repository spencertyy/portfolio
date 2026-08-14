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

export const metadata: Metadata = {
  // `template` is filled in by whatever a child page sets as its title, so the
  // suffix is written once here instead of being repeated — and re-typed
  // slightly differently — on every case study.
  title: {
    default: "Yuyao Tu — Design Developer",
    template: "%s — Yuyao Tu",
  },
  description:
    "Design developer working across brand, interface and production code.",
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
              {/* Location rather than a title: the hero line already states
                  what the work is, so a job title here would only repeat it. */}
              <div className="rail__role">New York</div>
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
