// Temporary campaign: switch off here, or remove VisitorWelcome from the résumé page.
export const VISITOR_WELCOME_ENABLED = true;

export function isWelcomeReferrer(referrer: string): boolean {
  try {
    const url = new URL(referrer);
    if (url.protocol !== "https:" || !["fedscoop.com", "www.fedscoop.com"].includes(url.hostname)) return false;
    // Cross-origin referrer policies normally provide only the origin. When a
    // path is available, match the requested article rather than other stories.
    return url.pathname === "/" || url.pathname.replace(/\/$/, "") ===
      "/the-revolving-door-for-tech-officials-at-trumps-dhs";
  } catch {
    return false;
  }
}
