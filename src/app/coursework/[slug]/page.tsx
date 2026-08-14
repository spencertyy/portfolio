import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Motion from "../../components/Motion";
import { PROJECTS, getProject } from "../projects";

// Tells Next which slugs exist so every project page is prerendered to static
// HTML at build time. Without it these routes would be rendered on demand,
// which for a site with no data source is cost without benefit.
export function generateStaticParams() {
  return PROJECTS.map((project) => ({ slug: project.slug }));
}

// In Next 15+ `params` is a Promise — route params resolve asynchronously so a
// page can start streaming before they are known.
type Props = { params: Promise<{ slug: string }> };

// The body copy is plain strings, so backtick spans have to be turned into real
// <code> elements — otherwise the backticks render as literal characters. Split
// on the delimiter and every odd-indexed piece is what was between a pair, which
// is enough for this and stops well short of being a Markdown parser.
function withCode(text: string) {
  return text.split("`").map((part, i) =>
    i % 2 === 1 ? <code key={i}>{part}</code> : part,
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};

  return {
    title: project.title,
    description: project.summary,
    openGraph: {
      title: `${project.title} — Yuyao Tu`,
      description: project.summary,
      url: `/coursework/${project.slug}`,
    },
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = getProject(slug);

  // A slug that is not in the data file is a 404, not an empty page — an
  // invented URL should not render a valid-looking shell.
  if (!project) notFound();

  return (
    <>
      <div className="case__eyebrow">
        {[project.context, project.year].filter(Boolean).join(" · ")}
      </div>
      <h1 className="page-title">{project.title}</h1>

      <p className="lede">{project.summary}</p>

      {(project.github || project.live) && (
        <div className="case__links">
          {project.live && (
            <a href={project.live} target="_blank" rel="noreferrer">
              Live
              <span aria-hidden="true"> ↗</span>
            </a>
          )}
          {project.github && (
            <a href={project.github} target="_blank" rel="noreferrer">
              Code
              <span aria-hidden="true"> ↗</span>
            </a>
          )}
        </div>
      )}

      {project.image && (
        <div className="case__figure">
          {project.video ? (
            <Motion
              src={project.video}
              poster={project.image.src}
              width={project.image.width}
              height={project.image.height}
              label={project.image.alt}
            />
          ) : (
            <Image
              src={project.image.src}
              alt={project.image.alt}
              width={project.image.width}
              height={project.image.height}
              priority
            />
          )}
        </div>
      )}

      <section className="section">
        <div className="section__label">About</div>
        <div className="prose stack">
          {project.body.map((paragraph) => (
            <p key={paragraph}>{withCode(paragraph)}</p>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section__label">Details</div>
        <dl className="ledger">
          {project.role && (
            <div className="ledger__row">
              <dt className="ledger__term">Role</dt>
              <dd className="ledger__desc">{project.role}</dd>
            </div>
          )}
          <div className="ledger__row">
            <dt className="ledger__term">Built with</dt>
            <dd className="ledger__desc">{project.stack.join(" · ")}</dd>
          </div>
        </dl>
      </section>

      <div className="section">
        <Link className="link" href="/coursework">
          ← All coursework
        </Link>
      </div>
    </>
  );
}
