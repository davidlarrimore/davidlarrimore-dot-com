"use client";

import { useEffect } from "react";

/**
 * Browsers print a closed <details> closed, and CSS can't open one. Before printing, open every
 * folded "More from this role" so a printed résumé has every achievement; afterwards, fold back
 * only the ones this opened.
 */
export default function PrintExpander() {
  useEffect(() => {
    let opened: HTMLDetailsElement[] = [];
    function beforePrint() {
      opened = Array.from(document.querySelectorAll<HTMLDetailsElement>("details.resume-role-more:not([open])"));
      opened.forEach((d) => (d.open = true));
    }
    function afterPrint() {
      opened.forEach((d) => (d.open = false));
      opened = [];
    }
    window.addEventListener("beforeprint", beforePrint);
    window.addEventListener("afterprint", afterPrint);
    return () => {
      window.removeEventListener("beforeprint", beforePrint);
      window.removeEventListener("afterprint", afterPrint);
    };
  }, []);
  return null;
}
