// Marks rather than words. Three stacked text links spent four lines of the
// rail on information a reader recognises faster as a shape — and the email
// address in particular was the longest unbreakable string on the page, which
// had been dictating how wide the rail could be.
//
// Nothing is lost to a screen reader: the accessible name moves from the link
// text to aria-label, so it still announces "Email, link". The svg is marked
// aria-hidden so the name is not read twice.

const LINKS = [
  {
    href: "mailto:spencer.tuyuyao@gmail.com",
    label: "Email",
    external: false,
    // Solid, to sit with the two brand marks — a stroked envelope beside two
    // filled logos reads as a mismatched set.
    path: "M2 4h20a1 1 0 0 1 1 1v.24l-11 6.35L1 5.24V5a1 1 0 0 1 1-1zm21 3.55V19a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V7.55l10.5 6.06a1 1 0 0 0 1 0L23 7.55z",
  },
  {
    href: "https://github.com/spencertyy",
    label: "GitHub",
    external: true,
    path: "M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12",
  },
  {
    href: "https://www.linkedin.com/in/spencertu",
    label: "LinkedIn",
    external: true,
    path: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z",
  },
];

export default function RailFooter() {
  return (
    <div className="rail__footer">
      {LINKS.map((link) => (
        <a
          key={link.href}
          href={link.href}
          aria-label={link.label}
          {...(link.external
            ? { target: "_blank", rel: "noreferrer" }
            : null)}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
            <path d={link.path} />
          </svg>
        </a>
      ))}
    </div>
  );
}
