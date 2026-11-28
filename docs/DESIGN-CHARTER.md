# Design Charter: davidlarrimore.com

This is the standing brief for every visual or UX change to the site. Read it before you touch
a page, a component or `app/globals.css`, and check your work against it before calling a change
done. If a change has to break a rule here, update this file in the same PR and say why.

## The goal

The site should feel **light, distinctive and modern**, and it should look like Dave's site rather
than a template. Today it reads as bulky and generic (November 2026). The redesign fixes that
without losing what already works: dark mode, the design tokens, and the AI projects.

**Audience:** hiring managers, government and industry leaders, and peers judging a senior
technologist and executive. The site should show credibility first and personality second.

**The one thing to show:** Dave builds with AI himself. The working AI features (the resume chat
and the scavenger hunt) are the proof, so give them a prominent place instead of burying them.

## Principles

These come from [Tilda's web design principles](https://tilda.education/en/web-design-principles).
Each has a concrete rule for this codebase.

1. **Proximity.** Space inside a group is always smaller than the space around it. Use the
   `--space-*` scale: tight steps (`--space-2`, `--space-3`) inside a group and big steps
   (`--space-7` to `--space-9`) between sections.
2. **Fitts's law.** Targets are at least 44×44px on touch screens. Primary actions are big,
   labeled, and close to where the eye already is.
3. **Emphasis.** One standout element per screen. Before you add a second accent, a glow or a
   badge, remove something.
4. **White space.** Spend space on what matters. Fewer, larger elements beat many small boxes.
   "Bulky" mostly means too many bordered containers and decorative layers.
5. **Color.** One main color (`--accent`, blue) and one accent (`--accent2`, purple), used for
   meaning, not decoration. `--success` is for status only. No new hues without updating the
   tokens.
6. **Basic elements.** Build from dots (accents such as buttons and pills), lines (nav, dividers)
   and rectangles (sections, cards). Every element needs a clear role in the eye's path.
7. **Consistency.** Use tokens only. No raw hex colors, ad-hoc pixel sizes or one-off radii in
   components. Near-duplicate values (54px vs 56px) count as bugs.
8. **Modularity.** Pages are stacks of rectangular modules aligned to one grid inside
   `--container-max`.
9. **Anchor objects.** Each module's most important element (headline, portrait, demo) sits at
   its visual center or a strong corner, on purpose.
10. **Scan patterns.** Text-heavy pages (resume, blog) follow an F-pattern. Sparse pages (home,
    project landing pages) follow a Z-pattern that ends on a call to action. Alternate section
    layouts to avoid monotony.

## Trends: what to adopt and what to avoid

The source is [Figma's 2026 web design trends](https://www.figma.com/resource-library/web-design-trends/),
filtered for this audience.

**Adopt**

- **Bold typography.** Type carries the personality. Use large, confident headlines (Inter,
  self-hosted, ideally as a variable font) with plenty of air around them and one family plus a
  mono for detail.
- **Dark mode with a light option.** Dark comes first, and light mode is equally polished.
- **Restrained motion.** Use micro-interactions on hover, focus and state changes, and optionally
  light scroll-based storytelling for the career story. Motion must respect
  `prefers-reduced-motion`.
- **A conversational AI front door.** Make the chat a first-class way to explore Dave, possibly
  in the hero ("Ask me about Dave's work").
- **Sustainable and accessible.** Keep pages light: optimized images, little client JS, nothing
  decorative that costs real performance. Meet WCAG AA contrast, keyboard paths and screen-reader
  labels.

**Avoid:** maximalism, collage and scrapbook styles, neumorphism, Y2K and retrofuturism,
neo-brutalism, and heavy 3D or WebGL as decoration. They fit youth and lifestyle brands and cost
credibility here.

**Avoid these generic AI tropes:**

- the "big number plus small label plus gradient accent" hero
- stacked effects: canvas behind a gradient overlay behind clipped shapes
- `// code-comment` eyebrows on every section
- glow on everything
- a grid of identical bordered cards as the default layout

## Known problems to fix

These come from a first pass over the code in November 2026. Remove items as they get fixed.

- **Inline styles on the resume page.** The resume page still uses inline
  `style={{}}` objects. Phase 1 moved only the shared components (nav, footer, card, eyebrow) into
  `.ds-*` classes, because Phases 2 and 3 rewrite these sections. Use classes when rewriting them.

## Redesign plan

Decided on 2026-11-27 after the first Impeccable critique and audit. The baseline scores were:
homepage 14/24, resume 16/28, technical audit 11/20. The snapshots are in `.impeccable/critique/`.

**Decisions**

- **Order:** the foundation first (accessibility, tokens, motion, performance), then the homepage,
  then the resume.
- **Tone:** executive first, with exactly one playful element. The pixel companion becomes the
  resume-chat launcher, so the playful element is also the proof that Dave builds with AI. No
  other mascots, jokes or arcade styling.
- **Scope:** every P1 to P3 finding, one PR per phase. The owner merges each one.

**Phase 1: Foundation** (no visual redesign, so the later work starts on clean ground)

1. Accessibility (`harden`):
   - a visible 2px `:focus-visible` outline, modelled on the welcome dialog
   - a real heading tree: h1 for the name, h2 for sections, h3 for roles
   - put the `ds-btn` classes on the `<a>` instead of nesting a `<button>` in it
   - header, main and footer as siblings, plus a skip link
2. Motion (`animate`): handle `prefers-reduced-motion` for the canvas, the companion, pulses, hover
   lifts, fade-ins and smooth scroll. Give each one a real alternative, not a global kill.
3. Contrast (`colorize`): the primary button fill moves to `--primary-600`, `--fg-muted` gets
   lighter on surfaces, and the page declares `color-scheme`.
4. Tokens (`distill`):
   - remove the shadcn HSL layer and the Tailwind color theme (Tailwind keeps layout utilities
     only; its one theme value is the default `border-color`, set to `var(--border)`), which
     fixes the invalid default `border-color`
   - remove the unused Tailwind v4, `class-variance-authority` and `clsx` packages
   - delete the dead rules in `resume.css` and the mislabeled `.opacity-65`
5. Performance (`optimize`):
   - pause animation loops when off-screen or the tab is hidden
   - animate with `transform` instead of `left`/`top`
   - right-size the logos and lazy-load them
   - make the hero a server component with a small client island for the tracked links
6. Inline styles (`polish`): move the inline `style={{}}` objects into `.ds-*` classes that use
   the type and space tokens.
7. Light mode (`colorize`): a light token set, a theme toggle that respects the system setting,
   and checks of both themes.

Phase 1 status: done in the `redesign/phase-1-foundation` PR, except item 6. That item covered
only the shared components; the page sections move to classes when Phases 2 and 3 rewrite them.

**Phase 2: Homepage** (Persuade surface, Z-pattern ending on a call to action)

1. Hero (`distill`, `typeset`):
   - remove the canvas, the gradient overlay, the hexagon frame and the `//` eyebrow
   - use a plain portrait and make the name the h1
   - lead with the credential from `lib/resume-content.json` (confirm the wording with Dave)
2. ~~AI front door in the hero~~ Dropped on 2026-11-28 (Dave's call). The hero stays out of the
   chatbot: name, credential, "Read the résumé" and "Get in touch". The chatbot is an
   always-available helper: the pixel sprite opens a chat panel in place on every page (it never
   sends visitors to another page), and "Try it" in the projects list opens the same panel.
3. AI projects module (`layout`), second on the page: Resume Chat and the Scavenger Hunt, each
   shown with a real screenshot or transcript snippet.
4. Remove the bulk (`distill`, `quieter`):
   - a borderless focus grid
   - 3 inline stats instead of 5 boxed ones
   - the journey as 3 or 4 dated milestones
   - remove `SkillsSection` from home, since the resume has it
   - alternate the module layouts
5. Emphasis (`colorize`): one filled primary per screen, `--fg` for stats and headings, and blue
   only for actions.
6. Companion (`adapt`, `delight`): it becomes the chat launcher, docks out of the content and the
   thumb zone on mobile, and respects reduced motion.
7. Close on a call to action: try the AI, or get in touch.

Phase 2 status: done in the `redesign/phase-2-homepage` PR. Two deviations from the plan:
- The projects module shows each project's logo, not a screenshot or transcript.
- The focus grid shows the first sentence of each `focus` body, not the whole body.
- On phones the pixel sprite stays visible, docked bottom-right, because it is the only way to
  open the chat panel (step 6 said it would dock out of the thumb zone). It is small (48px), sits
  in the corner where people expect a chat launcher, and the panel opens as a full-height sheet
  with its own close button.

The homepage styles live in `app/home.css` and use no inline styles.

**Phase 3: Resume** (Read surface, F-pattern)

1. Order (`layout`, `distill`): a positioning line, then Experience, Awards, Education, a condensed
   Expertise and Approach. Drop the contact card and the closing bio, which repeats the opening.
2. Roles (`typeset`, `clarify`): each role is an h3 with the company as a separate label and the
   dates readable. Lead with the top 2 or 3 achievements and put the rest behind "More from this
   role".
3. Actions (`bolder`): "Ask my résumé a question" is the primary action, "Download PDF" is
   secondary, and both are at least 44px tall.
4. Awards (`typeset`): a plain list of award and year in sentence case, with nominations grouped
   separately.
5. Grid (`layout`): align the reading column to the 1,120px container and add a sticky section
   index.

**Phase 4: Lock it in**

Run `document` to generate the root `DESIGN.md` from the shipped tokens, then a final `polish`.
Re-run `critique` and `audit` and record the new scores here.

## Where design decisions live

| File | What it holds | Who writes it |
|---|---|---|
| `docs/DESIGN-CHARTER.md` (this file) | The goal, the principles, the trend choices and the definition of done | People. It wins any conflict. |
| `PRODUCT.md` | Product facts: users, purpose, positioning, constraints | Impeccable's format, kept consistent with this charter |
| `DESIGN.md` (root, once generated) | The visual system: tokens, type and components, in the DESIGN.md spec format | Impeccable `document`, generated from `app/globals.css` |
| `app/globals.css` | The tokens that actually ship | Code. `DESIGN.md` describes it and does not replace it. |

## Tooling

- **Anthropic `frontend-design` skill** (`/plugin install frontend-design@claude-plugins-official`)
  sets the aesthetic direction for new pages and big reshapes.
- **Impeccable** (`npx skills add pbakaus/impeccable`) improves existing UI:
  - `/critique` and `/audit` before changing a page
  - `/normalize` and `/distill` to remove bulk and drift
  - `/polish` before merge

Impeccable installs locally (`.agents/` is gitignored, and `skills-lock.json` pins the version).
On first use its launcher downloads a compiled engine from the project's GitHub releases and
checks it against `scripts/engine-checksums.txt`. Its live browser mode and its edit-time hooks
(`impeccable hooks on`) are off unless someone turns them on deliberately.

Don't stack more design skills on top of these two, since their instructions will conflict.
taste-skill is the candidate if the motion needs a dedicated pass later.

## Definition of done for any UI change

- [ ] Uses tokens only (no raw colors, sizes or radii) and introduces no near-duplicate values.
- [ ] Each screen has one clear focal point, and the scan path (F or Z) is intentional.
- [ ] Spacing follows proximity: tighter inside groups, looser between them.
- [ ] Checked at 375px, 768px and 1280px, in dark and light mode.
- [ ] Keyboard focus is visible, contrast meets AA, motion respects `prefers-reduced-motion`.
- [ ] No new client JS or image weight without a reason. Images are optimized.
- [ ] The page still exports metadata with `buildMetadata()` from `lib/seo.ts`.
- [ ] Before and after screenshots are in the PR.
