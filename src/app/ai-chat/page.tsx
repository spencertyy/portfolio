import type { Metadata } from "next";
import Image from "next/image";

const DESCRIPTION =
  "An AI reply strategist with three strategy-distinct personas, built on a fully tokenised design system.";

export const metadata: Metadata = {
  title: "Unsent",
  description: DESCRIPTION,
  openGraph: {
    title: "Unsent — Yuyao Tu",
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
  { value: "3", label: "personas, orthogonal on strategy" },
  { value: "159", label: "design tokens" },
  { value: "119", label: "tests, 10 suites" },
];

export default function AiChatPage() {
  return (
    <>
      <div className="case__eyebrow">01 — Product · Design system</div>
      <h1 className="page-title">Unsent</h1>

      <p className="lede">
        An AI reply strategist: you bring a hard message, it hands you words you
        can actually send. It&rsquo;s built on a fully tokenised design system,
        with the accessibility work done as engineering rather than as a
        checklist — the craft underneath is as much the point here as the
        product on top.
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
          src="/unsent.png"
          alt="Unsent interface — Veteran and Savage each answering the same pasted message with their own read and a copyable draft-reply card"
          width={1972}
          height={1666}
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
        <div className="section__label">Why it exists</div>
        <div className="prose stack">
          <p>
            Some friends only call when things are falling apart. They feel in
            floods; I think in straight lines — I can&rsquo;t always share the
            feeling, but I can usually see the shape of what&rsquo;s happening.
            Unsent is that friend without the part where even a good one fills
            up: awake at 2am, warm enough to just listen, clear enough to name
            what&rsquo;s really going on, and — when you ask — the words to send
            back.
          </p>
          <p>
            The two modes fall straight out of that. Vent, and it just listens
            in the persona&rsquo;s voice, then quietly offers a draft only if you
            want one. Paste what they said, and it hands you the reply. There is
            no mode switch to toggle — quoting the other person is itself the
            signal that you want words back, so the interface never asks you to
            classify your own message first.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="section__label">Personas differ on strategy, not tone</div>
        <div className="prose stack">
          <p>
            The easy version of this product is one assistant with a tone
            slider. The problem is that tone-only personas all give the same
            advice in different accents. So the three advisors are orthogonal on{" "}
            <em>strategy</em>, not wording: Savage cuts the losses, Gentle keeps
            the thread alive, Veteran takes back the tempo. Put side by side on
            the same message, they actually disagree about what to do.
          </p>
          <p>
            Getting there meant writing <em>style</em> and <em>strategy</em> as
            two separate dimensions in the prompts, tuned over five rounds
            against one fixed test input. Style alone and all three sound alike;
            strategy alone and none of them has a personality. Every reply ends
            in exactly one ready-to-send draft — the &ldquo;unsent&rdquo;
            message the product is named for — that you copy in a click.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="section__label">A safety floor enforced in code, not the prompt</div>
        <div className="prose stack">
          <p>
            A persona instructed to be blunt is one bad sample away from
            advising something you can&rsquo;t take back. Because LLM output is
            sampled rather than guaranteed, asking the prompt nicely is not a
            control. So the shared safety floor lives in a{" "}
            <code>personaGuard</code> that runs server-side after generation: it
            parses the draft, checks banned phrases, and never lets any persona
            recommend something irreversible.
          </p>
          <p>
            Malformed output is validated, retried once, then degraded
            gracefully rather than shown raw. The guard is a pure function with
            its own test suite — the rule that &ldquo;no persona advises the
            irreversible&rdquo; is verified in code, not left to trust in the
            model.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="section__label">The whole look swapped by editing tokens, not components</div>
        <div className="prose stack">
          <p>
            Every themeable value — colour, radius, shadow, font size, spacing —
            resolves through a CSS variable rather than a literal. That is what
            let the entire interface move from a dark glassmorphism theme to the
            current
            Retro system — a dusty-pink ground, cream windows, coral and mustard
            accents, chunky black outlines, offset hard shadows — by editing
            token{" "}
            <em>values</em>, without touching a single component. The tokens
            live in one file; the components only consume them.
          </p>
          <p>
            The type scale is ten steps tuned by role rather than a single
            ratio. A fixed 1.25× or 1.333× has to compromise when one scale
            serves both dense product UI and display type, so the steps stay
            tight at the small end where density matters and widen toward the
            display end where impact does. The four display steps are fluid,
            sized with <code>clamp(min, A rem + B vw, max)</code> so headings
            scale continuously between viewports. The middle term mixes{" "}
            <code>rem</code> into <code>vw</code> on purpose: a pure{" "}
            <code>vw</code> value ignores the reader&rsquo;s browser font-size
            setting entirely, which fails WCAG 1.4.4.
          </p>
          <p>
            Icon sizing is a separate scale. Several <code>font-size</code>{" "}
            declarations were really sizing icon and emoji glyphs — folding
            those into the type scale would mean resizing an avatar perturbs
            body-copy proportions. Two unrelated concerns should not share one
            control.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="section__label">Contrast measured, not declared</div>
        <div className="prose stack">
          <p>
            The same muted ink sits on two different grounds — the pink field
            and the cream windows — so it was tuned to clear WCAG AA on both, not
            just whichever ground the token happens to name. The status colours
            needed more: the source design&rsquo;s green and amber landed near
            3.3:1 on their translucent pills, under the 4.5:1 floor for the 14px
            text sitting on them, so both were darkened about 18% until they
            cleared it — same hue, measured against what <em>composites</em>, not
            what the token declares.
          </p>
          <p>
            Reduced motion collapses every transition to <code>0.01ms</code>{" "}
            rather than <code>none</code>. Setting <code>none</code> stops{" "}
            <code>transitionend</code> from ever firing, which silently breaks
            any logic waiting on it — visually identical, but the event contract
            survives.
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
            arriving after the quota is gone still sees output stream in, with
            Markdown rendering, syntax highlighting and a working copy button —
            rather than a red error box that reads as a broken demo.
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
