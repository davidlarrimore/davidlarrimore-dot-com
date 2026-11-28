"use client";

import { useEffect, useState } from "react";

export interface ResumeSection {
  id: string;
  label: string;
}

/**
 * Sticky "On this page" index for the résumé (desktop only). Marks the section being read with
 * aria-current="location", so it also tells assistive tech where the reader is.
 */
export default function ResumeIndex({ sections }: { sections: ResumeSection[] }) {
  const [active, setActive] = useState(sections[0]?.id);

  useEffect(() => {
    const els = sections.map((s) => document.getElementById(s.id)).filter((el): el is HTMLElement => !!el);
    // A section is "current" once its heading passes the upper third of the viewport.
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-20% 0px -65% 0px" }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [sections]);

  return (
    <nav className="resume-index" aria-label="On this page">
      <p className="resume-index-title">On this page</p>
      <ul>
        {sections.map((s) => (
          <li key={s.id}>
            <a href={`#${s.id}`} aria-current={active === s.id ? "location" : undefined}>
              {s.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
