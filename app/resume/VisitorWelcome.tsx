"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { isWelcomeReferrer, VISITOR_WELCOME_ENABLED } from "@/lib/visitor-welcome";

const DISMISSED_KEY = "resume-visitor-welcome-dismissed-v1";

export default function VisitorWelcome() {
  const dialog = useRef<HTMLDialogElement>(null);
  const previousOverflow = useRef("");

  useEffect(() => {
    const preview = process.env.NODE_ENV === "development" &&
      new URLSearchParams(window.location.search).get("previewWelcome") === "1";
    if (!preview && (!VISITOR_WELCOME_ENABLED || !isWelcomeReferrer(document.referrer))) return;
    try {
      if (!preview && sessionStorage.getItem(DISMISSED_KEY)) return;
    } catch { /* The welcome also works when browser storage is unavailable. */ }

    const element = dialog.current;
    if (!element) return;
    previousOverflow.current = document.body.style.overflow;
    element.showModal();
    document.body.style.overflow = "hidden";
    return () => {
      element.close();
      document.body.style.overflow = previousOverflow.current;
    };
  }, []);

  function dismiss() {
    try { sessionStorage.setItem(DISMISSED_KEY, "1"); } catch { /* Optional storage. */ }
    dialog.current?.close();
    document.body.style.overflow = previousOverflow.current;
    document.getElementById("resume-title")?.focus({ preventScroll: true });
  }

  return (
    <dialog ref={dialog} className="visitor-welcome no-print" aria-labelledby="welcome-title"
      onCancel={(event) => { event.preventDefault(); dismiss(); }}>
      <div className="visitor-welcome-content">
        <div className="visitor-welcome-topline">
          <span>A NOTE FROM DAVID</span>
          <button type="button" onClick={dismiss} aria-label="Close welcome and read résumé" className="visitor-welcome-close">×</button>
        </div>
        <h1 id="welcome-title" tabIndex={-1} autoFocus>Hi, I’m Dave.<br />Thanks for stopping by.</h1>
        <p className="visitor-welcome-intro">If you found your way here through FedScoop, welcome. I appreciate you taking a moment to learn more about me.</p>
        <p>I’m David Larrimore, a technologist who likes to build things, solve useful problems, and help people make sense of technology. This site is a little window into that work: the teams I’ve been part of, the things I’m learning, and the projects I’m still tinkering with.</p>
        <p>There’s a person behind the résumé, too. Outside of work, you’ll find me gaming, experimenting with 3D printing and home projects, or playing tabletop games with family and friends.</p>
        <p>Take a look around. Try a project, explore my background, or read something I’ve written. I’m glad your curiosity brought you here.</p>
        <div className="visitor-welcome-actions">
          <button type="button" onClick={dismiss} className="ds-btn ds-btn-primary ds-btn-md">Explore my résumé <span aria-hidden="true">→</span></button>
          <Link href="/projects" onClick={dismiss} className="ds-btn ds-btn-secondary ds-btn-md">See what I’m building</Link>
          <Link href="/blog" onClick={dismiss} className="visitor-welcome-writing">Read my writing</Link>
        </div>
        <footer className="visitor-welcome-resources">
          <h2>How federal acquisition works</h2>
          <p>Curious about how government buys technology? The acquisition lifecycle moves from identifying needs and planning, through solicitation, evaluation and award, to managing the contract and closing it out.</p>
          <p>Technical expertise and acquisition decision-making have distinct roles. Technical staff can help define requirements and evaluate proposed solutions. For competitive negotiated acquisitions, the designated source selection authority chooses the successful offer; the contracting officer awards the contract within their delegated authority. In my own government service, I never held the role of source selection official. That distinction helps explain the responsibilities behind the job titles.</p>
          <p>These official resources explain the process, the responsibilities, and the rules:</p>
          <ul>
            <li><a href="https://www.gsa.gov/assisted-acquisition-services/acquisition-process">The acquisition lifecycle — GSA’s practical overview <span aria-hidden="true">↗</span></a></li>
            <li><a href="https://www.oge.gov/">U.S. Office of Government Ethics <span aria-hidden="true">↗</span></a></li>
          </ul>
          <section className="visitor-welcome-login" aria-labelledby="login-gov-heading">
            <a href="https://login.gov/" className="visitor-welcome-login-logo">
              <img src="/images/login-gov-logo.svg" alt="Login.gov" width={156} height={24} />
            </a>
            <h2 id="login-gov-heading">A government service worth getting to know</h2>
            <p>Built by government, for the people it serves. Login.gov lets people use one account for secure access to participating government agencies. I appreciate public-service technology that makes everyday tasks a little easier.</p>
            <a href="https://login.gov/">Learn more about Login.gov <span aria-hidden="true">↗</span></a>
          </section>
        </footer>
      </div>
    </dialog>
  );
}
