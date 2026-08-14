import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Motion from "../components/Motion";
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
                  {project.video && project.image ? (
                    <Motion
                      src={project.video}
                      poster={project.image.src}
                      width={project.image.width}
                      height={project.image.height}
                      label={project.image.alt}
                    />
                  ) : project.image ? (
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
                {/* The stack, not the institution. Every tile said "University
                    of Utah" — a line that is identical on all nine and repeated
                    on the page it links to. What distinguishes one tile from the
                    next is what it was built in, so that is what the index
                    carries; the school and the year live on the detail page.

                    First two entries only: stack[0] is always the language and
                    stack[1] the framework or protocol that defines the project,
                    which keeps the line honest and on one row. */}
                <div className="grid__meta">
                  {project.stack.slice(0, 2).join(" · ")}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
