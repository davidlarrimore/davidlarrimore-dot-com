# Temporary résumé visitor welcome

The résumé page shows a dismissible welcome using `document.referrer` for the
FedScoop article `/the-revolving-door-for-tech-officials-at-trumps-dhs/`.
Browsers commonly reduce cross-site referrers to the origin, so
`https://fedscoop.com/` and `https://www.fedscoop.com/` also qualify. This can
include other FedScoop traffic when the browser omits its path. A full path
for another article does not qualify. Missing referrers show the normal résumé.

The welcome introduces David and links to his résumé, projects, writing, and
official FAR, agency acquisition regulation, and government ethics resources.
It makes no claim about the article or the application of rules to a person.
The resource links were checked on October 7, 2026.

## Lifecycle

Set `VISITOR_WELCOME_ENABLED` to `false` in `lib/visitor-welcome.ts` to disable.
No end date was supplied, so retirement is explicit rather than automatic.
To remove completely, remove `VisitorWelcome` from `app/resume/page.tsx`, its
component, styles, helper and test. Dismissal is saved in sessionStorage for the
current tab; storage being unavailable does not block access to the résumé.
No referrer information is stored or transmitted by this feature.

## Acceptance and verification

- Exact article and origin-only referrals open the native modal dialog.
- Direct visits, unrelated sites, other full article paths, and lookalike hosts
  show the normal résumé. Without JavaScript the résumé remains available.
- Continue, close, and Escape dismiss it; focus moves to the résumé heading.
- The native modal contains keyboard focus and makes the background inert.
- Dismissal survives reload in the current tab when sessionStorage is available.
- At desktop and mobile widths, text and actions stay inside the dialog;
  the dialog scrolls to the resources. Print omits the welcome.

Run `node --experimental-strip-types --test tests/visitor-welcome.test.mjs`
(Node 22.6+), then `npx tsc --noEmit`. For browser checks, open `/resume` with
Playwright's `page.goto(url, { referer: 'https://fedscoop.com/' })` in a fresh
context, then verify dismissal, reload, Escape, focus, and mobile scrolling.
