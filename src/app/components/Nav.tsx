"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

// One source of truth for the rail. Adding a project means adding a line here
// and a route folder — nothing else has to know.
//
// Home is listed explicitly rather than relying on "click the site name",
// which is a convention plenty of visitors have never learned. Numbering it 00
// keeps the sequence intact instead of breaking the index with an odd item.
const LINKS = [
  { href: "/", index: "00", title: "Home" },
  { href: "/ai-chat", index: "01", title: "AI Reply Strategist" },
  { href: "/urban-studio", index: "02", title: "Urban Studio" },
  { href: "/coursework", index: "03", title: "Coursework" },
  { href: "/about", index: "04", title: "About" },
];

export default function Nav() {
  const pathname = usePathname();

  return (
    // aria-label carries what the removed "Index" heading used to say out loud,
    // so dropping the visible label costs nothing to a screen reader.
    <nav className="nav" aria-label="Primary">
      {LINKS.map((link) => {
        const active = pathname === link.href;
        return (
          <Link
            key={link.href}
            href={link.href}
            className="nav__link"
            // aria-current tells screen readers which page they are on. The
            // styling hangs off the same attribute, so the visual state and the
            // announced state can never drift apart.
            aria-current={active ? "page" : undefined}
          >
            <span className="nav__index">{link.index}</span>
            <span className="nav__title">{link.title}</span>
          </Link>
        );
      })}
    </nav>
  );
}
