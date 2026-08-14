import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PROJECTS } from "./projects";

export const metadata: Metadata = {
  title: "Coursework",
  description:
    "Academic projects from the Master of Software Development at the University of Utah.",
};

export default function CourseworkPage() {
  return (
    <>
      <div className="case__eyebrow">03 — Academic</div>
      <h1 className="page-title">Coursework</h1>

      <p className="lede">
        Projects from the Master of Software Development at the University of
        Utah. Smaller in scope than the case studies, and kept separate for that
        reason — the work is real, the constraints were academic.
      </p>

      <section className="section">
        <div className="section__label">
          {PROJECTS.length} project{PROJECTS.length === 1 ? "" : "s"}
        </div>

        {/* auto-fill rather than auto-fit: with auto-fit a single remaining item
            stretches to the full row width, which makes the last project look
            like a different kind of thing. auto-fill keeps the empty tracks. */}
        <ul className="grid">
          {PROJECTS.map((project) => (
            <li key={project.slug}>
              <Link
                href={`/coursework/${project.slug}`}
                className="grid__item"
              >
                <div className="grid__figure">
                  {project.image ? (
                    <Image
                      src={project.image.src}
                      alt={project.image.alt}
                      width={project.image.width}
                      height={project.image.height}
                    />
                  ) : (
                    // A tile rather than a broken image: the layout should not
                    // depend on every project having a screenshot ready.
                    <div className="grid__placeholder" aria-hidden="true" />
                  )}
                </div>
                <div className="grid__title">{project.title}</div>
                {/* The year is joined in only when there is one, so a project
                    without a confirmed date does not render a stray separator. */}
                <div className="grid__meta">
                  {[project.context, project.year].filter(Boolean).join(" · ")}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
