import type { Metadata } from "next";
import Image from "next/image";

const DESCRIPTION =
  "A streaming chat interface built around a fully tokenised design system — seven models, two providers.";

export const metadata: Metadata = {
  title: "AI Chat",
  description: DESCRIPTION,
  openGraph: {
    title: "AI Chat — Yuyao Tu",
    description: DESCRIPTION,
    url: "/ai-chat",
    images: [{ url: "/og/og-ai-chat.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og/og-ai-chat.png"],
  },
};

const LINKS = [
  { href: "https://ai-chat-bot-rose-nine.vercel.app", label: "Live demo" },
  { href: "https://github.com/spencertyy/AI-ChatBot", label: "Code" },
  {
    href: "https://www.figma.com/design/WLlhNcXMey6JjtuBTim0YZ/AI-Chat-Design-System",
    label: "Design system",
  },
];

const FACTS = [
  { value: "155", label: "design tokens" },
  { value: "85", label: "tests, 7 suites" },
  { value: "7", label: "models, 2 providers" },
];

export default function AiChatPage() {
  return (
    <>
      <div className="case__eyebrow">01 — Product · Design system</div>
      <h1 className="page-title">AI Chat</h1>

      <p className="lede">
        A streaming chat interface where the design system is the point. Seven
        models across two providers, every value resolving through a token, and
        the accessibility work done as engineering rather than as a checklist.
      </p>

      <div className="case__links">
        {LINKS.map((l) => (
          <a key={l.href} href={l.href} target="_blank" rel="noreferrer">
            {l.label}
            <span aria-hidden="true"> ↗</span>
          </a>
        ))}
      </div>

      {/* priority: this is the largest element above the fold, so it should not
          wait for lazy-loading to kick in. */}
      <div className="case__figure">
        <Image
          src="/ai-chat.png"
          alt="AI Chat interface — sidebar with conversation list, model selector, and the glass composer"
          width={2880}
          height={1626}
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
        <div className="section__label">The type scale is hand-tuned</div>
        <div className="prose stack">
          <p>
            A single mathematical ratio — 1.25×, 1.333× — has to compromise when
            one scale serves both dense product UI and display type. So the ten
            steps were tuned by role instead: tight at the small end where
            information density matters, widening toward the display end where
            impact does.
          </p>
          <p>
            The four display steps are fluid, sized with{" "}
            <code>clamp(min, A rem + B vw, max)</code> so headings scale
            continuously between viewports rather than stepping at breakpoints.
            The middle term mixes <code>rem</code> into <code>vw</code> on
            purpose: a pure <code>vw</code> value ignores the reader&rsquo;s
            browser font-size setting entirely, which fails WCAG 1.4.4.
          </p>
          <p>
            Icon sizing is a separate scale. Several{" "}
            <code>font-size</code> declarations were really sizing icon glyphs —
            folding those into the type scale would mean resizing an avatar
            perturbs body-copy proportions. Two unrelated concerns should not
            share one control.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="section__label">Contrast measured, not declared</div>
        <div className="prose stack">
          <p>
            Translucent surfaces mean a token&rsquo;s declared colour is not the
            colour the text actually sits on. Muted ink and status colours were
            darkened from the source design until small text cleared WCAG AA
            against what <em>renders</em>, not against what the token says.
          </p>
          <p>
            Reduced motion collapses every transition to{" "}
            <code>0.01ms</code> rather than <code>none</code>. Setting{" "}
            <code>none</code> stops <code>transitionend</code> from ever firing,
            which silently breaks any logic waiting on it — visually identical,
            but the event contract survives.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="section__label">Degradation instead of errors</div>
        <div className="prose stack">
          <p>
            A deployed demo is an open AI proxy. No key leaks — both stay
            server-side — but anyone can call the streaming endpoint and spend
            the project&rsquo;s quota without needing a key at all.
          </p>
          <p>
            Two layers of rate limiting cap it: per IP per hour distributes
            fairly, global per day is the fuse that still holds if the first is
            bypassed by rotating addresses. Either alone fails.
          </p>
          <p>
            Hitting a limit returns <em>a stream, not an error</em>. The frames
            are identical in shape to a real model response, so a visitor
            arriving after the quota is gone still sees streaming output,
            Markdown rendering and syntax highlighting — rather than a red error
            box that reads as a broken demo.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="section__label">What I&rsquo;d change</div>
        <div className="prose stack">
          <p>
            Both SDK clients are constructed before the code decides which
            provider to use. So even though the public demo rejects OpenAI
            outright, an OpenAI key is still required for any request to
            succeed — the dependency follows construction rather than use.
            Lazy initialisation would make the key genuinely optional.
          </p>
          <p>
            IP rate limiting reads <code>x-forwarded-for</code>, which a client
            can spoof. The global daily cap holds regardless, which is the
            reason for two layers — but the first layer is weaker than it looks.
          </p>
        </div>
      </section>
    </>
  );
}
