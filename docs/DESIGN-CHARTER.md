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

- **Overloaded hero.** `app/components/HeroSection.tsx` stacks an animated canvas, a gradient
  overlay, a hexagon-clipped avatar and a mono eyebrow. Pick one standout element.
- **Two token systems in `app/globals.css`.** The leftover shadcn HSL variables (`--primary`,
  `--muted` and others in `@layer base`) live next to the Design System v2 tokens (`--fg`,
  `--surface`, `--accent`). Converge on the v2 tokens.
- **Mixed Tailwind versions.** v3 (`tailwindcss`) and v4 (`@tailwindcss/postcss`,
  `@tailwindcss/vite`) packages are both installed. Pick one before a large restyle.
- **AI projects sit too low.** The site's most distinctive feature is not on the first screen.

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
